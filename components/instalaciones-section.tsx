// src/components/instalaciones-section.tsx

import Image from "next/image";
import { Section } from "@/components/section";
import { ResponsiveContainer } from "@/components/responsive-container";
import { ScrollAnimation } from "@/components/scroll-animations";
import { Building2, Camera } from "lucide-react";

// ========================================================================
// MEJORA CENTRAL: Contenido actualizado basado en el análisis de imágenes
// ========================================================================
const facilityImages = [
  {
    id: 1,
    // ¡ACCIÓN REQUERIDA! Cambia esta ruta a la de tu imagen de la sala de exploración
    src: "/images/consultorio_tecnologia.png", 
    alt: "Sala de Exploración con Tecnología de Punta",
    caption: "Equipada con sistemas de diagnóstico avanzados, como ultrasonido de alta definición, para una valoración integral y precisa en un entorno seguro y confortable."
  },
  {
    id: 2,
    // ¡ACCIÓN REQUERIDA! Cambia esta ruta a la de tu imagen del consultorio principal
    src: "/images/consultorio_thomas.webp", 
    alt: "Consultorio Principal con Vistas Panorámicas",
    caption: "Un espacio diseñado para la confianza y la privacidad. Su ambiente moderno y vistas inspiradoras crean el entorno ideal para conversar y planificar tratamientos con total tranquilidad."
  },
  {
    id: 3,
    // ¡ACCIÓN REQUERIDA! Cambia esta ruta a la de tu imagen de la sala de espera
    src: "/images/sala_de_espera.png",
    alt: "Sala de Espera Moderna y Confortable",
    caption: "Desde el primer momento, te recibimos en un ambiente de calma. Nuestra amplia y luminosa sala de espera está diseñada para que tu visita comience de la manera más relajante."
  }
];

interface InstalacionesSectionProps {
  background?: 'pearl' | 'primary-dark' | 'gradient-teal-dark';
}

export const InstalacionesSection = ({ background = "primary-dark" }: InstalacionesSectionProps) => {
  return (
    <Section 
      id="instalaciones" 
      background={background} 
      spacing="lg" 
      className="overflow-hidden"
    >
      <ResponsiveContainer padding="lg">
        <ScrollAnimation animation="fade-in-up">
          <div className="text-center max-w-5xl mx-auto mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full text-sm lg:text-base font-semibold mb-6 shadow-md">
              <Building2 className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              Nuestras Instalaciones
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-6 lg:mb-8 leading-tight">
              Un Espacio Diseñado para Ti
            </h2>
            <div className="w-24 lg:w-32 h-1.5 bg-emerald-600 mx-auto mb-6 lg:mb-8 rounded-full"></div>
            <p className="text-lg lg:text-xl xl:text-2xl text-white leading-relaxed font-medium">
              Fusionamos tecnología de vanguardia con un diseño centrado en el confort para brindarte
              una experiencia de atención médica excepcional.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {facilityImages.map((image, index) => (
            <ScrollAnimation key={image.id} animation="fade-in-up" delay={index * 150}>
              <div className="group relative flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg border-2 border-emerald-200/50 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-64 lg:h-72 xl:h-80 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/90 backdrop-blur-sm p-3 lg:p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <Camera className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-700" />
                  </div>
                </div>
                <div className="p-6 lg:p-8 bg-white/95 backdrop-blur-sm flex-1 flex flex-col">
                  <h3 className="font-bold text-emerald-800 text-lg lg:text-xl mb-3">{image.alt}</h3>
                  <p className="text-slate-600 leading-relaxed text-base lg:text-lg flex-grow">{image.caption}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </ResponsiveContainer>
    </Section>
  );
};