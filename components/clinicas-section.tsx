"use client"

import Link from "next/link"
import { ArrowRight, Award, CheckCircle, Shield, Users } from "lucide-react"
import { ScrollAnimation } from "./scroll-animations"
import { ResponsiveContainer } from "./responsive-container"
import { Section } from "./section"
import { Button } from "./ui/button"

// Clínicas data
interface Clinica {
  id: string
  name: string
  description: string
  features: string[]
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  link: string
}

const clinicas: Clinica[] = [
  {
    id: "prostata",
    name: "Clínica de Cirugía de Próstata",
    description: "Centro especializado en el diagnóstico y tratamiento integral de enfermedades prostáticas con técnicas láser de última generación y cirugía mínimamente invasiva.",
    features: ["Enucleación con Láser", "Resección Transuretral (RTU)", "Biopsia de Próstata Guiada"],
    icon: Award,
    link: "/clinica-prostata"
  },
  {
    id: "vph",
    name: "Clínica de VPH",
    description: "Diagnóstico temprano y tratamiento especializado del Virus del Papiloma Humano con tecnología de última generación en un ambiente confidencial y profesional.",
    features: ["Electrocauterización", "Láser CO2", "Seguimiento especializado"],
    icon: Shield,
    link: "/clinica-vph"
  },
  {
    id: "circuncision",
    name: "Clínica de Circuncisión",
    description: "Procedimientos de circuncisión con tecnología láser para máxima precisión, mínimo dolor y cicatrización óptima. Solución definitiva para fimosis y balanitis.",
    features: ["Circuncisión Tradicional", "Circuncisión con Láser", "Frenuloplastía"],
    icon: Users,
    link: "/clinica-circuncision"
  }
]

export const ClinicasSection = () => {
  return (
    <Section id="clinicas" background="white" spacing="xl" hasDivider={true} dividerType="wave">
      <ResponsiveContainer>
        <ScrollAnimation animation="fade-in-up">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              Clínicas Especializadas
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-green-700 mb-6">
              Centros de Excelencia Médica
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Clínicas especializadas con protocolos específicos y tecnología dedicada 
              para cada condición urológica.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {clinicas.map((clinica, index) => {
            const IconComponent = clinica.icon;
            return (
              <ScrollAnimation key={clinica.id} animation="fade-in-up" delay={(index + 1) * 100}>
                <div className="group relative bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border-2 border-green-100 hover:border-green-200 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="absolute top-6 right-6">
                    <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-green-700" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">
                      {clinica.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {clinica.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {clinica.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={clinica.link}>
                      <Button className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-full font-medium transition-all duration-300">
                        Conocer Clínica
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </ResponsiveContainer>
    </Section>
  )
}