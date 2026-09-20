import Image from "next/image"
import { ArrowUpRight, MoveUpRight } from "lucide-react"

export function BrowserPreview({ theme = "architecture" }: { theme?: "architecture" | "retreat" }) {
  return <div className={`concept-browser ${theme === "retreat" ? "retreat-browser" : "architecture-browser"}`}>
    <div className="browser-chrome"><span className="browser-dots"><i /><i /><i /></span><span className="browser-address">{theme === "architecture" ? "forma — architecture & interiors" : "still — a little closer to nature"}</span><span className="browser-plus">+</span></div>
    {theme === "architecture" ? <div className="architecture-content">
      <div className="concept-navigation"><span className="forma-logo">forma<span>®</span></span><span>Our approach</span><span>Spaces</span><span className="concept-contact">Get in touch <ArrowUpRight size={10} /></span></div>
      <div className="architecture-hero"><div className="architecture-text"><span className="concept-eyebrow">SPACES WITH SOUL</span><h3>Considered<br />spaces.<br /><em>Inspired living.</em></h3><p>Thoughtful architecture for the way you live.</p><span className="concept-link">Explore our spaces <ArrowUpRight size={12} /></span></div><div className="architecture-image"><Image src="/images/architecture.png" alt="Concept: minimalist limestone residence with an olive tree and a reflecting pool" fill sizes="(max-width: 640px) 65vw, 400px" /></div></div>
      <div className="concept-bottom"><span>Architecture with intention.</span><span>Made for life. <MoveUpRight size={12} /></span></div>
    </div> : <div className="retreat-content"><Image src="/images/retreat.png" alt="Concept: secluded timber cabin in a misty pine forest" fill sizes="(max-width: 640px) 90vw, 600px" /><div className="retreat-overlay" /><div className="concept-navigation"><span className="still-logo">still.</span><span>The experience</span><span>Our cabins</span><span className="concept-contact">Find your escape <ArrowUpRight size={10} /></span></div><div className="retreat-text"><span className="concept-eyebrow">LESS NOISE. MORE NATURE.</span><h3>A little further<br />from everything.<br /><em>A little closer to you.</em></h3><span className="retreat-link">Find your still <ArrowUpRight size={12} /></span></div><span className="retreat-footnote">A slower kind of stay.</span></div>}
  </div>
}
