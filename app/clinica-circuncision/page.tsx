"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { Header } from "@/components/header"
import { Section } from "@/components/section"
import { ResponsiveContainer } from "@/components/responsive-container"
import { TypographyH1, TypographyH2, TypographyP } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Zap,
  Clock,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollAnimation, ParallaxEffect } from "@/components/scroll-animations"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ClinicaCircuncisionPage() {
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "servicios", "sobre-mi"]

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

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-green-700" />,
      title: "Tecnología Láser Avanzada",
      description:
        "Utilizamos láser de última generación que reduce el sangrado, acelera la cicatrización y minimiza las molestias.",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-700" />,
      title: "Procedimiento Rápido",
      description:
        "La circuncisión con láser se realiza en 30-45 minutos con recuperación más rápida que métodos tradicionales.",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-700" />,
      title: "Atención Personalizada",
      description:
        "Cada paciente recibe un plan de tratamiento individualizado con seguimiento postoperatorio completo.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-700" />,
      title: "Máxima Seguridad",
      description:
        "Procedimiento ambulatorio con las más altas medidas de seguridad y esterilización en quirófano especializado.",
    },
  ]

  const procedures = [
    {
      name: "Circuncisión con Láser CO2",
      description: "Técnica más avanzada con láser de dióxido de carbono para máxima precisión.",
      duration: "30-45 minutos",
      recovery: "7-10 días",
      benefits: ["Mínimo sangrado", "Cicatrización rápida", "Menos dolor"],
    },
    {
      name: "Circuncisión Tradicional",
      description: "Método clásico quirúrgico con técnicas refinadas y sutura especializada.",
      duration: "45-60 minutos",
      recovery: "10-14 días",
      benefits: ["Técnica probada", "Resultados predecibles", "Costo accesible"],
    },
    {
      name: "Frenuloplastia",
      description: "Corrección del frenillo corto sin necesidad de circuncisión completa.",
      duration: "20-30 minutos",
      recovery: "5-7 días",
      benefits: ["Preserva prepucio", "Mínimamente invasivo", "Recuperación rápida"],
    },
    {
      name: "Tratamiento de Fimosis",
      description: "Solución definitiva para fimosis severa mediante circuncisión especializada.",
      duration: "30-45 minutos",
      recovery: "7-14 días",
      benefits: ["Solución definitiva", "Mejora función", "Previene infecciones"],
    },
  ]

  const conditions = [
    {
      name: "Fimosis",
      description: "Estrechamiento del prepucio que impide la retracción normal del glande.",
      symptoms: ["Dificultad para retraer el prepucio", "Dolor durante la erección", "Infecciones recurrentes"],
    },
    {
      name: "Parafimosis",
      description: "Prepucio retraído que no puede volver a su posición normal.",
      symptoms: ["Hinchazón del glande", "Dolor intenso", "Urgencia médica"],
    },
    {
      name: "Balanitis Recurrente",
      description: "Inflamación recurrente del glande y prepucio.",
      symptoms: ["Enrojecimiento", "Picazón", "Secreción", "Mal olor"],
    },
    {
      name: "Frenillo Corto",
      description: "Frenillo que limita el movimiento normal del prepucio.",
      symptoms: ["Dolor durante relaciones", "Sangrado del frenillo", "Curvatura del pene"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgressBar />
      <CustomCursor />

      <Header activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative bg-white overflow-hidden min-h-[calc(100vh-5rem)]">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-green-100/50 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-green-100/50 translate-y-1/2 -translate-x-1/3"></div>
          <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-green-200/30"></div>
          <div className="absolute bottom-40 right-40 w-24 h-24 rounded-full bg-green-200/40"></div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#0e5041 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          ></div>

          <ResponsiveContainer className="py-12 md:py-20 lg:py-28 relative flex flex-col justify-center min-h-[calc(100vh-5rem)]">
            <ScrollAnimation animation="fade-in-up" className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
              <div className="inline-block px-3 py-1 md:px-4 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium mb-2">
                Clínica Especializada
              </div>

              <TypographyH1 className="text-green-800 font-bold text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                Circuncisión con Láser
              </TypographyH1>

              <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto"></div>

              <TypographyP className="text-green-800 font-medium text-lg md:text-xl lg:text-2xl px-4">
                Solución definitiva para fimosis, balanitis y frenillo corto con la tecnología láser más avanzada y
                mínimamente invasiva.
              </TypographyP>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4 md:pt-6 justify-center px-4">
                <Button
                  className="bg-green-700 hover:bg-green-600 btn-elegant rounded-full px-6 md:px-8 py-4 md:py-6 shadow-lg focus-visible-ring text-sm md:text-base"
                  onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
                >
                  Agenda tu Consulta
                </Button>
                <Button
                  variant="outline"
                  className="border-green-700 text-green-700 hover:bg-green-50 rounded-full px-6 md:px-8 py-4 md:py-6 focus-visible-ring text-sm md:text-base"
                  onClick={() => {
                    const serviciosSection = document.getElementById("servicios")
                    if (serviciosSection) {
                      serviciosSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Conocer Procedimientos
                </Button>
              </div>
            </ScrollAnimation>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <ScrollAnimation animation="fade-in-up" delay={200}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">800+</div>
                  <div className="text-gray-600">Circuncisiones Realizadas</div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-in-up" delay={300}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">99%</div>
                  <div className="text-gray-600">Satisfacción del Paciente</div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-in-up" delay={400}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">12+</div>
                  <div className="text-gray-600">Años de Experiencia</div>
                </div>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </section>

        {/* Benefits Section */}
        <Section background="primary-light" spacing="lg">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center content-narrow mb-16">
                <TypographyH2 className="mb-4 text-green-700">
                  ¿Por qué elegir nuestra clínica de circuncisión?
                </TypographyH2>
                <div className="w-20 h-1 bg-green-700 mx-auto mb-6"></div>
                <TypographyP className="text-green-700">
                  Ofrecemos la circuncisión más avanzada con tecnología láser, garantizando los mejores resultados con
                  mínimas molestias y recuperación rápida.
                </TypographyP>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <ScrollAnimation key={index} animation="fade-in-up" delay={index * 100}>
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-full flex-shrink-0">{benefit.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-green-700 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Conditions Section */}
        <Section background="white" spacing="lg">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center content-narrow mb-16">
                <TypographyH2 className="mb-4 gradient-text">Condiciones que Tratamos</TypographyH2>
                <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
                <TypographyP>
                  La circuncisión es la solución definitiva para diversas condiciones que afectan el prepucio y pueden
                  causar molestias o complicaciones.
                </TypographyP>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {conditions.map((condition, index) => (
                <ScrollAnimation key={index} animation="fade-in-up" delay={index * 100}>
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 border border-green-100 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold text-green-700 mb-4">{condition.name}</h3>
                    <p className="text-gray-600 mb-6">{condition.description}</p>

                    <div className="mb-6">
                      <h4 className="font-medium text-green-700 mb-3">Síntomas comunes:</h4>
                      <ul className="space-y-2">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-green-700 text-green-700 hover:bg-green-50 rounded-full"
                      onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
                    >
                      Consultar Tratamiento
                    </Button>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Procedures Section */}
        <Section id="servicios" background="gradient" spacing="lg">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center content-narrow mb-16">
                <TypographyH2 className="mb-4 text-white">Tipos de Procedimientos</TypographyH2>
                <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
                <TypographyP className="text-green-100">
                  Ofrecemos diferentes técnicas de circuncisión adaptadas a las necesidades específicas de cada
                  paciente.
                </TypographyP>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {procedures.map((procedure, index) => (
                <ScrollAnimation key={index} animation="fade-in-up" delay={index * 100}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-xl font-bold text-white mb-4">{procedure.name}</h3>
                    <p className="text-green-100 mb-6">{procedure.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-green-200 mb-1">Duración</div>
                        <div className="font-medium text-white">{procedure.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-green-200 mb-1">Recuperación</div>
                        <div className="font-medium text-white">{procedure.recovery}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-white mb-3">Beneficios:</h4>
                      <ul className="space-y-2">
                        {procedure.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-green-100">
                            <CheckCircle className="h-4 w-4 text-green-300 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-green-700 rounded-full"
                      onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
                    >
                      Consultar Procedimiento
                    </Button>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </Section>

        {/* Doctor Section */}
        <Section id="sobre-mi" background="white" spacing="lg">
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
                  <h3 className="text-xl text-green-600 mb-2">Tu especialista en circuncisión</h3>
                  <TypographyH2 className="mb-4 gradient-text">Dr. Mario Martínez Thomas</TypographyH2>
                  <div className="w-20 h-1 bg-green-500 mb-6"></div>
                </div>

                <TypographyP>
                  Cirujano Urólogo especializado en circuncisión con más de 12 años de experiencia. Pionero en el uso de
                  tecnología láser para circuncisión en México, con más de 800 procedimientos exitosos realizados.
                </TypographyP>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Más de 800 circuncisiones realizadas con éxito</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Especialización en técnicas láser avanzadas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Certificación en cirugía ambulatoria</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Enfoque en resultados estéticos y funcionales</span>
                  </div>
                </div>

                <Button
                  className="bg-green-700 hover:bg-green-600 btn-elegant rounded-full px-8 py-4"
                  onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
                >
                  Agendar Consulta Especializada
                </Button>
              </ScrollAnimation>
            </div>
          </ResponsiveContainer>
        </Section>

        {/* FAQ Section */}
        <Section background="primary-light" spacing="lg">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center content-narrow mb-16">
                <TypographyH2 className="mb-4 gradient-text">Preguntas Frecuentes sobre Circuncisión</TypographyH2>
                <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
                <TypographyP>
                  Respuestas a las dudas más comunes sobre la circuncisión y el proceso de recuperación.
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
                      ¿Qué es la circuncisión y cuándo es necesaria?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        La circuncisión es un procedimiento quirúrgico que consiste en la remoción total o parcial del
                        prepucio. Es necesaria en casos de fimosis (prepucio estrecho), parafimosis, balanitis
                        recurrente, frenillo corto, o por razones médicas, religiosas o de higiene personal.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Qué ventajas tiene la circuncisión con láser?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        La circuncisión con láser ofrece múltiples ventajas: menor sangrado durante el procedimiento,
                        cicatrización más rápida, menos dolor postoperatorio, menor riesgo de infección, mayor precisión
                        en el corte, y mejor resultado estético. Además, el tiempo de recuperación es significativamente
                        menor.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Cuánto tiempo dura la recuperación?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        Con la técnica láser, la recuperación inicial es de 7-10 días. Durante este tiempo se debe
                        mantener la zona limpia y seca, evitar actividad física intensa y seguir las indicaciones
                        médicas. La cicatrización completa ocurre en 3-4 semanas, y se puede retomar la actividad sexual
                        después de 4-6 semanas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿El procedimiento es doloroso?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        El procedimiento se realiza bajo anestesia local, por lo que no se siente dolor durante la
                        cirugía. Después del procedimiento, es normal experimentar molestias leves que se controlan
                        efectivamente con analgésicos. La técnica láser reduce significativamente el dolor
                        postoperatorio comparado con métodos tradicionales.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-5"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Afecta la circuncisión la función sexual?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        La circuncisión no afecta negativamente la función sexual. De hecho, muchos pacientes reportan
                        mejoras en su vida sexual debido a la eliminación de problemas como fimosis o infecciones
                        recurrentes. La sensibilidad se mantiene normal y en algunos casos puede mejorar la duración de
                        las relaciones sexuales.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-6"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Cuáles son los cuidados postoperatorios?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        Los cuidados incluyen: mantener la zona limpia y seca, aplicar pomada antibiótica según
                        indicaciones, usar ropa interior de algodón holgada, evitar actividad física intensa por 2
                        semanas, no sumergir la zona en agua (duchas rápidas únicamente), tomar analgésicos según
                        prescripción, y acudir a citas de seguimiento programadas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollAnimation>
            </div>
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
                Clínica especializada en circuncisión con láser en Ciudad de México, ofreciendo los procedimientos más
                avanzados y seguros.
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
                    href="/"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#servicios"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Procedimientos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#sobre-mi"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Dr. Martínez
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-xl mb-6 font-serif">Procedimientos</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Circuncisión con Láser
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Circuncisión Tradicional
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Frenuloplastia
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Tratamiento de Fimosis
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
            <p>© {new Date().getFullYear()} Urodex - Clínica de Circuncisión. Todos los derechos reservados.</p>
          </div>
        </ResponsiveContainer>
      </footer>
    </div>
  )
}
