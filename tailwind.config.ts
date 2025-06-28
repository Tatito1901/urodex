import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
        serif: ["var(--font-roboto-serif)"],
        biosans: ["var(--font-biosans)"],
      },
      // Sistema de tipografía estandarizado
      fontSize: {
        // Tamaños base (mobile-first)
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        
        // Tipografía para elementos de UI específicos con lineHeight y tracking optimizados
        'display-1': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }], // Mobile h1
        'display-2': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }], // Mobile h2
        'display-3': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }], // Mobile h3
        'display-4': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }], // Mobile h4
        'body': ['1rem', { lineHeight: '1.5' }], // Párrafo estándar
        'body-sm': ['0.875rem', { lineHeight: '1.5' }], // Párrafo pequeño
        'caption': ['0.75rem', { lineHeight: '1.4' }], // Texto pequeño, capciones
        'badge': ['0.75rem', { lineHeight: '1', fontWeight: '600' }], // Badges/etiquetas
      },
      colors: {
        // Accessible gray palette – ensure text meets WCAG contrast on white backgrounds
        gray: {
          ...colors.gray,
          600: "#374151", // darker gray for 4.5:1 contrast ratio against white
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "#0e5041", // elegant dark green
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        teal: {
          50: "#e7f5f4",
          100: "#d0ebe9",
          200: "#a1d8d3",
          300: "#72c5bd",
          400: "#43b2a7",
          500: "#25a295",
          600: "#1b877d",
          700: "#156c64",
          800: "#11514c",
          900: "#0c3b37",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideInRight: "slideInRight 0.5s ease-out forwards",
        slideInLeft: "slideInLeft 0.5s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/elegant-pattern.png')",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "hsl(var(--foreground))",
            a: {
              color: "#2a9b77",
              "&:hover": {
                color: "#1a7d67",
              },
            },
            h1: {
              color: "#0e5041",
            },
            h2: {
              color: "#0e5041",
            },
            h3: {
              color: "#0e5041",
            },
            h4: {
              color: "#0e5041",
            },
            blockquote: {
              color: "#1a7d67",
              borderLeftColor: "#2a9b77",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
