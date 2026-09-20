import Image from "next/image"
import GlyphPortal from "@/components/ui/glyph-portal"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ServiceSection, ProcessSection, AboutSection } from "@/components/content-sections"
import { ShowcaseSection } from "@/components/showcase"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <GlyphPortal
        word="KODCREATE"
        scrollLength={2.5}
        interactive={true}
        enterLabel="Scroll inside"
        style={{
          "--gp-paper": "#f7f3ec",
          "--gp-ink": "#0a0a0a",
          "--gp-field": "#ff6300",
          "--gp-foreground": "#0a0a0a",
        }}
        background={
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 35%, #ff7b2b 0%, #ff6300 45%, #e05400 100%)",
            }}
          />
        }
        front={
          <div className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none p-6 sm:p-12 select-none">
            <div className="flex flex-col items-center gap-2 mt-4 sm:mt-6">
              <Image
                src="/images/kodcreate-orange.png"
                alt="Kodcreate"
                width={300}
                height={100}
                priority
                className="w-48 sm:w-64 h-auto drop-shadow-sm"
              />
              <span className="text-[10px] sm:text-[11px] tracking-[4px] text-[#8e6a51] font-semibold uppercase">
                IDEAS INTO EXPERIENCES
              </span>
            </div>
            <div className="mb-10 flex flex-col items-center gap-1.5 animate-bounce text-[#7a6659] text-xs font-medium tracking-wide">
              <span>Scroll to explore</span>
              <span className="text-sm">↓</span>
            </div>
          </div>
        }
      >
        <div className="w-full bg-[#f7f3ec] text-[#0a0a0a]">
          <SiteHeader />
          <main id="main-content">
            <Hero />
            <ServiceSection />
            <ShowcaseSection />
            <ProcessSection />
            <AboutSection />
            <FaqSection />
            <ContactSection />
          </main>
          <SiteFooter />
        </div>
      </GlyphPortal>
    </>
  )
}
