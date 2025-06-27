"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { QuienSoySection } from "@/components/quien-soy-section"
import { TratamientosSection } from "@/components/tratamientos-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Button } from "@/components/ui/button"
import { Phone, Shield, Star, Calendar, ArrowRight, Award, Building2, Camera, CheckCircle, Facebook, Instagram, MapPin, Users, Clock } from "lucide-react"
import Image from "next/image"
import { ScrollAnimation } from "@/components/scroll-animations"
import { HomeBlogSection } from "@/components/home-blog-section"
import Link from "next/dist/client/link"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion"

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio")

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

  const facilityImages = [
    {
      id: 1,
      src: "/images/consultorio_tecnologia.png",
      alt: "Consultorios con Tecnología Avanzada",
      caption: "Espacios equipados con los últimos sistemas de diagnóstico y equipos urológicos especializados para una valoración completa y precisa."
    },
    {
      id: 2,
      src: "/images/consultorio.png",
      alt: "Quirófanos Innovadores",
      caption: "Quirófanos con equipamiento láser de última generación y tecnología digital integrada para procedimientos mínimamente invasivos."
    },
    {
      id: 3,
      src: "/images/CONSULTORIO_MARIO.png",
      alt: "Centro de Urodinamia",
      caption: "Unidad especializada con equipos de vanguardia para realizar estudios urodinámicos completos que evalúan el funcionamiento del sistema urinario."
    },
    {
      id: 4,
      src: "/images/sala_de_espera.png",
      alt: "Sala de Recuperación Confortable",
      caption: "Un espacio privado, tranquilo y con atención personalizada para garantizar una recuperación postoperatoria óptima y en condiciones de máximo confort."
    }
  ]

  const openWhatsApp = () => {
    const message = "Hola vi su pagina web y me interesa mas informacion";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=5215516942925&text=Hola%20dr.%20mario%20me%20gustaria%20obtener%20mas%20informacion%20acerca%20de%20sus%20servicios&text=${encodedMessage}`, "_blank");
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
              src="/images/hero-video.mp4"
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

          <ResponsiveContainer className="py-6 sm:py-8 md:py-12 lg:py-16 relative flex flex-col justify-center min-h-[calc(100dvh-5rem)] sm:min-h-screen">
            <ScrollAnimation animation="fade-in-up" className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-6 z-30 relative px-4 sm:px-6">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium mb-4 shadow-lg">
                <Shield className="h-4 w-4 text-emerald-300" /> 
                Cirujano Urólogo Certificado
              </div>

              <div className="bg-gradient-to-br from-white/10 to-emerald-900/20 backdrop-blur-lg py-6 sm:py-8 px-4 sm:px-6 md:px-8 rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-4 sm:mb-6 leading-tight">
                  Dr. Mario Martínez Thomas
                </h1>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent mx-auto mb-4 sm:mb-6 rounded-full" />
                <p className="text-white/95 font-medium text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                  Urólogo en Ciudad de México experto en Cirugía de Próstata, VPH y Circuncisión
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 sm:pt-8 justify-center">
                <Button
                  className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-xl text-base sm:text-lg font-medium tracking-wide transition-all duration-500 transform hover:scale-105 hover:shadow-emerald-500/25 w-full sm:w-auto"
                  onClick={openWhatsApp}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Agenda por WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white/70 text-white bg-white/10 hover:bg-white/20 hover:border-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium backdrop-blur-md shadow-lg tracking-wide transition-all duration-500 transform hover:scale-105 w-full sm:w-auto"
                  onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Conocer Servicios
                </Button>
              </div>
            </ScrollAnimation>

            <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-emerald-700/90 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 shadow-xl flex items-center gap-2 z-30">
              <Star className="h-4 w-4 text-yellow-300 fill-current" />
              <span className="text-white font-medium tracking-wide text-sm">15+ Años de Experiencia</span>
            </div>
          </ResponsiveContainer>
        </section>

        <QuienSoySection />
        <TratamientosSection />

        {/* Specialized Clinics Section - Fondo elegante con gradiente sutil */}
        <section id="clinicas" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-white overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
                  <Users className="h-4 w-4" />
                  Clínicas Especializadas
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  Centros de Excelencia Médica
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
                  Clínicas especializadas con protocolos específicos y tecnología dedicada 
                  para cada condición urológica.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              <ScrollAnimation animation="fade-in-up" delay={100}>
                <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-2xl p-6 sm:p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                  <div className="absolute top-6 right-6">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <Award className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-4">
                      Clínica de Cirugía de Próstata
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Centro especializado en el diagnóstico y tratamiento integral de enfermedades prostáticas 
                      con técnicas láser de última generación y cirugía mínimamente invasiva.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Enucleación con Láser</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Resección Transuretral (RTU)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Biopsia de Próstata Guiada</span>
                      </div>
                    </div>

                    <Link href="/clinica-prostata">
                      <Button className="w-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                        Conocer Clínica
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-up" delay={200}>
                <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-2xl p-6 sm:p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                  <div className="absolute top-6 right-6">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <Shield className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-4">
                      Clínica de VPH
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Diagnóstico temprano y tratamiento especializado del Virus del Papiloma Humano 
                      con tecnología de última generación en un ambiente confidencial y profesional.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Electrocauterización</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Láser CO2</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Seguimiento especializado</span>
                      </div>
                    </div>

                    <Link href="/clinica-vph">
                      <Button className="w-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                        Conocer Clínica
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-up" delay={300}>
                <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-2xl p-6 sm:p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                  <div className="absolute top-6 right-6">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <Users className="h-6 w-6 text-emerald-700" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-4">
                      Clínica de Circuncisión
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Procedimientos de circuncisión con tecnología láser para máxima precisión, 
                      mínimo dolor y cicatrización óptima. Solución definitiva para fimosis y balanitis.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Circuncisión Tradicional</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Circuncisión con Láser</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Frenuloplastía</span>
                      </div>
                    </div>

                    <Link href="/clinica-circuncision">
                      <Button className="w-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                        Conocer Clínica
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Instalaciones Section - Fondo elegante con gradiente oscuro */}
        <section id="instalaciones" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-teal-400/30 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                  <Building2 className="h-4 w-4" />
                  Nuestras Instalaciones
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Instalaciones
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-light">
                  Espacios diseñados para brindar la máxima comodidad y confianza a nuestros pacientes, 
                  equipados con la tecnología más avanzada.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-0">
              {facilityImages.map((image, index) => (
                <ScrollAnimation key={image.id} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-500 border border-white/10 hover:border-white/20 transform hover:-translate-y-1">
                    <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        <Camera className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-700" />
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 bg-white/10 backdrop-blur-md">
                      <h3 className="font-bold text-white text-lg sm:text-xl mb-2">{image.alt}</h3>
                      <p className="text-white/80 leading-relaxed">{image.caption}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </section>

        {/* FAQ Section - Fondo limpio y elegante */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-25">
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
                  <Award className="h-4 w-4" />
                  Preguntas Frecuentes
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  Resolvemos Tus Dudas
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
                  Información clara y profesional sobre los tratamientos urológicos más comunes.
                </p>
              </div>
            </ScrollAnimation>

            <div className="max-w-4xl mx-auto">
              <ScrollAnimation animation="fade-in-up" delay={100}>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-1"
                    className="bg-gradient-to-br from-white via-emerald-50/30 to-white border-0 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:bg-emerald-50/50 px-6 sm:px-8 py-4 sm:py-5 text-left font-bold text-emerald-800 text-lg sm:text-xl [&[data-state=open]]:bg-emerald-50/50 transition-all duration-300">
                      ¿Cuándo debo consultar a un urólogo?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 sm:px-8 pb-4 sm:pb-5 text-slate-600 leading-relaxed">
                      Debes consultar a un urólogo si presentas síntomas como dolor al orinar, sangre en la orina,
                      incontinencia, infecciones urinarias recurrentes, disfunción eréctil o dificultad para orinar.
                      También se recomienda una evaluación preventiva anual a partir de los 45 años.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="bg-gradient-to-br from-white via-emerald-50/30 to-white border-0 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:bg-emerald-50/50 px-6 sm:px-8 py-4 sm:py-5 text-left font-bold text-emerald-800 text-lg sm:text-xl [&[data-state=open]]:bg-emerald-50/50 transition-all duration-300">
                      ¿Qué ventajas tiene la cirugía láser de próstata?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 sm:px-8 pb-4 sm:pb-5 text-slate-600 leading-relaxed">
                      <p className="mb-4">
                        La cirugía láser de próstata ofrece múltiples beneficios comparada con técnicas tradicionales:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Menor tiempo de recuperación y hospitalización</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Preservación de la función sexual y continencia</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Procedimiento ambulatorio en la mayoría de casos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Resultados inmediatos y duraderos</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="bg-gradient-to-br from-white via-emerald-50/30 to-white border-0 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:bg-emerald-50/50 px-6 sm:px-8 py-4 sm:py-5 text-left font-bold text-emerald-800 text-lg sm:text-xl [&[data-state=open]]:bg-emerald-50/50 transition-all duration-300">
                      ¿El tratamiento urológico también es para mujeres?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 sm:px-8 pb-4 sm:pb-5 text-slate-600 leading-relaxed">
                      <p className="mb-4">
                        Absolutamente. El urólogo trata diversas condiciones del aparato urinario femenino:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Infecciones urinarias recurrentes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Incontinencia urinaria</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Cálculos renales y vesicales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Cistitis intersticial y vejiga hiperactiva</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="bg-gradient-to-br from-white via-emerald-50/30 to-white border-0 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:bg-emerald-50/50 px-6 sm:px-8 py-4 sm:py-5 text-left font-bold text-emerald-800 text-lg sm:text-xl [&[data-state=open]]:bg-emerald-50/50 transition-all duration-300">
                      ¿Qué incluye una consulta urológica?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 sm:px-8 pb-4 sm:pb-5 text-slate-600 leading-relaxed">
                      <p className="mb-4">
                        Una consulta urológica completa incluye:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Historia clínica detallada y evaluación de síntomas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Examen físico especializado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Análisis de estudios previos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>Plan de tratamiento personalizado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
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

        {/* Componente de Contacto Separado */}
        <ContactSection />

        <HomeBlogSection />
      </main>

      <Footer />
    </div>
  )
}