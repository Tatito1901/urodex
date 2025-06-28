import React from "react";
import { cn } from "@/lib/utils";
import { COLORS, TYPOGRAPHY_SCALE } from "./design-system";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  color?: keyof typeof COLORS;
  size?: "caption" | "small" | "default" | "large";
  leading?: "tight" | "normal" | "relaxed";
  weight?: "normal" | "medium" | "semibold";
}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
  color = "default",
  size = "default",
  leading = "normal",
  weight = "normal",
}) => {
  // Tamaños más compactos y profesionales
  const sizeClasses = {
    caption: TYPOGRAPHY_SCALE.responsive.xs,
    small: TYPOGRAPHY_SCALE.responsive.sm,
    default: TYPOGRAPHY_SCALE.responsive.base,
    large: TYPOGRAPHY_SCALE.responsive.lg,
  };

  const leadingClasses = {
    tight: "leading-tight",
    normal: "leading-relaxed",
    relaxed: "leading-loose",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
  };

  return (
    <p 
      className={cn(
        sizeClasses[size],
        COLORS[color], 
        leadingClasses[leading],
        weightClasses[weight],
        "mb-3",
        className
      )}
    >
      {children}
    </p>
  );
};