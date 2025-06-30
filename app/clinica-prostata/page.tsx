"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { Header } from "@/components/header"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Footer } from "@/components/footer"
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
        {/* Hero Section - Optimizado */}
        <section id="inicio" className="relative overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-center py-16 md:py-12">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/prostata-clinic-hero.jpg"
              alt="Clínica de Cirugía de Próstata"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-slate-800/90 to-emerald-800/85 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-slate-800/40 to-transparent"></div>
          </div>

          <ResponsiveContainer className="relative z-10">
            <div className="max-w-4xl px-4 md:px-0">
              <ScrollAnimation animation="fade-in-up">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                  <Shield className="h-4 w-4 text-emerald-300" />
                  Especialistas en Próstata
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  Clínica de Cirugía de Próstata
                </h1>
                
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent mx-0 mb-4 sm:mb-6 rounded-full"></div>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
                  Centro especializado en el diagnóstico y tratamiento integral de enfermedades prostáticas 
                  con <span className="font-semibold text-emerald-200">técnicas láser de última generación</span> y cirugía mínimamente invasiva.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base font-semibold shadow-xl transition-all duration-500 transform hover:scale-105 w-full sm:w-auto"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Agendar Consulta
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white/70 text-white bg-white/10 hover:bg-white/20 hover:border-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base font-semibold backdrop-blur-md shadow-lg transition-all duration-500 w-full sm:w-auto"
                    onClick={() => document.getElementById("tratamientos")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Ver Tratamientos
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
            
            {/* Indicador de scroll */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
              <div 
                className="p-2 rounded-full bg-white/20 backdrop-blur-md cursor-pointer border border-white/20"
                onClick={() => document.getElementById("tratamientos")?.scrollIntoView({ behavior: "smooth" })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Treatments Section - Optimizado */}
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
                  Soluciones Avanzadas para Próstata
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
                  Ofrecemos diagnóstico preciso y tratamientos de vanguardia para problemas prostáticos, 
                  siempre priorizando tu bienestar y recuperación rápida.
                </p>
              </div>
            </ScrollAnimation>

            {/* Información general */}
            <ScrollAnimation animation="fade-in-up">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-100/50">
                  <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-4">¿Cuándo buscar atención urológica?</h3>
                  <p className="text-slate-600 mb-6">Los problemas de próstata afectan a 1 de cada 3 hombres mayores de 50 años. Considera una consulta si presentas:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Dificultad para orinar</p>
                        <p className="text-sm text-slate-500">Chorro débil o interrumpido</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Urgencia urinaria</p>
                        <p className="text-sm text-slate-500">Necesidad súbita y frecuente</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Nicturia</p>
                        <p className="text-sm text-slate-500">Levantarse varias veces por la noche</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Tarjetas de tratamientos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              {treatments.map((treatment, index) => (
                <ScrollAnimation key={treatment.name} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-2xl p-6 sm:p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full transform hover:-translate-y-1 flex flex-col">
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

                    <div className="space-y-3 mb-6 flex-grow">
                      <h4 className="font-bold text-slate-800 mb-3">Beneficios:</h4>
                      {treatment.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-1" />
                          <span className="text-slate-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={openWhatsApp}
                      className="w-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      Consultar Procedimiento
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            {/* CTA - Llamado a la acción */}
            <ScrollAnimation animation="fade-in-up">
              <div className="mt-12 sm:mt-16 px-4 sm:px-0">
                <div className="bg-emerald-700 rounded-2xl p-6 sm:p-8 text-center shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-emerald-700/90"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                      ¿Necesita orientación sobre qué tratamiento es mejor para usted?
                    </h3>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                      Cada caso es único y requiere atención personalizada. Nuestros especialistas le guiarán hacia la mejor solución basada en su condición específica.
                    </p>
                    <Button 
                      onClick={openWhatsApp}
                      className="bg-white hover:bg-emerald-50 text-emerald-700 font-semibold py-3 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                    >
                      <Calendar className="h-5 w-5" />
                      Agendar Evaluación
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </section>

        {/* Doctor Section - Optimizada */}
        <section id="sobre-mi" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-teal-400/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center mb-10 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                  <Award className="h-4 w-4" />
                  Experiencia y Especialización
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Conozca a su Especialista
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
              </div>
            </ScrollAnimation>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-4 sm:px-0">
              <ScrollAnimation animation="fade-in-right" className="lg:w-2/5 w-full">
                <div className="relative mx-auto max-w-sm lg:max-w-none">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-white via-emerald-50 to-white rounded-2xl blur-2xl opacity-60"></div>
                  <div className="relative bg-white rounded-2xl p-2 shadow-xl">
                    <Image
                      src="/images/dr_mario_martinez.jpg"
                      alt="Dr. Mario Martínez Thomas - Especialista en Próstata"
                      width={500}
                      height={600}
                      className="rounded-xl w-full h-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                        <span className="font-bold text-base sm:text-lg">1000+</span>
                      </div>
                      <p className="text-xs font-medium">Cirugías de próstata</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-left" className="lg:w-3/5 space-y-6 px-1">
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-6 sm:p-8 border border-white/10 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100/90 p-3 rounded-full">
                      <Stethoscope className="h-6 w-6 text-emerald-700" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        Dr. Mario Martínez Thomas
                      </h2>
                      <p className="text-emerald-200 text-sm mb-4 font-medium">Cirujano Urólogo Certificado • Especialista en Próstata</p>
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                        Egresado del Centro Médico Nacional 20 de Noviembre con mención honorífica por la Universidad Nacional Autónoma de México. Con más de 15 años de experiencia especializada en salud prostática y técnicas mínimamente invasivas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
                    <div className="bg-emerald-100/80 p-2 rounded-lg mb-2">
                      <Target className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1">Certificación IRCAD</h4>
                    <p className="text-white/70 text-xs">
                      Laparoscopia urológica avanzada
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
                    <div className="bg-emerald-100/80 p-2 rounded-lg mb-2">
                      <CheckCircle className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1">Certificación CMU</h4>
                    <p className="text-white/70 text-xs">
                      Consejo Mexicano de Urología
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
                    <div className="bg-emerald-100/80 p-2 rounded-lg mb-2">
                      <Heart className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1">Miembro AUA</h4>
                    <p className="text-white/70 text-xs">
                      Asociación Americana de Urología
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
                    <div className="bg-emerald-100/80 p-2 rounded-lg mb-2">
                      <Shield className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1">Miembro EAU</h4>
                    <p className="text-white/70 text-xs">
                      Asociación Europea de Urología
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                  <h3 className="font-bold text-white text-lg mb-3">Especialización y Enfoque</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm sm:text-base">Tratamiento integral de enfermedades de la próstata</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm sm:text-base">Cirugía láser para hiperplasia prostática benigna</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm sm:text-base">Diagnóstico temprano y tratamiento de cáncer de próstata</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={openWhatsApp}
                    className="w-full bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-5 w-5" />
                    Agendar Consulta Especializada
                  </Button>
                </div>
              </ScrollAnimation>
            </div>

            {/* Testimonio destacado */}
            <ScrollAnimation animation="fade-in-up">
              <div className="mt-12 sm:mt-16 mx-auto max-w-4xl px-4 sm:px-0">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg relative">
                  <div className="absolute -top-3 -left-3 text-emerald-300 transform scale-125">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22.5H6.5C5.125 22.5 4 21.375 4 20V16C4 14.625 5.125 13.5 6.5 13.5H9.5C10.875 13.5 12 14.625 12 16V22.5ZM12 22.5C12 26.625 8.625 30 4.5 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M28 22.5H22.5C21.125 22.5 20 21.375 20 20V16C20 14.625 21.125 13.5 22.5 13.5H25.5C26.875 13.5 28 14.625 28 16V22.5ZM28 22.5C28 26.625 24.625 30 20.5 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-white/90 italic text-lg pl-8">
                    El Dr. Martínez Thomas es un profesional excepcional. Su conocimiento en problemas de próstata y la cirugía láser me permitió recuperar mi calidad de vida de forma rápida y con mínimas molestias postoperatorias.
                  </p>
                  <div className="flex items-center mt-6 pl-8">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-emerald-300 fill-current" />
                      ))}
                    </div>
                    <p className="text-white/70 text-sm ml-3">Paciente tratado con Enucleación Láser</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </section>

        {/* Contact Section - Optimizada */}
        <section id="contacto" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
                  <Phone className="h-4 w-4" />
                  Contáctanos
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  Recupera tu calidad de vida
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  Los problemas de próstata afectan significativamente tu bienestar. Agenda una consulta especializada y accede a los tratamientos más avanzados.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 px-4 sm:px-0">
              {/* Formulario de contacto rápido */}
              <div className="lg:col-span-3">
                <ScrollAnimation animation="fade-in-right">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-100/50 h-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-6">Solicita información</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                          <input 
                            type="text" 
                            id="name" 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-all"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-all"
                            placeholder="Tu número"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-all"
                          placeholder="Describe brevemente tu consulta"
                        ></textarea>
                      </div>

                      <div className="flex items-start gap-3 mt-2">
                        <input 
                          type="checkbox" 
                          id="privacy" 
                          className="mt-1 h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                        />
                        <label htmlFor="privacy" className="text-sm text-slate-500">
                          Acepto el <Link href="/aviso-de-privacidad" className="text-emerald-600 hover:underline">aviso de privacidad</Link> y el tratamiento de mis datos personales para fines de contacto.
                        </label>
                      </div>

                      <Button
                        onClick={openWhatsApp}
                        className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-teal-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl mt-3"
                      >
                        Enviar Mensaje
                      </Button>
                      <p className="text-xs text-center text-slate-500 mt-2">Recibirás respuesta en menos de 24 horas hábiles</p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
              
              {/* Información de contacto */}
              <div className="lg:col-span-2">
                <ScrollAnimation animation="fade-in-left">
                  <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 rounded-2xl p-6 sm:p-8 shadow-xl h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-pattern opacity-5"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">¿Prefieres WhatsApp?</h3>
                      
                      <div className="space-y-6">
                        <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                          <h4 className="text-emerald-200 font-semibold mb-1">Horarios de Atención</h4>
                          <p className="text-white">Lunes a Viernes: 9:00 - 19:00</p>
                          <p className="text-white">Sábados: 9:00 - 14:00</p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-emerald-200 font-semibold">Contáctanos directamente</h4>
                          <Button
                            onClick={openWhatsApp}
                            className="w-full bg-white hover:bg-emerald-50 text-emerald-700 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                          >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.5 14.4l-2.8-1.4c-.3-.1-.6-.1-.8.1l-1.3 1.3c-.2.2-.5.3-.8.1-1-.5-1.9-1.2-2.7-2-.7-.8-1.4-1.8-1.9-2.7-.2-.3-.1-.6.1-.8l1.3-1.3c.2-.2.2-.5.1-.8L7.4 3.5C7.1 3 6.5 2.8 6 3c-.7.3-1.4.8-1.9 1.5C3.5 5.3 3.3 6.2 3.5 7c.9 3.3 2.7 6.5 5.1 8.9 2.4 2.4 5.5 4.2 8.9 5.1.8.2 1.7 0 2.5-.4s1.4-1.1 1.7-1.9c.2-.5 0-1.2-.5-1.5l-2.7-2.8z" />
                            </svg>
                            WhatsApp Directo
                          </Button>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 right-4 opacity-30">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM78.3 68.9L73.5 73.7C72.5 74.7 69.5 75.7 69.4 75.7C58.2 79.9 45.8 79.9 34.6 75.5C28.1 72.9 22.1 69 17.1 64C12.2 59.1 8.3 53.2 5.6 46.7C1.2 35.4 1.2 23 5.4 11.7C5.4 11.6 6.4 8.6 7.4 7.6L12.2 2.8C13.8 1.3 16.5 1.3 18 2.8L28.9 13.7C30.5 15.3 30.5 18 28.9 19.5L23.1 25.3C25.5 36.5 34.6 45.7 45.8 48L51.6 42.2C53.2 40.7 55.9 40.7 57.4 42.2L68.3 53.1C69.9 54.8 69.9 57.4 68.3 59L62.5 64.8C67.1 66.2 73.4 69.6 78.2 69.1C78.7 69 79 68.9 78.3 68.9Z" fill="currentColor"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>

            <ScrollAnimation animation="fade-in-up" delay={300}>
              <div className="mt-12 px-4 sm:px-0 text-center">
                <p className="text-slate-500 text-sm">
                  ¿Prefieres agendar una consulta presencial? <Link href="/#contacto" className="text-emerald-600 hover:underline font-medium">Ver nuestras ubicaciones</Link>
                </p>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </section>
      </main>
      <Footer />
    </div>
  )
}