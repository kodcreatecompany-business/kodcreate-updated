import { ArrowUpRight } from "lucide-react"
export function BusinessShowcase() {
  return <article className="volt-concept" aria-label="Volt Studio yellow and black landing page design concept">
    <div className="concept-browser"><span>● ● ●</span><span>volt.studio / digital experiences</span><span>↗</span></div>
    <div className="volt-nav"><b>VOLT<span>®</span></b><span>Independent creative studio</span><span className="volt-nav-end">LET’S TALK ↗</span></div>
    <div className="volt-body"><div className="volt-copy"><span className="volt-eyebrow">FOR BRANDS THAT MOVE DIFFERENTLY</span><h3>Good is<br />forgettable.<br /><em>Be electric.</em></h3><p>Strategy, identity and digital experiences.<br />Made to turn heads. Built to move you forward.</p><span className="volt-cta">Discover our work <ArrowUpRight size={15}/></span></div><div className="volt-art" aria-hidden="true"><div className="volt-orbit orbit-one"/><div className="volt-orbit orbit-two"/><div className="volt-orbit orbit-three"/><span className="volt-art-center">V</span><small>DESIGNED TO<br />MAKE AN IMPACT</small><span className="volt-art-number">01 — 26</span></div></div>
    <div className="volt-foot"><span>STRATEGY + DESIGN + DIGITAL</span><span>SCROLL TO FEEL THE ENERGY ↓</span><span>CONCEPT / 01</span></div>
  </article>
}
