"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Section } from "@/components/section"
import { ResponsiveContainer } from "@/components/responsive-container"
import { TypographyH2, TypographyP } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Shield,
  Users,
  MapPinned,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollAnimation, ParallaxEffect } from "@/components/scroll-animations"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HomeBlogSection } from "@/components/home-blog-section"
import { GoogleMap } from "@/components/google-map"
import {
  CancerUrologicoSvg,
  CalculosViaSvg,
  EyaculacionPrecozSvg,
  InfeccionViasSvg,
  QuisteEpididimoSvg,
  CircuncisionLaserSvg,
  HiperplasiaSvg,
  ItsSvg,
} from "@/components/service-svgs"

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [selectedLocation, setSelectedLocation] = useState("polanco")
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const locations = {
    polanco: {
      name: "Polanco",
      address: "Temístocles 210, Polanco, Ciudad de México",
      schedule: {
        weekdays: "9:00 AM - 7:00 PM",
        saturday: "9:00 AM - 2:00 PM",
      },
      phone: "(55) 1694 2925",
    },
    satelite: {
      name: "Ciudad Satélite",
      address: "Cto Centro Comercial 20, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.",
      schedule: {
        weekdays: "9:00 AM - 7:00 PM",
        saturday: "9:00 AM - 2:00 PM",
      },
      phone: "(55) 1694 2925",
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "servicios", "sobre-mi", "blog", "contacto"]

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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getServiceIcon = (serviceName: string, className: string) => {
    switch (serviceName) {
      case "Cáncer urológico":
        return <CancerUrologicoSvg className={className} />
      case "Cálculos en vía urinaria":
        return <CalculosViaSvg className={className} />
      case "Eyaculación Precoz":
        return <EyaculacionPrecozSvg className={className} />
      case "Infección de Vías Urinarias":
        return <InfeccionViasSvg className={className} />
      case "Quiste de Epidídimo":
        return <QuisteEpididimoSvg className={className} />
      case "Circuncisión con Láser":
        return <CircuncisionLaserSvg className={className} />
      case "Hiperplasia Prostática Benigna":
        return <HiperplasiaSvg className={className} />
      case "Infecciones de Transmisión Sexual":
        return <ItsSvg className={className} />
      default:
        return <Award className={className} />
    }
  }

  const services = [
    {
      name: "Cáncer urológico",
      description: "Diagnóstico y tratamiento de cáncer en el sistema urinario y órganos reproductores masculinos.",
      icon: "/images/cancer-icon.png",
    },
    {
      name: "Cálculos en vía urinaria",
      description: "Tratamiento de piedras en los riñones, uréteres y vejiga.",
      icon: "/images/calculos-icon.png",
    },
    {
      name: "Eyaculación Precoz",
      description: "Diagnóstico y tratamiento de la eyaculación prematura.",
      icon: "/images/eyaculacion-icon.png",
    },
    {
      name: "Infección de Vías Urinarias",
      description: "Tratamiento de infecciones en cualquier parte del sistema urinario.",
      icon: "/images/infeccion-icon.png",
    },
    {
      name: "Quiste de Epidídimo",
      description: "Diagnóstico y tratamiento de quistes en el epidídimo.",
      icon: "/images/quiste-icon.png",
    },
    {
      name: "Circuncisión con Láser",
      description: "Procedimiento quirúrgico con tecnología láser para la circuncisión.",
      icon: "/images/circuncision-icon.png",
    },
    {
      name: "Hiperplasia Prostática Benigna",
      description: "Tratamiento del agrandamiento no canceroso de la próstata.",
      icon: "/images/hiperplasia-icon.png",
    },
    {
      name: "Infecciones de Transmisión Sexual",
      description: "Diagnóstico y tratamiento de infecciones transmitidas sexualmente.",
      icon: "/images/its-icon.png",
    },
  ]

  const currentLocation = locations[selectedLocation as keyof typeof locations]

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgressBar />
      <CustomCursor />

      <Header activeSection={activeSection} />

      <main className="flex-1">
        <HeroSection />

        {/* Three Blocks Section */}
        <section className="relative w-full bg-green-50 py-20">
          <div className="absolute inset-0 bg-black/20"></div>

          <ResponsiveContainer className="relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center text-green-700 mb-16">
                <h2 className="text-4xl font-bold mb-4">Conoce nuestras clínicas</h2>
                <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
                <p className="text-xl">Dependiendo tu problema tenemos la solución para tí.</p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              <ScrollAnimation animation="fade-in-up" delay={100}>
                <div className="bg-white rounded-xl p-8 text-center text-green-700 hover:bg-green-50 transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Clínica de Cirugía de Próstata</h3>
                  <p className="text-gray-600 flex-grow">
                    ¿Problemas de próstata? Nuestra clínica es la ideal para ti y tu problema.
                  </p>
                  <div className="mt-6">
                    <Link href="/clinica-prostata">
                      <Button
                        variant="outline"
                        className="border-white text-green-700 hover:bg-white hover:text-green-700 rounded-full px-6 py-2 transition-colors focus-visible-ring"
                      >
                        Ir a clínica
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-up" delay={200}>
                <div className="bg-white rounded-xl p-8 text-center text-green-700 hover:bg-green-50 transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Clínica de VPH</h3>
                  <p className="text-gray-600 flex-grow">Atiende hoy tu problema de VPH con los expertos en el tema.</p>
                  <div className="mt-6">
                    <Link href="/clinica-vph">
                      <Button
                        variant="outline"
                        className="border-white text-green-700 hover:bg-white hover:text-green-700 rounded-full px-6 py-2 transition-colors focus-visible-ring"
                      >
                        Ir a clínica
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-up" delay={300}>
                <div className="bg-white rounded-xl p-8 text-center text-green-700 hover:bg-green-50 transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-green-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Clínica de Circuncisión</h3>
                  <p className="text-gray-600 flex-grow">
                    Termina con tus problemas de balanitis y fimosis con la ayuda de nuestros especialistas.
                  </p>
                  <div className="mt-6">
                    <Link href="/clinica-circuncision">
                      <Button
                        variant="outline"
                        className="border-white text-green-700 hover:bg-white hover:text-green-700 rounded-full px-6 py-2 transition-colors focus-visible-ring"
                      >
                        Ir a clínica
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Services Section */}
        <Section id="servicios" background="white" spacing="lg" hasDivider={true} dividerType="wave">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center content-narrow mb-16">
                <TypographyH2 className="mb-4 text-green-700">Servicios de urología</TypographyH2>
                <div className="w-20 h-1 bg-green-700 mx-auto mb-6"></div>
                <TypographyP className="text-green-700">
                  Ofrecemos diagnóstico y tratamiento especializado para todas las condiciones urológicas, utilizando
                  las técnicas más avanzadas y mínimamente invasivas.
                </TypographyP>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
              {services.map((service, index) => (
                <ScrollAnimation key={index} animation="fade-in-up" delay={index * 100}>
                  <div className="group relative bg-green-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col border-2 border-white/10">
                    {/* Decorative top border with gradient */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-600 to-green-400"></div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute transform rotate-45 bg-green-100 text-green-700 font-medium text-xs py-1 right-[-40px] top-[16px] w-[170%] text-center">
                        Especializado
                      </div>
                    </div>

                    <div className="p-8 flex flex-col items-center text-center flex-grow">
                      {/* Icon with animated background */}
                      <div className="relative mb-6 group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 bg-green-100 rounded-full blur-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-inner">
                          {getServiceIcon(service.name, "h-10 w-10 text-green-700")}
                        </div>
                      </div>

                      {/* Service name with underline animation */}
                      <h3 className="font-medium text-green-700 mb-3 text-lg relative inline-block h-14 flex items-center justify-center shadow-text">
                        {service.name}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                      </h3>

                      {/* Description - solo visible cuando está expandido */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedService === index ? "max-h-60 opacity-100 mb-6" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-600 shadow-text">{service.description}</p>
                      </div>
                    </div>

                    {/* Button with arrow animation - now in a separate div at the bottom */}
                    <div className="w-full pt-2 border-t border-green-100/30 mt-auto">
                      <Button
                        variant="ghost"
                        className="w-full text-green-700 hover:text-green-800 flex items-center justify-center gap-2 py-3 group-hover:bg-green-50 transition-colors focus-visible-ring"
                        onClick={() => setExpandedService(expandedService === index ? null : index)}
                      >
                        <span>{expandedService === index ? "Ver menos" : "Saber más"}</span>
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${
                            expandedService === index ? "rotate-90" : "group-hover:translate-x-1"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation animation="fade-in-up" delay={400}>
              <div className="flex justify-center mt-12">
                <Button
                  className="bg-green-700 hover:bg-green-600 btn-elegant rounded-full px-8 py-6 focus-visible-ring"
                  onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
                >
                  Conoce todos nuestros servicios
                </Button>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </Section>

        {/* About Doctor Section */}
        <Section id="sobre-mi" background="primary-light" spacing="lg" hasDivider={true} dividerType="angle">
          <ResponsiveContainer>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <ScrollAnimation animation="fade-in-right" className="lg:w-2/5">
                <div className="relative max-w-md mx-auto lg:max-w-none">
                  <ParallaxEffect speed={0.02}>
                    <div className="absolute -inset-4 bg-green-100 rounded-2xl blur-xl opacity-50 rotate-3"></div>
                  </ParallaxEffect>
                  <div className="img-hover-zoom">
                    <Image
                      src="/images/doctor-profile.png"
                      alt="Dr. Mario Martínez Thomas"
                      width={500}
                      height={600}
                      className="rounded-2xl shadow-xl relative z-10 elegant-shadow"
                    />
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-left" className="md:w-3/5 space-y-8">
                <div>
                  <h3 className="text-xl text-green-600 mb-2">Conoce un poco más sobre mí</h3>
                  <TypographyH2 className="mb-4 gradient-text">Dr. Mario Martínez Thomas</TypographyH2>
                  <div className="w-20 h-1 bg-green-500 mb-6"></div>
                </div>

                <TypographyP>
                  Cirujano Urólogo egresado de CMN 20 de Noviembre, con mención honorífica otorgada por la Universidad
                  Nacional Autónoma de México. Mi compromiso es ofrecer la más alta calidad en atención urológica,
                  combinando experiencia clínica con las técnicas más avanzadas.
                </TypographyP>

                <div className="space-y-6">
                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-green-50 transition-colors hover-glow">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Image src="/images/certification-icon.png" alt="Certificación" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700 text-lg mb-1">
                        Certificación en laparoscopia urológica avanzada
                      </h4>
                      <p className="text-gray-600">
                        en IRCAD Latinoamérica, uno de los mejores centros de entrenamiento a nivel mundial en cirugía
                        laparoscópica y robótica.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-green-50 transition-colors hover-glow">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Image src="/images/certification-icon.png" alt="Certificación" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700 text-lg mb-1">
                        Certificación vigente por el Consejo Nacional Mexicano de Urología
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-green-50 transition-colors hover-glow">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Image src="/images/membership-icon.png" alt="Membresía" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700 text-lg mb-1">
                        Miembro de la asociación americana de urología
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-green-50 transition-colors hover-glow">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Image src="/images/membership-icon.png" alt="Membresía" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700 text-lg mb-1">
                        Miembro de la asociación europea de urología
                      </h4>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Appointment Section */}
        <Section id="contacto" background="gradient" spacing="lg">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden elegant-shadow">
                <div className="relative">
                  <Image
                    src="/images/clinic-background.png"
                    alt="Clínica Urodex"
                    width={1200}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-green-700/70"></div>
                </div>

                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold text-green-700 mb-8 text-center">
                    Agenda tu cita de valoración, estaremos en contacto muy pronto
                  </h3>

                  <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-sm font-medium text-gray-600">
                        Nombre
                      </label>
                      <Input id="nombre" placeholder="Nombre" className="input-elegant" aria-required="true" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="diagnostico" className="text-sm font-medium text-gray-600">
                        ¿Cuenta con diagnóstico previo?
                      </label>
                      <Select>
                        <SelectTrigger className="input-elegant">
                          <SelectValue placeholder="Seleccione una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">Sí</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="correo" className="text-sm font-medium text-gray-600">
                        Correo
                      </label>
                      <Input
                        id="correo"
                        type="email"
                        placeholder="Correo"
                        className="input-elegant"
                        aria-required="true"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="celular" className="text-sm font-medium text-gray-600">
                        Celular
                      </label>
                      <Input id="celular" placeholder="Celular" className="input-elegant" aria-required="true" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="comentarios" className="text-sm font-medium text-gray-600">
                        Comentarios
                      </label>
                      <Textarea id="comentarios" placeholder="Comentarios" className="textarea-elegant" />
                    </div>

                    <div className="md:col-span-2 flex justify-center">
                      <Button className="bg-green-700 hover:bg-green-600 btn-elegant rounded-full px-10 py-6 text-lg focus-visible-ring">
                        Enviar
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </Section>

        {/* Blog Section */}
        <HomeBlogSection />

        {/* FAQ Section */}
        <Section background="white" spacing="lg" className="texture-dots">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center content-narrow mb-16">
                <TypographyH2 className="mb-4 gradient-text">Preguntas Frecuentes</TypographyH2>
                <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
                <TypographyP>
                  Respuestas a las dudas más comunes sobre la atención urológica y nuestros servicios.
                </TypographyP>
              </div>
            </ScrollAnimation>

            <div className="content-medium">
              <ScrollAnimation animation="fade-in-up" delay={100}>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-1"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Cuándo debo acudir a un urólogo?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        Debes consultar a un urólogo si presentas síntomas como dolor al orinar, sangre en la orina,
                        incontinencia, infecciones urinarias recurrentes, disfunción eréctil o dificultad para orinar.
                        De igual forma se debe consultar al urólogo al cumplir los 45 años.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Qué enfermedades trata un urólogo?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p className="mb-3">
                        Un urólogo trata enfermedades del aparato urinario en hombres y mujeres, y del aparato
                        reproductor masculino. Algunas de las más comunes son:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Infecciones urinarias</li>
                        <li>Cálculos renales o piedras en las vías urinarias</li>
                        <li>Hiperplasia prostática benigna (agrandamiento de la próstata)</li>
                        <li>Cáncer de riñón, vejiga, próstata y testículos</li>
                        <li>Disfunción eréctil y problemas de eyaculación</li>
                        <li>Incontinencia urinaria</li>
                        <li>Varicocele y problemas de fertilidad masculina</li>
                        <li>Estenosis uretral (estrechamiento de la uretra)</li>
                        <li>Prostatitis (inflamación de la próstata)</li>
                        <li>Enfermedades del pene, testículos y escroto</li>
                      </ul>
                      <p className="mt-3">
                        El cirujano urólogo también realiza procedimientos quirúrgicos como circuncisión, vasectomía,
                        resección prostática o cirugías mínimamente invasivas para tratar estos problemas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Cuál es la diferencia entre un urólogo y un nefrólogo?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p className="mb-3">
                        La principal diferencia es que el urólogo es un médico cirujano especializado en el tratamiento
                        de enfermedades del aparato urinario (riñones, uréteres, vejiga y uretra) y del aparato
                        reproductor masculino. Además de tratar médicamente, también realiza cirugías.
                      </p>
                      <p className="mb-3">
                        El nefrólogo, en cambio, es un médico no cirujano que se especializa en el diagnóstico y
                        tratamiento médico de enfermedades del riñón, como la insuficiencia renal, la hipertensión renal
                        o el síndrome nefrótico. No realiza cirugías, pero se enfoca en preservar la función renal y
                        prevenir complicaciones.
                      </p>
                      <p>
                        En muchos casos, ambos especialistas trabajan en conjunto para ofrecer un tratamiento integral.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Qué trata el urólogo en una mujer?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p className="mb-3">
                        El urólogo trata diversas afecciones del aparato urinario femenino. Entre las más comunes se
                        encuentran:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Infecciones urinarias recurrentes</li>
                        <li>Incontinencia urinaria (pérdida involuntaria de orina)</li>
                        <li>Cistitis intersticial (síndrome de vejiga dolorosa)</li>
                        <li>Cálculos renales o vesicales</li>
                        <li>Problemas de vaciamiento vesical</li>
                        <li>Prolapsos del tracto urinario</li>
                        <li>Tumores o cáncer de vejiga, riñón o uretra</li>
                        <li>Estenosis uretral (estrechamiento de la uretra)</li>
                      </ul>
                      <p className="mt-3">
                        Aunque comúnmente se asocia al urólogo con la salud masculina, también es el especialista
                        indicado para atender trastornos urinarios en mujeres de todas las edades.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Schedule and Map Section */}
        <Section background="dark" spacing="md" hasDivider={true} dividerType="curve">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl elegant-shadow text-gray-900">
                <div className="flex flex-col xl:flex-row gap-8">
                  {/* Desktop: Información a la izquierda, Mobile: Todo apilado */}
                  <div className="xl:w-1/2">
                    <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-2">
                      Visítanos
                    </div>
                    <h2 className="text-3xl font-bold text-green-700 mb-4 gradient-text">Agenda tu cita hoy</h2>
                    <div className="mb-6"></div>

                    <div className="mb-6">
                      <p className="text-gray-900 font-bold mb-3">Selecciona una ubicación:</p>
                      <div className="flex flex-col xs:flex-row gap-3">
                        <Button
                          type="button"
                          variant={selectedLocation === "polanco" ? "default" : "outline"}
                          className={`flex-1 flex items-center justify-center gap-2 py-6 rounded-full ${
                            selectedLocation === "polanco"
                              ? "bg-green-700 hover:bg-green-600 text-white"
                              : "border-green-700 text-green-700 hover:bg-green-50"
                          }`}
                          onClick={() => setSelectedLocation("polanco")}
                        >
                          <MapPinned className="h-5 w-5" />
                          <span className="font-medium">Polanco</span>
                        </Button>
                        <Button
                          type="button"
                          variant={selectedLocation === "satelite" ? "default" : "outline"}
                          className={`flex-1 flex items-center justify-center gap-2 py-6 rounded-full ${
                            selectedLocation === "satelite"
                              ? "bg-green-700 hover:bg-green-600 text-white"
                              : "border-green-700 text-green-700 hover:bg-green-50"
                          }`}
                          onClick={() => setSelectedLocation("satelite")}
                        >
                          <MapPinned className="h-5 w-5" />
                          <span className="font-medium">Satélite</span>
                        </Button>
                      </div>
                    </div>

                    {/* Desktop: Grid 2x2, Mobile: Stack vertical */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 hover-lift p-3 rounded-lg hover:bg-green-50 transition-colors bg-gray-100">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold">Lunes a Viernes</p>
                          <p className="text-gray-800 font-medium">{currentLocation.schedule.weekdays}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 hover-lift p-3 rounded-lg hover:bg-green-50 transition-colors bg-gray-100">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold">Sábados</p>
                          <p className="text-gray-800 font-medium">{currentLocation.schedule.saturday}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 hover-lift p-3 rounded-lg hover:bg-green-50 transition-colors bg-gray-100 xl:col-span-2">
                        <div className="bg-green-100 p-2 rounded-full mt-0.5">
                          <MapPin className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold">Dirección</p>
                          <p className="text-gray-800 font-medium">{currentLocation.address}</p>
                          <p className="text-gray-700 text-sm mt-1">Fácil acceso y estacionamiento disponible</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 hover-lift p-3 rounded-lg hover:bg-green-50 transition-colors bg-gray-100 xl:col-span-2">
                        <div className="bg-green-100 p-2 rounded-full mt-0.5">
                          <Phone className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold">Teléfono y WhatsApp</p>
                          <p className="text-gray-800 font-medium">{currentLocation.phone}</p>
                          <p className="text-gray-700 text-sm mt-1">Respuesta rápida y atención personalizada</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        className="bg-green-700 hover:bg-green-600 btn-elegant rounded-full px-8 py-6 text-lg w-full flex items-center justify-center gap-2 focus-visible-ring"
                        onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
                      >
                        <Calendar className="h-5 w-5" />
                        Agendar Cita
                      </Button>
                    </div>
                  </div>

                  {/* Desktop: Mapa a la derecha, Mobile: Mapa abajo */}
                  <div className="xl:w-1/2 h-[300px] sm:h-[400px] xl:h-[600px] relative">
                    <div className="absolute -inset-1 bg-green-100 rounded-xl blur-sm opacity-50"></div>
                    <GoogleMap className="relative z-10" address={currentLocation.address} />
                    <div className="absolute top-4 right-4 z-20 bg-white p-2 rounded-lg shadow-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-700 p-0 h-auto flex items-center gap-1 text-sm focus-visible-ring"
                        onClick={() => {
                          const mapUrl =
                            selectedLocation === "polanco"
                              ? "https://maps.app.goo.gl/YFminzdq8uixrNxB9?g_st=com.google.maps.preview.copy"
                              : "https://maps.app.goo.gl/Yx5Yx5Yx5Yx5Yx5Y6" // Reemplazar con la URL correcta para Ciudad Satélite
                          window.open(mapUrl, "_blank")
                        }}
                      >
                        <MapPin className="h-4 w-4" />
                        Abrir en Google Maps
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </ResponsiveContainer>
        </Section>
      </main>

      <footer className="bg-green-700 text-white py-16">
        <ResponsiveContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/urodex-logo-white.png"
                  alt="Urodex Logo"
                  width={40}
                  height={40}
                  className="h-12 w-auto"
                />
                <span className="text-2xl font-serif font-bold">URODEX</span>
              </div>
              <p className="text-green-100 text-base leading-relaxed">
                Clínica especializada en urología y cirugía de próstata en Ciudad de México, ofreciendo atención médica
                de la más alta calidad.
              </p>

              <div className="flex space-x-4 mt-6">
                <Link href="#" className="text-white hover:text-green-200 transition-colors focus-visible-ring">
                  <Facebook className="h-6 w-6 social-icon" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-white hover:text-green-200 transition-colors focus-visible-ring">
                  <Instagram className="h-6 w-6 social-icon" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-white hover:text-green-200 transition-colors focus-visible-ring">
                  <Twitter className="h-6 w-6 social-icon" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-6 font-serif">Enlaces Rápidos</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#inicio"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#servicios"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="#sobre-mi"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Sobre Mí
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contacto"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-6 font-serif">Servicios</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Cáncer urológico
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Cálculos en vía urinaria
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Hiperplasia Prostática Benigna
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors elegant-underline focus-visible-ring"
                  >
                    Ver todos los servicios
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-6 font-serif">Contacto</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4 hover-lift">
                  <div className="bg-green-600 p-2 rounded-full mt-0.5">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-green-100 text-base">(55) 1694 2925</span>
                </li>
                <li className="flex items-start gap-4 hover-lift">
                  <div className="bg-green-600 p-2 rounded-full mt-0.5">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-green-100 text-base">WhatsApp: (55) 1694 2925</span>
                </li>
                <li className="flex items-start gap-4 hover-lift">
                  <div className="bg-green-600 p-2 rounded-full mt-0.5">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-green-100 text-base">Polanco y Ciudad Satélite</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-600 mt-12 pt-8 text-center text-green-100 text-base">
            <p>© {new Date().getFullYear()} Urodex. Todos los derechos reservados.</p>
          </div>
        </ResponsiveContainer>
      </footer>
    </div>
  )
}
