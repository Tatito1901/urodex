import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Play, Pause } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animations"
import { ResponsiveContainer } from "./responsive-container"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null)
  
  // Función debounce para eventos de resize
  const debounce = (func: () => void, delay: number) => {
    if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    resizeTimeout.current = setTimeout(func, delay);
  };
  
  // Detectar dispositivo móvil de forma óptima
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    }
    
    // Verificar al cargar
    checkMobile();
    
    // Handler con debounce para resize
    const handleResize = () => debounce(checkMobile, 100);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    }
  }, [])
  
  // Manejar reproducción de video optimizado
  const handleVideoPlay = useCallback(async () => {
    if (!videoRef.current) return;
    
    try {
      // Solo reproducir si no es móvil
      if (!isMobile) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    } catch (e) {
      console.log("Auto-play prevenido:", e);
      setIsPlaying(false);
    }
  }, [isMobile]);

  useEffect(() => {
    handleVideoPlay();
  }, [handleVideoPlay]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Scroll suave a la sección de servicios
  const scrollToServices = useCallback(() => {
    const serviciosSection = document.getElementById("servicios");
    serviciosSection?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section 
      id="inicio" 
      className="relative overflow-hidden min-h-[calc(100dvh-5rem)]"
    >
      {/* Video de fondo optimizado con alternativa para móviles */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {isMobile ? (
          <div className="absolute inset-0 w-full h-full bg-cover bg-center" 
               style={{ backgroundImage: "url('/images/CONSULTORIO_MARIO.png')" }} />
        ) : (
          <video
            ref={videoRef}
            className="absolute w-full h-full object-cover max-w-none blur-md"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/CONSULTORIO_MARIO.png"
            preload="metadata"
            style={{ 
              objectPosition: 'center center',
              transform: 'scale(1.01)'
            }}
          >
            <source 
              src="/images/hero-video.mp4" 
              type="video/mp4" 
            />
            Tu navegador no soporta video HTML5.
          </video>
        )}
        
        {/* Overlay de gradiente profesional optimizado */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-teal-900/85 to-primary-dark/95 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 to-transparent z-10"></div>
        
        {/* Botón de control de video solo cuando hay video */}
        {!isMobile && (
          <button 
            onClick={togglePlay}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-40 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 border border-white/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 md:h-5 md:w-5 text-white" />
            ) : (
              <Play className="h-4 w-4 md:h-5 md:w-5 text-white" />
            )}
          </button>
        )}
      </div>
      
      {/* Overlay de enfoque optimizado */}
      <div className="absolute inset-0 z-10 bg-radial-gradient opacity-80"></div>

      <ResponsiveContainer breakpointPadding={{ base: "px-4" }} className="py-8 md:py-16 lg:py-20 relative flex flex-col justify-center min-h-[calc(100dvh-5rem)]">
        <ScrollAnimation 
          animation="fade-in-up" 
          className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6 z-30 relative"
        >
          {/* Badge profesional elegante */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded-full text-sm md:text-base font-medium mb-2 shadow-lg transition-all hover:bg-white/20">
            <Shield className="h-3 w-3 md:h-4 md:w-4" /> 
            <span>Cirujano Urólogo Certificado</span>
          </div>

          {/* Título principal optimizado para responsividad */}
          <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm py-4 px-4 md:py-6 md:px-6 rounded-2xl border border-white/10 shadow-xl">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight m-0 text-white leading-tight">
              Dr. Mario Martínez Thomas
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto my-3 md:my-4" />
            <p className="text-gray-100 font-medium text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión
            </p>
          </div>

          {/* Botones con mejor espaciado para móviles */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4 justify-center">
            <Button
              className="bg-gradient-to-r from-teal-600 to-teal-600 hover:from-teal-500 hover:to-teal-500 rounded-full px-6 py-4 md:px-7 md:py-5 text-sm md:text-base font-medium tracking-wide transition-all transform hover:scale-[1.03] focus:scale-[0.98] shadow-lg"
              onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925&text=Hola%20dr.%20mario%20me%20gustaria%20obtener%20mas%20informacion%20acerca%20de%20sus%20servicios", "_blank")}
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
        <div className="absolute top-3 right-3 md:top-5 md:right-5 bg-gradient-to-r from-teal-700/90 to-teal-700/90 backdrop-blur-sm border border-white/20 rounded-full p-2 md:p-3 shadow-md flex items-center gap-2 z-30">
          <Shield className="h-4 w-4 md:h-5 md:w-5 text-white" />
          <span className="text-xs md:text-sm font-medium text-white tracking-wide hidden sm:inline">
            Excelencia Médica
          </span>
        </div>
      </ResponsiveContainer>
      
      {/* Indicador de scroll mejorado para móviles */}
      {isMobile && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center animate-bounce-slow">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll-indicator"></div>
          </div>
          <span className="text-white text-xs mt-1 font-light">Desplázate</span>
        </div>
      )}
    </section>
  )
}