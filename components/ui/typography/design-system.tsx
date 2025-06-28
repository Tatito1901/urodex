// Sistema de diseño unificado - Escalas tipográficas
export const TYPOGRAPHY_SCALE = {
    // Tamaños base más compactos y profesionales
    text: {
      xs: "text-xs",           // 12px
      sm: "text-sm",           // 14px
      base: "text-base",       // 16px
      lg: "text-lg",           // 18px
      xl: "text-xl",           // 20px
      "2xl": "text-2xl",       // 24px
      "3xl": "text-3xl",       // 30px
      "4xl": "text-4xl",       // 36px
    },
    
    // Responsive - incrementos sutiles
    responsive: {
      xs: "text-xs",
      sm: "text-xs sm:text-sm",
      base: "text-sm sm:text-base",
      lg: "text-base sm:text-lg",
      xl: "text-lg sm:text-xl",
      "2xl": "text-xl sm:text-2xl",
      "3xl": "text-2xl sm:text-3xl",
      "4xl": "text-3xl sm:text-4xl",
    }
  };
  
  // Colores unificados del sistema
  export const COLORS = {
    default: "text-slate-700",
    white: "text-white",
    primary: "text-teal-700",
    muted: "text-slate-500",
    dark: "text-slate-900",
    gradient: "bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent",
  };
  
  // Colores para dividers
  export const DIVIDER_COLORS = {
    dark: "bg-teal-600",
    white: "bg-white",
    primary: "bg-teal-600",
    muted: "bg-slate-400",
    gradient: "bg-gradient-to-r from-teal-600 to-teal-400",
    default: "bg-teal-600",
  };