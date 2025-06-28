
import React, { useCallback, useMemo, useState } from "react";
import { ArrowRight, CheckCircle, Stethoscope, Scissors, Pill, Ribbon, Droplets, UserCheck, Biohazard, HeartPulse } from "lucide-react";
import { ScrollAnimation } from "./scroll-animations";
import { ResponsiveContainer } from "./responsive-container";
import { Section } from "./section";
import { Button } from "./ui/button";

// Tipos de datos para los servicios
interface Service {
  name: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
}

// Componente memoizado para la tarjeta de servicio
const ServiceCard = React.memo(({ service }: { service: Service }) => {
  const openWhatsApp = useCallback(() => {
    window.open("https://wa.me/5516942925?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20con%20el%20Dr.%20Mario%20Martínez", "_blank");
  }, []);

  return (
    <div className="group bg-white rounded-2xl md:rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-teal-50 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-3 rounded-xl group-hover:scale-105 transition-transform duration-300">
          {service.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-teal-700 text-base md:text-lg leading-tight">
            {service.name}
          </h3>
        </div>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed flex-grow text-sm">
        {service.description}
      </p>

      <div className="space-y-2 mb-4">
        {service.highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <span className="text-xs md:text-sm text-gray-700 font-medium">{highlight}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={openWhatsApp}
        variant="outline"
        className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 mt-auto rounded-full py-2 text-xs md:text-sm"
        aria-label={`Consultar sobre ${service.name}`}
      >
        Consultar Especialista
        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
});
ServiceCard.displayName = 'ServiceCard';

interface TratamientosSectionProps {
  background?: "white" | "pearl" | "teal" | "gradient" | "gradient-subtle" | "gradient-strong" | "primary" | "primary-light" | "primary-dark" | "secondary" | "secondary-light" | "dark" | "none";
}

export const TratamientosSection: React.FC<TratamientosSectionProps> = ({ background = "primary-dark" }) => {
  // Estado para controlar si mostrar todos los tratamientos o solo los primeros 4
  const [showAllServices, setShowAllServices] = useState(false);
  
  // Memoizar los servicios para evitar recreación en cada render
  const services = useMemo<Service[]>(() => [
    {
      name: "Cirugía de Próstata",
      description: "Tratamientos mínimamente invasivos para problemas prostáticos con tecnología láser que minimizan molestias y aceleran la recuperación.",
      highlights: ["Enucleación con Láser", "Biopsia de Próstata", "Prostatectomía Radical"],
      icon: <UserCheck className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
    },
    {
      name: "Tratamiento de VPH",
      description: "Diagnóstico temprano y tratamiento de lesiones causadas por el Virus del Papiloma Humano con técnicas avanzadas.",
      highlights: ["Diagnóstico Especializado", "Tratamiento con Láser CO2", "Seguimiento Integral"],
      icon: <Biohazard className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
    },
    {
      name: "Circuncisión",
      description: "Procedimiento con técnica láser que garantiza mayor precisión, menor dolor y recuperación más rápida.",
      highlights: ["Técnica Láser Avanzada", "Recuperación Rápida", "Resultados Estéticos"],
      icon: <Scissors className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
    },
    {
      name: "Disfunción Eréctil",
      description: "Evaluación completa con tratamientos personalizados que incorporan lo último en tecnología médica.",
      highlights: ["Tratamiento Integral", "Terapia con Ondas de Choque", "Medicación Especializada"],
      icon: <Pill className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
    },
    {
      name: "Litiasis Renal",
      description: "Diagnóstico y tratamiento de cálculos mediante técnicas mínimamente invasivas para rápida eliminación y recuperación.",
      highlights: ["Litotripsia", "Cirugía Láser", "Tratamiento Preventivo"],
      icon: <HeartPulse className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
    },
    {
      name: "Cáncer Urológico",
      description: "Diagnóstico precoz y tratamiento especializado con los más altos estándares internacionales.",
      highlights: ["Detección Temprana", "Cirugía Oncológica", "Seguimiento Especializado"],
      icon: <Ribbon className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
    },
    {
      name: "Uroginecología",
      description: "Atención especializada para padecimientos femeninos con tratamientos modernos y efectivos.",
      highlights: ["Tratamiento de Incontinencia", "Rehabilitación de Piso Pélvico", "Manejo de Cistitis"],
      icon: <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
    },
  ], []);

  return (
    <Section 
      id="servicios" 
      background={background} 
      textColor="light" 
      spacing="lg" 
      hasDivider={true} 
      dividerType="curve"
      className="overflow-hidden"
    >
      <ResponsiveContainer breakpointPadding={{ base: "px-4" }}>
        <ScrollAnimation animation="fade-in-up">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4 shadow">
              <Stethoscope className="h-3 w-3 md:h-4 md:w-4" />
              Servicios Especializados
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              Tratamientos Urológicos de Vanguardia
            </h2>
            <div className="w-20 h-1 bg-white mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Diagnóstico preciso y tratamientos innovadores con tecnología de última generación 
              para garantizar los mejores resultados y una recuperación óptima.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {/* Mostrar solo los primeros 4 tratamientos o todos según el estado */}
          {(showAllServices ? services : services.slice(0, 4)).map((service, index) => (
            <ScrollAnimation 
              key={service.name} 
              animation="fade-in-up" 
              delay={Math.min(index * 100, 500)}
            >
              <ServiceCard service={service} />
            </ScrollAnimation>
          ))}
        </div>
        
        {/* Botón "Mostrar más" que solo aparece si hay más de 4 tratamientos y no se están mostrando todos */}
        {services.length > 4 && (
          <div className="mt-8 md:mt-10 text-center">
            <Button
              onClick={() => setShowAllServices(prev => !prev)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-6 py-2 rounded-full transition-all duration-300"
            >
              {showAllServices ? "Mostrar menos" : "Mostrar más"}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAllServices ? "rotate-90" : ""}`} />
            </Button>
          </div>
        )}
      </ResponsiveContainer>
    </Section>
  );
};