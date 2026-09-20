import Image from "next/image"
import { ArrowRight, ArrowUpRight, CodeXml, Fingerprint, Layers3, MonitorSmartphone, Search, Sparkles, Zap } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"
import { Reveal } from "@/components/reveal"

const featureIcons = [Fingerprint, MonitorSmartphone, Zap, Search]

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="section-label"><span>{number}</span><span className="label-line" />{children}</p>
}

export function ServiceSection() {
  return <section id="service" className="section-padding page-container" aria-labelledby="service-title">
    <SectionLabel number="01">THE SERVICE</SectionLabel>
    <div className="section-heading-row">
      <h2 id="service-title">Your ambition.<br /><span className="highlight-text">Built into every detail.</span></h2>
      <p>A great website isn&apos;t just how it looks.<br />It&apos;s how it <span className="highlight-text">works for</span> your business.</p>
    </div>
    <Reveal><div className="service-layout">
      <div className="service-main">
        <span className="service-symbol"><CodeXml size={35} strokeWidth={1.5} /></span>
        <div>
          <span className="small-label">FROM FIRST IDEA TO FINAL LAUNCH</span>
          <h3>Website<br />Development<span>.</span></h3>
          <p>One complete offering. A website shaped around your brand, your audience, and your ambition — with thoughtful design and the technology to match.</p>
        </div>
        <a href="#contact" className="text-link">Let&apos;s build something great <ArrowUpRight size={18} aria-hidden="true" /></a>
        <div className="service-decoration" aria-hidden="true">{"</>"}</div>
      </div>
      <div className="service-feature-boxes">
        {site.features.map((feature, index) => {
          const Icon = featureIcons[index];
          return (
            <div className="service-feature-box" key={feature.title} role="presentation">
              <span className="feature-icon"><Icon size={21} strokeWidth={1.6} /></span>
              <div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div></Reveal>
  </section>
}

export function ProcessSection() {
  return <section id="process" className="process-section section-padding" aria-labelledby="process-title"><div className="page-container">
    <SectionLabel number="03">THE PROCESS</SectionLabel>
    <div className="section-heading-row">
      <h2 id="process-title">Great websites.<br /><span className="highlight-text">No guesswork.</span></h2>
      <p>A clear, collaborative process.<br />You&apos;ll know what&apos;s happening at every step.</p>
    </div>
    <div className="process-grid">
      {site.process.map((step, index) => (
        <Reveal key={step.number} delay={index * 0.05}>
          <div className="process-step-box">
            <div className="process-number">
              <span className="process-num-badge">{step.number}</span>
              {index < 3 && <ArrowRight className="process-arrow" size={19} aria-hidden="true" />}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div></section>
}

export function AboutSection() {
  return (
    <section className="about-section section-padding page-container" aria-labelledby="about-title">
      <Reveal>
        <div className="about-layout">
          <div className="about-art" aria-hidden="true">
            <div className="about-grid-pattern" />
            <span className="about-art-label">THOUGHTFUL BY DESIGN</span>
            <div className="about-monogram">
              <Image
                src="/images/kodcreate-orange.png"
                alt="Kodcreate official logo"
                width={2172}
                height={724}
                priority
                className="about-monogram-img"
              />
            </div>
            <div className="founder-note">
              <span className="eyebrow-dot" />Independent. Involved. Invested.
            </div>
            <span className="about-art-number">EST. WITH PURPOSE</span>
          </div>
          <div className="about-copy">
            <SectionLabel number="04">THE PERSON BEHIND THE PIXELS</SectionLabel>
            <h2 id="about-title">A small studio.<br /><span className="highlight-text">A personal approach.</span></h2>
            <p>kodcreate is a founder-led website development business. That means you work directly with the person designing and building your website — from the first hello to the final launch.</p>
            <p>From the layout to the last interaction, the details work together to make your business easy to understand and your next customer’s first step feel simple.</p>
            <div className="about-values">
              <span><Sparkles size={16} />Attention to detail</span>
              <span><Layers3 size={16} />Built around you</span>
            </div>
            <a href="#contact" className={cn(buttonVariants({ size: "project" }), "group")}>
              Let&apos;s get to know your business <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
