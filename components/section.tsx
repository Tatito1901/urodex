import { cn } from "@/lib/utils"
import type React from "react"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  as?: React.ElementType
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
  background?:
    | "white"
    | "gradient"
    | "gradient-subtle"
    | "gradient-strong"
    | "pattern"
    | "primary"
    | "primary-light"
    | "secondary"
    | "dark"
    | "none"
  hasDivider?: boolean
  dividerType?: "wave" | "angle" | "curve" | "triangle" | "none"
}

export function Section({
  children,
  className,
  id,
  as: Component = "section",
  spacing = "md",
  background = "white",
  hasDivider = false,
  dividerType = "none",
}: SectionProps) {
  const spacingClasses = {
    none: "",
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16 lg:py-20",
    lg: "py-16 md:py-24 lg:py-32",
    xl: "py-20 md:py-32 lg:py-40",
  }

  const backgroundClasses = {
    white: "bg-white",
    gradient: "gradient-bg",
    "gradient-subtle": "gradient-bg-subtle",
    "gradient-strong": "gradient-bg-strong",
    pattern: "bg-pattern",
    primary: "bg-green-700 text-white",
    "primary-light": "bg-green-50",
    secondary: "bg-secondary text-secondary-foreground",
    dark: "bg-gray-900 text-white",
    none: "",
  }

  return (
    <Component
      id={id}
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        "relative overflow-hidden",
        hasDivider && "section-with-divider",
        className,
      )}
      data-divider-type={dividerType}
    >
      {hasDivider && dividerType !== "none" && (
        <div
          className={`section-divider section-divider-${dividerType} absolute top-0 left-0 right-0 h-16 pointer-events-none z-10`}
        />
      )}
      {children}
      {hasDivider && dividerType !== "none" && (
        <div
          className={`section-divider section-divider-${dividerType} section-divider-bottom absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10`}
        />
      )}
    </Component>
  )
}
