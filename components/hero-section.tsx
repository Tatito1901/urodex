"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Play, Pause } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animations"
import { ResponsiveContainer } from "./responsive-container"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  useEffect(() => {
    // Auto-play video cuando el componente se monta
    if (videoRef.current) {
      const playPromise = videoRef.current.play()
      
      playPromise.catch(e => {
        console.log("Auto-play prevenido:", e)
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <section id="inicio" className="relative overflow-hidden min-h-[calc(100dvh-5rem)]">
      {/* Video de fondo con controles */}
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
        
        {/* Overlay de color gradiente profesional */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(135deg, rgba(0, 40, 25, 0.85), rgba(0, 50, 32, 0.8), rgba(0, 35, 22, 0.88))" 
          }}
        ></div>
        
        {/* Botón de control de video */}
        <button 
          onClick={togglePlay}
          className="absolute bottom-6 right-6 z-40 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 border border-white/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
      
      {/* Overlay de viñeta para enfocar el contenido */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      ></div>

      <ResponsiveContainer className="py-12 md:py-20 lg:py-28 relative flex flex-col justify-center min-h-[calc(100dvh-5rem)]">
        <ScrollAnimation 
          animation="fade-in-up" 
          className="max-w-4xl mx-auto text-center space-y-5 md:space-y-7 z-30 relative px-4"
        >
          {/* Badge profesional */}
          <div className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded-full text-sm md:text-base font-medium mb-2 shadow-lg transition-all hover:bg-white/20">
            <span className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" /> Cirujano Urólogo Certificado
            </span>
          </div>

          {/* Título principal con mejor jerarquía tipográfica */}
          <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm py-6 px-4 md:px-8 rounded-2xl border border-white/10 shadow-xl">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight m-0 text-white">
              Dr. Mario Martínez Thomas
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mt-4 mb-3" />
            <p className="text-gray-100 font-medium text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mt-4">
              Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión
            </p>
          </div>

          {/* Botones con mejor espaciado y diseño */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 pt-6 md:pt-8 justify-center">
            <Button
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-full px-8 py-5 md:py-6 shadow-xl text-base md:text-lg font-medium tracking-wide transition-all transform hover:scale-[1.03] focus:scale-[0.98]"
              onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
            >
              Agenda por WhatsApp
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white bg-white/5 hover:bg-white/15 rounded-full px-8 py-5 md:py-6 text-base md:text-lg font-medium backdrop-blur-sm shadow-lg tracking-wide transition-all transform hover:scale-[1.03] focus:scale-[0.98]"
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

        {/* Badge decorativo responsivo */}
        <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-gradient-to-r from-emerald-700/80 to-green-700/80 backdrop-blur-sm border border-white/20 rounded-full p-3 shadow-lg flex items-center gap-3 z-30">
          <Shield className="h-5 w-5 text-white" />
          <span className="text-sm font-medium text-white tracking-wide hidden sm:inline">
            Excelencia Médica
          </span>
        </div>
      </ResponsiveContainer>
      
      {/* Indicador de scroll para móviles */}
      {isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center animate-bounce">
          <span className="text-white text-sm mb-1">Desplázate</span>
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center p-1">
            <div className="w-2 h-2 bg-white rounded-full animate-scroll-indicator"></div>
          </div>
        </div>
      )}
    </section>
  )
}