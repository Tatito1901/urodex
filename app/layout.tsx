import type React from "react"
import type { Metadata } from "next"
import { Roboto, Roboto_Serif } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
})

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
  weight: ["300", "400", "500", "600", "700"],
})

// Importar Bio Sans Bold como fuente local
/* const bioSans = localFont({
  src: [
    {
      path: "../public/fonts/BioSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-biosans",
}) */

export const metadata: Metadata = {
  title: "Urodex - Dr. Mario Martínez Thomas | Urólogo Especialista",
  description:
    "Clínica especializada en urología y cirugía de próstata en Ciudad de México. Dr. Mario Martínez Thomas, urólogo certificado con amplia experiencia.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
            <body className={`${roboto.variable} ${robotoSerif.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
