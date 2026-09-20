"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowRight, Check } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { HeroVisual } from "@/components/hero-visual"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Hero() {
  const section = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const update = () => {
      frame = 0
      const element = section.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      setProgress(reduced.matches ? 1 : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight))))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    reduced.addEventListener("change", schedule)
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule) }
  }, [])
  return <section ref={section} id="home" className="hero-section transforming-hero" aria-labelledby="hero-title">
    <div className="page-container">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />{site.hero.eyebrow}</p>
          <h1 id="hero-title">Big ideas.<br /><span className="hero-highlight">Remarkable</span><br />websites<span className="heading-dot">.</span></h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-actions">
            <a href="#contact" className={cn(buttonVariants({ size: "project" }), "group")}>Start Your Project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
            <a href="#service" className={cn(buttonVariants({ variant: "soft", size: "project" }), "group")}>See What We Build <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
          </div>
          <div className="hero-personal"><span className="personal-orbit" aria-hidden="true"><CodeMark /></span><span>A direct line to the person building your website.</span></div>
        </div>
        <HeroVisual progress={progress} />
      </div>
      <div className="hero-bottom">
        <div className="hero-promises">{["Custom, not cookie-cutter", "Designed for every device", "Built with purpose"].map((text) => <span key={text}><Check size={14} strokeWidth={2} aria-hidden="true" />{text}</span>)}</div>
        <a href="#service" className="scroll-cue">A little more about what I do <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
    </div>
  </section>
}

function CodeMark() { return <span>{"</>"}</span> }
