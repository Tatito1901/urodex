import React from "react";
import { cn } from "@/lib/utils";
import { COLORS, TYPOGRAPHY_SCALE, DIVIDER_COLORS } from "./design-system";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  color?: keyof typeof COLORS;
  align?: "left" | "center" | "right";
  hasDivider?: boolean;
  dividerColor?: string;
  size?: "small" | "default" | "large";
  as?: "h1" | "h2";
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className,
  color = "dark",
  align = "left",
  hasDivider = false,
  dividerColor,
  size = "default",
  as = "h2",
}) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // Tamaños más elegantes y compactos
  const sizeClasses = {
    small: `${TYPOGRAPHY_SCALE.responsive.xl} font-bold tracking-tight`,
    default: `${TYPOGRAPHY_SCALE.responsive["2xl"]} font-bold tracking-tight`,
    large: `${TYPOGRAPHY_SCALE.responsive["3xl"]} font-bold tracking-tight`,
  };

  const Tag = as;

  return (
    <div className={cn(alignClasses[align], "mb-6", className)}>
      <Tag className={cn(sizeClasses[size], COLORS[color], "mb-2")}>
        {children}
      </Tag>
      {hasDivider && (
        <div 
          className={cn(
            "h-0.5 rounded-full transition-all duration-300",
            dividerColor || DIVIDER_COLORS[color] || DIVIDER_COLORS.default,
            align === "center" ? "mx-auto w-16" : 
            align === "right" ? "ml-auto w-16" : "w-16"
          )} 
        />
      )}
    </div>
  );
};