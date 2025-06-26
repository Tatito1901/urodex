"use client"

import { ArrowRight, CheckCircle, Stethoscope } from "lucide-react"
import { ScrollAnimation } from "./scroll-animations"
import { ResponsiveContainer } from "./responsive-container"
import { Section } from "./section"
import { Button } from "./ui/button"
import { getServiceIcon } from "./service-icons"
import { useState, useMemo, useCallback } from "react"

// Tipos de datos para los servicios
interface Service {
  id: string;
  name: string
  description: string
  highlights: string[]
}

// Datos de los servicios/tratamientos
const SERVICES: Service[] = [
  {
    id: "prostate",
    name: "Cirugía de Próstata",
    description: "Tratamientos mínimamente invasivos para problemas prostáticos con tecnología láser de última generación que minimizan molestias y aceleran la recuperación.",
    highlights: ["Enucleación con Láser", "Biopsia de Próstata", "Prostatectomía Radical"]
  },
  {
    id: "hpv",
    name: "Tratamiento de VPH",
    description: "Diagnóstico temprano y tratamiento de lesiones causadas por el Virus del Papiloma Humano con técnicas avanzadas y seguimiento personalizado.",
    highlights: ["Diagnóstico Especializado", "Tratamiento con Láser CO2", "Seguimiento Integral"]
  },
  {
    id: "circumcision",
    name: "Circuncisión",
    description: "Procedimiento con técnica láser que garantiza mayor precisión, menor dolor y recuperación más rápida. Solución definitiva para fimosis y problemas del prepucio.",
    highlights: ["Técnica Láser Avanzada", "Recuperación Rápida", "Resultados Estéticos"]
  },
  {
    id: "erectile",
    name: "Disfunción Eréctil",
    description: "Evaluación completa con tratamientos personalizados que incorporan lo último en tecnología médica para restaurar la función sexual masculina con excelentes resultados.",
    highlights: ["Tratamiento Integral", "Terapia con Ondas de Choque", "Medicación Especializada"]
  },
  {
    id: "kidney",
    name: "Litiasis Renal",
    description: "Diagnóstico y tratamiento de cálculos en riñones, uréteres o vejiga mediante técnicas mínimamente invasivas que garantizan una rápida eliminación y recuperación.",
    highlights: ["Litotripsia", "Cirugía Láser", "Tratamiento Preventivo"]
  },
  {
    id: "cancer",
    name: "Cáncer Urológico",
    description: "Diagnóstico precoz y tratamiento especializado para cánceres de próstata, riñón, vejiga y testículo con los más altos estándares internacionales.",
    highlights: ["Detección Temprana", "Cirugía Oncológica", "Seguimiento Especializado"]
  },
  {
    id: "urodynamics",
    name: "Urodinamia",
    description: "Estudio avanzado para evaluar la función de la vejiga y uretra, fundamental para diagnosticar problemas de incontinencia y flujo urinario anormal.",
    highlights: ["Evaluación Completa", "Diagnóstico Preciso", "Tratamiento Dirigido"]
  },
  {
    id: "urogyn",
    name: "Uroginecología",
    description: "Atención especializada para padecimientos femeninos como incontinencia urinaria, cistitis recurrente y prolapso, con tratamientos modernos y efectivos.",
    highlights: ["Tratamiento de Incontinencia", "Rehabilitación de Piso Pélvico", "Manejo de Cistitis"]
  },
]

// Componente de tarjeta de servicio
const ServiceCard = ({ 
  service,
  delay = 0
}: { 
  service: Service; 
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollAnimation animation="fade-in-up" delay={delay}>
      <div 
        className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-green-100 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4 mb-6">
          <div 
            className={`bg-gradient-to-br from-teal-200 to-green-50 p-4 rounded-2xl transition-all duration-300 shadow-inner ${
              isHovered ? "scale-110 rotate-6" : ""
            }`}
          >
            {getServiceIcon(service.name, "h-8 w-8 text-green-700")}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-green-700 text-lg leading-tight">
              {service.name}
            </h3>
          </div>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-sm">
          {service.description}
        </p>

        <div className="space-y-3 mb-6">
          {service.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={() => window.open(`https://wa.me/5516942925?text=Consulta%20sobre%20${encodeURIComponent(service.name)}`, "_blank")}
          variant="outline"
          className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-300 mt-auto rounded-full py-3"
        >
          Consultar Especialista
          <ArrowRight 
            className={`h-4 w-4 ml-2 transition-transform ${
              isHovered ? "translate-x-1" : ""
            }`} 
          />
        </Button>
      </div>
    </ScrollAnimation>
  );
}

// Componente principal
export const TratamientosSection = () => {
  // Memorizar servicios para evitar recreación en cada render
  const services = useMemo(() => SERVICES, []);

  // Función para abrir WhatsApp con servicio específico
  const openWhatsApp = useCallback(() => {
    window.open("https://wa.me/5516942925?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20con%20el%20Dr.%20Mario%20Martínez", "_blank");
  }, []);

  return (
    <Section id="servicios" background="gradient" spacing="xl" hasDivider={true} dividerType="curve">
      <ResponsiveContainer>
        <ScrollAnimation animation="fade-in-up">
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-white/90 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-4 md:mb-6 shadow-lg">
              <Stethoscope className="h-4 w-4" />
              Servicios Especializados
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-700 mb-4 md:mb-6">
              Tratamientos Urológicos de Vanguardia
            </h2>
            <div className="w-24 md:w-32 h-1 bg-white mx-auto mb-4 md:mb-6"></div>
            <p className="text-lg md:text-xl lg:text-xl text-blue-700/95 leading-relaxed max-w-3xl mx-auto">
              Diagnóstico preciso y tratamientos innovadores con tecnología de última generación 
              para garantizar los mejores resultados y una recuperación óptima.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              delay={index * 75} 
            />
          ))}
        </div>
      </ResponsiveContainer>
    </Section>
  )
}