"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, TrendingUp } from "lucide-react"

const slides = [
  {
    image: "/images/business_one.jpg",
    title: "Executive Client Strategy & Consultation",
    tag: "Founder-Led Advisory",
    alt: "Corporate executive in client strategy consultation"
  },
  {
    image: "/images/business_two.jpg",
    title: "Strategic Partnerships & Agreements",
    tag: "Trusted Execution",
    alt: "Business partners shaking hands over signed contract"
  }
]

export function BusinessShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="business-showcase-container" aria-label="Corporate business concept showcase">
      <article className="business-showcase-card">
        {/* Simulated Browser Top Bar */}
        <div className="business-browser-bar">
          <div className="business-browser-dots" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className="business-browser-address">
            vanguard — executive advisory &amp; capital
          </div>
          <span className="browser-plus" aria-hidden="true">+</span>
        </div>

        {/* Website Header Bar */}
        <div className="business-banner-nav">
          <div className="business-nav-logo">
            <TrendingUp size={18} className="text-orange-400" />
            <span>VANGUARD</span> STRATEGY
          </div>
          <div className="business-nav-links">
            <span className="business-nav-link">Advisory</span>
            <span className="business-nav-link">Ventures</span>
            <span className="business-nav-link">Insights</span>
            <span className="business-nav-link">Client Access</span>
          </div>
          <button type="button" tabIndex={-1} className="business-nav-action">
            Client Portal
          </button>
        </div>

        {/* Website Hero / Showcase Banner */}
        <div className="business-banner-content">
          <div className="business-content-left">
            <div className="business-tag">
              <span className="business-tag-dot" />
              EXECUTIVE ADVISORY &amp; GLOBAL VENTURES
            </div>
            <h3>
              Empowering Enterprise Ambition.<br />
              <em>Engineered for Scale.</em>
            </h3>
            <p>
              Bespoke strategic consulting, capital advisory, and enterprise growth platforms designed for market leaders.
            </p>

            <div className="business-action-row">
              <div className="business-pill-btn group">
                Explore Advisory <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              {/* Running indicator dots */}
              <div className="business-carousel-indicator">
                <div className="business-carousel-dots" role="tablist" aria-label="Showcase slides">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`carousel-dot ${currentSlide === index ? "active" : ""}`}
                      aria-label={`Showcase slide ${index + 1}`}
                      aria-selected={currentSlide === index}
                    />
                  ))}
                </div>
                <span>0{currentSlide + 1} / 0{slides.length}</span>
              </div>
            </div>
          </div>

          {/* Running Pictures Frame */}
          <div className="business-visual-frame" aria-hidden="true">
            {slides.map((slide, index) => (
              <div
                key={slide.image}
                className={`business-photo ${currentSlide === index ? "active" : ""}`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="business-photo-overlay" />
                <div className="business-photo-caption">
                  <span>{slide.title}</span>
                  <span>
                    <span className="pulse-live-dot" />
                    {slide.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
