"use client"

import { motion, useReducedMotion } from "motion/react"

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div initial={false} whileInView={reduced ? undefined : { y: [14, 0] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
