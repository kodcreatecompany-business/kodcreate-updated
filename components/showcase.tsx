import { ArrowUpRight } from "lucide-react"
import { ConceptVideo } from "@/components/concept-video"
import { BusinessShowcase } from "@/components/volt-showcase"
import { SectionLabel } from "@/components/content-sections"
import { Reveal } from "@/components/reveal"

export function ShowcaseSection() {
  return (
    <section id="concepts" className="showcase-section section-padding" aria-labelledby="showcase-title">
      <div className="page-container">
        <SectionLabel number="02">A LITTLE INSPIRATION</SectionLabel>
        <div className="section-heading-row">
          <h2 id="showcase-title">
            Different businesses.<br />
            <span className="highlight-text">Distinct possibilities.</span>
          </h2>
          <p>
            A few creative directions to get you thinking.<br />
            Your website will have a story of its own.
          </p>
        </div>

        {/* Featured Business Concept Banner with 2 Running Pictures */}
        <Reveal>
          <BusinessShowcase />
        </Reveal>

        {/* Additional Architecture & Hospitality Concepts */}
        <div className="showcase-grid">
          <Reveal>
            <article className="concept-card architecture-card">
              <div className="concept-image-stage architecture-stage">
                <ConceptVideo />
              </div>
              <div className="concept-card-caption">
                <div>
                  <h3>In motion<span>From code to a complete experience</span></h3>
                  <p>CONCEPT DESIGN — NOT CLIENT WORK</p>
                </div>
                <ArrowUpRight aria-hidden="true" size={20} />
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="concept-card retreat-card">
              <div className="concept-image-stage retreat-stage">
                <div className="grove-preview" aria-label="Grove botanical skincare design concept">
                  <div className="grove-nav"><b>grove.</b><span>SKINCARE, SIMPLIFIED ↗</span></div>
                  <div className="grove-body"><div><span className="grove-kicker">LESS, BUT BETTER.</span><h4>A little closer<br />to <em>nature.</em></h4><p>Thoughtful essentials.<br />For skin that feels like you.</p><span className="grove-cta">Meet your daily ritual ↗</span></div><div className="grove-product" aria-hidden="true"><i className="grove-leaf leaf-one"/><i className="grove-leaf leaf-two"/><div className="grove-bottle"><span>grove.</span><small>DAILY<br />BALANCE<br />SERUM</small><i>30 ml / 1 fl oz</i></div></div></div>
                  <div className="grove-bottom"><span>ROOTED IN NATURE</span><span>MADE WITH INTENTION</span><span>EVERYDAY ESSENTIALS</span></div>
                </div>
              </div>
              <div className="concept-card-caption">
                <div>
                  <h3>grove<span>Botanical skincare & e-commerce</span></h3>
                  <p>CONCEPT DESIGN — NOT CLIENT WORK</p>
                </div>
                <ArrowUpRight aria-hidden="true" size={20} />
              </div>
            </article>
          </Reveal>
        </div>
        <p className="concept-disclaimer">Explorations, not a portfolio of client projects. A starting point for what we could create together.</p>
      </div>
    </section>
  )
}
