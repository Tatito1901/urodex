"use client"

import React, { useCallback, useMemo } from "react";
import { ArrowRight, CheckCircle, Stethoscope, Scissors, Pill, Ribbon, Droplets, UserCheck, Biohazard, HeartPulse } from "lucide-react";
import { ResponsiveContainer } from "@/components/responsive-container";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/scroll-animations";

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

// Datos de los servicios
const servicesData: Service[] = [
    {
        name: "Consulta Urológica General",
        description: "Evaluación integral para diagnosticar y tratar una amplia gama de condiciones urológicas, desde infecciones hasta problemas de próstata.",
        highlights: ["Diagnóstico preciso", "Planes de tratamiento personalizados", "Prevención y seguimiento"],
        icon: <Stethoscope className="h-6 w-6 text-teal-600" />,
    },
    {
        name: "Cirugía Robótica Da Vinci",
        description: "Procedimientos mínimamente invasivos con el sistema Da Vinci para una recuperación más rápida, menos dolor y mayor precisión en cirugías complejas.",
        highlights: ["Menor tiempo de hospitalización", "Resultados oncológicos superiores", "Reducción de complicaciones"],
        icon: <Scissors className="h-6 w-6 text-teal-600" />,
    },
    {
        name: "Tratamiento de Cálculos Renales",
        description: "Soluciones avanzadas para la eliminación de cálculos renales, incluyendo litotricia extracorpórea y cirugía láser endoscópica.",
        highlights: ["Alivio rápido del dolor", "Técnicas sin incisión", "Prevención de recurrencias"],
        icon: <Biohazard className="h-6 w-6 text-teal-600" />,
    },
    {
        name: "Salud Prostática",
        description: "Manejo completo de enfermedades de la próstata, como la hiperplasia prostática benigna (HPB) y el cáncer de próstata.",
        highlights: ["Detección temprana de cáncer", "Tratamientos innovadores (Rezum, Urolift)", "Mejora de la calidad de vida"],
        icon: <UserCheck className="h-6 w-6 text-teal-600" />,
    },
    {
        name: "Disfunción Eréctil y Salud Sexual",
        description: "Diagnóstico y tratamiento confidencial para la disfunción eréctil y otros problemas de salud sexual masculina, con enfoque en restaurar la función y confianza.",
        highlights: ["Terapias personalizadas", "Enfoque multidisciplinario", "Tecnología de última generación"],
        icon: <HeartPulse className="h-6 w-6 text-teal-600" />,
    },
    {
        name: "Incontinencia Urinaria",
        description: "Soluciones efectivas para la incontinencia urinaria en hombres y mujeres, mejorando significativamente la calidad de vida.",
        highlights: ["Diagnóstico urodinámico", "Terapias conductuales y farmacológicas", "Opciones quirúrgicas avanzadas"],
        icon: <Droplets className="h-6 w-6 text-teal-600" />,
    },
];

// Componente principal de la página de servicios
const ServiciosPage = () => {
    const memoizedServices = useMemo(() => servicesData, []);

    return (
        <Section background="pearl" spacing="lg">
            <ResponsiveContainer>
                <ScrollAnimation>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent mb-4">
                            Nuestros Servicios Urológicos
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Ofrecemos atención urológica de vanguardia con un enfoque humano y personalizado. Descubre cómo podemos ayudarte a mejorar tu salud y bienestar.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {memoizedServices.map((service, index) => (
                        <ScrollAnimation key={index} delay={100 * (index % 3)}>
                            <ServiceCard service={service} />
                        </ScrollAnimation>
                    ))}
                </div>
            </ResponsiveContainer>
        </Section>
    );
};

export default ServiciosPage;
