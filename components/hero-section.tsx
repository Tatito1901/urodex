
"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animations"
import { ResponsiveContainer } from "./responsive-container"
import { TypographyH1, TypographyLarge } from "./typography"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log("Auto-play prevented:", e)
        // We could add a play button here if needed
      })
    }
  }, [])

  return (
    <section id="inicio" className="relative overflow-hidden min-h-[calc(100vh-5rem)]">
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover w-auto h-auto max-w-none"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/CONSULTORIO_MARIO.png"
        >
          <source src="/images/Video_Quirúrgico_Urología_Moderna (1).mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
        
        {/* Overlay de color gradiente para mejorar legibilidad */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(135deg, rgba(0, 40, 25, 0.95), rgba(0, 50, 32, 0.85), rgba(0, 35, 22, 0.92))" 
          }}
        ></div>
      </div>
      
      {/* Overlay de viñeta suave para enfocar centro */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      ></div>

      <ResponsiveContainer className="py-12 md:py-20 lg:py-28 relative flex flex-col justify-center min-h-[calc(100vh-5rem)]">
        <ScrollAnimation animation="fade-in-up" className="max-w-4xl mx-auto text-center space-y-5 md:space-y-7 z-30 relative">
          <div className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded-full text-sm md:text-base font-medium mb-2 shadow-xl">
            Cirujano Urólogo
          </div>

          <div className="bg-black/20 backdrop-blur-sm py-6 px-8 rounded-2xl inline-block mx-auto">
            <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight m-0"
              style={{
                textShadow: "0 4px 15px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.8), 0 -2px 5px rgba(0,20,10,0.4)",
                color: "#e2ffe8"
              }}
            >
              Dr. Mario Martínez Thomas
            </h1>
          </div>

          <div className="w-24 md:w-32 h-1 bg-white mx-auto shadow-lg"></div>

          <p 
            className="text-gray-100 font-medium text-xl md:text-2xl lg:text-3xl px-4 leading-relaxed max-w-3xl mx-auto"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)",
              color: "#f0fff2"
            }}
          >
            Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 pt-6 md:pt-8 justify-center px-4">
            <Button
              className="bg-green-600 hover:bg-green-500 btn-elegant rounded-full px-8 py-4 md:py-5 shadow-xl focus-visible-ring text-base md:text-lg font-medium tracking-wide"
              onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
            >
              Agenda por WhatsApp
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-4 md:py-5 focus-visible-ring text-base md:text-lg font-medium backdrop-blur-sm shadow-lg tracking-wide"
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
        <div className="absolute top-20 right-20 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-xl hidden lg:flex items-center gap-3 z-30">
          <Shield className="h-5 w-5 text-white" />
          <span className="text-sm font-medium text-white tracking-wide">Excelencia Médica</span>
        </div>
      </ResponsiveContainer>
    </section>
  )
}
