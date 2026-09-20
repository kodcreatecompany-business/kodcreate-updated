import { after, type NextRequest, NextResponse } from "next/server"
import { enquirySchema } from "@/lib/enquiry-validation"
import { saveEnquiry, SubmissionError } from "@/lib/save-enquiry"
import { notifyEnquiry } from "@/lib/notify-enquiry"

export const runtime = "nodejs"
export const maxDuration = 30

async function readBody(request: NextRequest) {
  const reader = request.body?.getReader()
  if (!reader) throw new SubmissionError(400, "Please include your project details.")
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > 24000) { await reader.cancel(); throw new SubmissionError(413, "Your enquiry is too long. Please keep your project description under 5,000 characters.") }
    chunks.push(value)
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf-8")) }
  catch { throw new SubmissionError(400, "The enquiry format was not recognised. Please try again.") }
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin")
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host")
    let originHost: string | null = null
    try { originHost = origin ? new URL(origin).host : null } catch { /* Invalid origins are rejected below. */ }
    if (!originHost || originHost !== host || request.headers.get("sec-fetch-site") === "cross-site") {
      throw new SubmissionError(403, "Please send your enquiry from the website form.")
    }
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      throw new SubmissionError(415, "Please send your enquiry using the website form.")
    }
    const result = enquirySchema.safeParse(await readBody(request))
    if (!result.success) return NextResponse.json({ saved: false, message: "Please check the highlighted details and try again.", errors: result.error.flatten().fieldErrors }, { status: 422 })

    // Vercel supplies this header; untrusted forwarded headers are not used in production.
    const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
      || (process.env.NODE_ENV === "development" ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() : null)
      || "unknown"
    const saved = await saveEnquiry(result.data, ip)
    if (saved.isNew) after(() => notifyEnquiry(saved.id, result.data))
    return NextResponse.json({ saved: true, reference: saved.id }, { status: saved.isNew ? 201 : 200, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    if (error instanceof SubmissionError) {
      return NextResponse.json({ saved: false, message: error.message }, { status: error.status, headers: error.retryAfter ? { "Retry-After": String(error.retryAfter) } : undefined })
    }
    console.error("Enquiry persistence failed.", { errorType: error instanceof Error ? error.name : "Unknown" })
    return NextResponse.json({ saved: false, message: "We couldn’t confirm your enquiry was saved. Your details are still here — please try again." }, { status: 503 })
  }
}
