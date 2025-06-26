"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

export function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { innerWidth, innerHeight } = window
      canvas.width = innerWidth
      canvas.height = innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(window.innerWidth / 10, 100) // Responsive number of particles

    // Medical symbols and shapes
    const medicalShapes = [drawCircle, drawHexagon, drawCross, drawDiamond, drawTriangle, drawPlus]

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      shape: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => void

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 15 + 5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.1
        this.shape = medicalShapes[Math.floor(Math.random() * medicalShapes.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        this.shape(ctx, this.x, this.y, this.size, this.opacity)
      }
    }

    // Initialize particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Connect particles with lines
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    const connectParticles = () => {
      const maxDistance = 150
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(42, 155, 119, ${opacity * 0.15})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />
}

// Shape drawing functions
function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(42, 155, 119, ${opacity * 0.2})`
  ctx.fill()
  ctx.strokeStyle = `rgba(42, 155, 119, ${opacity * 0.5})`
  ctx.stroke()
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    const pointX = x + size * Math.cos(angle)
    const pointY = y + size * Math.sin(angle)
    if (i === 0) {
      ctx.moveTo(pointX, pointY)
    } else {
      ctx.lineTo(pointX, pointY)
    }
  }
  ctx.closePath()
  ctx.fillStyle = `rgba(42, 155, 119, ${opacity * 0.2})`
  ctx.fill()
  ctx.strokeStyle = `rgba(42, 155, 119, ${opacity * 0.5})`
  ctx.stroke()
}

function drawCross(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
  ctx.beginPath()
  ctx.moveTo(x - size / 2, y)
  ctx.lineTo(x + size / 2, y)
  ctx.moveTo(x, y - size / 2)
  ctx.lineTo(x, y + size / 2)
  ctx.strokeStyle = `rgba(42, 155, 119, ${opacity * 0.5})`
  ctx.lineWidth = 2
  ctx.stroke()
}

function drawDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
  ctx.beginPath()
  ctx.moveTo(x, y - size)
  ctx.lineTo(x + size, y)
  ctx.lineTo(x, y + size)
  ctx.lineTo(x - size, y)
  ctx.closePath()
  ctx.fillStyle = `rgba(42, 155, 119, ${opacity * 0.2})`
  ctx.fill()
  ctx.strokeStyle = `rgba(42, 155, 119, ${opacity * 0.5})`
  ctx.stroke()
}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
  ctx.beginPath()
  ctx.moveTo(x, y - size)
  ctx.lineTo(x + size, y + size)
  ctx.lineTo(x - size, y + size)
  ctx.closePath()
  ctx.fillStyle = `rgba(42, 155, 119, ${opacity * 0.2})`
  ctx.fill()
  ctx.strokeStyle = `rgba(42, 155, 119, ${opacity * 0.5})`
  ctx.stroke()
}

function drawPlus(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
  const width = size / 3

  ctx.beginPath()
  // Horizontal rectangle
  ctx.rect(x - size, y - width, size * 2, width * 2)
  // Vertical rectangle
  ctx.rect(x - width, y - size, width * 2, size * 2)

  ctx.fillStyle = `rgba(42, 155, 119, ${opacity * 0.2})`
  ctx.fill()
  ctx.strokeStyle = `rgba(42, 155, 119, ${opacity * 0.5})`
  ctx.stroke()
}
