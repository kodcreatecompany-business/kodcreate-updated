import { ArrowDownRight, Check, LockKeyhole } from "lucide-react"
import { EnquiryForm } from "@/components/enquiry-form"
import { SectionLabel } from "@/components/content-sections"

export function ContactSection() {
  return <section id="contact" className="contact-section section-padding" aria-labelledby="contact-title"><div className="page-container contact-layout"><div className="contact-intro"><SectionLabel number="06">LET’S MAKE IT HAPPEN</SectionLabel><h2 id="contact-title">Your next chapter<br />starts with<br /><span className="contact-highlight">a conversation.</span></h2><p>Have an idea, a business to grow, or a website that could do more? Tell me a little about it.</p><div className="contact-notes"><span><Check size={16} />No pressure. Just possibilities.</span><span><Check size={16} />A conversation with the founder.</span></div><ArrowDownRight className="contact-arrow" size={92} strokeWidth={1} aria-hidden="true" /></div><div className="contact-form-panel"><div className="form-heading"><h3>Tell me what you have in mind.</h3><p>A few details are all it takes to get started.</p></div><EnquiryForm /><p className="form-privacy"><LockKeyhole size={12} aria-hidden="true" />Your details are used only to respond to your enquiry. Please don&apos;t include sensitive information.</p></div></div></section>
}
