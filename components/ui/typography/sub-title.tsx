import React from "react";
import { cn } from "@/lib/utils";

interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
  color?: "default" | "white" | "primary" | "muted";
  level?: 3 | 4; // h3 o h4
  size?: "default" | "small" | "large";
}

export const SubTitle: React.FC<SubTitleProps> = ({
  children,
  className,
  color = "default",
  level = 3,
  size = "default",
}) => {
  // Colores base
  const colorClasses = {
    default: "text-slate-900",
    white: "text-white",
    primary: "text-teal-700",
    muted: "text-slate-600",
  };

  // Tamaños basados en nivel y tamaño
  const sizeClasses = {
    // h3
    3: {
      small: "text-base sm:text-lg md:text-xl font-bold",
      default: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold",
      large: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold",
    },
    // h4
    4: {
      small: "text-sm sm:text-base md:text-lg font-semibold",
      default: "text-base sm:text-lg md:text-xl font-semibold",
      large: "text-lg sm:text-xl md:text-2xl font-semibold",
    },
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={cn(sizeClasses[level][size], colorClasses[color], "mb-3", className)}>
      {children}
    </Tag>
  );
};
