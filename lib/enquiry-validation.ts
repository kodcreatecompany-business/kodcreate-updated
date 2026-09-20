import { z } from "zod"

const clean = (value: string) => value.normalize("NFKC").replace(/<[^>]*>/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
const shortText = (limit: number) => z.string().max(limit).transform(clean)
const optionalText = (limit: number) => shortText(limit).optional().default("")

export const enquirySchema = z.object({
  name: shortText(100).pipe(z.string().min(2, "Please enter your name (at least 2 characters).")),
  email: z.string().trim().toLowerCase().max(254).email("Please enter a valid email address."),
  businessName: optionalText(160),
  description: shortText(5000).pipe(z.string().min(20, "Please tell me a little more (at least 20 characters).")),
  budget: optionalText(120),
  timeline: optionalText(120),
  website: z.string().max(0, "Your submission could not be accepted. Please try again.").optional().default(""),
  requestId: z.uuid(),
})

export type EnquiryPayload = z.infer<typeof enquirySchema>
export type EnquiryFieldErrors = Partial<Record<keyof EnquiryPayload, string[]>>
