"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { Header } from "@/components/header"
import { Section } from "@/components/section"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Button } from "@/components/ui/button"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Facebook,
  Instagram,
  ArrowRight,
  Shield,
  CheckCircle,
  Star,
  Stethoscope,
  Calendar,
  Target,
  Zap,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function ClinicaProstata() {
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "tratamientos", "sobre-mi", "contacto"]
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const treatments = [
    {
      name: "Resección Transuretral (RTU)",
      description: "Procedimiento para tratar la hiperplasia prostática benigna.",
      duration: "1-2 horas",
      recovery: "3-5 días",
      benefits: [
        "Técnica mínimamente invasiva",
        "Recuperación rápida",
        "Mejora inmediata de síntomas",
        "Preservación de la función sexual"
      ]
    },
    {
      name: "Enucleación con Láser",
      description: "Técnica moderna para el tratamiento de próstata agrandada.",
      duration: "1-2 horas",
      recovery: "1-3 días",
      benefits: [
        "Tecnología láser de vanguardia",
        "Sangrado mínimo",
        "Hospitalización corta",
        "Resultados duraderos"
      ]
    },
    {
      name: "Biopsia de Próstata Guiada",
      description: "Diagnóstico preciso mediante biopsia con guía ecográfica.",
      duration: "30-45 minutos",
      recovery: "Mismo día",
      benefits: [
        "Diagnóstico preciso",
        "Guía ecográfica avanzada",
        "Procedimiento ambulatorio",
        "Mínimas molestias"
      ]
    }
  ]

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      <ScrollProgressBar />
      <CustomCursor />
      <Header activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/prostata-clinic-hero.jpg"
              alt="Clínica de Cirugía de Próstata"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 via-green-700/85 to-green-600/80"></div>
          </div>

          <ResponsiveContainer className="relative z-10">
            <div className="max-w-4xl">
              <ScrollAnimation animation="fade-in-up">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded-full px-6 py-3 text-sm font-medium mb-6">
                  <Target className="h-4 w-4" />
                  Especialistas en Próstata
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Clínica de Cirugía de Próstata
                </h1>
                
                <div className="w-32 h-1 bg-white mb-8"></div>
                
                <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-8 max-w-3xl">
                  Centro especializado en el diagnóstico y tratamiento integral de enfermedades prostáticas 
                  con técnicas láser de última generación y cirugía mínimamente invasiva.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-white text-green-700 hover:bg-green-50 rounded-full px-8 py-4 text-lg font-medium shadow-xl transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Agendar Consulta
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white text-white bg-white/10 hover:bg-white/20 rounded-full px-8 py-4 text-lg backdrop-blur-sm"
                    onClick={() => document.getElementById("tratamientos")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Ver Tratamientos
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Treatments Section */}
        <Section id="tratamientos" background="white" spacing="xl" hasDivider={true} dividerType="wave">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Stethoscope className="h-4 w-4" />
                  Tratamientos Especializados
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-green-700 mb-6">
                  Procedimientos de Vanguardia
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Ofrecemos los tratamientos más avanzados para problemas prostáticos, 
                  garantizando los mejores resultados con la máxima seguridad.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {treatments.map((treatment, index) => (
                <ScrollAnimation key={treatment.name} animation="fade-in-up" delay={index * 150}>
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border-2 border-green-100 hover:border-green-200 hover:shadow-2xl transition-all duration-500 h-full">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-700 mb-3">
                        {treatment.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {treatment.description}
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center bg-white p-3 rounded-xl">
                        <span className="font-medium text-gray-700">Duración</span>
                        <span className="font-bold text-green-700">{treatment.duration}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-3 rounded-xl">
                        <span className="font-medium text-gray-700">Recuperación</span>
                        <span className="font-bold text-green-700">{treatment.recovery}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <h4 className="font-bold text-gray-800 mb-3">Beneficios:</h4>
                      {treatment.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={openWhatsApp}
                      className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-full font-medium transition-all duration-300"
                    >
                      Consultar Procedimiento
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Doctor Section */}
        <Section id="sobre-mi" background="primary-light" spacing="xl" hasDivider={true} dividerType="angle">
          <ResponsiveContainer>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <ScrollAnimation animation="fade-in-right" className="lg:w-2/5">
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-tr from-white via-green-50 to-white rounded-3xl blur-2xl opacity-60"></div>
                  <div className="relative bg-white rounded-3xl p-3 shadow-2xl">
                    <Image
                      src="/images/dr_mario_martinez.jpg"
                      alt="Dr. Mario Martínez Thomas - Especialista en Próstata"
                      width={500}
                      height={600}
                      className="rounded-2xl w-full h-auto"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="h-6 w-6 fill-current" />
                        <span className="font-bold text-2xl">1000+</span>
                      </div>
                      <p className="text-sm font-medium">Cirugías de próstata</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-left" className="lg:w-3/5 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
                    <Award className="h-4 w-4" />
                    Especialista en Próstata
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Dr. Mario Martínez Thomas
                  </h2>
                  <div className="w-32 h-1 bg-white mb-8"></div>
                  <p className="text-xl text-white/95 leading-relaxed">
                    Cirujano Urólogo egresado de CMN 20 de Noviembre, con mención honorífica otorgada 
                    por la Universidad Nacional Autónoma de México. Mi compromiso es ofrecer la más 
                    alta calidad en atención urológica, combinando experiencia clínica con las técnicas más avanzadas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/95 backdrop-blur p-6 rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Target className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-700 text-lg mb-2">Certificación IRCAD</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Laparoscopia urológica avanzada en IRCAD Latinoamérica.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur p-6 rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <CheckCircle className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-700 text-lg mb-2">Certificación Vigente</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Consejo Nacional Mexicano de Urología.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur p-6 rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Heart className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-700 text-lg mb-2">Miembro AUA</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Asociación Americana de Urología.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur p-6 rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Shield className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-700 text-lg mb-2">Miembro EAU</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Asociación Europea de Urología.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-white text-green-700 hover:bg-green-50 px-10 py-6 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    Consulta con el Especialista
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Contact Section */}
        <Section id="contacto" background="white" spacing="xl">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
                <div className="text-center p-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
                    ¿Tienes problemas de próstata?
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    No esperes más. Agenda tu consulta especializada y recupera tu calidad de vida 
                    con los tratamientos más avanzados.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={openWhatsApp}
                      className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Contactar por WhatsApp
                    </Button>
                    <Link href="/#contacto">
                      <Button
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 rounded-full text-lg font-medium"
                      >
                        Ver Ubicaciones
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-700 text-white py-12">
        <ResponsiveContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image
                  src="/images/urodex-logo-white.png"
                  alt="Urodex Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="text-2xl font-serif font-bold">URODEX</span>
              </div>
              <p className="text-green-100">
                Especialistas en cirugía de próstata
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contacto</h3>
              <div className="space-y-2 text-green-100">
                <p>(55) 1694 2925</p>
                <p>WhatsApp 24/7</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Síguenos</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <Link 
                  href="https://www.facebook.com/drmariomartinezuro/" 
                  target="_blank"
                  className="text-white hover:text-green-200 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://www.instagram.com/urologo.mariothomas" 
                  target="_blank"
                  className="text-white hover:text-green-200 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-green-600 mt-8 pt-6 text-center text-green-100">
            <p>© {new Date().getFullYear()} Urodex - Dr. Mario Martínez Thomas. Todos los derechos reservados.</p>
          </div>
        </ResponsiveContainer>
      </footer>
    </div>
  )
}