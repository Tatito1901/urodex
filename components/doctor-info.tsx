
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { Section } from "@/components/section";
import { ResponsiveContainer } from "@/components/responsive-container";
import { 
  Video, 
  ImageIcon, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Loader2,
  Play,
  Pause,
  type LucideIcon 
} from "lucide-react";

// --- TIPOS E INTERFACES ---
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  priority?: boolean;
}

interface VideoCardProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  description: string;
}

interface SectionTitleProps {
  icon: LucideIcon;
  text: string;
  subtitle: string;
}

interface MediaContainerProps {
  children: React.ReactNode;
  className?: string;
}

// --- DATOS ---
const galleryImages: GalleryImage[] = [
  { 
    id: "gallery-1",
    src: "/images/dr-mario-martinez-1.jpeg", 
    alt: "Dr. Mario Martínez en congreso", 
    description: "Participación en el Congreso Internacional de Urología.", 
    priority: true 
  },
  { 
    id: "gallery-2",
    src: "/images/dr-mario-martinez-2.jpeg", 
    alt: "Dr. Mario Martínez con equipo médico", 
    description: "Colaborando con colegas en un taller de cirugía robótica." 
  },
  { 
    id: "gallery-3",
    src: "/images/dr-mario-martinez-3.jpeg", 
    alt: "Dr. Mario Martínez en consulta", 
    description: "Atención personalizada y de vanguardia para cada paciente." 
  },
  { 
    id: "gallery-4",
    src: "/images/dr-mario-martinez-4.jpeg", 
    alt: "Dr. Mario Martínez en quirófano", 
    description: "Realizando procedimientos de alta especialidad con tecnología de punta." 
  },
];

// --- UTILIDADES ---
const preloadImage = (src: string): void => {
  const img = new window.Image();
  img.src = src;
};

// --- COMPONENTES AUXILIARES ---

// Componente de título de sección memoizado
const SectionTitle = memo<SectionTitleProps>(({ icon: Icon, text, subtitle }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 group">
      <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-3 rounded-full shadow-sm transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-6 w-6 text-teal-700 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-teal-800 tracking-tight">{text}</h3>
        <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  </div>
));
SectionTitle.displayName = 'SectionTitle';

// Componente de contenedor de medios para tamaños uniformes
const MediaContainer = memo<MediaContainerProps>(({ children, className = "" }) => (
  <div className={`bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-elegant transition-all duration-300 p-6 md:p-8 h-full flex flex-col ${className}`}>
    {children}
  </div>
));
MediaContainer.displayName = 'MediaContainer';

// Componente de video mejorado
const VideoCard = memo<VideoCardProps>(({ videoSrc, posterSrc, title, description }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => setHasError(true);
    const handleLoadedData = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play().catch(() => setHasError(true));
    } else {
      video.pause();
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-100 to-slate-200 group">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Loader2 className="h-12 w-12 text-teal-600 animate-spin" />
          </div>
        )}
        
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          controls
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          preload="metadata"
          title={title}
          playsInline
        >
          Tu navegador no soporta video HTML5.
        </video>

        {/* Overlay de control personalizado */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center group-hover:opacity-100 opacity-0 z-10"
          aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
        >
          <div className="bg-white/90 rounded-full p-4 shadow-lg transform transition-transform group-hover:scale-110">
            {isPlaying ? (
              <Pause className="h-8 w-8 text-teal-700" />
            ) : (
              <Play className="h-8 w-8 text-teal-700 ml-1" />
            )}
          </div>
        </button>

        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 text-red-800 p-4 z-30">
            <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-red-500" />
            <p className="text-center font-medium">Error al cargar el video</p>
            <p className="text-center text-sm mt-1 text-red-600">Por favor, intenta más tarde</p>
          </div>
        )}
      </div>
      
      <div className="pt-4 text-center flex-grow flex flex-col justify-center">
        <h4 className="font-bold text-base md:text-lg text-teal-700 transition-colors duration-200">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-slate-600 mt-2 px-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
});
VideoCard.displayName = 'VideoCard';

// Componente de galería de imágenes mejorado
const ImageGallery = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Precarga de imágenes adyacentes y manejo de transiciones
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    
    // Precarga de imágenes adyacentes para transiciones más suaves
    preloadImage(galleryImages[nextIndex].src);
    preloadImage(galleryImages[prevIndex].src);
    
    // Resetear loading cuando cambia la imagen
    setIsImageLoading(true);
    
    // Desactivar loading después de un tiempo adecuado para la transición
    const timer = setTimeout(() => {
      setIsImageLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (isTransitioning) return; // Prevenir múltiples clics rápidos durante la transición
    
    setIsTransitioning(true);
    setIsImageLoading(true);
    
    setCurrentIndex(prevIndex => {
      if (direction === 'prev') {
        return prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1;
      }
      return prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1;
    });
    
    // Permitir nuevas navegaciones después de la transición
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  // Manejadores táctiles para deslizamiento móvil
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigate('next');
    } else if (isRightSwipe) {
      navigate('prev');
    }
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div 
        className="relative rounded-xl overflow-hidden shadow-xl aspect-video bg-gradient-to-br from-slate-100 to-slate-200"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-100/20 backdrop-blur-sm">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className={`relative w-full h-full transition-all duration-500 ${isImageLoading ? 'opacity-60 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          <Image
            key={galleryImages[currentIndex].id}
            src={galleryImages[currentIndex].src}
            alt={galleryImages[currentIndex].alt}
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 50vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            priority={galleryImages[currentIndex].priority}
            quality={90}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
        </div>

        {/* Botones de navegación */}
        <button
          onClick={() => navigate('prev')}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>
        
        <button
          onClick={() => navigate('next')}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>

        {/* Indicadores con mejor visibilidad y usabilidad */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full">
          {galleryImages.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Descripción con mejor legibilidad */}
      <div className="mt-4 text-center px-4 flex-grow flex items-center justify-center">
        <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium transition-opacity duration-300 animate-fade-in">
          {galleryImages[currentIndex].description}
        </p>
      </div>
    </div>
  );
});
ImageGallery.displayName = 'ImageGallery';

// Componente de animación wrapper
const AnimatedWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);

// --- COMPONENTE PRINCIPAL ---
const DoctorInfo = () => {
  return (
    <Section
      id="doctor-info"
      className="bg-gradient-to-b from-teal-50/70 via-white to-teal-50/70 py-16 md:py-24 overflow-hidden"
    >
      <ResponsiveContainer>
        {/* Encabezado */}
        <AnimatedWrapper className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-900 mb-4">
            Conoce al Dr. Mario Martínez
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Un especialista comprometido con la excelencia, la innovación y el cuidado humano en la urología.
          </p>
        </AnimatedWrapper>

        {/* Grid de contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Sección de Video */}
          <AnimatedWrapper className="animate-slide-in-left">
            <MediaContainer className="hover-lift">
              <SectionTitle 
                icon={Video} 
                text="Entrevista Destacada" 
                subtitle="Programa de alcance nacional"
              />
              <div className="flex-grow flex items-center justify-center">
                <VideoCard
                  videoSrc="/images/MARCO_ANTONIO_REGIL_MARIO.mp4"
                  posterSrc="/images/video-poster.jpg"
                  title="Entrevista con Marco Antonio Regil"
                  description="El Dr. Mario Martínez Thomas compartiendo su valiosa experiencia y conocimientos en urología moderna."
                />
              </div>
            </MediaContainer>
          </AnimatedWrapper>

          {/* Sección de Galería */}
          <AnimatedWrapper className="animate-slide-in-right">
            <MediaContainer className="hover-lift">
              <SectionTitle 
                icon={ImageIcon} 
                text="Galería Profesional" 
                subtitle="Innovación en urología"
              />
              <div className="flex-grow flex items-center justify-center">
                <ImageGallery />
              </div>
            </MediaContainer>
          </AnimatedWrapper>
        </div>
      </ResponsiveContainer>
    </Section>
  );
};

// Exportación por defecto del componente
export default DoctorInfo;