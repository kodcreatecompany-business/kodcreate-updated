"use client"

import { ArrowUpRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { site } from "@/lib/site"

export function FaqSection() {
  return <section id="faqs" className="faq-section section-padding page-container" aria-labelledby="faq-title"><div className="faq-intro"><p className="section-label"><span>05</span><span className="label-line" />GOOD QUESTIONS</p><h2 id="faq-title">A little clarity<br /><span className="highlight-text">before we start.</span></h2><p>Wondering about something else?<br />I&apos;m happy to talk it through.</p><a className="text-link" href="#contact">Ask away <ArrowUpRight size={17} aria-hidden="true" /></a></div><Accordion className="faq-list" defaultValue={["question-0"]}>{site.faqs.map((faq, index) => <AccordionItem key={faq.question} value={`question-${index}`}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></section>
}
