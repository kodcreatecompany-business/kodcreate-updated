import { ArrowUpRight, Mail } from "lucide-react"
import { Wordmark } from "@/components/site-header"
import { site } from "@/lib/site"

const linkedInUrl = "https://www.linkedin.com/in/muhammad-roahan-6b17b9436/"

export function SiteFooter() {
  const contactHref = site.contactEmail ? `mailto:${site.contactEmail}` : "#contact"
  return (
    <footer className="site-footer company-footer">
      <div className="page-container">
        <div className="company-footer-grid">
          <div className="company-footer-brand">
            <a href="#home" aria-label={`${site.name} home`}><Wordmark /></a>
            <p className="company-footer-tagline">WEBSITE DEVELOPMENT</p>
            <p className="company-footer-description">Custom websites, thoughtful design, and modern digital experiences built around your business and what comes next.</p>
            <div className="company-footer-socials" aria-label="Connect with kodcreate">
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="Muhammad Roahan on LinkedIn (opens in a new tab)"><span className="footer-linkedin-icon" aria-hidden="true">in</span></a>
              <a href="https://github.com/kodcreatecompany-business" target="_blank" rel="noopener noreferrer" aria-label="kodcreate on GitHub (opens in a new tab)"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.558 21.922c.563.104.768-.244.768-.542 0-.267-.01-.975-.015-1.914-3.13.68-3.79-1.51-3.79-1.51-.512-1.3-1.25-1.646-1.25-1.646-1.022-.7.078-.686.078-.686 1.13.08 1.726 1.16 1.726 1.16 1.004 1.72 2.634 1.224 3.276.936.102-.728.393-1.224.715-1.506-2.5-.284-5.129-1.25-5.129-5.563 0-1.229.439-2.234 1.16-3.021-.116-.285-.503-1.43.11-2.98 0 0 .945-.303 3.094 1.155a10.8 10.8 0 0 1 5.63 0c2.148-1.458 3.091-1.155 3.091-1.155.615 1.55.228 2.695.112 2.98.723.787 1.158 1.792 1.158 3.021 0 4.324-2.633 5.276-5.141 5.555.404.349.764 1.039.764 2.094 0 1.512-.014 2.732-.014 3.104 0 .3.203.65.774.54A11.252 11.252 0 0 0 12 .75Z" /></svg></a>
              <a href={contactHref} aria-label={site.contactEmail ? "Email kodcreate" : "Contact kodcreate"}><Mail size={20} aria-hidden="true" /></a>
            </div>
          </div>
          <nav className="company-footer-column" aria-label="Company">
            <h2>Company</h2>
            <a href="#home">Home</a>
            <a href="#service">Services</a>
            <a href="#process">Our process</a>
            <a href="#contact">Contact</a>
          </nav>
          <nav className="company-footer-column" aria-label="Resources">
            <h2>Resources</h2>
            <a href="#faqs">FAQs</a>
            <a href="#service">What we offer</a>
            <a href="#contact">Start a project</a>
          </nav>
          <div className="company-footer-column company-footer-connect">
            <h2>Connect</h2>
            <a href={contactHref} className="company-footer-contact"><Mail size={20} aria-hidden="true" /><span><span className="company-footer-contact-label">{site.contactEmail ? "Email" : "Let’s talk"}</span><span>{site.contactEmail || "Tell us about your project"}</span></span></a>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="company-footer-founder">Connect on LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Independent by choice. Intentional by design.</p>
          <a href="#home">Back to top <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}
