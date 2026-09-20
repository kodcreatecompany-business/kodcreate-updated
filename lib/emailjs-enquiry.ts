import type { EnquiryPayload } from "./enquiry-validation"

// EmailJS public identifiers are designed to be used in browser code.
export const emailJsConfig = {
  service_id: "service_j55wetx",
  template_id: "template_gbxjyt4",
  user_id: "TRBsMWuoligrTy83V",
} as const

export function enquiryTemplateParams(enquiry: EnquiryPayload) {
  const message = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Business: ${enquiry.businessName || "Not supplied"}`,
    `Reference: ${enquiry.requestId}`,
    "",
    enquiry.description,
  ].join("\n")

  return {
    name: enquiry.name,
    from_name: enquiry.name,
    email: enquiry.email,
    from_email: enquiry.email,
    reply_to: enquiry.email,
    to_name: "kodcreate",
    to_email: "kodcreatecompany@gmail.com",
    business_name: enquiry.businessName,
    businessName: enquiry.businessName,
    title: "New website project enquiry — kodcreate",
    subject: "New website project enquiry — kodcreate",
    message,
    description: enquiry.description,
    reference: enquiry.requestId,
    time: new Date().toISOString(),
  }
}

export async function sendEnquiryEmail(enquiry: EnquiryPayload) {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...emailJsConfig, template_params: enquiryTemplateParams(enquiry) }),
    signal: AbortSignal.timeout(20000),
  })
  if (!response.ok) {
    if (response.status === 429) throw new Error("Too many enquiries are being sent. Please wait a minute and try again, or email kodcreatecompany@gmail.com.")
    throw new Error("Your enquiry could not be sent. Please try again or email kodcreatecompany@gmail.com.")
  }
}
