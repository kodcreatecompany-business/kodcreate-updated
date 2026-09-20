"use client"

import Image from "next/image"
import type { CSSProperties } from "react"

const clamp = (x: number) => Math.max(0, Math.min(1, x))
const ease = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t) }
const stages = ["The code", "The structure", "The design", "Your website"]
const snippets = [
  '<nav class="navigation">\n  <Logo /> <Links />\n</nav>',
  '<section class="hero">\n  <h1>Your next chapter.</h1>\n  <Button>Let’s begin</Button>\n</section>',
  '.visual {\n  display: grid;\n  border-radius: 16px;\n  background: your-vision;\n}',
  '<Services>\n  <Design /> <Develop /> <Launch />\n</Services>',
]

export function HeroVisual({ progress = 0 }: { progress?: number }) {
  const morph = ease((progress - .16) / .58)
  const reveal = ease((progress - .48) / .34)
  const spread = Math.sin(clamp((progress - .16) / .75) * Math.PI)
  const stage = Math.min(3, Math.floor(progress * 4))
  const target = [
    { x: 0, y: -154, w: 480, h: 48 },
    { x: -122, y: -10, w: 236, h: 220 },
    { x: 126, y: -10, w: 228, h: 220 },
    { x: 0, y: 146, w: 480, h: 68 },
  ]
  return <div className="transform-visual" role="img" aria-label="Scroll to transform code into a complete website. No physical devices.">
    <div className="transform-aura" aria-hidden="true" />
    <div className="transform-world" aria-hidden="true" style={{ transform: `rotateX(${10 * (1 - morph)}deg) rotateY(${-18 * (1 - morph)}deg) rotateZ(${-5 * (1 - morph)}deg)` }}>
      <div className="transform-shell" style={{ opacity: morph, transform: `translateZ(${-15 - spread * 18}px)` }} />
      {target.map((t, i) => {
        const initialY = -144 + i * 94
        const x = t.x * morph
        const y = initialY + (t.y - initialY) * morph
        const style = {
          width: 460 + (t.w - 460) * morph,
          height: 80 + (t.h - 80) * morph,
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${spread * (45 + i * 32)}px) rotateY(${spread * (i % 2 ? 6 : -6)}deg)`,
          backgroundColor: `rgba(247, 243, 236,${.78 + morph * .22})`,
          borderColor: `rgba(220, 125, 65,${.12 + spread * .28})`,
        } as CSSProperties
        return <div key={i} className={`transform-piece transform-piece-${i}`} style={style}>
          <pre className="transform-code" style={{ opacity: 1 - ease((progress - .2) / .3), transform: `translateY(${-morph * 12}px)` }}><span>{String(i + 1).padStart(2, "0")}</span>{snippets[i]}</pre>
          <div className="transform-wire" style={{ opacity: spread * (1 - reveal) }}><i /><i /><i /></div>
          <div className="transform-content" style={{ opacity: reveal }}>
            {i === 0 && <div className="transform-nav"><b>kodcreate<span>.</span></b><span>Studio</span><span>Work</span><span className="transform-nav-contact">Let’s talk ↗</span></div>}
            {i === 1 && <div className="transform-copy"><small>BUILT AROUND YOUR VISION</small><h3>Your next<br />chapter.<br /><em>Beautifully built.</em></h3><p>A considered digital experience,<br />made for your business.</p><span className="transform-cta">Explore the possibilities ↗</span></div>}
            {i === 2 && <div className="transform-photo"><Image src="/images/architecture.png" alt="" fill sizes="260px" /><span>Thoughtful by design.</span></div>}
            {i === 3 && <div className="transform-cards">{["01 / Design", "02 / Develop", "03 / Launch"].map(label => <div key={label}><span>↗</span><b>{label}</b><i /></div>)}</div>}
          </div>
        </div>
      })}
    </div>
    <div className="transform-story" aria-hidden="true"><div className="transform-stages">{stages.map((label, i) => <span key={label} className={i === stage ? "is-current" : ""}>{label}</span>)}</div><div className="transform-track"><i style={{ transform: `scaleX(${progress})` }} /></div><p>{progress < .95 ? "SCROLL TO TRANSFORM ↓" : "FROM AN IDEA. INTO YOUR WEBSITE."}</p></div>
  </div>
}
