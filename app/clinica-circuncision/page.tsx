"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar } from "@/components/scroll-animations"
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
  Users,
  Zap,
  Target,
  Heart,
  Activity,
  Award,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollAnimation } from "@/components/scroll-animations"

export default function ClinicaCircuncision() {
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
      name: "Circuncisión Tradicional",
      description: "Procedimiento clásico realizado con técnica refinada y cuidado excepcional.",
      duration: "45-60 minutos",
      recovery: "2-3 semanas",
      benefits: [
        "Técnica probada y segura",
        "Resultados estéticos excelentes",
        "Procedimiento ambulatorio",
        "Anestesia local"
      ],
      icon: <Shield className="h-6 w-6 text-white" />,
      bgColor: "from-emerald-600 to-teal-700"
    },
    {
      name: "Circuncisión con Láser",
      description: "Tecnología láser de última generación para resultados superiores.",
      duration: "30-45 minutos",
      recovery: "1-2 semanas",
      benefits: [
        "Tecnología láser avanzada",
        "Mínimo dolor post-operatorio",
        "Cicatrización óptima",
        "Menor tiempo de recuperación"
      ],
      icon: <Zap className="h-6 w-6 text-white" />,
      bgColor: "from-slate-600 to-emerald-700"
    },
    {
      name: "Frenuloplastía",
      description: "Corrección del frenillo para mejorar función y comodidad.",
      duration: "30-45 minutos",
      recovery: "1-2 semanas",
      benefits: [
        "Preserva tejido prepucial",
        "Mejora la función sexual",
        "Técnica conservadora",
        "Resultados naturales"
      ],
      icon: <Target className="h-6 w-6 text-white" />,
      bgColor: "from-teal-600 to-slate-700"
    }
  ]

  const conditions = [
    {
      title: "Fimosis",
      description: "Estrechez del prepucio que impide su retracción normal sobre el glande.",
      symptoms: ["Dificultad para retraer el prepucio", "Dolor durante las relaciones", "Infecciones recurrentes"]
    },
    {
      title: "Balanitis",
      description: "Inflamación del glande y prepucio, frecuentemente recurrente.",
      symptoms: ["Enrojecimiento e hinchazón", "Secreción con mal olor", "Picazón y ardor"]
    },
    {
      title: "Parafimosis",
      description: "Imposibilidad de devolver el prepucio a su posición normal.",
      symptoms: ["Prepucio retraído y apretado", "Dolor intenso", "Hinchazón del glande"]
    }
  ]

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50/80 via-white to-emerald-50/20">
      <ScrollProgressBar />
      <Header activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/circuncision-clinic-hero.jpg"
              alt="Clínica de Circuncisión"
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
                  <Users className="h-4 w-4 text-emerald-300" />
                  Especialistas en Circuncisión
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Clínica de Circuncisión
                </h1>
                
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent mx-0 mb-6 rounded-full"></div>
                
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
                  Procedimientos de circuncisión con tecnología láser para máxima precisión, 
                  mínimo dolor y cicatrización óptima. Solución definitiva para fimosis y balanitis.
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
                    Ver Procedimientos
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Conditions Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
                  <Activity className="h-4 w-4" />
                  Condiciones que Tratamos
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  Soluciones Definitivas
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
                  Tratamos diversas condiciones del prepucio y glande con técnicas especializadas 
                  para restaurar la función normal y mejorar la calidad de vida.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              {conditions.map((condition, index) => (
                <ScrollAnimation key={condition.title} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-2xl p-6 sm:p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <Heart className="h-6 w-6 text-emerald-700" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-4">
                      {condition.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {condition.description}
                    </p>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3">Síntomas comunes:</h4>
                      <ul className="space-y-2">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-1" />
                            <span className="text-slate-700 text-sm">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </section>

        {/* Treatments Section */}
        <section id="tratamientos" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
                  <Stethoscope className="h-4 w-4" />
                  Procedimientos Disponibles
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  Técnicas Especializadas
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
                  Ofrecemos diferentes técnicas de circuncisión adaptadas a cada caso específico, 
                  garantizando los mejores resultados estéticos y funcionales.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              {treatments.map((treatment, index) => (
                <ScrollAnimation key={treatment.name} animation="fade-in-up" delay={index * 150}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 h-full transform hover:-translate-y-1">
                    {/* Header with gradient background */}
                    <div className={`bg-gradient-to-r ${treatment.bgColor} p-6 text-white text-center`}>
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                        {treatment.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">
                        {treatment.name}
                      </h3>
                      <p className="text-white/90 leading-relaxed">
                        {treatment.description}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                          <span className="font-medium text-slate-700">Duración</span>
                          <span className="font-bold text-emerald-700">{treatment.duration}</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                          <span className="font-medium text-slate-700">Recuperación</span>
                          <span className="font-bold text-emerald-700">{treatment.recovery}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <h4 className="font-bold text-slate-800 mb-4">Beneficios:</h4>
                        {treatment.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                            <span className="text-slate-700">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={openWhatsApp}
                        className={`w-full bg-gradient-to-r ${treatment.bgColor} hover:opacity-90 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg`}
                      >
                        Consultar Procedimiento
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
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
                  <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 via-emerald-50 to-white rounded-2xl blur-2xl opacity-60"></div>
                  <div className="relative bg-white rounded-2xl p-2 shadow-xl">
                    <Image
                      src="/images/dr_mario_martinez.jpg"
                      alt="Dr. Mario Martínez Thomas - Especialista en Circuncisión"
                      width={500}
                      height={600}
                      className="rounded-xl w-full h-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-4 rounded-xl shadow-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-5 w-5" />
                        <span className="font-bold text-lg">500+</span>
                      </div>
                      <p className="text-xs font-medium">Circuncisiones</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-left" className="lg:w-3/5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                    <Award className="h-4 w-4" />
                    Especialista en Circuncisión
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    Dr. Mario Martínez Thomas
                  </h2>
                  <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 mb-6 rounded-full"></div>
                  <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                    Cirujano Urólogo egresado de CMN 20 de Noviembre, con mención honorífica otorgada 
                    por la Universidad Nacional Autónoma de México. Especialista en circuncisión con 
                    técnicas tradicionales y láser para resultados óptimos.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-6">Nuestra Experiencia</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-300 mb-2">500+</div>
                      <p className="text-white/80 text-sm">Circuncisiones realizadas</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-300 mb-2">15+</div>
                      <p className="text-white/80 text-sm">Años de experiencia</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-300 mb-2">98%</div>
                      <p className="text-white/80 text-sm">Pacientes satisfechos</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-300 mb-2">3</div>
                      <p className="text-white/80 text-sm">Técnicas disponibles</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Resultados Estéticos Superiores</h4>
                      <p className="text-white/80">Técnicas refinadas para resultados naturales y estéticamente agradables.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Tecnología Láser Avanzada</h4>
                      <p className="text-white/80">Equipos de última generación para procedimientos más precisos y cómodos.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Recuperación Optimizada</h4>
                      <p className="text-white/80">Protocolos especializados para una recuperación más rápida y cómoda.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Consulta Especializada
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
                    ¿Necesitas una circuncisión?
                  </h3>
                  <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    Termina con tus problemas de balanitis y fimosis con la ayuda de nuestros especialistas. 
                    Agenda tu consulta y conoce la mejor opción para tu caso.
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
                  Especialistas en circuncisión
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