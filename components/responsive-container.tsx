import { cn } from "@/lib/utils"
import type React from "react"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  id?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none" | string
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "custom"
  paddingX?: string
  paddingY?: string
  centerContent?: boolean
  breakpointPadding?: {
    base?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  id,
  maxWidth = "xl",
  padding = "md",
  paddingX,
  paddingY,
  centerContent = true,
  breakpointPadding,
}: ResponsiveContainerProps) {
  // Mapeo de clases para maxWidth
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
    none: "",
  }

  // Mapeo de clases para padding predefinido
  const paddingClasses = {
    none: "",
    xs: "px-2 py-1 sm:px-3 sm:py-2",
    sm: "px-3 py-2 sm:px-4 sm:py-3",
    md: "px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5",
    lg: "px-5 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6",
    xl: "px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-8",
    custom: "",
  }

  // Determinar la clase de maxWidth
  const maxWidthClass = typeof maxWidth === 'string' && maxWidth in maxWidthClasses 
    ? maxWidthClasses[maxWidth as keyof typeof maxWidthClasses] 
    : maxWidth

  // Determinar clases de padding
  let paddingClass = paddingClasses[padding]
  
  // Usar clases personalizadas si se proporcionan
  if (breakpointPadding) {
    paddingClass = cn(
      breakpointPadding.base,
      breakpointPadding.sm && `sm:${breakpointPadding.sm}`,
      breakpointPadding.md && `md:${breakpointPadding.md}`,
      breakpointPadding.lg && `lg:${breakpointPadding.lg}`,
      breakpointPadding.xl && `xl:${breakpointPadding.xl}`
    )
  }
  
  // Añadir padding personalizado en ejes si se especifica
  if (paddingX) paddingClass += ` ${paddingX}`
  if (paddingY) paddingClass += ` ${paddingY}`

  return (
    <Component 
      id={id} 
      className={cn(
        "w-full",
        paddingClass,
        maxWidthClass,
        centerContent && "mx-auto",
        className
      )}
    >
      {children}
    </Component>
  )
}