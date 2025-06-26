import { cn } from "@/lib/utils"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  id?: string
  as?: React.ElementType
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  background?:
    | "white"
    | "gradient"
    | "gradient-subtle"
    | "gradient-radial"
    | "gradient-mesh"
    | "gradient-aurora"
    | "pattern-dots"
    | "pattern-grid"
    | "pattern-waves"
    | "primary"
    | "primary-light"
    | "secondary"
    | "dark"
    | "glass"
    | "none"
  hasDivider?: boolean
  dividerType?: "wave" | "angle" | "curve" | "triangle" | "blob" | "zigzag" | "none"
  dividerPosition?: "top" | "bottom" | "both"
  dividerColor?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
  align?: "start" | "center" | "end"
  animate?: boolean
  animationType?: "fade-up" | "fade-in" | "slide-up" | "scale-in" | "blur-in"
  animationDelay?: number
  parallax?: boolean
  parallaxSpeed?: number
  overlay?: boolean
  overlayOpacity?: number
  overlayGradient?: boolean
  blur?: boolean
  noise?: boolean
}

// SVG Paths para los divisores
const dividerPaths = {
  wave: "M0,32 C150,0 350,64 500,32 C650,0 850,64 1000,32 L1000,64 L0,64 Z",
  angle: "M0,0 L1000,64 L1000,0 Z",
  curve: "M0,0 Q500,64 1000,0 L1000,64 L0,64 Z",
  triangle: "M0,64 L500,0 L1000,64 Z",
  blob: "M0,32 C200,0 300,64 500,32 C700,0 800,64 1000,32 L1000,64 L0,64 Z",
  zigzag: "M0,32 L100,0 L200,32 L300,0 L400,32 L500,0 L600,32 L700,0 L800,32 L900,0 L1000,32 L1000,64 L0,64 Z",
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  as: Component = "section",
  spacing = "md",
  background = "white",
  hasDivider = false,
  dividerType = "wave",
  dividerPosition = "both",
  dividerColor,
  maxWidth = "xl",
  align = "center",
  animate = false,
  animationType = "fade-up",
  animationDelay = 0,
  parallax = false,
  parallaxSpeed = 0.5,
  overlay = false,
  overlayOpacity = 0.5,
  overlayGradient = false,
  blur = false,
  noise = false,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(!animate)
  const [parallaxOffset, setParallaxOffset] = useState(0)

  // Espaciado vertical mejorado con más opciones
  const spacingClasses = {
    none: "",
    xs: "py-8 md:py-12",
    sm: "py-12 md:py-16 lg:py-20",
    md: "py-16 md:py-20 lg:py-24",
    lg: "py-20 md:py-24 lg:py-32",
    xl: "py-24 md:py-32 lg:py-40",
    "2xl": "py-32 md:py-40 lg:py-48",
  }

  // Sistema de fondos mejorado
  const backgroundClasses = {
    white: "bg-white",
    gradient: "bg-gradient-to-br from-green-50 via-white to-green-50/30",
    "gradient-subtle": "gradient-elegant",
    "gradient-radial": "gradient-radial",
    "gradient-mesh": "gradient-mesh",
    "gradient-aurora": "gradient-aurora",
    "pattern-dots": "bg-white bg-dots-pattern",
    "pattern-grid": "bg-white bg-grid-pattern",
    "pattern-waves": "bg-white bg-waves-pattern",
    primary: "bg-green-700 text-white",
    "primary-light": "bg-green-50",
    secondary: "bg-secondary text-secondary-foreground",
    dark: "bg-gray-900 text-white",
    glass: "glass",
    none: "",
  }

  // Clases de ancho máximo
  const maxWidthClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    "2xl": "max-w-[1400px]",
    full: "max-w-full",
    none: "",
  }

  // Clases de alineación
  const alignClasses = {
    start: "mr-auto",
    center: "mx-auto",
    end: "ml-auto",
  }

  // Clases de animación
  const animationClasses = {
    "fade-up": "animate-in fade-in slide-in-from-bottom-4",
    "fade-in": "animate-in fade-in",
    "slide-up": "animate-in slide-in-from-bottom-8",
    "scale-in": "animate-in fade-in zoom-in-95",
    "blur-in": "animate-in fade-in blur-in",
  }

  // Intersection Observer para animaciones
  useEffect(() => {
    if (!animate) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), animationDelay)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [animate, animationDelay])

  // Efecto Parallax
  useEffect(() => {
    if (!parallax) return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const speed = parallaxSpeed
      const yPos = rect.top * speed

      setParallaxOffset(yPos)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [parallax, parallaxSpeed])

  // Renderizar divisor SVG
  const renderDivider = (position: "top" | "bottom") => {
    if (!hasDivider || dividerType === "none") return null
    if (dividerPosition !== position && dividerPosition !== "both") return null

    const isBottom = position === "bottom"
    const path = dividerPaths[dividerType] || dividerPaths.wave

    return (
      <div
        className={cn(
          "absolute left-0 right-0 pointer-events-none select-none",
          isBottom ? "bottom-0" : "top-0",
          isBottom && "transform rotate-180"
        )}
        style={{ height: "64px", width: "100%" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 64"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d={path}
            fill={dividerColor || "currentColor"}
            className={cn(
              !dividerColor && [
                background === "white" && "fill-white",
                background === "primary" && "fill-green-700",
                background === "primary-light" && "fill-green-50",
                background === "dark" && "fill-gray-900",
                background === "secondary" && "fill-secondary",
                background.includes("gradient") && "fill-white",
                background.includes("pattern") && "fill-white",
              ]
            )}
          />
        </svg>
      </div>
    )
  }

  return (
    <Component
      ref={sectionRef}
      id={id}
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        "relative overflow-hidden transition-colors duration-300",
        blur && "backdrop-blur-sm",
        className
      )}
      style={{
        transform: parallax ? `translateY(${parallaxOffset}px)` : undefined,
      }}
    >
      {/* Patrón de ruido opcional */}
      {noise && (
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Overlay opcional */}
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none",
            overlayGradient
              ? "bg-gradient-to-b from-black/10 via-transparent to-black/10"
              : "bg-black"
          )}
          style={{ opacity: overlayGradient ? 1 : overlayOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Divisor superior */}
      {renderDivider("top")}

      {/* Contenido principal */}
      <div
        className={cn(
          "relative z-10",
          maxWidth !== "none" && "px-4 sm:px-6 lg:px-8",
          maxWidthClasses[maxWidth],
          alignClasses[align],
          animate && !isVisible && "opacity-0",
          animate && isVisible && animationClasses[animationType],
          containerClassName
        )}
      >
        {children}
      </div>

      {/* Divisor inferior */}
      {renderDivider("bottom")}

      {/* Efectos decorativos opcionales */}
      {background.includes("gradient") && (
        <>
          {/* Orbes de luz */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 bg-green-200/20 rounded-full blur-3xl pointer-events-none animate-float"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-300/10 rounded-full blur-3xl pointer-events-none animate-float animation-delay-500"
            aria-hidden="true"
          />
        </>
      )}
    </Component>
  )
}

// Componente complementario para contenido de sección
export function SectionContent({
  children,
  className,
  centered = false,
  narrow = false,
}: {
  children: React.ReactNode
  className?: string
  centered?: boolean
  narrow?: boolean
}) {
  return (
    <div
      className={cn(
        "relative",
        centered && "text-center",
        narrow && "max-w-3xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

// Componente para encabezados de sección
export function SectionHeader({
  title,
  subtitle,
  description,
  badge,
  centered = true,
  className,
}: {
  title: string
  subtitle?: string
  description?: string
  badge?: string
  centered?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center max-w-3xl mx-auto",
        className
      )}
    >
      {badge && (
        <span className="badge badge-primary mb-4 inline-block">
          {badge}
        </span>
      )}
      {subtitle && (
        <p className="text-sm font-medium text-green-600 mb-2 uppercase tracking-wider">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

// Hook personalizado para usar con las secciones
export function useSectionInView(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1, ...options }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return { ref, isInView }
}