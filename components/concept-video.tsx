"use client"
import { useEffect, useRef, useState } from "react"
export function ConceptVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const element = video.current
    if (!element) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let observer: IntersectionObserver
    const setup = () => {
      observer?.disconnect()
      if (reduced.matches) { element.pause(); return }
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) element.play().catch(() => {})
        else element.pause()
      }, { threshold: .25 })
      observer.observe(element)
    }
    setup(); reduced.addEventListener("change", setup)
    return () => { observer?.disconnect(); reduced.removeEventListener("change", setup) }
  }, [])
  return <div className="motion-concept-stage"><video ref={video} muted loop playsInline preload="metadata" poster="/images/motion-poster.svg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Decorative 3D animation of a website forming and scrolling through its sections"><source src="/videos/website-transformation.webm" type="video/webm" /></video><button className="video-toggle" onClick={() => { const el=video.current; if(el) { if(el.paused) el.play().catch(() => {}); else el.pause() } }} aria-label={playing ? "Pause concept animation" : "Play concept animation"}>{playing ? "Pause Ⅱ" : "Play ▷"}</button><span className="motion-concept-label">3D WEBSITE MOTION / CONCEPT FILM</span></div>
}
