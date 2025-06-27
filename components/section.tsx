
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

const SPACING_CLASSES = {
  none: "",
  sm: "py-6 sm:py-8 md:py-10 lg:py-12",
  md: "py-10 sm:py-12 md:py-16 lg:py-20",
  lg: "py-14 sm:py-16 md:py-24 lg:py-32",
  xl: "py-16 sm:py-20 md:py-32 lg:py-40",
  "2xl": "py-20 sm:py-28 md:py-36 lg:py-48",
} as const;

const BACKGROUND_CLASSES = {
  white: "bg-white",
  pearl: "bg-slate-50",
  teal: "bg-teal-50",
  gradient: "bg-gradient-to-br from-teal-50 to-white",
  "gradient-subtle": "bg-gradient-to-br from-teal-50/50 to-white",
  "gradient-strong": "bg-gradient-to-br from-teal-100 to-white",
  "gradient-teal-dark": "bg-gradient-to-b from-teal-600 to-teal-700",
  primary: "bg-teal-700",
  "primary-light": "bg-teal-50",
  "primary-dark": "bg-teal-900",
  secondary: "bg-secondary",
  "secondary-light": "bg-secondary-light",
  dark: "bg-gray-900",
  none: "",
} as const;

const TEXT_COLOR_CLASSES = {
  auto: "",
  light: "text-white",
  dark: "text-gray-800",
  primary: "text-green-700",
} as const;

const CONTENT_WIDTH_CLASSES = {
  default: "px-4 sm:px-6 lg:px-8",
  narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
  wide: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  full: "w-full px-4 sm:px-6 lg:px-8",
} as const;

const DIVIDER_CLASSES = {
  wave: "bg-[url('/images/divider-wave.svg')]",
  angle: "bg-[url('/images/divider-angle.svg')]",
  curve: "bg-[url('/images/divider-curve.svg')]",
  triangle: "bg-[url('/images/divider-triangle.svg')]",
  none: "",
} as const;

const DIVIDER_HEIGHTS = {
  sm: "h-12 sm:h-16",
  md: "h-16 sm:h-24",
  lg: "h-24 sm:h-32",
} as const;

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  spacing?: keyof typeof SPACING_CLASSES;
  background?: keyof typeof BACKGROUND_CLASSES | "gradient-teal-dark";
  hasDivider?: boolean;
  dividerType?: keyof typeof DIVIDER_CLASSES;
  textColor?: keyof typeof TEXT_COLOR_CLASSES;
  contentWidth?: keyof typeof CONTENT_WIDTH_CLASSES;
  fullHeight?: boolean;
  dividerPosition?: "top" | "bottom" | "both";
  dividerSize?: keyof typeof DIVIDER_HEIGHTS;
}

export const Section: React.FC<SectionProps> = React.memo(({
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
  dividerPosition = "both",
  dividerSize = "md",
}) => {
  // Color de texto automático
  const autoTextColor = useMemo(() => {
    return ["primary", "primary-dark", "dark", "secondary"].includes(background)
      ? TEXT_COLOR_CLASSES.light
      : TEXT_COLOR_CLASSES.dark;
  }, [background]);

  // Memoiza clases
  const spacingClass = useMemo(() => SPACING_CLASSES[spacing], [spacing]);
  const backgroundClass = useMemo(() => BACKGROUND_CLASSES[background], [background]);
  const textColorClass = useMemo(
    () => (textColor === "auto" ? autoTextColor : TEXT_COLOR_CLASSES[textColor]),
    [textColor, autoTextColor]
  );
  const heightClass = useMemo(
    () => (fullHeight ? "min-h-screen flex flex-col justify-center" : ""),
    [fullHeight]
  );
  const contentWidthClass = useMemo(
    () => CONTENT_WIDTH_CLASSES[contentWidth],
    [contentWidth]
  );
  const dividerClass = useMemo(
    () => DIVIDER_CLASSES[dividerType],
    [dividerType]
  );
  const dividerHeightClass = useMemo(
    () => DIVIDER_HEIGHTS[dividerSize],
    [dividerSize]
  );

  // Función para renderizar divisor
  const renderDivider = (position: "top" | "bottom") => {
    if (!hasDivider || dividerType === "none" || dividerType === "wave" || dividerType === "curve") return null;
    if (dividerPosition !== position && dividerPosition !== "both") return null;
    return (
      <div
        className={cn(
          "absolute left-0 right-0 w-full pointer-events-none z-10",
          dividerHeightClass,
          dividerClass,
          position === "bottom" && "rotate-180"
        )}
        style={{ backgroundSize: "100% auto" }}
      />
    );
  };

  return (
    <Component
      id={id}
      className={cn(
        "relative overflow-hidden",
        spacingClass,
        backgroundClass,
        textColorClass,
        heightClass,
        className
      )}
    >
      {renderDivider("top")}

      <div className={cn("relative z-0", contentWidthClass)}>
        {children}
      </div>

      {renderDivider("bottom")}
    </Component>
  );
});
Section.displayName = "Section";
