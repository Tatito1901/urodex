import { useEffect, useRef, useState, useCallback } from "react"
import { Shield, Play, Pause } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animations"
import { ResponsiveContainer } from "./responsive-container"
import { Badge } from "@/components/ui/typography/badge"
import { Paragraph } from "@/components/ui/typography/paragraph"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Muestra inmediatamente el poster y carga el video en segundo plano
  // Reproducir video tan pronto como sea posible - versión simplificada
  useEffect(() => {
    setIsReady(true)
    
    const video = videoRef.current
    if (!video) return
    
    const playVideo = async () => {
      try {
        await video.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }
    
    video.addEventListener("loadeddata", () => playVideo(), { once: true })
    
    return () => {
      video.removeEventListener("loadeddata", () => playVideo())
    }
  }, [])

  // play / pause manual
  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().then(() => setIsPlaying(true))
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  const scrollToServices = useCallback(() => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section id="inicio" className="relative overflow-hidden min-h-[calc(100dvh-5rem)]">
      {/* Video de fondo */}
      <div className="absolute inset-0 w-full h-full">
        {/* Solo video, sin loaders ni imágenes */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
          style={{ 
            filter: 'blur(6px)', 
            opacity: isReady ? 1 : 0,
            transition: 'opacity 300ms ease-out'
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          controls={false}
          controlsList="nodownload"
        >
          <source src="/images/CIRUGIA_MARIO.mp4" type="video/mp4" />
        </video>

        {/* overlay para contraste del texto */}
        <div className="absolute inset-0 bg-slate-900/70 pointer-events-none" />

        {/* botón play / pause */}
        <button
          onClick={togglePlay}
          className="absolute bottom-6 right-6 z-40 group"
          aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
        >
          <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/20 transition-all duration-300 group-hover:scale-110 shadow-xl">
            {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white translate-x-0.5" />}
          </div>
        </button>
      </div>

      {/* Contenido principal */}
      <ResponsiveContainer
        breakpointPadding={{ base: "px-4", md: "px-6" }}
        className="py-8 md:py-16 lg:py-20 relative flex flex-col justify-center min-h-[calc(100dvh-5rem)] z-20"
      >
        <ScrollAnimation animation="fade-in-up" className="max-w-5xl mx-auto text-center space-y-8">
          <Badge
            variant="secondary"
            size="md"
            icon={<Shield className="h-4 w-4" />}
            className="mx-auto backdrop-blur-sm bg-emerald-500/10 border-emerald-400/30"
          >
            Cirujano Urólogo Certificado
          </Badge>

          <div className="backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/3 py-10 md:py-14 px-8 md:px-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="relative z-10">
              <h1
                className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-white"
                style={{
                  background:
                    "linear-gradient(135deg,#10b981 0%,#34d399 20%,#6ee7b7 40%,#34d399 60%,#10b981 80%,#059669 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 20px rgba(16,185,129,.6)"
                }}
              >
                Dr. Mario Martínez Thomas
              </h1>

              <div className="flex justify-center mb-8">
                <div className="w-40 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-lg shadow-emerald-400/60" />
              </div>

              <Paragraph
                color="white"
                size="large"
                leading="relaxed"
                weight="medium"
                className="max-w-4xl mx-auto text-xl md:text-2xl lg:text-3xl opacity-95 font-light"
              >
                Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión
              </Paragraph>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-8 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white rounded-full px-12 py-6 text-lg font-bold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 shadow-lg shadow-emerald-600/25 min-w-[240px]"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=5215516942925&text=Hola%20dr.%20mario%20me%20gustaria%20obtener%20mas%20informacion%20acerca%20de%20sus%20servicios",
                  "_blank",
                )
              }
            >
              Agenda por WhatsApp
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-emerald-400/70 text-white bg-emerald-500/15 hover:bg-emerald-500/25 hover:border-emerald-300/90 rounded-full px-12 py-6 text-lg font-bold backdrop-blur-sm shadow-lg tracking-wide transition-all duration-300 transform hover:scale-105 min-w-[240px] hover:shadow-emerald-400/25"
              onClick={scrollToServices}
            >
              Conocer Servicios
            </Button>
          </div>
        </ScrollAnimation>

        <Badge
          variant="primary"
          size="md"
          icon={<Shield className="h-5 w-5 text-white" />}
          className="absolute top-4 right-4 md:top-6 md:right-6 backdrop-blur-md bg-emerald-600/25 border-emerald-400/40 shadow-xl shadow-emerald-500/20"
        >
          <span className="hidden sm:inline text-sm font-medium">Excelencia Médica</span>
        </Badge>
      </ResponsiveContainer>

      {/* indicador scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden md:flex flex-col items-center">
        <div className="w-6 h-10 rounded-full border-2 border-emerald-400/50 flex justify-center p-1 backdrop-blur-sm">
          <div className="w-1 h-2 bg-emerald-400/80 rounded-full animate-bounce" />
        </div>
        <span className="text-white/60 text-xs mt-2 font-light">Scroll</span>
      </div>
    </section>
  )
}
