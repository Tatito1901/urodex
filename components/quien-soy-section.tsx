import Image from "next/image";
import React, { useMemo } from "react";
import { Stethoscope, GraduationCap, CheckCircle, Award, Shield, Star, ChevronDown, ChevronUp } from "lucide-react";
import { ResponsiveContainer } from "./responsive-container";
import { Section } from "./section";
import { ScrollAnimation } from "./scroll-animations";

// FeatureCard como componente separado para mejor rendimiento
const FeatureCard = React.memo(({ Icon, title, description }: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) => (
  <div className="bg-gradient-to-br from-teal-50 to-white p-5 sm:p-6 rounded-2xl border border-teal-100 hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="bg-teal-100 p-2 sm:p-3 rounded-xl group-hover:bg-teal-200 transition-colors duration-300">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />
      </div>
      <div>
        <h4 className="font-bold text-teal-700 text-base sm:text-lg mb-1 sm:mb-2">{title}</h4>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
));

// Componente para la insignia de experiencia
const ExperienceBadge = React.memo(() => (
  <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-gradient-to-r from-teal-700 to-teal-600 text-white p-4 sm:p-5 rounded-2xl shadow-lg z-10">
    <div className="flex items-center gap-2 mb-1">
      <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
      <span className="font-bold text-lg sm:text-xl">10+</span>
    </div>
    <p className="text-xs sm:text-sm font-medium">Años de experiencia</p>
  </div>
));

interface QuienSoySectionProps {
  background?: "white" | "pearl" | "teal" | "gradient" | "gradient-subtle" | "gradient-strong" | "primary" | "primary-light" | "primary-dark" | "secondary" | "secondary-light" | "dark" | "none";
  onShowMore?: () => void;
  showingMore?: boolean;
}

export const QuienSoySection: React.FC<QuienSoySectionProps> = ({ background = "white", onShowMore, showingMore = false }) => {
  const features = useMemo(() => [
    {
      Icon: GraduationCap,
      title: "Certificación IRCAD",
      description: "Laparoscopia urológica avanzada en IRCAD Latinoamérica, centro líder en entrenamiento laparoscópico y robótico.",
    },
    {
      Icon: CheckCircle,
      title: "Certificación Vigente",
      description: "Consejo Nacional Mexicano de Urología - Garantía de actualización continua y excelencia profesional.",
    },
    {
      Icon: Award,
      title: "Miembro AUA",
      description: "Asociación Americana de Urología - Acceso a los últimos avances e investigaciones médicas.",
    },
    {
      Icon: Shield,
      title: "Miembro EAU",
      description: "Asociación Europea de Urología - Estándares internacionales de calidad y excelencia.",
    },
  ], []);

  return (
    <Section 
      id="sobre-mi" 
      background={background} 
      spacing="xl" 
      hasDivider 
      dividerType="wave"
      className="overflow-hidden"
    >
      <ResponsiveContainer breakpointPadding={{ base: "px-4", sm: "px-6" }}>
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
          {/* Imagen optimizada con prioridad de carga */}
          <ScrollAnimation 
            animation="fade-in-right" 
            className="w-full lg:w-2/5 max-w-xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-teal-100 via-teal-50 to-white rounded-3xl blur-xl opacity-60 -z-10"></div>
              <div className="relative bg-white rounded-3xl p-2 sm:p-3 shadow-lg">
                <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-xl">
                  <Image
                    src="/images/dr_mario_martinez.jpg"
                    alt="Dr. Mario Martínez Thomas - Urólogo Certificado"
                    width={500}
                    height={600}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
                    priority
                  />
                </div>
                <ExperienceBadge />
              </div>
            </div>
          </ScrollAnimation>

          {/* Contenido textual optimizado */}
          <ScrollAnimation 
            animation="fade-in-left" 
            className="w-full lg:w-3/5 space-y-6 sm:space-y-8"
          >
            <header className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Cirujano Urólogo Certificado</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent mb-3 sm:mb-4">
                Dr. Mario Martínez Thomas
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-teal-400 mb-4 sm:mb-6 mx-auto lg:mx-0"></div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
                Cirujano Urólogo egresado de CMN 20 de Noviembre con mención honorífica de la Universidad Nacional Autónoma de México. Mi compromiso es ofrecer la más alta calidad en atención urológica, 
                combinando experiencia clínica con técnicas avanzadas.
              </p>
            </header>

            {/* Grid de características responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  Icon={feature.Icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            {/* Botón Ver más */}
            {onShowMore && (
              <div className="flex justify-center mt-10">
                <ScrollAnimation animation="fade-in-up" className="ml-8">
                  <button
                    onClick={onShowMore}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    aria-expanded={showingMore}
                  >
                    <span className="mr-2">{showingMore ? "Ver menos" : "Ver más información"}</span>
                    {showingMore ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </ScrollAnimation>
              </div>
            )}
          </ScrollAnimation>
        </div>
      </ResponsiveContainer>
    </Section>
  );
};