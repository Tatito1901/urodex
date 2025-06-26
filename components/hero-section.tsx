"use client"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animations"
import { ResponsiveContainer } from "./responsive-container"
import { TypographyH1, TypographyLarge } from "./typography"

export function HeroSection() {
  return (
    <section id="inicio" className="relative bg-white overflow-hidden min-h-[calc(100vh-5rem)]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-green-100/50 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-green-100/50 translate-y-1/2 -translate-x-1/3"></div>
      <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-green-200/30"></div>
      <div className="absolute bottom-40 right-40 w-24 h-24 rounded-full bg-green-200/40"></div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#0e5041 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      ></div>

      <ResponsiveContainer className="py-12 md:py-20 lg:py-28 relative flex flex-col justify-center min-h-[calc(100vh-5rem)]">
        <ScrollAnimation animation="fade-in-up" className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
          <div className="inline-block px-3 py-1 md:px-4 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium mb-2">
            Cirujano Urólogo
          </div>

          <TypographyH1 className="text-green-800 font-bold text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
            Dr. Mario Martínez Thomas
          </TypographyH1>

          <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto"></div>

          <TypographyLarge className="text-green-800 font-medium text-lg md:text-xl lg:text-2xl px-4">
            Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión.
          </TypographyLarge>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4 md:pt-6 justify-center px-4">
            <Button
              className="bg-green-700 hover:bg-green-600 btn-elegant rounded-full px-6 md:px-8 py-4 md:py-6 shadow-lg focus-visible-ring text-sm md:text-base"
              onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
            >
              Agenda por WhatsApp
            </Button>
            <Button
              variant="outline"
              className="border-green-700 text-green-700 hover:bg-green-50 rounded-full px-6 md:px-8 py-4 md:py-6 focus-visible-ring text-sm md:text-base"
              onClick={() => {
                const serviciosSection = document.getElementById("servicios")
                if (serviciosSection) {
                  serviciosSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Conocer Servicios
            </Button>
          </div>
        </ScrollAnimation>

        {/* Decorative badge */}
        <div className="absolute top-20 right-20 bg-white rounded-full p-3 shadow-lg hidden lg:flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-700" />
          <span className="text-sm font-medium text-green-700">Excelencia Médica</span>
        </div>
      </ResponsiveContainer>
    </section>
  )
}
