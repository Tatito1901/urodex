import React, { 
  useState, 
  useRef, 
  useEffect, 
  useCallback, 
  memo, 
  useMemo,
  lazy,
  Suspense 
} from "react";
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
  VolumeX,
  Volume2,
  type LucideIcon 
} from "lucide-react";

// --- TIPOS E INTERFACES ---
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  description: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

interface VideoSource {
  src: string;
  type: string;
  quality?: string;
}

interface VideoCardProps {
  videoSources: VideoSource[];
  posterSrc: string;
  title: string;
  description: string;
  autoplay?: boolean;
  initialMuted?: boolean;
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

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
}

// --- HOOKS PERSONALIZADOS ---
const useIntersectionObserver = ({ threshold = 0.1, rootMargin = "50px" }: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
};

const useImagePreloader = (images: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const preloadImages = useCallback(async (imageSrcs: string[]) => {
    const promises = imageSrcs.map(src => {
      if (loadedImages.has(src)) return Promise.resolve();
      
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, src]));
          resolve();
        };
        img.onerror = () => resolve(); // Continue even if image fails
        img.src = src;
      });
    });

    await Promise.allSettled(promises);
  }, [loadedImages]);

  return { preloadImages, loadedImages };
};

// --- DATOS OPTIMIZADOS ---
const galleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    src: "/images/mario_cirugia_2.jpg",
    alt: "Dr. Mario Martínez realizando cirugía",
    description: "El Dr. Mario Martínez en acción, realizando una cirugía urológica con precisión y experiencia.",
    priority: true,
    width: 800,
    height: 600
  },
  {
    id: "gallery-2",
    src: "/images/mario_cistoscopio.jpg",
    alt: "Dr. Mario Martínez usando cistoscopio",
    description: "Utilizando tecnología avanzada como el cistoscopio para diagnósticos precisos y efectivos.",
    width: 800,
    height: 600
  },
  {
    id: "gallery-3",
    src: "/images/mario_davinci.jpg",
    alt: "Dr. Mario Martínez con robot Da Vinci",
    description: "Experiencia en cirugía robótica asistida por el sistema Da Vinci para procedimientos mínimamente invasivos.",
    width: 800,
    height: 600
  },
  {
    id: "gallery-4",
    src: "/images/mario_operando.jpg",
    alt: "Dr. Mario Martínez operando",
    description: "Concentración y precisión en cada procedimiento quirúrgico, garantizando los mejores resultados.",
    width: 800,
    height: 600
  },
  {
    id: "gallery-5",
    src: "/images/mario_robot.jpg",
    alt: "Dr. Mario Martínez junto a robot quirúrgico",
    description: "Liderando la vanguardia en procedimientos mínimamente invasivos con asistencia robótica de última generación.",
    width: 800,
    height: 600
  },
];

const videoSources: VideoSource[] = [
  {
    src: "/images/MARCO_ANTONIO_REGIL_MARIO.mp4",
    type: "video/mp4",
    quality: "hd"
  },
  // Formato alternativo WebM para mejor compatibilidad con navegadores
  {
    src: "/images/MARCO_ANTONIO_REGIL_MARIO.webm",
    type: "video/webm",
    quality: "hd"
  },
  // Versión SD para conexiones lentas o dispositivos con menos recursos
  {
    src: "/images/MARCO_ANTONIO_REGIL_MARIO_720p.mp4",
    type: "video/mp4",
    quality: "sd"
  }
];

// --- COMPONENTES AUXILIARES OPTIMIZADOS ---

// Skeleton Loader mejorado
const ImageSkeleton = memo(() => (
  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
  </div>
));
ImageSkeleton.displayName = 'ImageSkeleton';

const VideoSkeleton = memo(() => (
  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-300 rounded w-24 mx-auto animate-pulse"></div>
        <div className="h-2 bg-slate-300 rounded w-16 mx-auto animate-pulse"></div>
      </div>
    </div>
  </div>
));
VideoSkeleton.displayName = 'VideoSkeleton';

// Componente de título de sección optimizado
const SectionTitle = memo<SectionTitleProps>(({ icon: Icon, text, subtitle }) => (
  <div className="mb-4 sm:mb-6">
    <div className="flex items-center gap-2 sm:gap-3 group">
      <div className="bg-gradient-to-br from-teal-100 to-teal-200 p-2 sm:p-3 rounded-full shadow-sm transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-teal-700 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-800 tracking-tight truncate">{text}</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">{subtitle}</p>
      </div>
    </div>
  </div>
));
SectionTitle.displayName = 'SectionTitle';

// Contenedor de medios optimizado
const MediaContainer = memo<MediaContainerProps>(({ children, className = "" }) => (
  <div className={`bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 md:p-8 h-full flex flex-col ${className}`}>
    {children}
  </div>
));
MediaContainer.displayName = 'MediaContainer';

// Componente de video ultra-optimizado
const VideoCard = memo<VideoCardProps>(({ videoSources, posterSrc, title, description, autoplay = false, initialMuted = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSource, setCurrentSource] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const { ref: containerRef, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
    setCanPlay(true);
    setHasError(false);
    console.log("Video loaded successfully", videoSources[currentSource]);
    
    // Si está configurado para reproducción automática, iniciar la reproducción
    const video = videoRef.current;
    if (video && autoplay && hasIntersected) {
      video.muted = initialMuted; // Asegurar que esté muteado inicialmente si así está configurado
      video.play()
        .catch(err => {
          console.warn("Autoplay prevented:", err);
          setErrorInfo("Reproducción automática bloqueada por el navegador");
        });
    }
  }, [currentSource, videoSources, autoplay, hasIntersected, initialMuted]);

  const handleVideoError = useCallback(() => {
    console.error("Video error with source:", videoSources[currentSource].src);
    
    // Intenta con la siguiente fuente de video si hay disponible
    if (currentSource < videoSources.length - 1) {
      setCurrentSource(prev => prev + 1);
      console.log("Trying next video source:", videoSources[currentSource + 1].src);
      setErrorInfo(`Probando formato alternativo (${videoSources[currentSource + 1].type})`);
      return;
    }
    
    // Si hemos intentado todas las fuentes, manejamos el error
    setHasError(true);
    setIsLoading(false);
    setErrorInfo("No se pudo cargar el video con ninguna de las fuentes disponibles");
  }, [currentSource, videoSources]);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    setCurrentTime(video.currentTime);
    
    // Actualizar barra de progreso
    const progressBar = progressRef.current;
    if (progressBar && video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, []);
  
  const handleDurationChange = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  }, []);
  
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    video.muted = newMutedState;
  }, [isMuted]);
  
  const seekVideo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !canPlay) return;
    
    const progressContainer = e.currentTarget;
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    
    if (pos >= 0 && pos <= 1) {
      video.currentTime = pos * video.duration;
    }
  }, [canPlay]);

  // Función para reintentar la carga del video
  const retryVideo = useCallback(() => {
    if (retryCount >= 3) {
      setErrorInfo("Se ha excedido el número máximo de reintentos");
      return;
    }
    
    setRetryCount(prev => prev + 1);
    setCurrentSource(0); // Vuelve a la fuente original
    setIsLoading(true);
    setHasError(false);
    setErrorInfo(`Reintentando reproducción (intento ${retryCount + 1}/3)...`);
    
    // Recargar el video
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, [retryCount]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasIntersected) return;

    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('canplay', handleVideoLoad);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    
    // Configurar video con estado inicial
    video.muted = isMuted;

    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('canplay', handleVideoLoad);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
    };
  }, [hasIntersected, handleVideoLoad, handleVideoError, handlePlay, handlePause, handleTimeUpdate, handleDurationChange, isMuted]);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !canPlay) return;
    
    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.error("Error al reproducir/pausar:", error);
      setHasError(true);
      setErrorInfo("Error al controlar la reproducción");
    }
  }, [canPlay]);

  const videoElement = useMemo(() => (
    <video
      ref={videoRef}
      poster={posterSrc}
      controls
      className={`w-full h-full object-cover transition-all duration-500 ${
        isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      preload={hasIntersected ? "metadata" : "none"}
      playsInline
      muted
      title={title}
    >
      {hasIntersected && videoSources.map((source, index) => (
        <source key={index} src={source.src} type={source.type} />
      ))}
      Tu navegador no soporta video HTML5.
    </video>
  ), [videoSources, posterSrc, title, isLoading, hasIntersected]);

  // Funciones para mostrar/ocultar controles
  const showVideoControls = useCallback(() => setShowControls(true), []);
  const hideVideoControls = useCallback(() => {
    // Solo ocultar controles si el video está reproduciéndose
    if (isPlaying) setShowControls(false);
  }, [isPlaying]);
  
  // Formatear tiempo en formato MM:SS
  const formatTime = useCallback((timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full" 
      onMouseEnter={showVideoControls}
      onMouseLeave={hideVideoControls}
    >
      <div 
        className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg bg-black"
        style={{ 
          height: "min(calc(100vw * 0.42), 500px)", /* Altura ajustada para mantener proporción */
          maxWidth: "90%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {hasIntersected && (
          <>
            <video 
              ref={videoRef} 
              className="absolute inset-0 w-full h-full object-contain z-10"
              poster={posterSrc}
              preload="metadata"
              playsInline
              muted={isMuted}
            >
              {videoSources.map(({ src, type }, index) => (
                <source key={src} src={src} type={type} />
              ))}
              Tu navegador no soporta la reproducción de videos.
            </video>

            {isLoading && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <Loader2 className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-teal-500 opacity-90" />
              </div>
            )}
            
            {/* Capa de controles customizados */}
            <div className={`absolute inset-0 z-20 flex flex-col justify-between 
                          ${isPlaying && !showControls ? 'opacity-0' : 'opacity-100'} 
                          transition-opacity duration-300`}>
              
              {/* Botón central de reproducción/pausa */}
              <div className="flex-grow flex items-center justify-center">
                <button 
                  onClick={togglePlay}
                  disabled={isLoading || hasError || !canPlay}
                  className={`group flex items-center justify-center
                    ${(isLoading || !canPlay) && !hasError ? 'cursor-wait' : ''}
                    ${hasError ? 'cursor-not-allowed' : ''}
                    ${!isLoading && canPlay && !hasError ? 'cursor-pointer' : ''}
                  `}
                  aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-lg transform transition-all duration-300 group-hover:scale-110 disabled:scale-100">
                    {isPlaying ? (
                      <Pause className="h-6 w-6 sm:h-8 sm:w-8 text-teal-700" />
                    ) : (
                      <Play className="h-6 w-6 sm:h-8 sm:w-8 text-teal-700 ml-0.5" />
                    )}
                  </div>
                </button>
              </div>
              
              {/* Barra inferior con controles adicionales */}
              <div className="p-2 sm:p-3 bg-gradient-to-t from-black/70 to-transparent">
                {/* Barra de progreso */}
                <div 
                  className="w-full h-1 sm:h-1.5 bg-white/30 rounded-full mb-2 sm:mb-3 cursor-pointer relative" 
                  onClick={seekVideo}
                >
                  <div 
                    ref={progressRef}
                    className="absolute left-0 top-0 h-full bg-teal-500 rounded-full"
                    style={{ width: '0%' }} 
                  />
                </div>
                
                {/* Controles inferiores */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button 
                      onClick={togglePlay} 
                      className="mr-3 focus:outline-none"
                      disabled={isLoading || hasError || !canPlay}
                      aria-label={isPlaying ? "Pausar" : "Reproducir"}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 text-white" />
                      ) : (
                        <Play className="h-5 w-5 text-white" />
                      )}
                    </button>
                    
                    <button 
                      onClick={toggleMute}
                      className="focus:outline-none"
                      disabled={isLoading || hasError || !canPlay}
                      aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5 text-white" />
                      ) : (
                        <Volume2 className="h-5 w-5 text-white" />
                      )}
                    </button>
                    
                    {/* Tiempo actual / duración */}
                    <div className="ml-3 text-white text-xs sm:text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 text-red-800 p-4 z-30">
                <AlertTriangle className="mx-auto mb-3 h-8 w-8 sm:h-10 sm:w-10 text-red-500" />
                <p className="text-center font-medium text-sm sm:text-base">Error al cargar el video</p>
                <p className="text-center text-xs sm:text-sm mt-1 text-red-600">
                  {errorInfo || "No se pudo cargar el recurso multimedia"}
                </p>
                {retryCount < 3 && (
                  <button 
                    onClick={retryVideo}
                    className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                  >
                    Reintentar reproducción
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="pt-3 sm:pt-4 text-center flex-grow flex flex-col justify-center">
        <h4 className="font-bold text-sm sm:text-base md:text-lg text-teal-700 transition-colors duration-200 line-clamp-2">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2 px-1 sm:px-2 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
});
VideoCard.displayName = 'VideoCard';

// Componente de galería ultra-optimizado
const ImageGallery = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  // Usa un umbral más bajo para cargar la galería antes
  const { ref: galleryRef, hasIntersected } = useIntersectionObserver({ 
    threshold: 0.05,
    rootMargin: "100px"
  });
  
  // Asegúrate de que la galería se inicializa correctamente
  const { preloadImages, loadedImages } = useImagePreloader(galleryImages.map(img => img.src));
  
  // Efecto para reiniciar el estado cuando cambia la intersección
  useEffect(() => {
    if (hasIntersected) {
      // Iniciar la precarga de la primera imagen inmediatamente
      preloadImages([galleryImages[0].src]);
    }
  }, [hasIntersected, preloadImages]);

  const currentImage = useMemo(() => galleryImages[currentIndex], [currentIndex]);

  // Preload de imágenes inteligente
  useEffect(() => {
    if (!hasIntersected) return;

    const preloadAdjacentImages = async () => {
      const nextIndex = (currentIndex + 1) % galleryImages.length;
      const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
      
      const imagesToPreload = [
        galleryImages[currentIndex].src,
        galleryImages[nextIndex].src,
        galleryImages[prevIndex].src
      ];

      await preloadImages(imagesToPreload);
    };

    preloadAdjacentImages();
  }, [currentIndex, hasIntersected, preloadImages]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Eliminar esta línea para evitar el reinicio del estado de carga
    // setIsImageLoading(true);
    
    setCurrentIndex(prevIndex => {
      if (direction === 'prev') {
        return prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1;
      }
      return prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1;
    });
    
    // Transición más larga y suave
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning]);

  // Manejadores táctiles optimizados
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigate('next');
    } else if (isRightSwipe) {
      navigate('prev');
    }
  }, [touchStart, touchEnd, navigate]);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageErrors(prev => new Set([...prev, currentImage.src]));
    setIsImageLoading(false);
  }, [currentImage.src]);

  const isCurrentImageLoaded = loadedImages.has(currentImage.src);
  const hasCurrentImageError = imageErrors.has(currentImage.src);

  return (
    <div ref={galleryRef} className="relative w-full h-full flex flex-col">
      <div 
        className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl bg-black flex items-center justify-center"
        style={{ 
          height: "min(calc(100vw * 0.5), 550px)", /* Altura ajustada para mejor visualización */
          maxWidth: "95%",
          margin: "0 auto",
          aspectRatio: "16/9" /* Mantiene proporción consistente */
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!hasIntersected && <ImageSkeleton />}
        
        {hasIntersected && (
          <>
            {(isImageLoading || !isCurrentImageLoaded) && !hasCurrentImageError && <ImageSkeleton />}
            
            {hasCurrentImageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600">
                <AlertTriangle className="h-8 w-8 sm:h-12 sm:w-12 mb-2 text-gray-400" />
                <p className="text-sm sm:text-base font-medium">Imagen no disponible</p>
              </div>
            ) : (
              <div className="relative w-full h-full bg-gradient-to-r from-slate-50 to-white flex items-center justify-center">
                {/* Contenedor con fondo fijo para evitar parpadeos */}
                <Image
                  /* Eliminar key para evitar remontaje del componente */
                  /* key={currentImage.id} */
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 60vw"
                  className={`transition-opacity duration-1000 ease-in-out ${isImageLoading || !isCurrentImageLoaded ? 'opacity-0' : 'opacity-100'} hover:scale-[1.02] transform-gpu will-change-transform`}
                  priority={true} /* Priorizar todas las imágenes */
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    margin: 'auto',
                    willChange: 'opacity',
                    backfaceVisibility: 'hidden'
                  }}
                />
              </div>
            )}

            {/* Botones de navegación mejorados con mejor visibilidad */}
            <button
              onClick={() => navigate('prev')}
              className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-teal-600/80 hover:bg-teal-600 backdrop-blur-sm rounded-full p-1.5 sm:p-2 md:p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-teal-500 active:scale-95 z-20"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </button>
            
            <button
              onClick={() => navigate('next')}
              className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-teal-600/80 hover:bg-teal-600 backdrop-blur-sm rounded-full p-1.5 sm:p-2 md:p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-teal-500 active:scale-95 z-20"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </button>

            {/* Indicadores optimizados y más visibles */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/50 backdrop-blur-sm rounded-full z-20">
              {galleryImages.map((_, index) => (
                <button
                  key={`indicator-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-teal-400 w-5 sm:w-8' 
                      : 'bg-white/70 hover:bg-white w-2 sm:w-2.5'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Descripción optimizada con mejor legibilidad - texto mejorado */}
      <div className="mt-3 sm:mt-4 text-center px-2 sm:px-4 flex-grow flex items-center justify-center">
        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-md">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100/90 backdrop-blur-md z-0"></div>
          <p className="relative z-10 py-3 px-4 sm:py-4 sm:px-5 text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed font-medium transition-opacity duration-300 line-clamp-3 border-l-4 border-teal-500">
            {currentImage.description}
          </p>
        </div>
      </div>
    </div>
  );
});
ImageGallery.displayName = 'ImageGallery';

// Lazy loading de componentes pesados
const LazyImageGallery = lazy(() => Promise.resolve({ default: ImageGallery }));
const LazyVideoCard = lazy(() => Promise.resolve({ default: VideoCard }));

// --- COMPONENTE PRINCIPAL OPTIMIZADO ---
const DoctorInfo = memo(() => {
  return (
    <Section
      id="doctor-info"
      className="bg-gradient-to-b from-teal-50/70 via-white to-teal-50/70 py-12 sm:py-16 md:py-24 overflow-hidden"
    >
      <ResponsiveContainer>
        {/* Encabezado optimizado */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-900 mb-3 sm:mb-4 px-4">
            Conoce al Dr. Mario Martínez
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
            Un especialista comprometido con la excelencia, la innovación y el cuidado humano en la urología.
          </p>
        </div>

        {/* Grid responsivo optimizado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Sección de Video */}
          <div className="w-full">
            <MediaContainer className="hover:shadow-2xl transition-shadow duration-500">
              <SectionTitle 
                icon={Video} 
                text="Entrevistas Destacadas" 
                subtitle="Compartiendo conocimiento y experiencia"
              />
              <div className="flex-grow flex flex-col justify-center">
                {/* Usar hook de intersección específico para video para mejor rendimiento */}
                {(() => {
                  const { ref: videoSectionRef, hasIntersected: videoHasIntersected } = 
                    useIntersectionObserver({ threshold: 0.1, rootMargin: "100px" });
                  
                  return (
                    <div ref={videoSectionRef} className="w-full">
                      {videoHasIntersected ? (
                        <Suspense fallback={<div className="w-full aspect-video flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-teal-500"/></div>}>
                          <LazyVideoCard
                            videoSources={videoSources}
                            posterSrc="/images/entrevista_poster.jpg"
                            title="Entrevista con Marco Antonio Regil"
                            description="El Dr. Mario Martínez habla sobre la importancia de la salud masculina y los avances en urología."
                          />
                        </Suspense>
                      ) : (
                        <div className="w-full aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Loader2 className="animate-spin h-8 w-8 text-teal-500 mx-auto mb-2"/>
                            <p className="text-slate-500 text-sm">Cargando entrevista...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Entrevista Dr. Thomas */}
                <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                  <h4 className="font-bold text-sm sm:text-base md:text-lg text-teal-700">
                    Entrevista con el Dr. Thomas
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2 px-1 sm:px-2 leading-relaxed">
                    Una conversación profunda sobre los últimos avances en tratamientos urológicos.
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=_wUVzqnwFDw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-2 px-5 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.25,4,12,4,12,4S5.75,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.75,2,12,2,12s0,4.25,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.75,20,12,20,12,20s6.25,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.25,22,12,22,12S22,7.75,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>
                    Ver en YouTube
                  </a>
                </div>
              </div>
            </MediaContainer>
          </div>

          {/* Sección de Galería */}
          <div className="w-full">
            <MediaContainer className="hover:shadow-2xl transition-shadow duration-500">
              <SectionTitle 
                icon={ImageIcon} 
                text="Galería Profesional" 
                subtitle="Innovación en urología"
              />
              <div className="flex-grow flex items-center justify-center">
                <Suspense fallback={<ImageSkeleton />}>
                  <LazyImageGallery />
                </Suspense>
              </div>
            </MediaContainer>
          </div>
        </div>
      </ResponsiveContainer>
    </Section>
  );
});

DoctorInfo.displayName = 'DoctorInfo';

export default DoctorInfo;