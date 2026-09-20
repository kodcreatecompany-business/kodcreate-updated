"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Wordmark() {
  return <span className="wordmark"><Image src="/images/kodcreate-orange.png" alt="Kodcreate" width={2172} height={724} className="brand-wordmark" priority /></span>
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    function dismiss(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", dismiss)
    return () => window.removeEventListener("keydown", dismiss)
  }, [open])

  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <a href="#home" aria-label={`${site.name} home`} onClick={() => setOpen(false)}><Wordmark /></a>
        <nav aria-label="Main navigation" className="desktop-navigation">
          {site.navigation.map((item, index) => <a href={item.href} key={item.label} className={cn("nav-link", index === 0 && "nav-home")}>{item.label}</a>)}
        </nav>
        <a href="#contact" className={cn(buttonVariants({ size: "project" }), "header-cta group")}>Start Your Project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
        <Button variant="ghost" size="icon-lg" className="mobile-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-navigation page-container" aria-label="Mobile navigation">
        {site.navigation.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
        <a href="#contact" onClick={() => setOpen(false)}>Start Your Project<ArrowUpRight size={16} aria-hidden="true" /></a>
      </nav>}
    </header>
  )
}
