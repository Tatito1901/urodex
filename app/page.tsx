"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { QuienSoySection } from "@/components/quien-soy-section"
import { TratamientosSection } from "@/components/tratamientos-section"
import { ClinicasSection } from "@/components/clinicas-section"
import { InstalacionesSection } from "@/components/instalaciones-section"
import { FAQSection } from "@/components/faq-section"
import { ContactoSection } from "@/components/contacto-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Section } from "@/components/section"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Shield, Star, MapPinned, Calendar, Play, Pause, Clock, ArrowRight, Award, Building2, Camera, CheckCircle, Facebook, Instagram, MapPin, Users } from "lucide-react"
import Image from "next/image"
import { ScrollAnimation, ParallaxEffect } from "@/components/scroll-animations"
import { HomeBlogSection } from "@/components/home-blog-section"
import { GoogleMap } from "@/components/google-map"
import Link from "next/dist/client/link"
import { CancerUrologicoSvg, CalculosViaSvg, EyaculacionPrecozSvg, InfeccionViasSvg, QuisteEpididimoSvg, CircuncisionLaserSvg, HiperplasiaSvg, ItsSvg } from "@/components/service-svgs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [selectedLocation, setSelectedLocation] = useState("polanco")
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    celular: "",
    diagnostico: "",
    comentarios: ""
  })

  const locations = {
    polanco: {
      name: "Polanco",
      address: "Temístocles 210, Polanco, Ciudad de México",
      schedule: {
        weekdays: "9:00 AM - 7:00 PM",
        saturday: "9:00 AM - 2:00 PM",
      },
      phone: "(55) 1694 2925",
      mapUrl: "https://maps.app.goo.gl/YFminzdq8uixrNxB9?g_st=com.google.maps.preview.copy"
    },
    satelite: {
      name: "Ciudad Satélite",
      address: "Cto Centro Comercial 20, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.",
      schedule: {
        weekdays: "9:00 AM - 7:00 PM",
        saturday: "9:00 AM - 2:00 PM",
      },
      phone: "(55) 1694 2925",
      mapUrl: "https://maps.app.goo.gl/Yx5Yx5Yx5Yx5Yx5Y6"
    },
    intermed: {
      name: "INTERMED",
      address: "Calz de Guadalupe 442, Industrial, Gustavo A. Madero, 07800 Ciudad de México, CDMX",
      schedule: {
        weekdays: "9:00 AM - 7:00 PM",
        saturday: "9:00 AM - 2:00 PM",
      },
      phone: "(55) 5739 3939",
      mapUrl: "https://maps.app.goo.gl/IntermedLocation"
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "sobre-mi", "servicios", "clinicas", "instalaciones", "contacto"]
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (typeof rect.top === 'number' && typeof rect.bottom === 'number' && rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getServiceIcon = (serviceName: string, className: string) => {
    const icons = {
      "Cáncer urológico": <CancerUrologicoSvg className={className} />,
      "Cálculos en vía urinaria": <CalculosViaSvg className={className} />,
      "Eyaculación Precoz": <EyaculacionPrecozSvg className={className} />,
      "Infección de Vías Urinarias": <InfeccionViasSvg className={className} />,
      "Quiste de Epidídimo": <QuisteEpididimoSvg className={className} />,
      "Circuncisión con Láser": <CircuncisionLaserSvg className={className} />,
      "Hiperplasia Prostática Benigna": <HiperplasiaSvg className={className} />,
      "Infecciones de Transmisión Sexual": <ItsSvg className={className} />,
    }
    return icons[serviceName as keyof typeof icons] || <Award className={className} />
  }

  const services = [
    {
      name: "Cáncer urológico",
      description: "Diagnóstico temprano y tratamiento integral de cáncer en próstata, vejiga, riñón y testículos con técnicas mínimamente invasivas.",
      highlights: ["Detección temprana", "Cirugía robótica", "Seguimiento integral"]
    },
    {
      name: "Hiperplasia Prostática Benigna",
      description: "Tratamiento especializado del agrandamiento prostático con técnicas láser de última generación.",
      highlights: ["Cirugía láser", "Recuperación rápida", "Resultados duraderos"]
    },
    {
      name: "Cálculos en vía urinaria",
      description: "Eliminación de piedras renales mediante litotricia láser y técnicas endoscópicas avanzadas.",
      highlights: ["Sin incisiones", "Tecnología láser", "Alta efectividad"]
    },
    {
      name: "Circuncisión con Láser",
      description: "Procedimiento preciso con tecnología láser para máximo confort y recuperación rápida.",
      highlights: ["Tecnología láser", "Mínimo dolor", "Cicatrización óptima"]
    },
    {
      name: "Infección de Vías Urinarias",
      description: "Diagnóstico preciso y tratamiento efectivo de infecciones urinarias recurrentes.",
      highlights: ["Diagnóstico certero", "Tratamiento dirigido", "Prevención"]
    },
    {
      name: "Eyaculación Precoz",
      description: "Enfoque integral con técnicas modernas para mejorar la función sexual masculina.",
      highlights: ["Tratamiento personalizado", "Enfoque integral", "Resultados probados"]
    },
    {
      name: "Quiste de Epidídimo",
      description: "Cirugía microscópica especializada preservando la función reproductiva.",
      highlights: ["Cirugía microscópica", "Preservación función", "Técnica especializada"]
    },
    {
      name: "Infecciones de Transmisión Sexual",
      description: "Diagnóstico confidencial y tratamiento especializado de ITS con seguimiento completo.",
      highlights: ["Confidencialidad", "Diagnóstico completo", "Seguimiento"]
    },
  ]

  const facilityImages = [
    {
      id: 1,
      src: "/images/consultorio-1.jpg",
      alt: "Consultorio médico moderno",
      caption: "Consultorio equipado con tecnología de vanguardia"
    },
    {
      id: 2,
      src: "/images/sala-espera.jpg",
      alt: "Sala de espera cómoda",
      caption: "Ambiente relajante para nuestros pacientes"
    },
    {
      id: 3,
      src: "/images/quirofano.jpg",
      alt: "Quirófano especializado",
      caption: "Quirófano con tecnología láser avanzada"
    },
    {
      id: 4,
      src: "/images/recepcion.jpg",
      alt: "Área de recepción",
      caption: "Recepción con atención personalizada"
    }
  ]

  const currentLocation = locations[selectedLocation as keyof typeof locations]

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('¡Gracias! Nos pondremos en contacto contigo muy pronto.')
        setFormData({
          nombre: "",
          correo: "",
          celular: "",
          diagnostico: "",
          comentarios: ""
        })
      }
    } catch (error) {
      console.error('Error:', error)
      openWhatsApp()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <ScrollProgressBar />
      <CustomCursor />
      <Header activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero Section - Gradiente sofisticado con overlay profesional */}
        <section id="inicio" className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video
              src="/images/Video_Quirúrgico_Urología_Moderna (1).mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full absolute inset-0"
              poster="/images/doctor-profile.png"
            />
            {/* Gradiente más elegante y profesional */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-slate-800/90 to-emerald-800/85 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>
          </div>

          <ResponsiveContainer className="py-8 sm:py-12 md:py-20 lg:py-28 relative flex flex-col justify-center min-h-[calc(100dvh-5rem)] sm:min-h-screen">
            <ScrollAnimation animation="fade-in-up" className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 z-30 relative px-4 sm:px-6">
              <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium mb-6 shadow-2xl">
                <Shield className="h-5 w-5 text-emerald-300" /> 
                Cirujano Urólogo Certificado
              </div>

              <div className="bg-gradient-to-br from-white/10 to-emerald-900/20 backdrop-blur-lg py-8 sm:py-12 px-6 sm:px-8 md:px-12 rounded-3xl sm:rounded-[2rem] border border-white/10 shadow-2xl">
                <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white mb-6 sm:mb-8 leading-tight">
                  Dr. Mario Martínez Thomas
                </h1>
                <div className="w-32 sm:w-40 h-1.5 bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent mx-auto mb-6 sm:mb-8 rounded-full" />
                <p className="text-white/95 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-4xl mx-auto">
                  Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pt-8 sm:pt-12 justify-center">
                <Button
                  className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 rounded-full px-8 sm:px-12 py-5 sm:py-7 shadow-2xl text-lg sm:text-xl md:text-2xl font-medium tracking-wide transition-all duration-500 transform hover:scale-105 hover:shadow-emerald-500/25 w-full sm:w-auto"
                  onClick={openWhatsApp}
                >
                  <Phone className="h-6 w-6 mr-3" />
                  Agenda por WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white/70 text-white bg-white/10 hover:bg-white/20 hover:border-white rounded-full px-8 sm:px-12 py-5 sm:py-7 text-lg sm:text-xl md:text-2xl font-medium backdrop-blur-md shadow-xl tracking-wide transition-all duration-500 transform hover:scale-105 w-full sm:w-auto"
                  onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Conocer Servicios
                </Button>
              </div>
            </ScrollAnimation>

            <div className="absolute top-8 right-8 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-emerald-700/90 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4 shadow-2xl flex items-center gap-4 z-30">
              <Star className="h-6 w-6 text-yellow-300 fill-current" />
              <span className="text-white font-semibold tracking-wide text-lg">15+ Años de Experiencia</span>
            </div>
          </ResponsiveContainer>
        </section>

        <QuienSoySection />
        <TratamientosSection />

        {/* Specialized Clinics Section - Fondo elegante con gradiente sutil */}
        <section id="clinicas" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-white overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-20 px-4 sm:px-0">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold mb-6 sm:mb-8 shadow-lg">
                  <Users className="h-5 w-5" />
                  Clínicas Especializadas
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight">
                  Centros de Excelencia Médica
                </h2>
                <div className="w-32 sm:w-40 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-6 sm:mb-8 rounded-full"></div>
                <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 leading-relaxed font-light">
                  Clínicas especializadas con protocolos específicos y tecnología dedicada 
                  para cada condición urológica.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4 sm:px-0">
              <ScrollAnimation animation="fade-in-up" delay={100}>
                <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 h-full transform hover:-translate-y-2">
                  <div className="absolute top-8 right-8">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-2xl group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <Award className="h-8 w-8 text-emerald-700" />
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-6">
                      Clínica de Cirugía de Próstata
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                      Centro especializado en el diagnóstico y tratamiento integral de enfermedades prostáticas 
                      con técnicas láser de última generación y cirugía mínimamente invasiva.
                    </p>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Enucleación con Láser</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Resección Transuretral (RTU)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Biopsia de Próstata Guiada</span>
                      </div>
                    </div>

                    <Link href="/clinica-prostata">
                      <Button className="w-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-500 shadow-lg hover:shadow-xl">
                        Conocer Clínica
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-up" delay={200}>
                <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 h-full transform hover:-translate-y-2">
                  <div className="absolute top-8 right-8">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-2xl group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <Shield className="h-8 w-8 text-emerald-700" />
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-6">
                      Clínica de VPH
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                      Diagnóstico temprano y tratamiento especializado del Virus del Papiloma Humano 
                      con tecnología de última generación en un ambiente confidencial y profesional.
                    </p>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Electrocauterización</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Láser CO2</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Seguimiento especializado</span>
                      </div>
                    </div>

                    <Link href="/clinica-vph">
                      <Button className="w-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-500 shadow-lg hover:shadow-xl">
                        Conocer Clínica
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-up" delay={300}>
                <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 h-full transform hover:-translate-y-2">
                  <div className="absolute top-8 right-8">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-2xl group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <Users className="h-8 w-8 text-emerald-700" />
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-6">
                      Clínica de Circuncisión
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                      Procedimientos de circuncisión con tecnología láser para máxima precisión, 
                      mínimo dolor y cicatrización óptima. Solución definitiva para fimosis y balanitis.
                    </p>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Circuncisión Tradicional</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Circuncisión con Láser</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                        <span className="text-slate-700 font-medium text-lg">Frenuloplastía</span>
                      </div>
                    </div>

                    <Link href="/clinica-circuncision">
                      <Button className="w-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-500 shadow-lg hover:shadow-xl">
                        Conocer Clínica
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Instalaciones Section - Fondo elegante con gradiente oscuro */}
        <section id="instalaciones" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-20 px-4 sm:px-0">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold mb-6 sm:mb-8 shadow-xl">
                  <Building2 className="h-5 w-5" />
                  Nuestras Instalaciones
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  Instalaciones
                </h2>
                <div className="w-32 sm:w-40 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 mx-auto mb-6 sm:mb-8 rounded-full"></div>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 leading-relaxed font-light">
                  Espacios diseñados para brindar la máxima comodidad y confianza a nuestros pacientes, 
                  equipados con la tecnología más avanzada.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 px-4 sm:px-0">
              {facilityImages.map((image, index) => (
                <ScrollAnimation key={image.id} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 border border-white/10 hover:border-white/20 transform hover:-translate-y-2">
                    <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <Camera className="h-5 sm:h-6 w-5 sm:w-6 text-emerald-700" />
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 bg-white/10 backdrop-blur-md">
                      <h3 className="font-bold text-white text-xl sm:text-2xl mb-3">{image.alt}</h3>
                      <p className="text-white/80 leading-relaxed text-base sm:text-lg">{image.caption}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </section>

        {/* FAQ Section - Fondo limpio y elegante */}
        <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-20">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold mb-6 sm:mb-8 shadow-lg">
                  <Award className="h-5 w-5" />
                  Preguntas Frecuentes
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight">
                  Resolvemos Tus Dudas
                </h2>
                <div className="w-32 sm:w-40 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-6 sm:mb-8 rounded-full"></div>
                <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 leading-relaxed font-light">
                  Información clara y profesional sobre los tratamientos urológicos más comunes.
                </p>
              </div>
            </ScrollAnimation>

            <div className="max-w-5xl mx-auto">
              <ScrollAnimation animation="fade-in-up" delay={100}>
                <Accordion type="single" collapsible className="space-y-6">
                  <AccordionItem
                    value="item-1"
                    className="bg-gradient-to-br from-white via-emerald-50/30 to-white border-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
                  >
                    <AccordionTrigger className="hover:bg-emerald-50/50 px-8 sm:px-10 py-6 sm:py-8 text-left font-bold text-emerald-800 text-xl sm:text-2xl [&[data-state=open]]:bg-emerald-50/50 transition-all duration-300">
                      ¿Cuándo debo consultar a un urólogo?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 sm:px-10 pb-6 sm:pb-8 text-slate-600 leading-relaxed text-lg">
                      Debes consultar a un urólogo si presentas síntomas como dolor al orinar, sangre en la orina,
                      incontinencia, infecciones urinarias recurrentes, disfunción eréctil o dificultad para orinar.
                      También se recomienda una evaluación preventiva anual a partir de los 45 años.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="bg-gradient-to-br from-white via-emerald-50/30 to-white border-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
                  >
                    <AccordionTrigger className="hover:bg-emerald-50/50 px-8 sm:px-10 py-6 sm:py-8 text-left font-bold text-emerald-800 text-xl sm:text-2xl [&[data-state=open]]:bg-emerald-50/50 transition-all duration-300">
                      ¿Qué ventajas tiene la cirugía láser de próstata?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 sm:px-10 pb-6 sm:pb-8 text-slate-600 leading-relaxed text-lg">
                      <p className="mb-6">
                        La cirugía láser de próstata ofrece múltiples beneficios comparada con técnicas tradicionales:
                      </p>
                      <ul className="space-y-3 ml-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Menor tiempo de recuperación y hospitalización</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Preservación de la función sexual y continencia</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Procedimiento ambulatorio en la mayoría de casos</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Resultados inmediatos y duraderos</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="bg-gradient-to-br from-white via-emerald-50/30 to-white border-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
                  >
                    <AccordionTrigger className="hover:bg-emerald-50/50 px-8 sm:px-10 py-6 sm:py-8 text-left font-bold text-emerald-800 text-xl sm:text-2xl [&[data-state=open]]:bg-emerald-50/50 transition-all duration-300">
                      ¿El tratamiento urológico también es para mujeres?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 sm:px-10 pb-6 sm:pb-8 text-slate-600 leading-relaxed text-lg">
                      <p className="mb-6">
                        Absolutamente. El urólogo trata diversas condiciones del aparato urinario femenino:
                      </p>
                      <ul className="space-y-3 ml-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Infecciones urinarias recurrentes</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Incontinencia urinaria</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Cálculos renales y vesicales</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Cistitis intersticial y vejiga hiperactiva</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="bg-gradient-to-br from-white via-emerald-50/30 to-white border-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
                  >
                    <AccordionTrigger className="hover:bg-emerald-50/50 px-8 sm:px-10 py-6 sm:py-8 text-left font-bold text-emerald-800 text-xl sm:text-2xl [&[data-state=open]]:bg-emerald-50/50 transition-all duration-300">
                      ¿Qué incluye una consulta urológica?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 sm:px-10 pb-6 sm:pb-8 text-slate-600 leading-relaxed text-lg">
                      <p className="mb-6">
                        Una consulta urológica completa incluye:
                      </p>
                      <ul className="space-y-3 ml-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Historia clínica detallada y evaluación de síntomas</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Examen físico especializado</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Análisis de estudios previos</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Plan de tratamiento personalizado</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Resolución de dudas y orientación</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Contact Section - Fondo limpio y profesional */}
        <section id="contacto" className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-100/50">
                <div className="relative h-72 md:h-96 lg:h-[28rem]">
                  <Image
                    src="/images/clinic-background.png"
                    alt="Clínica Urodex - Instalaciones modernas"
                    width={1200}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 via-slate-700/80 to-emerald-700/90"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center text-white max-w-4xl">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                        Agenda tu cita de valoración, estaremos en contacto muy pronto
                      </h3>
                      <p className="text-xl md:text-2xl lg:text-3xl font-light opacity-90">
                        Atención profesional en instalaciones de primera clase
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 lg:p-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Formulario con Mailchimp */}
                    <div>
                      <h4 className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-8">
                        Solicita tu Cita
                      </h4>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="nombre" className="block text-base font-semibold text-slate-700 mb-3">
                              Nombre completo *
                            </label>
                            <Input 
                              id="nombre"
                              name="nombre"
                              placeholder="Tu nombre completo" 
                              className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12 text-lg" 
                              value={formData.nombre}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <div>
                            <label htmlFor="celular" className="block text-base font-semibold text-slate-700 mb-3">
                              Teléfono *
                            </label>
                            <Input 
                              id="celular"
                              name="celular"
                              placeholder="(55) 1234-5678" 
                              className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12 text-lg" 
                              value={formData.celular}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="correo" className="block text-base font-semibold text-slate-700 mb-3">
                            Correo electrónico *
                          </label>
                          <Input
                            id="correo"
                            name="correo"
                            type="email"
                            placeholder="tu.email@ejemplo.com"
                            className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12 text-lg"
                            value={formData.correo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="diagnostico" className="block text-base font-semibold text-slate-700 mb-3">
                            ¿Cuenta con diagnóstico previo?
                          </label>
                          <Select name="diagnostico" value={formData.diagnostico} onValueChange={(value) => setFormData(prev => ({ ...prev, diagnostico: value }))}>
                            <SelectTrigger className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl h-12 text-lg">
                              <SelectValue placeholder="Seleccione una opción" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="si">Sí, tengo diagnóstico</SelectItem>
                              <SelectItem value="no">No, es primera consulta</SelectItem>
                              <SelectItem value="revision">Busco segunda opinión</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="comentarios" className="block text-base font-semibold text-slate-700 mb-3">
                            Comentarios
                          </label>
                          <Textarea 
                            id="comentarios"
                            name="comentarios"
                            placeholder="Describe brevemente tu motivo de consulta o síntomas..." 
                            className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 min-h-[120px] rounded-xl text-lg" 
                            value={formData.comentarios}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, comentarios: e.target.value }))}
                          />
                        </div>

                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-teal-500 text-white py-5 rounded-2xl text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
                        >
                          <Calendar className="h-6 w-6 mr-3" />
                          Enviar Solicitud
                        </Button>
                      </form>
                    </div>

                    {/* Información de contacto */}
                    <div>
                      <h4 className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-8">
                        Ubicaciones y Horarios
                      </h4>

                      <div className="mb-8">
                        <div className="flex flex-col gap-4 mb-6">
                          <Button
                            type="button"
                            variant={selectedLocation === "polanco" ? "default" : "outline"}
                            className={`py-4 rounded-2xl transition-all duration-500 text-lg font-semibold ${
                              selectedLocation === "polanco"
                                ? "bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white shadow-lg"
                                : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                            }`}
                            onClick={() => setSelectedLocation("polanco")}
                          >
                            <MapPinned className="h-5 w-5 mr-3" />
                            Polanco
                          </Button>
                          <Button
                            type="button"
                            variant={selectedLocation === "satelite" ? "default" : "outline"}
                            className={`py-4 rounded-2xl transition-all duration-500 text-lg font-semibold ${
                              selectedLocation === "satelite"
                                ? "bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white shadow-lg"
                                : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                            }`}
                            onClick={() => setSelectedLocation("satelite")}
                          >
                            <MapPinned className="h-5 w-5 mr-3" />
                            Satélite
                          </Button>
                          <Button
                            type="button"
                            variant={selectedLocation === "intermed" ? "default" : "outline"}
                            className={`py-4 rounded-2xl transition-all duration-500 text-lg font-semibold ${
                              selectedLocation === "intermed"
                                ? "bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white shadow-lg"
                                : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                            }`}
                            onClick={() => setSelectedLocation("intermed")}
                          >
                            <MapPinned className="h-5 w-5 mr-3" />
                            INTERMED
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="flex items-start gap-5">
                            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-2xl">
                              <MapPin className="h-7 w-7 text-emerald-700" />
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900 mb-3 text-xl">{currentLocation.name}</h5>
                              <p className="text-slate-600 mb-4 text-lg leading-relaxed">{currentLocation.address}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-emerald-700 hover:text-emerald-800 p-0 h-auto text-lg font-semibold"
                                onClick={() => window.open(currentLocation.mapUrl, "_blank")}
                              >
                                Ver en Google Maps →
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-3">
                              <Clock className="h-6 w-6 text-emerald-700" />
                              <span className="font-bold text-slate-900 text-lg">Lun - Vie</span>
                            </div>
                            <p className="text-slate-600 font-semibold text-lg">{currentLocation.schedule.weekdays}</p>
                          </div>

                          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-3">
                              <Clock className="h-6 w-6 text-emerald-700" />
                              <span className="font-bold text-slate-900 text-lg">Sábados</span>
                            </div>
                            <p className="text-slate-600 font-semibold text-lg">{currentLocation.schedule.saturday}</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="flex items-center gap-5">
                            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-2xl">
                              <Phone className="h-7 w-7 text-emerald-700" />
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900 mb-2 text-xl">Contacto Directo</h5>
                              <p className="text-slate-600 font-semibold text-lg mb-1">{currentLocation.phone}</p>
                              <p className="text-slate-500">WhatsApp disponible 24/7</p>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={openWhatsApp}
                          className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 text-white py-5 rounded-2xl font-semibold text-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
                        >
                          <Phone className="h-6 w-6 mr-3" />
                          Contactar por WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </section>

        {/* Map Section - Fondo neutro elegante */}
        <section className="relative py-16 sm:py-20 bg-gradient-to-br from-slate-100 via-emerald-50/50 to-slate-100">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-white rounded-3xl sm:rounded-[2rem] p-3 sm:p-4 shadow-2xl">
                <div className="h-96 md:h-[500px] lg:h-[600px] relative rounded-2xl sm:rounded-3xl overflow-hidden">
                  <GoogleMap address={currentLocation.address} />
                  <div className="absolute top-6 right-6 z-10 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-emerald-100">
                    <div className="text-center">
                      <h5 className="font-bold text-emerald-700 mb-2 text-xl">{currentLocation.name}</h5>
                      <p className="text-slate-600 mb-4 text-base">Fácil acceso y estacionamiento</p>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white px-6 py-3 rounded-full font-semibold"
                        onClick={() => window.open(currentLocation.mapUrl, "_blank")}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Cómo llegar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </section>

        <HomeBlogSection />
      </main>

      {/* Footer - Gradiente elegante y profesional */}
      <footer className="bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 text-white relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="py-20 relative z-10">
          <ResponsiveContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src="/images/urodex-logo-white.png"
                    alt="Urodex Logo"
                    width={56}
                    height={56}
                    className="h-14 w-auto" />
                  <span className="text-4xl font-serif font-bold">URODEX</span>
                </div>
                <p className="text-white/80 leading-relaxed mb-8 text-lg">
                  Clínica especializada en urología y cirugía de próstata en Ciudad de México,
                  comprometida con la excelencia médica y el cuidado personalizado.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.facebook.com/drmariomartinezuro/"
                    target="_blank"
                    className="text-white/80 hover:text-white transition-all duration-300 p-3 rounded-2xl hover:bg-emerald-600/20 transform hover:scale-110"
                  >
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/urologo.mariothomas"
                    target="_blank"
                    className="text-white/80 hover:text-white transition-all duration-300 p-3 rounded-2xl hover:bg-emerald-600/20 transform hover:scale-110"
                  >
                    <Instagram className="h-6 w-6" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-2xl mb-8 text-white">Navegación</h3>
                <ul className="space-y-4">
                  {[
                    { href: "#inicio", label: "Inicio" },
                    { href: "#sobre-mi", label: "Dr. Mario Martínez" },
                    { href: "#servicios", label: "Servicios" },
                    { href: "#clinicas", label: "Clínicas" },
                    { href: "#contacto", label: "Contacto" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block text-lg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-2xl mb-8 text-white">Especialidades</h3>
                <ul className="space-y-4">
                  {[
                    "Cirugía de Próstata",
                    "Tratamiento de VPH",
                    "Circuncisión Láser",
                    "Cálculos Renales",
                    "Cáncer Urológico",
                  ].map((service) => (
                    <li key={service}>
                      <span className="text-white/70 hover:text-white transition-colors cursor-pointer text-lg">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-2xl mb-8 text-white">Contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-emerald-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-lg">(55) 1694 2925</p>
                      <p className="text-white/70">WhatsApp 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-emerald-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-lg">Polanco, Satélite & INTERMED</p>
                      <p className="text-white/70">Ciudad de México</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-emerald-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-lg">Lun - Vie: 9:00 - 19:00</p>
                      <p className="text-white/70">Sáb: 9:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </div>
        
        <div className="border-t border-white/20 relative z-10">
          <ResponsiveContainer>
            <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/70 text-center md:text-left text-lg">
                © {new Date().getFullYear()} Urodex - Dr. Mario Martínez Thomas. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-8 text-white/70">
                <Link href="/privacidad" className="hover:text-white transition-colors text-lg">
                  Política de Privacidad
                </Link>
                <Link href="/terminos" className="hover:text-white transition-colors text-lg">
                  Términos y Condiciones
                </Link>
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      </footer>
    </div>
  )
}