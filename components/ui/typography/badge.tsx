import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "white" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  icon,
  variant = "primary",
  size = "md",
}) => {
  const variantClasses = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 transition-colors",
    secondary: "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-colors",
    white: "bg-white text-teal-700 hover:bg-gray-50 transition-colors",
    outline: "border border-teal-200 text-teal-700 bg-white/50 backdrop-blur-sm hover:bg-teal-50/50 transition-colors",
  };

  // Tamaños más compactos
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs rounded-full",
    md: "px-3 py-1 text-sm rounded-full",
    lg: "px-4 py-1.5 text-base rounded-full",
  };

  const iconSizeClasses = {
    sm: "h-3 w-3 mr-1",
    md: "h-3.5 w-3.5 mr-1.5",
    lg: "h-4 w-4 mr-2",
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 font-medium shadow-sm",
        variantClasses[variant], 
        sizeClasses[size],
        className
      )}
    >
      {icon && <span className={iconSizeClasses[size]}>{icon}</span>}
      <span>{children}</span>
    </div>
  );
};