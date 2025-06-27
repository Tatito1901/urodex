"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { Header } from "@/components/header"
import { Section } from "@/components/section"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Button } from "@/components/ui/button"
import {
  Phone,
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
  Award,
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
    window.open("https://api.whatsapp.com/send?phone=5215516942925&text=Hola%20dr.%20mario%20me%20gustaria%20obtener%20mas%20informacion%20acerca%20de%20sus%20servicios", "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50/80 via-white to-emerald-50/20">
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
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-slate-800/90 to-emerald-800/85 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>
          </div>

          <ResponsiveContainer className="relative z-10">
            <div className="max-w-4xl">
              <ScrollAnimation animation="fade-in-up">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium mb-4 shadow-lg">
                  <Target className="h-4 w-4 text-emerald-300" />
                  Especialistas en Próstata
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Clínica de Cirugía de Próstata
                </h1>
                
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent mx-0 mb-6 rounded-full"></div>
                
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
                  Centro especializado en el diagnóstico y tratamiento integral de enfermedades prostáticas 
                  con técnicas láser de última generación y cirugía mínimamente invasiva.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium shadow-xl transition-all duration-500 transform hover:scale-105"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Agendar Consulta
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white/70 text-white bg-white/10 hover:bg-white/20 hover:border-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg backdrop-blur-md shadow-lg transition-all duration-500"
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
        <section id="tratamientos" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
                  <Stethoscope className="h-4 w-4" />
                  Tratamientos Especializados
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  Procedimientos de Vanguardia
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
                  Ofrecemos los tratamientos más avanzados para problemas prostáticos, 
                  garantizando los mejores resultados con la máxima seguridad.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              {treatments.map((treatment, index) => (
                <ScrollAnimation key={treatment.name} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-2xl p-6 sm:p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Zap className="h-6 w-6 text-emerald-700" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-3">
                        {treatment.name}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {treatment.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                        <span className="font-medium text-slate-700">Duración</span>
                        <span className="font-bold text-emerald-700">{treatment.duration}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                        <span className="font-medium text-slate-700">Recuperación</span>
                        <span className="font-bold text-emerald-700">{treatment.recovery}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-bold text-slate-800 mb-3">Beneficios:</h4>
                      {treatment.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={openWhatsApp}
                      className="w-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Consultar Procedimiento
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </section>

        {/* Doctor Section */}
        <section id="sobre-mi" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-teal-400/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <ScrollAnimation animation="fade-in-right" className="lg:w-2/5">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-white via-emerald-50 to-white rounded-2xl blur-2xl opacity-60"></div>
                  <div className="relative bg-white rounded-2xl p-2 shadow-xl">
                    <Image
                      src="/images/dr_mario_martinez.jpg"
                      alt="Dr. Mario Martínez Thomas - Especialista en Próstata"
                      width={500}
                      height={600}
                      className="rounded-xl w-full h-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-4 rounded-xl shadow-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="font-bold text-lg">1000+</span>
                      </div>
                      <p className="text-xs font-medium">Cirugías de próstata</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-left" className="lg:w-3/5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                    <Award className="h-4 w-4" />
                    Especialista en Próstata
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    Dr. Mario Martínez Thomas
                  </h2>
                  <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 mb-6 rounded-full"></div>
                  <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                    Cirujano Urólogo egresado de CMN 20 de Noviembre, con mención honorífica otorgada 
                    por la Universidad Nacional Autónoma de México. Mi compromiso es ofrecer la más 
                    alta calidad en atención urológica, combinando experiencia clínica con las técnicas más avanzadas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <Target className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Certificación IRCAD</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Laparoscopia urológica avanzada en IRCAD Latinoamérica.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Certificación Vigente</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Consejo Nacional Mexicano de Urología.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <Heart className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Miembro AUA</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Asociación Americana de Urología.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <Shield className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Miembro EAU</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Asociación Europea de Urología.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Consulta con el Especialista
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-emerald-100/50">
                <div className="text-center p-8 sm:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-6">
                    ¿Tienes problemas de próstata?
                  </h3>
                  <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    No esperes más. Agenda tu consulta especializada y recupera tu calidad de vida 
                    con los tratamientos más avanzados.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={openWhatsApp}
                      className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Contactar por WhatsApp
                    </Button>
                    <Link href="/#contacto">
                      <Button
                        variant="outline"
                        className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-medium"
                      >
                        Ver Ubicaciones
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="py-8 relative z-10">
          <ResponsiveContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <Image
                    src="/images/urodex-logo-white.png"
                    alt="Urodex Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <span className="text-xl font-serif font-bold">URODEX</span>
                </div>
                <p className="text-white/80">
                  Especialistas en cirugía de próstata
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-4">Contacto</h3>
                <div className="space-y-2 text-white/70">
                  <p>(55) 1694 2925</p>
                  <p>WhatsApp 24/7</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Síguenos</h3>
                <div className="flex justify-center md:justify-start space-x-3">
                  <Link 
                    href="https://www.facebook.com/drmariomartinezuro/" 
                    target="_blank"
                    className="text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-emerald-600/20 transform hover:scale-110"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link 
                    href="https://www.instagram.com/urologo.mariothomas" 
                    target="_blank"
                    className="text-white/80 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-emerald-600/20 transform hover:scale-110"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 mt-6 pt-4 text-center text-white/70">
              <p>© {new Date().getFullYear()} Urodex - Dr. Mario Martínez Thomas. Todos los derechos reservados.</p>
            </div>
          </ResponsiveContainer>
        </div>
      </footer>
    </div>
  )
}