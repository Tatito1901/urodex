"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar } from "@/components/scroll-animations"
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
      bgColor: "from-teal-500 to-teal-700"
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
      bgColor: "from-teal-500 to-teal-700"
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
      bgColor: "from-teal-500 to-teal-700"
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
    window.open("https://api.whatsapp.com/send?phone=5215516942925&text=Hola%20dr.%20mario%20me%20gustaria%20obtener%20mas%20informacion%20acerca%20de%20sus%20servicios", "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50/80 via-white to-teal-50/20">
      <ScrollProgressBar />
      <Header activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative overflow-hidden min-h-[75vh] flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/circuncision-clinic-hero.jpg"
              alt="Clínica de Circuncisión"
              fill
              className="object-cover object-center"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-slate-900/85 to-emerald-900/80 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_35%,_rgba(0,0,0,0.4)_100%)]"></div>
          </div>

          <ResponsiveContainer className="relative z-10">
            <div className="max-w-4xl">
              <ScrollAnimation animation="fade-in-up">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/15 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium mb-6 shadow-md">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <span className="relative">Especialistas en Circuncisión Moderna</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 sm:mb-6 leading-tight tracking-tight">
                  Clínica Especializada en<br />
                  <span className="text-emerald-400">Circuncisión</span>
                </h1>
                
                <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-0 mb-6 rounded-full"></div>
                
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl font-light">
                  Procedimientos avanzados de circuncisión con tecnología láser para máxima precisión, 
                  mínimo dolor y cicatrización óptima. La solución definitiva para fimosis y balanitis.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-base font-medium shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 flex items-center w-full sm:w-auto justify-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Consulta
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-white/50 text-white hover:bg-white/10 rounded-lg px-6 py-3 text-base backdrop-blur-sm shadow-md w-full sm:w-auto justify-center"
                    onClick={() => document.getElementById("tratamientos")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Ver Procedimientos
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
          
          {/* Indicador de desplazamiento */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex">
            <div className="h-12 w-8 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
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
        <section id="contacto" className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-2xl overflow-hidden border border-emerald-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <div className="flex flex-col items-center text-center p-8 sm:p-10 lg:p-12">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-medium mb-6">
                    <Calendar className="h-4 w-4" />
                    Consulta especializada
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-800 mb-4">
                    ¿Necesitas una circuncisión?
                  </h3>
                  
                  <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-6 rounded-full"></div>
                  
                  <p className="text-base sm:text-lg text-slate-700 mb-8 max-w-xl mx-auto leading-relaxed">
                    Termina con tus problemas de balanitis y fimosis con la ayuda de nuestros especialistas. 
                    Agenda tu consulta y conoce la mejor opción para tu caso.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
                    <Button
                      onClick={openWhatsApp}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contactar por WhatsApp
                    </Button>
                    <Link href="/#contacto">
                      <Button
                        variant="outline"
                        className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-lg font-medium"
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