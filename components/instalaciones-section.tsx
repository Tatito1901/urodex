"use client"

import Image from "next/image"
import { ArrowRight, Building, Hospital } from "lucide-react"
import { ScrollAnimation } from "./scroll-animations"
import { ResponsiveContainer } from "./responsive-container"
import { Section } from "./section"
import { Button } from "./ui/button"

// Datos de instalaciones
interface Instalacion {
  title: string
  description: string
  imageUrl: string
}

const instalaciones: Instalacion[] = [
  {
    title: "Consultorios con Tecnología Avanzada",
    description: "Espacios equipados con los últimos sistemas de diagnóstico y equipos urológicos especializados para una valoración completa y precisa.",
    imageUrl: "/images/consultorio.jpg"
  },
  {
    title: "Quirófanos Innovadores",
    description: "Quirófanos con equipamiento láser de última generación y tecnología digital integrada para procedimientos mínimamente invasivos.",
    imageUrl: "/images/quirofano.jpg"
  },
  {
    title: "Centro de Urodinamia",
    description: "Unidad especializada con equipos de vanguardia para realizar estudios urodinámicos completos que evalúan el funcionamiento del sistema urinario.",
    imageUrl: "/images/urodinamia.jpg"
  },
  {
    title: "Sala de Recuperación Confortable",
    description: "Un espacio privado, tranquilo y con atención personalizada para garantizar una recuperación postoperatoria óptima y en condiciones de máximo confort.",
    imageUrl: "/images/recuperacion.jpg"
  },
]

// Función para abrir WhatsApp
const openWhatsApp = () => {
  window.open("https://wa.me/5516942925?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20con%20el%20Dr.%20Mario%20Martínez", "_blank");
}

export const InstalacionesSection = () => {
  return (
    <Section id="instalaciones" background="gradient" spacing="xl" hasDivider={true} dividerType="angle">
      <ResponsiveContainer>
        <ScrollAnimation animation="fade-in-up">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/90 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Hospital className="h-4 w-4" />
              Instalaciones Médicas
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
              Infraestructura de Excelencia
            </h2>
            <div className="w-32 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl lg:text-2xl text-white/95 leading-relaxed">
              Instalaciones modernas equipadas con la más avanzada tecnología para garantizar
              diagnósticos precisos y tratamientos efectivos.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instalaciones.map((instalacion, index) => (
            <ScrollAnimation key={instalacion.title} animation="fade-in-up" delay={(index + 1) * 100}>
              <div className="group bg-white/90 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image 
                    src={instalacion.imageUrl} 
                    alt={instalacion.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-bold text-white text-xl mb-2">{instalacion.title}</h3>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {instalacion.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Button
                      onClick={openWhatsApp}
                      variant="outline"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-300 rounded-full py-3"
                    >
                      Agendar Visita
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-in-up" delay={400}>
          <div className="mt-16 text-center">
            <Button 
              onClick={openWhatsApp}
              className="bg-white text-green-700 hover:bg-white/80 rounded-full px-8 py-6 font-medium text-lg shadow-xl transition-all duration-300">
              <Building className="mr-2 h-5 w-5" />
              Programar Recorrido por las Instalaciones
            </Button>
          </div>
        </ScrollAnimation>
      </ResponsiveContainer>
    </Section>
  )
}