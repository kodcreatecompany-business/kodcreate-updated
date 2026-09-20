import "server-only"
import { Resend } from "resend"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { db, businessScope } from "@/lib/db"
import { enquiries } from "@/lib/db/schema"
import { site } from "@/lib/site"
import type { EnquiryPayload } from "@/lib/enquiry-validation"

export async function notifyEnquiry(id: string, enquiry: EnquiryPayload) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.ENQUIRY_FROM_EMAIL
  const to = process.env.ENQUIRY_TO_EMAIL?.trim() || site.contactEmail
  let status = "not_configured"

  if (key && from && to && z.email().safeParse(from).success && z.email().safeParse(to).success) {
    status = "failed"
    const resend = new Resend(key)
    const text = [
      "New kodcreate website project enquiry",
      `Reference: ${id}`,
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Business: ${enquiry.businessName || "Not supplied"}`,
      `Budget: ${enquiry.budget || "Not supplied"}`,
      `Timeline: ${enquiry.timeline || "Not supplied"}`,
      "", "Project description:", enquiry.description,
    ].join("\n")
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const { data, error } = await resend.emails.send({
          from, to: [to], replyTo: enquiry.email,
          subject: "New website project enquiry — kodcreate",
          text,
        }, { idempotencyKey: `enquiry/${id}` })
        if (!error && data?.id) { status = "sent"; break }
        if (error && !["rate_limit_exceeded", "application_error", "internal_server_error"].includes(error.name)) break
      } catch {
        // The enquiry is committed before delivery, so a provider outage cannot lose it.
      }
      if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 600))
    }
  }

  try {
    await db.update(enquiries).set({ emailStatus: status }).where(and(eq(enquiries.userId, businessScope), eq(enquiries.id, id)))
    if (status === "failed") console.error("Enquiry email notification failed; saved enquiry requires review.", { reference: id })
  } catch {
    console.error("Enquiry notification status update failed; saved enquiry remains pending.", { reference: id })
  }
}
