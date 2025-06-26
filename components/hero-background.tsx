"use client"

import { useEffect, useRef } from "react"

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas para que ocupe toda la pantalla
    const setCanvasDimensions = () => {
      const { innerWidth, innerHeight } = window
      canvas.width = innerWidth
      canvas.height = innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Colores profesionales en la paleta de verdes
    const colors = {
      primary: "rgba(14, 80, 65, 0.04)", // Verde oscuro (muy sutil)
      secondary: "rgba(26, 125, 103, 0.05)", // Verde medio
      accent: "rgba(42, 155, 119, 0.06)", // Verde principal
      light: "rgba(230, 245, 240, 0.08)", // Verde muy claro
      highlight: "rgba(42, 155, 119, 0.1)", // Para destacar elementos
    }

    // Clase para líneas de cuadrícula
    class GridLine {
      x: number
      y: number
      width: number
      height: number
      speed: number
      opacity: number
      color: string
      isHorizontal: boolean

      constructor(isHorizontal: boolean) {
        this.isHorizontal = isHorizontal
        this.opacity = Math.random() * 0.07 + 0.02
        this.color = [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)]

        if (isHorizontal) {
          this.x = 0
          this.y = Math.random() * canvas.height
          this.width = canvas.width
          this.height = Math.random() * 1 + 0.5
          this.speed = 0 // Las líneas horizontales no se mueven
        } else {
          this.x = Math.random() * canvas.width
          this.y = 0
          this.width = Math.random() * 1 + 0.5
          this.height = canvas.height
          this.speed = (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1)
        }
      }

      update() {
        if (!this.isHorizontal) {
          this.x += this.speed

          // Si la línea sale de la pantalla, reiniciarla
          if ((this.speed > 0 && this.x > canvas.width) || (this.speed < 0 && this.x + this.width < 0)) {
            this.x = this.speed > 0 ? 0 : canvas.width
            this.opacity = Math.random() * 0.07 + 0.02
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`)
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
    }

    // Clase para figuras médicas modernas
    class MedicalShape {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      shape: string
      color: string
      opacity: number
      pulsePhase: number
      pulseSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 40 + 20
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() * 0.001 - 0.0005) * Math.PI

        // Figuras: hexágono, cruz, rombos, círculos
        const shapes = ["hexagon", "cross", "diamond", "circle", "plus"]
        this.shape = shapes[Math.floor(Math.random() * shapes.length)]

        this.color = Math.random() > 0.7 ? colors.highlight : colors.light
        this.opacity = Math.random() * 0.1 + 0.05

        // Para el efecto de pulsación
        this.pulsePhase = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.01
      }

      update() {
        this.rotation += this.rotationSpeed
        this.pulsePhase += this.pulseSpeed
        // La opacidad pulsa suavemente
        this.opacity = (Math.sin(this.pulsePhase) * 0.05 + 0.1) * (this.color === colors.highlight ? 1 : 0.6)
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`)
        ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity * 1.5})`)
        ctx.lineWidth = 0.5

        switch (this.shape) {
          case "hexagon":
            this.drawHexagon()
            break
          case "cross":
            this.drawCross()
            break
          case "diamond":
            this.drawDiamond()
            break
          case "circle":
            this.drawCircle()
            break
          case "plus":
            this.drawPlus()
            break
        }

        ctx.restore()
      }

      drawHexagon() {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i
          const x = this.size * Math.cos(angle)
          const y = this.size * Math.sin(angle)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      drawCross() {
        const size = this.size * 0.8
        ctx.beginPath()
        ctx.moveTo(-size, -size / 5)
        ctx.lineTo(-size / 5, -size / 5)
        ctx.lineTo(-size / 5, -size)
        ctx.lineTo(size / 5, -size)
        ctx.lineTo(size / 5, -size / 5)
        ctx.lineTo(size, -size / 5)
        ctx.lineTo(size, size / 5)
        ctx.lineTo(size / 5, size / 5)
        ctx.lineTo(size / 5, size)
        ctx.lineTo(-size / 5, size)
        ctx.lineTo(-size / 5, size / 5)
        ctx.lineTo(-size, size / 5)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      drawDiamond() {
        ctx.beginPath()
        ctx.moveTo(0, -this.size)
        ctx.lineTo(this.size, 0)
        ctx.lineTo(0, this.size)
        ctx.lineTo(-this.size, 0)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      drawCircle() {
        ctx.beginPath()
        ctx.arc(0, 0, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }

      drawPlus() {
        const size = this.size * 0.8
        const width = this.size * 0.25

        ctx.beginPath()
        // Horizontal rectangle
        ctx.rect(-size, -width, size * 2, width * 2)
        // Vertical rectangle
        ctx.rect(-width, -size, width * 2, size * 2)
        ctx.fill()
        ctx.stroke()
      }
    }

    // Sistema de partículas para efecto de movimiento
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.color = colors.primary
        this.opacity = Math.random() * 0.3 + 0.05
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Mantener dentro del canvas
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Crear arrays de elementos
    const gridLines: GridLine[] = []
    const horizontalLines = 8
    const verticalLines = 12

    // Líneas horizontales igualmente espaciadas
    for (let i = 0; i < horizontalLines; i++) {
      const line = new GridLine(true)
      line.y = (canvas.height / (horizontalLines - 1)) * i
      gridLines.push(line)
    }

    // Líneas verticales
    for (let i = 0; i < verticalLines; i++) {
      gridLines.push(new GridLine(false))
    }

    // Crear formas médicas
    const medicalShapes: MedicalShape[] = []
    const shapeCount = Math.min(window.innerWidth / 200, 8) // Número responsivo de formas

    for (let i = 0; i < shapeCount; i++) {
      medicalShapes.push(new MedicalShape())
    }

    // Crear partículas para el efecto de movimiento
    const particles: Particle[] = []
    const particleCount = Math.min(window.innerWidth / 50, 30) // Número responsivo de partículas

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Función para conectar partículas cercanas con líneas sutiles
    const connectParticles = () => {
      const maxDistance = 150
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.05
            ctx.strokeStyle = `rgba(42, 155, 119, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar y actualizar líneas de cuadrícula
      for (let i = 0; i < gridLines.length; i++) {
        gridLines[i].update()
        gridLines[i].draw()
      }

      // Dibujar y actualizar formas médicas
      for (let i = 0; i < medicalShapes.length; i++) {
        medicalShapes[i].update()
        medicalShapes[i].draw()
      }

      // Dibujar y actualizar partículas
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      // Conectar partículas
      connectParticles()

      requestAnimationFrame(animate)
    }

    animate()

    // Limpieza
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
  )
}
