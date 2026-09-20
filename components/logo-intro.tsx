"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

/** Logo reveal inspired by Glyph Portal © 2026 Christian Katzmann, MIT.
 * Adapted to the supplied Kodcreate wordmark with a skippable entrance.
 */
export function LogoIntro() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.location.hash) { setVisible(false); return }
    const timer = window.setTimeout(() => setVisible(false), 2400)
    return () => window.clearTimeout(timer)
  }, [])
  if (!visible) return null
  return <div className="logo-intro"><div className="logo-intro-art" aria-hidden="true"><Image src="/images/kodcreate-orange.png" alt="" width={2172} height={724} priority /><span>IDEAS INTO EXPERIENCES</span></div><button className="intro-skip" onClick={() => setVisible(false)}>Skip intro ↗</button></div>
}
