import { ImageResponse } from "next/og"

export const alt = "kodcreate — Your business deserves an exceptional website."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(<div style={{ background: "#fef4ed", width: "100%", height: "100%", padding: "65px 78px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif", color: "#0a0a0a" }}><div style={{ fontSize: 35, fontWeight: 700, display: "flex", gap: 13 }}><span style={{ color: "#ae7652" }}>{"</>"}</span>kodcreate.</div><div style={{ display: "flex", flexDirection: "column", fontSize: 77, lineHeight: 1.1, letterSpacing: -4, fontWeight: 600 }}><span>Your business deserves</span><span style={{ display: "flex", gap: 16 }}>an <span style={{ background: "#fad1b7", padding: "0 8px" }}>exceptional</span> website.</span></div><div style={{ display: "flex", fontSize: 20, color: "#756256" }}>Founder-led website development. Thoughtfully designed. Purposefully built.</div></div>, size)
}
