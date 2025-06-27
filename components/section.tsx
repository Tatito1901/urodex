import { cn } from "@/lib/utils"
import type React from "react"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  as?: React.ElementType
  spacing?: "none" | "sm" | "md" | "lg" | "xl" | "2xl"
  background?:
    | "white"
    | "gradient"
    | "gradient-subtle"
    | "gradient-strong"
    | "pattern"
    | "primary"
    | "primary-light"
    | "primary-dark"
    | "secondary"
    | "secondary-light"
    | "dark"
    | "none"
  hasDivider?: boolean
  dividerType?: "wave" | "angle" | "curve" | "triangle" | "none"
  textColor?: "auto" | "light" | "dark" | "primary"
  contentWidth?: "default" | "narrow" | "wide" | "full"
  fullHeight?: boolean
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
  textColor = "auto",
  contentWidth = "default",
  fullHeight = false,
}: SectionProps) {
  const spacingClasses = {
    none: "",
    sm: "py-6 sm:py-8 md:py-10 lg:py-12",
    md: "py-10 sm:py-12 md:py-16 lg:py-20",
    lg: "py-14 sm:py-16 md:py-24 lg:py-32",
    xl: "py-16 sm:py-20 md:py-32 lg:py-40",
    "2xl": "py-20 sm:py-28 md:py-36 lg:py-48",
  }

  const backgroundClasses = {
    white: "bg-white",
    gradient: "bg-gradient-to-br from-green-50 to-white",
    "gradient-subtle": "bg-gradient-to-br from-green-50/50 to-white",
    "gradient-strong": "bg-gradient-to-br from-green-100 to-white",
    pattern: "bg-green-50 bg-opacity-50 bg-[url('/images/pattern.svg')]",
    primary: "bg-green-700",
    "primary-light": "bg-green-50",
    "primary-dark": "bg-primary-dark",
    secondary: "bg-secondary",
    "secondary-light": "bg-secondary-light",
    dark: "bg-gray-900",
    none: "",
  }
  
  const textColorClasses = {
    auto: "",
    light: "text-white",
    dark: "text-gray-800",
    primary: "text-green-700"
  }
  
  const contentWidthClasses = {
    default: "",
    narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    wide: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    full: "w-full",
  }

  // Determine text color based on background if set to auto
  const autoTextColor = 
    background === "primary" || background === "primary-dark" || background === "dark" || background === "secondary"
      ? textColorClasses.light
      : textColorClasses.dark
  
  const heightClass = fullHeight ? "min-h-screen flex flex-col justify-center" : ""

  return (
    <Component
      id={id}
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        textColor === "auto" ? autoTextColor : textColorClasses[textColor],
        "relative overflow-hidden",
        heightClass,
        hasDivider && "section-with-divider",
        className,
      )}
      data-divider-type={dividerType}
    >
      {hasDivider && dividerType !== "none" && (
        <div
          className={`section-divider section-divider-${dividerType} absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10`}
        />
      )}
      <div className={contentWidth !== "default" ? contentWidthClasses[contentWidth] : ""}>
        {children}
      </div>
      {hasDivider && dividerType !== "none" && (
        <div
          className={`section-divider section-divider-${dividerType} section-divider-bottom absolute bottom-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10`}
        />
      )}
    </Component>
  )
}