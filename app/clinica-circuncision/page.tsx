"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar } from "@/components/scroll-animations"
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
  Users,
  Zap,
  Target,
  Heart,
  Activity,
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
      icon: <Shield className="h-8 w-8 text-white" />,
      bgColor: "from-blue-600 to-blue-700"
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
      icon: <Zap className="h-8 w-8 text-white" />,
      bgColor: "from-green-600 to-green-700"
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
      icon: <Target className="h-8 w-8 text-white" />,
      bgColor: "from-purple-600 to-purple-700"
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50/30 to-white">
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
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 via-green-700/85 to-green-600/80"></div>
          </div>

          <ResponsiveContainer className="relative z-10">
            <div className="max-w-4xl">
              <ScrollAnimation animation="fade-in-up">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded-full px-6 py-3 text-sm font-medium mb-6">
                  <Users className="h-4 w-4" />
                  Especialistas en Circuncisión
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Clínica de Circuncisión
                </h1>
                
                <div className="w-32 h-1 bg-white mb-8"></div>
                
                <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-8 max-w-3xl">
                  Procedimientos de circuncisión con tecnología láser para máxima precisión, 
                  mínimo dolor y cicatrización óptima. Solución definitiva para fimosis y balanitis.
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
                    Ver Procedimientos
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Conditions Section */}
        <Section background="white" spacing="xl" hasDivider={true} dividerType="wave">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Activity className="h-4 w-4" />
                  Condiciones que Tratamos
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-green-700 mb-6">
                  Soluciones Definitivas
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Tratamos diversas condiciones del prepucio y glande con técnicas especializadas 
                  para restaurar la función normal y mejorar la calidad de vida.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {conditions.map((condition, index) => (
                <ScrollAnimation key={condition.title} animation="fade-in-up" delay={index * 150}>
                  <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 border-2 border-green-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="bg-green-100 p-4 rounded-xl w-fit mb-6">
                      <Heart className="h-8 w-8 text-green-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-4">
                      {condition.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {condition.description}
                    </p>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Síntomas comunes:</h4>
                      <ul className="space-y-2">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                            <span className="text-gray-700 text-sm">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Treatments Section */}
        <Section id="tratamientos" background="gray" spacing="xl" hasDivider={true} dividerType="curve">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                  <Stethoscope className="h-4 w-4" />
                  Procedimientos Disponibles
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                  Técnicas Especializadas
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Ofrecemos diferentes técnicas de circuncisión adaptadas a cada caso específico, 
                  garantizando los mejores resultados estéticos y funcionales.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {treatments.map((treatment, index) => (
                <ScrollAnimation key={treatment.name} animation="fade-in-up" delay={index * 150}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 hover:shadow-3xl transition-all duration-500 h-full">
                    {/* Header with gradient background */}
                    <div className={`bg-gradient-to-r ${treatment.bgColor} p-8 text-white text-center`}>
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                        {treatment.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        {treatment.name}
                      </h3>
                      <p className="text-white/90 leading-relaxed">
                        {treatment.description}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                          <span className="font-medium text-gray-700">Duración</span>
                          <span className="font-bold text-green-700">{treatment.duration}</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                          <span className="font-medium text-gray-700">Recuperación</span>
                          <span className="font-bold text-green-700">{treatment.recovery}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8">
                        <h4 className="font-bold text-gray-800 mb-4">Beneficios:</h4>
                        {treatment.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={openWhatsApp}
                        className={`w-full bg-gradient-to-r ${treatment.bgColor} hover:opacity-90 text-white py-4 rounded-full font-medium transition-all duration-300 text-lg`}
                      >
                        Consultar Procedimiento
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Doctor Section */}
        <Section id="sobre-mi" background="white" spacing="xl" hasDivider={true} dividerType="angle">
          <ResponsiveContainer>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <ScrollAnimation animation="fade-in-right" className="lg:w-2/5">
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-to-tr from-green-100 via-green-50 to-white rounded-3xl blur-2xl opacity-60"></div>
                  <div className="relative bg-white rounded-3xl p-3 shadow-2xl">
                    <Image
                      src="/images/doctor-profile.png"
                      alt="Dr. Mario Martínez Thomas - Especialista en Circuncisión"
                      width={500}
                      height={600}
                      className="rounded-2xl w-full h-auto"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-6 w-6" />
                        <span className="font-bold text-2xl">500+</span>
                      </div>
                      <p className="text-sm font-medium">Circuncisiones</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-left" className="lg:w-3/5 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
                    <Award className="h-4 w-4" />
                    Especialista en Circuncisión
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-green-700 mb-6">
                    Dr. Mario Martínez Thomas
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mb-8"></div>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Cirujano Urólogo egresado de CMN 20 de Noviembre, con mención honorífica otorgada 
                    por la Universidad Nacional Autónoma de México. Especialista en circuncisión con 
                    técnicas tradicionales y láser para resultados óptimos.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100">
                  <h3 className="text-2xl font-bold text-green-700 mb-6">Nuestra Experiencia</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-700 mb-2">500+</div>
                      <p className="text-gray-600">Circuncisiones realizadas</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-700 mb-2">15+</div>
                      <p className="text-gray-600">Años de experiencia</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-700 mb-2">98%</div>
                      <p className="text-gray-600">Pacientes satisfechos</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-700 mb-2">3</div>
                      <p className="text-gray-600">Técnicas disponibles</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Resultados Estéticos Superiores</h4>
                      <p className="text-gray-600">Técnicas refinadas para resultados naturales y estéticamente agradables.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Tecnología Láser Avanzada</h4>
                      <p className="text-gray-600">Equipos de última generación para procedimientos más precisos y cómodos.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Recuperación Optimizada</h4>
                      <p className="text-gray-600">Protocolos especializados para una recuperación más rápida y cómoda.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={openWhatsApp}
                    className="bg-green-700 hover:bg-green-600 text-white px-10 py-6 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    Consulta Especializada
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Contact Section */}
        <Section id="contacto" background="primary-light" spacing="xl">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl overflow-hidden border border-green-100">
                <div className="text-center p-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
                    ¿Necesitas una circuncisión?
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Termina con tus problemas de balanitis y fimosis con la ayuda de nuestros especialistas. 
                    Agenda tu consulta y conoce la mejor opción para tu caso.
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
                Especialistas en circuncisión
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