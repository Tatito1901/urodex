import { cn } from "@/lib/utils"
import type React from "react"

type TypographyVariant = 
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'lead'
  | 'small'
  | 'muted'
  | 'large'

interface TypographyProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  variant?: TypographyVariant
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-biosans leading-tight text-green-800",
  h2: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight font-biosans leading-tight text-green-800 relative",
  h3: "text-xl md:text-2xl font-semibold tracking-wide font-biosans leading-snug text-green-700",
  h4: "text-lg md:text-xl font-medium tracking-wide font-biosans leading-snug text-green-700",
  p: "text-base md:text-lg leading-relaxed text-gray-700 max-w-prose",
  lead: "text-lg md:text-xl leading-relaxed text-gray-700 font-medium",
  small: "text-sm leading-relaxed text-gray-500",
  muted: "text-sm text-gray-500",
  large: "text-lg md:text-xl lg:text-2xl font-medium text-green-700 font-biosans tracking-wide"
};

const defaultComponents: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  small: "p",
  muted: "p",
  large: "p"
};

export function Typography({
  children,
  className,
  as,
  variant = 'p'
}: TypographyProps) {
  const Component = as || defaultComponents[variant];
  const baseClasses = variantStyles[variant];
  
  return (
    <Component className={cn(baseClasses, className)}>
      {children}
    </Component>
  );
}

// Aliases para mantener compatibilidad con el código existente
export const TypographyH1 = (props: TypographyProps) => <Typography {...props} variant="h1" />;
export const TypographyH2 = (props: TypographyProps) => <Typography {...props} variant="h2" />;
export const TypographyH3 = (props: TypographyProps) => <Typography {...props} variant="h3" />;
export const TypographyH4 = (props: TypographyProps) => <Typography {...props} variant="h4" />;
export const TypographyP = (props: TypographyProps) => <Typography {...props} variant="p" />;
export const TypographyLead = (props: TypographyProps) => <Typography {...props} variant="lead" />;
export const TypographySmall = (props: TypographyProps) => <Typography {...props} variant="small" />;
export const TypographyMuted = (props: TypographyProps) => <Typography {...props} variant="muted" />;
export const TypographyLarge = (props: TypographyProps) => <Typography {...props} variant="large" />;