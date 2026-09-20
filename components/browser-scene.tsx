"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const ratio = Math.max(width / image.width, height / image.height)
  const sw = width / ratio
  const sh = height / ratio
  ctx.drawImage(image, (image.width - sw) / 2, (image.height - sh) / 2, sw, sh, x, y, width, height)
}

function createTexture(image: HTMLImageElement, mobile = false) {
  const canvas = document.createElement("canvas")
  canvas.width = mobile ? 480 : 1440
  canvas.height = mobile ? 960 : 1000
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = "#f7f3ec"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (mobile) {
    ctx.fillStyle = "#f5f4f0"; ctx.fillRect(0, 0, 480, 960)
    ctx.fillStyle = "#131b18"; ctx.font = "bold 46px Georgia"; ctx.fillText("forma", 36, 84)
    ctx.font = "25px Arial"; ctx.fillText("☰", 410, 80)
    ctx.font = "16px Arial"; ctx.fillText("SPACES WITH SOUL", 36, 160)
    ctx.font = "52px Georgia"; ctx.fillText("Considered spaces.", 36, 230)
    ctx.font = "italic 52px Georgia"; ctx.fillText("Inspired living.", 36, 292)
    drawCover(ctx, image, 24, 342, 432, 540)
  } else {
    ctx.fillStyle = "#f7f3f1"; ctx.fillRect(0, 0, 1440, 64)
    ctx.fillStyle = "#d8cac1"
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(30 + i * 27, 32, 7, 0, Math.PI * 2); ctx.fill() }
    ctx.fillStyle = "#f7f3ec"; ctx.beginPath(); ctx.roundRect(440, 15, 560, 33, 8); ctx.fill()
    ctx.fillStyle = "#8f7e73"; ctx.textAlign = "center"; ctx.font = "16px Arial"; ctx.fillText("forma — architecture & interiors", 720, 38); ctx.textAlign = "left"
    ctx.fillStyle = "#faf9f6"; ctx.fillRect(0, 64, 1440, 936)
    ctx.fillStyle = "#27382d"; ctx.font = "bold 58px Georgia"; ctx.fillText("forma", 60, 152)
    ctx.font = "20px Arial"; ctx.fillText("Our approach", 830, 145); ctx.fillText("Spaces", 1010, 145)
    ctx.strokeStyle = "#b8c0b6"; ctx.strokeRect(1168, 108, 210, 58); ctx.fillText("Get in touch  ↗", 1192, 145)
    ctx.fillStyle = "#657260"; ctx.font = "16px Arial"; ctx.fillText("S P A C E S   W I T H   S O U L", 60, 294)
    ctx.fillStyle = "#283b2a"; ctx.font = "88px Georgia"; ctx.fillText("Considered", 58, 404); ctx.fillText("spaces.", 58, 505)
    ctx.font = "italic 83px Georgia"; ctx.fillText("Inspired living.", 58, 609)
    ctx.fillStyle = "#757b6e"; ctx.font = "23px Arial"; ctx.fillText("Thoughtful architecture for", 60, 690); ctx.fillText("the way you live.", 60, 723)
    ctx.fillStyle = "#283b2a"; ctx.fillRect(60, 778, 288, 68); ctx.fillStyle = "#f7f3ec"; ctx.font = "20px Arial"; ctx.fillText("Explore our spaces   ↗", 89, 820)
    drawCover(ctx, image, 690, 212, 692, 675)
    ctx.strokeStyle = "#e0e3dc"; ctx.beginPath(); ctx.moveTo(60, 936); ctx.lineTo(1380, 936); ctx.stroke()
    ctx.fillStyle = "#757b6e"; ctx.font = "18px Arial"; ctx.fillText("Architecture with intention.", 60, 974); ctx.fillText("Made for life.  ↗", 1220, 974)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

function FloatingBrowsers({ onReady, onFailure, mouse }: { onReady: () => void; onFailure: () => void; mouse?: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null)
  const [textures, setTextures] = useState<[THREE.CanvasTexture, THREE.CanvasTexture] | null>(null)
  const callbacks = useRef({ onReady, onFailure })
  callbacks.current = { onReady, onFailure }
  useEffect(() => {
    let disposed = false
    let created: THREE.CanvasTexture[] = []
    const image = new window.Image()
    image.onload = () => {
      if (disposed) return
      const desktop = createTexture(image)
      const mobile = createTexture(image, true)
      created = [desktop, mobile]
      setTextures([desktop, mobile])
      callbacks.current.onReady()
    }
    image.onerror = () => callbacks.current.onFailure()
    image.src = "/images/architecture.png"
    return () => { disposed = true; image.onload = null; image.onerror = null; created.forEach((texture) => texture.dispose()) }
  }, [])

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return
    const factor = Math.min(delta * 4, 1)
    const px = mouse ? mouse.x : pointer.x
    const py = mouse ? mouse.y : pointer.y
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.11 - py * 0.14, factor)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.30 + px * 0.22, factor)
    group.current.rotation.z = 0.075 + px * 0.03
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, px * 0.28, factor)
    group.current.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.045 - py * 0.18
  })

  if (!textures) return null
  return <group ref={group} rotation={[0.11, -0.3, 0.075]}>
    <RoundedBox args={[5.7, 4.01, 0.16]} radius={0.1} smoothness={4}><meshStandardMaterial color="#edcdb8" roughness={0.3} metalness={0.15} /></RoundedBox>
    <mesh position={[0, 0, 0.091]}><planeGeometry args={[5.6, 3.89]} /><meshBasicMaterial map={textures[0]} toneMapped={false} /></mesh>
    <group position={[2.05, -1.35, 0.78]} rotation={[0, -0.035, -0.11]}>
      <RoundedBox args={[1.14, 2.27, 0.14]} radius={0.13} smoothness={4}><meshStandardMaterial color="#f7f3ec" roughness={0.35} /></RoundedBox>
      <mesh position={[0, 0, 0.081]}><planeGeometry args={[1.02, 2.04]} /><meshBasicMaterial map={textures[1]} toneMapped={false} /></mesh>
      <mesh position={[0, 1.062, 0.085]}><capsuleGeometry args={[0.015, 0.17, 3, 8]} /><meshBasicMaterial color="#bdb0a8" /></mesh>
    </group>
  </group>
}

export default function BrowserScene({ active, onReady, onFailure, mouse }: { active: boolean; onReady: () => void; onFailure: () => void; mouse?: { x: number; y: number } }) {
  return <Canvas dpr={[1, 1.5]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 8.8], fov: 40 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} onCreated={({ gl }) => { gl.domElement.addEventListener("webglcontextlost", onFailure, { once: true }) }}>
    <ambientLight intensity={2} /><directionalLight position={[2, 6, 4]} intensity={3} />
    <FloatingBrowsers onReady={onReady} onFailure={onFailure} mouse={mouse} />
  </Canvas>
}
