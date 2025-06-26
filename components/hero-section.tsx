
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Play, Pause } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animations"
import { ResponsiveContainer } from "./responsive-container"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  // Detectar dispositivo móvil de forma segura
  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Manejar reproducción de video
  useEffect(() => {
    if (!videoRef.current) return;
    
    const handlePlay = async () => {
      try {
        await videoRef.current?.play();
        setIsPlaying(true);
      } catch (e) {
        console.log("Auto-play prevenido:", e);
        setIsPlaying(false);
      }
    }

    handlePlay();
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  // Scroll suave a la sección de servicios
  const scrollToServices = () => {
    const serviciosSection = document.getElementById("servicios");
    serviciosSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="inicio" 
      className="relative overflow-hidden min-h-[calc(100dvh-5rem)]"
    >
      {/* Video de fondo optimizado */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover w-auto h-auto max-w-none"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/CONSULTORIO_MARIO.png"
          preload="auto"
        >
          <source 
            src="/images/Video_Quirúrgico_Urología_Moderna (1).mp4" 
            type="video/mp4" 
          />
          Tu navegador no soporta video HTML5.
        </video>
        
        {/* Overlay de gradiente profesional */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/85 via-teal-900/80 to-emerald-950/90"></div>
        
        {/* Botón de control de video */}
        <button 
          onClick={togglePlay}
          className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-40 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 border border-white/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 md:h-5 md:w-5 text-white" />
          ) : (
            <Play className="h-4 w-4 md:h-5 md:w-5 text-white" />
          )}
        </button>
      </div>
      
      {/* Overlay de enfoque */}
      <div className="absolute inset-0 z-10 bg-radial-gradient"></div>

      <ResponsiveContainer className="py-10 md:py-16 lg:py-20 relative flex flex-col justify-center min-h-[calc(100dvh-5rem)]">
        <ScrollAnimation 
          animation="fade-in-up" 
          className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6 z-30 relative px-4"
        >
          {/* Badge profesional elegante */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded-full text-sm md:text-base font-medium mb-2 shadow-lg transition-all hover:bg-white/20">
            <Shield className="h-3 w-3 md:h-4 md:w-4" /> 
            <span>Cirujano Urólogo Certificado</span>
          </div>

          {/* Título principal con tipografía refinada */}
          <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm py-5 px-4 md:py-6 md:px-6 rounded-2xl border border-white/10 shadow-xl">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight m-0 text-white leading-tight">
              Dr. Mario Martínez Thomas
            </h1>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto my-3 md:my-4" />
            <p className="text-gray-100 font-medium text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión
            </p>
          </div>

          {/* Botones con espaciado refinado */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4 md:pt-6 justify-center">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-full px-6 py-4 md:px-7 md:py-5 text-sm md:text-base font-medium tracking-wide transition-all transform hover:scale-[1.03] focus:scale-[0.98] shadow-lg"
              onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
            >
              Agenda por WhatsApp
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white bg-white/10 hover:bg-white/20 rounded-full px-6 py-4 md:px-7 md:py-5 text-sm md:text-base font-medium backdrop-blur-sm shadow-lg tracking-wide transition-all transform hover:scale-[1.03] focus:scale-[0.98]"
              onClick={scrollToServices}
            >
              Conocer Servicios
            </Button>
          </div>
        </ScrollAnimation>

        {/* Badge decorativo responsivo */}
        <div className="absolute top-3 right-3 md:top-5 md:right-5 bg-gradient-to-r from-emerald-700/90 to-teal-700/90 backdrop-blur-sm border border-white/20 rounded-full p-2 md:p-3 shadow-md flex items-center gap-2 z-30">
          <Shield className="h-4 w-4 md:h-5 md:w-5 text-white" />
          <span className="text-xs md:text-sm font-medium text-white tracking-wide hidden sm:inline">
            Excelencia Médica
          </span>
        </div>
      </ResponsiveContainer>
      
      {/* Indicador de scroll para móviles mejorado */}
      {isMobile && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll-indicator"></div>
          </div>
          <span className="text-white text-xs mt-1 font-light">Desplázate</span>
        </div>
      )}
    </section>
  )
}