import { cn } from "@/lib/utils"
import type React from "react"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  id?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  id,
  maxWidth = "xl",
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
    none: "",
  }

  return (
    <Component id={id} className={cn("w-full px-4 sm:px-6 lg:px-8 mx-auto", maxWidthClasses[maxWidth], className)}>
      {children}
    </Component>
  )
}
