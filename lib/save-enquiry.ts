import "server-only"
import { createHash } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { db, businessScope } from "@/lib/db"
import { enquiries, submissionLimits } from "@/lib/db/schema"
import type { EnquiryPayload } from "@/lib/enquiry-validation"

export class SubmissionError extends Error {
  constructor(public status: number, message: string, public retryAfter?: number) { super(message) }
}

export async function saveEnquiry(payload: EnquiryPayload, ip: string) {
  const { requestId, website: _honeypot, ...values } = payload
  const payloadHash = createHash("sha256").update(JSON.stringify(values)).digest("hex")
  const hash = (value: string) => createHash("sha256").update(value).digest("hex")
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000)

  return db.transaction(async (tx) => {
    const [existing] = await tx.select({ id: enquiries.id, payloadHash: enquiries.payloadHash }).from(enquiries).where(and(eq(enquiries.userId, businessScope), eq(enquiries.requestId, requestId))).limit(1)
    if (existing) {
      if (existing.payloadHash !== payloadHash) throw new SubmissionError(409, "The enquiry changed. Please refresh the page and try again.")
      return { id: existing.id, isNew: false }
    }

    const limits = [
      { key: "global", limit: 100 },
      { key: `ip:${hash(ip)}`, limit: 5 },
      { key: `email:${hash(values.email)}`, limit: 3 },
    ].sort((a, b) => a.key.localeCompare(b.key))

    for (const { key, limit } of limits) {
      await tx.insert(submissionLimits).values({ key, userId: businessScope, count: 0, expiresAt }).onConflictDoNothing()
      const [bucket] = await tx.select().from(submissionLimits).where(and(eq(submissionLimits.userId, businessScope), eq(submissionLimits.key, key))).for("update")
      if (!bucket) throw new Error("Rate limit bucket unavailable")
      const expired = bucket.expiresAt.getTime() <= now.getTime()
      const count = expired ? 0 : bucket.count
      if (count >= limit) throw new SubmissionError(429, "A few enquiries have already been sent. Please try again later.", Math.max(1, Math.ceil((bucket.expiresAt.getTime() - now.getTime()) / 1000)))
      await tx.update(submissionLimits).set({ count: count + 1, expiresAt: expired ? expiresAt : bucket.expiresAt }).where(and(eq(submissionLimits.userId, businessScope), eq(submissionLimits.key, key)))
    }

    const [saved] = await tx.insert(enquiries).values({ ...values, requestId, payloadHash, userId: businessScope }).onConflictDoNothing({ target: enquiries.requestId }).returning({ id: enquiries.id })
    if (saved) return { id: saved.id, isNew: true }
    const [duplicate] = await tx.select({ id: enquiries.id, payloadHash: enquiries.payloadHash }).from(enquiries).where(and(eq(enquiries.userId, businessScope), eq(enquiries.requestId, requestId))).limit(1)
    if (!duplicate || duplicate.payloadHash !== payloadHash) throw new SubmissionError(409, "This submission could not be confirmed. Please refresh and try again.")
    return { id: duplicate.id, isNew: false }
  })
}
