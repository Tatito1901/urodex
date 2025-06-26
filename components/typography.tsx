import { cn } from "@/lib/utils"
import type React from "react"

interface TypographyProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function TypographyH1({ children, className, as: Component = "h1" }: TypographyProps) {
  return (
    <Component
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide font-biosans",
        "leading-tight text-green-700 gradient-text",
        className,
      )}
    >
      {children}
    </Component>
  )
}

export function TypographyH2({ children, className, as: Component = "h2" }: TypographyProps) {
  return (
    <Component
      className={cn(
        "text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide font-biosans",
        "leading-tight text-green-700",
        className,
      )}
    >
      {children}
    </Component>
  )
}

export function TypographyH3({ children, className, as: Component = "h3" }: TypographyProps) {
  return (
    <Component
      className={cn(
        "text-xl md:text-2xl font-semibold tracking-wide font-biosans",
        "leading-snug text-green-700",
        className,
      )}
    >
      {children}
    </Component>
  )
}

export function TypographyH4({ children, className, as: Component = "h4" }: TypographyProps) {
  return (
    <Component
      className={cn(
        "text-lg md:text-xl font-medium tracking-wide font-biosans",
        "leading-snug text-green-700",
        className,
      )}
    >
      {children}
    </Component>
  )
}

export function TypographyP({ children, className, as: Component = "p" }: TypographyProps) {
  return (
    <Component className={cn("text-base md:text-lg leading-relaxed text-gray-600", className)}>{children}</Component>
  )
}

export function TypographyLead({ children, className, as: Component = "p" }: TypographyProps) {
  return <Component className={cn("text-lg md:text-xl leading-relaxed text-gray-600", className)}>{children}</Component>
}

export function TypographySmall({ children, className, as: Component = "p" }: TypographyProps) {
  return <Component className={cn("text-sm leading-relaxed text-gray-500", className)}>{children}</Component>
}

export function TypographyMuted({ children, className, as: Component = "p" }: TypographyProps) {
  return <Component className={cn("text-sm text-gray-500", className)}>{children}</Component>
}

export function TypographyLarge({ children, className, as: Component = "p" }: TypographyProps) {
  return (
    <Component
      className={cn("text-lg md:text-xl lg:text-2xl font-medium text-green-700 font-biosans tracking-wide", className)}
    >
      {children}
    </Component>
  )
}
