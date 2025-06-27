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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Tipar los parámetros de los handlers onChange con React.ChangeEvent<HTMLInputElement>
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Aquí integraremos con Mailchimp
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
      openWhatsApp() // Fallback a WhatsApp
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50/30 to-white">
      <ScrollProgressBar />
      <CustomCursor />
      <Header activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero Section with Consultorio Background */}
        <section id="inicio" className="relative overflow-hidden min-h-[calc(100dvh-5rem)] sm:min-h-screen">
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
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/85 to-green-600/80"></div>
          </div>

          <ResponsiveContainer className="py-8 sm:py-12 md:py-20 lg:py-28 relative flex flex-col justify-center min-h-[calc(100dvh-5rem)] sm:min-h-screen">
            <ScrollAnimation animation="fade-in-up" className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 z-30 relative px-4 sm:px-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium mb-4 shadow-lg">
                <Shield className="h-5 w-5" /> 
                Cirujano Urólogo Certificado
              </div>

              <div className="bg-gradient-to-br from-white/15 to-transparent backdrop-blur-sm py-6 sm:py-8 px-4 sm:px-6 md:px-10 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl">
                <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-4 sm:mb-6">
                  Dr. Mario Martínez Thomas
                </h1>
                <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-white/90 to-transparent mx-auto mb-4 sm:mb-6" />
                <p className="text-white font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-4xl mx-auto">
                  Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 sm:pt-8 justify-center">
                <Button
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-full px-6 sm:px-10 py-4 sm:py-6 shadow-2xl text-base sm:text-lg md:text-xl font-medium tracking-wide transition-all transform hover:scale-105 w-full sm:w-auto"
                  onClick={openWhatsApp}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Agenda por WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white bg-white/10 hover:bg-white/20 rounded-full px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg md:text-xl font-medium backdrop-blur-sm shadow-lg tracking-wide transition-all transform hover:scale-105 w-full sm:w-auto"
                  onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Conocer Servicios
                </Button>
              </div>
            </ScrollAnimation>

            <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-700/90 to-green-700/90 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 shadow-xl flex items-center gap-3 z-30">
              <Star className="h-5 w-5 text-white fill-current" />
              <span className="text-white font-medium tracking-wide">15+ Años de Experiencia</span>
            </div>
          </ResponsiveContainer>
        </section>

        <QuienSoySection />

        {/* Tratamientos Section */}
        <TratamientosSection />

        {/* Specialized Clinics Section */}
        <Section id="clinicas" background="gradient-subtle" spacing="xl" hasDivider={true} dividerType="wave" contentWidth="wide">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <Users className="h-4 w-4" />
                  Clínicas Especializadas
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-800 mb-4 sm:mb-6">
                  Centros de Excelencia Médica
                </h2>
                <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-green-700 to-green-500 mx-auto mb-4 sm:mb-6"></div>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                  Clínicas especializadas con protocolos específicos y tecnología dedicada 
                  para cada condición urológica.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              <ScrollAnimation animation="fade-in-up" delay={100}>
                <div className="group relative bg-gradient-to-br from-green-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-green-100 hover:border-green-300 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="absolute top-6 right-6">
                    <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-green-700" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">
                      Clínica de Cirugía de Próstata
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Centro especializado en el diagnóstico y tratamiento integral de enfermedades prostáticas 
                      con técnicas láser de última generación y cirugía mínimamente invasiva.
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700 font-medium">Enucleación con Láser</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700 font-medium">Resección Transuretral (RTU)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700 font-medium">Biopsia de Próstata Guiada</span>
                      </div>
                    </div>

                    <Link href="/clinica-prostata">
                      <Button className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-full font-medium transition-all duration-300">
                        Conocer Clínica
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-up" delay={200}>
                <div className="group relative bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border-2 border-green-100 hover:border-green-200 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="absolute top-6 right-6">
                    <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-8 w-8 text-green-700" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">
                      Clínica de VPH
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Diagnóstico temprano y tratamiento especializado del Virus del Papiloma Humano 
                      con tecnología de última generación en un ambiente confidencial y profesional.
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600 font-medium">Electrocauterización</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600 font-medium">Láser CO2</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600 font-medium">Seguimiento especializado</span>
                      </div>
                    </div>

                    <Link href="/clinica-vph">
                      <Button className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-full font-medium transition-all duration-300">
                        Conocer Clínica
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-up" delay={300}>
                <div className="group relative bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border-2 border-green-100 hover:border-green-200 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="absolute top-6 right-6">
                    <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-8 w-8 text-green-700" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">
                      Clínica de Circuncisión
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Procedimientos de circuncisión con tecnología láser para máxima precisión, 
                      mínimo dolor y cicatrización óptima. Solución definitiva para fimosis y balanitis.
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700 font-medium">Circuncisión Tradicional</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700 font-medium">Circuncisión con Láser</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700 font-medium">Frenuloplastía</span>
                      </div>
                    </div>

                    <Link href="/clinica-circuncision">
                      <Button className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-full font-medium transition-all duration-300">
                        Conocer Clínica
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Instalaciones Section */}
        <Section id="instalaciones" background="primary" spacing="xl" hasDivider={true} dividerType="angle" textColor="light" contentWidth="wide">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-white text-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
                  <Building2 className="h-4 w-4" />
                  Nuestras Instalaciones
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
                  Instalaciones
                </h2>
                <div className="w-24 sm:w-32 h-1 bg-white/90 mx-auto mb-4 sm:mb-6"></div>
                <p className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed">
                  Espacios diseñados para brindar la máxima comodidad y confianza a nuestros pacientes, 
                  equipados con la tecnología más avanzada.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-0">
              {facilityImages.map((image, index) => (
                <ScrollAnimation key={image.id} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-60 sm:h-80 overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Camera className="h-4 sm:h-5 w-4 sm:w-5 text-green-700" />
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="font-bold text-green-800 text-lg sm:text-xl mb-2">{image.alt}</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{image.caption}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </Section>

        {/* FAQ Section */}
        <Section background="white" spacing="xl" hasDivider={true} dividerType="wave">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Award className="h-4 w-4" />
                  Preguntas Frecuentes
                </div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-green-700 mb-6">
                  Resolvemos Tus Dudas
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Información clara y profesional sobre los tratamientos urológicos más comunes.
                </p>
              </div>
            </ScrollAnimation>

            <div className="max-w-4xl mx-auto">
              <ScrollAnimation animation="fade-in-up" delay={100}>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-1"
                    className="bg-gradient-to-br from-green-50 to-white border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:bg-green-50/50 px-8 py-6 text-left font-bold text-green-800 text-lg [&[data-state=open]]:bg-green-50/50">
                      ¿Cuándo debo consultar a un urólogo?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6 text-gray-700 leading-relaxed">
                      Debes consultar a un urólogo si presentas síntomas como dolor al orinar, sangre en la orina,
                      incontinencia, infecciones urinarias recurrentes, disfunción eréctil o dificultad para orinar.
                      También se recomienda una evaluación preventiva anual a partir de los 45 años.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="bg-gradient-to-br from-green-50 to-white border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:bg-green-50/50 px-8 py-6 text-left font-bold text-green-800 text-lg [&[data-state=open]]:bg-green-50/50">
                      ¿Qué ventajas tiene la cirugía láser de próstata?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6 text-gray-700 leading-relaxed">
                      <p className="mb-4">
                        La cirugía láser de próstata ofrece múltiples beneficios comparada con técnicas tradicionales:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Menor tiempo de recuperación y hospitalización</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Preservación de la función sexual y continencia</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Procedimiento ambulatorio en la mayoría de casos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Resultados inmediatos y duraderos</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="bg-gradient-to-br from-green-50 to-white border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:bg-green-50/50 px-8 py-6 text-left font-bold text-green-800 text-lg [&[data-state=open]]:bg-green-50/50">
                      ¿El tratamiento urológico también es para mujeres?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6 text-gray-700 leading-relaxed">
                      <p className="mb-4">
                        Absolutamente. El urólogo trata diversas condiciones del aparato urinario femenino:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Infecciones urinarias recurrentes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Incontinencia urinaria</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Cálculos renales y vesicales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Cistitis intersticial y vejiga hiperactiva</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="bg-gradient-to-br from-green-50 to-white border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:bg-green-50/50 px-8 py-6 text-left font-bold text-green-800 text-lg [&[data-state=open]]:bg-green-50/50">
                      ¿Qué incluye una consulta urológica?
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6 text-gray-700 leading-relaxed">
                      <p className="mb-4">
                        Una consulta urológica completa incluye:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Historia clínica detallada y evaluación de síntomas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Examen físico especializado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Análisis de estudios previos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Plan de tratamiento personalizado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Resolución de dudas y orientación</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Contact Section with Mailchimp Integration */}
        <Section id="contacto" background="white" spacing="xl">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/images/clinic-background.png"
                    alt="Clínica Urodex - Instalaciones modernas"
                    width={1200}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700/80 to-green-600/60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Agenda tu cita de valoración, estaremos en contacto muy pronto
                      </h3>
                      <p className="text-xl md:text-2xl font-light">
                        Atención profesional en instalaciones de primera clase
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Formulario con Mailchimp */}
                    <div>
                      <h4 className="text-2xl font-bold text-green-700 mb-6">
                        Solicita tu Cita
                      </h4>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                              Nombre completo *
                            </label>
                            <Input 
                              id="nombre"
                              name="nombre"
                              placeholder="Tu nombre completo" 
                              className="border-green-200 focus:border-green-500 focus:ring-green-500" 
                              value={formData.nombre}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <div>
                            <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-2">
                              Teléfono *
                            </label>
                            <Input 
                              id="celular"
                              name="celular"
                              placeholder="(55) 1234-5678" 
                              className="border-green-200 focus:border-green-500 focus:ring-green-500" 
                              value={formData.celular}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico *
                          </label>
                          <Input
                            id="correo"
                            name="correo"
                            type="email"
                            placeholder="tu.email@ejemplo.com"
                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                            value={formData.correo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="diagnostico" className="block text-sm font-medium text-gray-700 mb-2">
                            ¿Cuenta con diagnóstico previo?
                          </label>
                          <Select name="diagnostico" value={formData.diagnostico} onValueChange={(value) => setFormData(prev => ({ ...prev, diagnostico: value }))}>
                            <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
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
                          <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-2">
                            Comentarios
                          </label>
                          <Textarea 
                            id="comentarios"
                            name="comentarios"
                            placeholder="Describe brevemente tu motivo de consulta o síntomas..." 
                            className="border-green-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]" 
                            value={formData.comentarios}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, comentarios: e.target.value }))}
                          />
                        </div>

                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Calendar className="h-5 w-5 mr-2" />
                          Enviar
                        </Button>
                      </form>
                    </div>

                    {/* Información de contacto */}
                    <div>
                      <h4 className="text-2xl font-bold text-green-700 mb-6">
                        Ubicaciones y Horarios
                      </h4>

                      <div className="mb-6">
                        <div className="flex flex-col gap-3 mb-4">
                          <Button
                            type="button"
                            variant={selectedLocation === "polanco" ? "default" : "outline"}
                            className={`py-3 rounded-full transition-all duration-300 ${
                              selectedLocation === "polanco"
                                ? "bg-green-700 hover:bg-green-600 text-white"
                                : "border-green-300 text-green-700 hover:bg-green-50"
                            }`}
                            onClick={() => setSelectedLocation("polanco")}
                          >
                            <MapPinned className="h-4 w-4 mr-2" />
                            Polanco
                          </Button>
                          <Button
                            type="button"
                            variant={selectedLocation === "satelite" ? "default" : "outline"}
                            className={`py-3 rounded-full transition-all duration-300 ${
                              selectedLocation === "satelite"
                                ? "bg-green-700 hover:bg-green-600 text-white"
                                : "border-green-300 text-green-700 hover:bg-green-50"
                            }`}
                            onClick={() => setSelectedLocation("satelite")}
                          >
                            <MapPinned className="h-4 w-4 mr-2" />
                            Satélite
                          </Button>
                          <Button
                            type="button"
                            variant={selectedLocation === "intermed" ? "default" : "outline"}
                            className={`py-3 rounded-full transition-all duration-300 ${
                              selectedLocation === "intermed"
                                ? "bg-green-700 hover:bg-green-600 text-white"
                                : "border-green-300 text-green-700 hover:bg-green-50"
                            }`}
                            onClick={() => setSelectedLocation("intermed")}
                          >
                            <MapPinned className="h-4 w-4 mr-2" />
                            INTERMED
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-100 p-3 rounded-xl">
                              <MapPin className="h-6 w-6 text-green-700" />
                            </div>
                            <div>
                              <h5 className="font-bold text-gray-900 mb-2">{currentLocation.name}</h5>
                              <p className="text-gray-700 mb-3">{currentLocation.address}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-700 hover:text-green-800 p-0 h-auto"
                                onClick={() => window.open(currentLocation.mapUrl, "_blank")}
                              >
                                Ver en Google Maps →
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                              <Clock className="h-5 w-5 text-green-700" />
                              <span className="font-bold text-gray-900">Lun - Vie</span>
                            </div>
                            <p className="text-gray-700 font-medium">{currentLocation.schedule.weekdays}</p>
                          </div>

                          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                              <Clock className="h-5 w-5 text-green-700" />
                              <span className="font-bold text-gray-900">Sábados</span>
                            </div>
                            <p className="text-gray-700 font-medium">{currentLocation.schedule.saturday}</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-xl">
                              <Phone className="h-6 w-6 text-green-700" />
                            </div>
                            <div>
                              <h5 className="font-bold text-gray-900 mb-1">Contacto Directo</h5>
                              <p className="text-gray-700 font-medium">{currentLocation.phone}</p>
                              <p className="text-sm text-gray-600">WhatsApp disponible 24/7</p>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={openWhatsApp}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Phone className="h-5 w-5 mr-2" />
                          Contactar por WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </Section>

        {/* Map Section */}
        <Section background="secondary" spacing="md">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-white rounded-3xl p-2 shadow-2xl">
                <div className="h-96 md:h-[500px] relative rounded-2xl overflow-hidden">
                  <GoogleMap address={currentLocation.address} />
                  <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg">
                    <div className="text-center">
                      <h5 className="font-bold text-green-700 mb-1">{currentLocation.name}</h5>
                      <p className="text-sm text-gray-600 mb-3">Fácil acceso y estacionamiento</p>
                      <Button
                        size="sm"
                        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                        onClick={() => window.open(currentLocation.mapUrl, "_blank")}
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        Cómo llegar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </Section>

        {/* Blog Section */}
        <HomeBlogSection />
      </main>
      <Footer />
    </div>
  )
}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="py-16">
          <ResponsiveContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/images/urodex-logo-white.png"
                    alt="Urodex Logo"
                    width={48}
                    height={48}
                    className="h-12 w-auto" />
                  <span className="text-3xl font-serif font-bold">URODEX</span>
                </div>
                <p className="text-green-100 leading-relaxed mb-6">
                  Clínica especializada en urología y cirugía de próstata en Ciudad de México,
                  comprometida con la excelencia médica y el cuidado personalizado.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.facebook.com/drmariomartinezuro/"
                    target="_blank"
                    className="text-white hover:text-green-200 transition-colors p-2 rounded-full hover:bg-green-600"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/urologo.mariothomas"
                    target="_blank"
                    className="text-white hover:text-green-200 transition-colors p-2 rounded-full hover:bg-green-600"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-6 text-white">Navegación</h3>
                <ul className="space-y-3">
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
                        className="text-green-100 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-6 text-white">Especialidades</h3>
                <ul className="space-y-3">
                  {[
                    "Cirugía de Próstata",
                    "Tratamiento de VPH",
                    "Circuncisión Láser",
                    "Cálculos Renales",
                    "Cáncer Urológico",
                  ].map((service) => (
                    <li key={service}>
                      <span className="text-green-100 hover:text-white transition-colors cursor-pointer">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-6 text-white">Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">(55) 1694 2925</p>
                      <p className="text-green-100 text-sm">WhatsApp 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Polanco, Satélite & INTERMED</p>
                      <p className="text-green-100 text-sm">Ciudad de México</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Lun - Vie: 9:00 - 19:00</p>
                      <p className="text-green-100 text-sm">Sáb: 9:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </div>
        <div className="border-t border-green-600">
          <ResponsiveContainer>
            <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-green-100 text-center md:text-left">
                © {new Date().getFullYear()} Urodex - Dr. Mario Martínez Thomas. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-6 text-sm text-green-100">
                <Link href="/privacidad" className="hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="/terminos" className="hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      </footer>