"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { Header } from "@/components/header"
import { Section } from "@/components/section"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer" 
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
  Lock,
  Zap,
  Target,
  Eye,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function ClinicaVPH() {
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
      name: "Electrocauterización",
      description: "Remoción de lesiones utilizando corriente eléctrica controlada.",
      duration: "20-45 minutos",
      recovery: "2-3 semanas",
      benefits: [
        "Procedimiento ambulatorio",
        "Alta precisión",
        "Resultados inmediatos",
        "Mínimo sangrado"
      ],
      icon: <Zap className="h-6 w-6 text-emerald-700" />
    },
    {
      name: "Láser CO2",
      description: "Tratamiento de precisión para eliminar verrugas y lesiones por VPH.",
      duration: "30-60 minutos",
      recovery: "1-3 semanas",
      benefits: [
        "Tecnología láser avanzada",
        "Mínimo dolor",
        "Cicatrización superior",
        "Preservación del tejido sano"
      ],
      icon: <Target className="h-6 w-6 text-emerald-700" />
    }
  ]

  const vphInfo = [
    {
      title: "¿Qué es el VPH?",
      description: "El Virus del Papiloma Humano (VPH) es una infección viral común que puede afectar la piel y las mucosas. Existen más de 100 tipos diferentes, algunos de los cuales pueden causar verrugas genitales o cambios celulares que podrían derivar en cáncer.",
      icon: <Eye className="h-5 w-5 text-emerald-700" />
    },
    {
      title: "Detección Temprana",
      description: "La detección temprana del VPH es crucial para un tratamiento efectivo. Realizamos diagnósticos precisos utilizando técnicas avanzadas de identificación viral y evaluación de lesiones.",
      icon: <Target className="h-5 w-5 text-emerald-700" />
    },
    {
      title: "Tratamiento Confidencial",
      description: "Entendemos la importancia de la privacidad en estos casos. Ofrecemos un ambiente completamente confidencial y profesional, con atención personalizada y discreta.",
      icon: <Lock className="h-5 w-5 text-emerald-700" />
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
              src="/images/vph-clinic-hero.jpg"
              alt="Clínica de VPH"
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
                  <Shield className="h-4 w-4 text-emerald-300" />
                  Tratamiento Especializado VPH
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Clínica de VPH
                </h1>
                
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent mx-0 mb-6 rounded-full"></div>
                
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
                  Diagnóstico temprano y tratamiento especializado del Virus del Papiloma Humano 
                  con tecnología de última generación en un ambiente confidencial y profesional.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium shadow-xl transition-all duration-500 transform hover:scale-105"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Consulta Confidencial
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

        {/* VPH Information Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
                  <Eye className="h-4 w-4" />
                  Información sobre VPH
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  Conoce Más sobre el VPH
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
                  La información correcta es el primer paso hacia un tratamiento exitoso. 
                  Te explicamos todo lo que necesitas saber de manera clara y profesional.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              {vphInfo.map((info, index) => (
                <ScrollAnimation key={info.title} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-2xl p-6 sm:p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      {info.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-4">
                      {info.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </section>

        {/* Treatments Section */}
        <section id="tratamientos" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-teal-400/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                  <Stethoscope className="h-4 w-4" />
                  Tratamientos Disponibles
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Tecnología de Vanguardia
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-light">
                  Utilizamos las técnicas más avanzadas y efectivas para el tratamiento del VPH, 
                  garantizando resultados óptimos con el mínimo discomfort.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 sm:px-0">
              {treatments.map((treatment, index) => (
                <ScrollAnimation key={treatment.name} animation="fade-in-up" delay={index * 200}>
                  <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-emerald-500/20 transition-all duration-500 border border-white/10 hover:border-white/20 transform hover:-translate-y-1 h-full">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        {treatment.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                        {treatment.name}
                      </h3>
                      <p className="text-white/80 leading-relaxed mb-6">
                        {treatment.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-3 rounded-xl">
                        <span className="font-medium text-white/90">Duración</span>
                        <span className="font-bold text-emerald-300">{treatment.duration}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-3 rounded-xl">
                        <span className="font-medium text-white/90">Recuperación</span>
                        <span className="font-bold text-emerald-300">{treatment.recovery}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-bold text-white mb-4">Beneficios:</h4>
                      {treatment.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-white/80">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={openWhatsApp}
                      className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      Consultar Tratamiento
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </section>

        {/* Doctor Section */}
        <section id="sobre-mi" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <ScrollAnimation animation="fade-in-right" className="lg:w-2/5">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 via-emerald-50 to-white rounded-2xl blur-2xl opacity-60"></div>
                  <div className="relative bg-white rounded-2xl p-2 shadow-xl">
                    <Image
                      src="/images/dr_mario_martinez.jpg"
                      alt="Dr. Mario Martínez Thomas - Especialista en VPH"
                      width={500}
                      height={600}
                      className="rounded-xl w-full h-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-4 rounded-xl shadow-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-5 w-5" />
                        <span className="font-bold text-lg">100%</span>
                      </div>
                      <p className="text-xs font-medium">Confidencial</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-left" className="lg:w-3/5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
                    <Lock className="h-4 w-4" />
                    Atención Confidencial
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                    Dr. Mario Martínez Thomas
                  </h2>
                  <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mb-6 rounded-full"></div>
                  <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                    Cirujano Urólogo egresado de CMN 20 de Noviembre, con mención honorífica otorgada 
                    por la Universidad Nacional Autónoma de México. Especialista en el tratamiento discreto 
                    y efectivo del VPH con las técnicas más avanzadas.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-white via-emerald-50/30 to-white p-6 rounded-xl border border-emerald-100/50 shadow-md">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-4">¿Por qué elegirnos?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">Experiencia Comprobada</h4>
                        <p className="text-slate-600">Más de 15 años tratando casos de VPH con éxito.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">Tecnología Avanzada</h4>
                        <p className="text-slate-600">Equipos de última generación para tratamientos precisos.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">Ambiente Confidencial</h4>
                        <p className="text-slate-600">Privacidad absoluta y atención personalizada.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">Seguimiento Integral</h4>
                        <p className="text-slate-600">Acompañamiento durante todo el proceso de tratamiento.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-teal-500 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Lock className="h-5 w-5 mr-2" />
                    Consulta Confidencial
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-emerald-100/50">
                <div className="text-center p-8 sm:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-6">
                    ¿Necesitas tratamiento para VPH?
                  </h3>
                  <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    No posterges tu salud. Agenda una consulta confidencial y recibe 
                    el tratamiento especializado que necesitas en un ambiente profesional y discreto.
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
      <Footer />
    </div>
  )
}