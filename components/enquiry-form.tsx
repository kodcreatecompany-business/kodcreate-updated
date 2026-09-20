"use client"

import { useRef, useState, type FormEvent } from "react"
import { ArrowRight, Check, CircleAlert, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { enquirySchema, type EnquiryFieldErrors } from "@/lib/enquiry-validation"
import { sendEnquiryEmail } from "@/lib/emailjs-enquiry"

export function EnquiryForm() {
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<EnquiryFieldErrors>({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<{ reference: string } | null>(null)
  const requestId = useRef("")
  const sending = useRef(false)
  const previousPayload = useRef("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current) return
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const serialized = JSON.stringify(values)
    if (!requestId.current || previousPayload.current !== serialized) requestId.current = crypto.randomUUID()
    previousPayload.current = serialized
    const payload = { ...values, requestId: requestId.current }
    setError("")
    setErrors({})
    const result = enquirySchema.safeParse(payload)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors(fieldErrors)
      const firstName = Object.keys(fieldErrors)[0]
      const input = form.elements.namedItem(firstName)
      if (input instanceof HTMLElement) input.focus()
      return
    }
    sending.current = true
    setPending(true)
    try {
      await sendEnquiryEmail(result.data)
      setSuccess({ reference: result.data.requestId })
    } catch (cause) {
      setError(cause instanceof Error && !["TimeoutError", "AbortError", "TypeError"].includes(cause.name) ? cause.message : "We couldn’t confirm sending. Your details are still here. Please check before retrying, or email kodcreatecompany@gmail.com.")
    } finally { sending.current = false; setPending(false) }
  }

  const fieldError = (name: keyof EnquiryFieldErrors) => errors[name]?.length ? <FieldError id={`${name}-error`}>{errors[name]![0]}</FieldError> : null
  const attributes = (name: keyof EnquiryFieldErrors) => ({ "aria-invalid": Boolean(errors[name]?.length), "aria-describedby": errors[name]?.length ? `${name}-error` : undefined })

  if (success) return <div className="success-state" role="status" aria-live="polite"><span className="success-icon"><Check size={25} /></span><h4>Your idea is in good hands.</h4><p>Thank you for getting in touch. Your project enquiry has been sent for review — there&apos;s no need to submit it again.</p><p className="success-reference">Reference: {success.reference}</p><Button type="button" variant="outline" size="project" className="group" onClick={() => { setSuccess(null); requestId.current = ""; previousPayload.current = "" }}>Send another enquiry <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Button></div>

  return <form className="enquiry-form" onSubmit={handleSubmit} noValidate aria-busy={pending} onKeyDown={(event) => { if (event.key === "Enter" && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault() }}>
    <FieldGroup>
      <FieldGroup className="form-row">
        <Field data-invalid={Boolean(errors.name)}><FieldLabel htmlFor="enquiry-name">Your name <span aria-hidden="true">*</span></FieldLabel><Input id="enquiry-name" name="name" autoComplete="name" placeholder="Alex Morgan" required minLength={2} maxLength={100} disabled={pending} {...attributes("name")} />{fieldError("name")}</Field>
        <Field data-invalid={Boolean(errors.email)}><FieldLabel htmlFor="enquiry-email">Email address <span aria-hidden="true">*</span></FieldLabel><Input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="alex@yourbusiness.com" required maxLength={254} disabled={pending} {...attributes("email")} />{fieldError("email")}</Field>
      </FieldGroup>
      <Field data-invalid={Boolean(errors.businessName)}><FieldLabel htmlFor="enquiry-business">Business name</FieldLabel><Input id="enquiry-business" name="businessName" autoComplete="organization" placeholder="Your business or big idea" maxLength={160} disabled={pending} {...attributes("businessName")} />{fieldError("businessName")}</Field>
      <Field data-invalid={Boolean(errors.description)}><FieldLabel htmlFor="enquiry-description">What are you looking to create? <span aria-hidden="true">*</span></FieldLabel><Textarea id="enquiry-description" name="description" placeholder="Tell me about your business, your goals, and what you have in mind…" required minLength={20} maxLength={5000} rows={4} disabled={pending} {...attributes("description")} />{fieldError("description")}</Field>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="enquiry-website">Leave this field empty</label><input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      {error && <Alert variant="destructive"><CircleAlert /><AlertTitle>Let&apos;s try that again.</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      <Button type="submit" size="project" disabled={pending} className="w-full group">{pending ? <><Loader2 data-icon="inline-start" className="animate-spin" />Sending your enquiry…</> : <>Send Project Enquiry <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></>}</Button>
    </FieldGroup>
  </form>
}
