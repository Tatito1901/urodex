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
  Award,
  Facebook,
  Instagram,
  Twitter,
  Shield,
  Heart,
  Activity,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollAnimation, ParallaxEffect } from "@/components/scroll-animations"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ClinicaProstataPage() {
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
      icon: <Award className="h-8 w-8 text-green-700" />,
      title: "Cirugía Mínimamente Invasiva",
      description:
        "Técnicas laparoscópicas avanzadas que reducen el tiempo de recuperación y las molestias postoperatorias.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-700" />,
      title: "Preservación de la Función",
      description: "Enfoque especializado en mantener la función urinaria y sexual después del procedimiento.",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-700" />,
      title: "Atención Personalizada",
      description: "Cada paciente recibe un plan de tratamiento individualizado según sus necesidades específicas.",
    },
    {
      icon: <Activity className="h-8 w-8 text-green-700" />,
      title: "Tecnología de Vanguardia",
      description: "Equipos de última generación para diagnósticos precisos y cirugías más efectivas.",
    },
  ]

  const procedures = [
    {
      name: "Prostatectomía Radical Laparoscópica",
      description: "Cirugía mínimamente invasiva para el tratamiento del cáncer de próstata.",
      duration: "2-3 horas",
      recovery: "1-2 semanas",
    },
    {
      name: "Resección Transuretral (RTU)",
      description: "Procedimiento para tratar la hiperplasia prostática benigna.",
      duration: "1-2 horas",
      recovery: "3-5 días",
    },
    {
      name: "Enucleación con Láser",
      description: "Técnica moderna para el tratamiento de próstata agrandada.",
      duration: "1-2 horas",
      recovery: "1-3 días",
    },
    {
      name: "Biopsia de Próstata Guiada",
      description: "Diagnóstico preciso mediante biopsia con guía ecográfica.",
      duration: "30-45 minutos",
      recovery: "Mismo día",
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
                Cirugía de Próstata
              </TypographyH1>

              <div className="w-16 md:w-24 h-1 bg-green-500 mx-auto"></div>

              <TypographyP className="text-green-800 font-medium text-lg md:text-xl lg:text-2xl px-4">
                Tratamiento especializado para problemas de próstata con las técnicas más avanzadas y mínimamente
                invasivas.
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
                  <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">500+</div>
                  <div className="text-gray-600">Cirugías Exitosas</div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-in-up" delay={300}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">98%</div>
                  <div className="text-gray-600">Tasa de Éxito</div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-in-up" delay={400}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">15+</div>
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
                <TypographyH2 className="mb-4 text-green-700">¿Por qué elegir nuestra clínica?</TypographyH2>
                <div className="w-20 h-1 bg-green-700 mx-auto mb-6"></div>
                <TypographyP className="text-green-700">
                  Ofrecemos la más alta calidad en cirugía de próstata con tecnología de vanguardia y un enfoque
                  centrado en el paciente.
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

        {/* Procedures Section */}
        <Section id="servicios" background="white" spacing="lg">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center content-narrow mb-16">
                <TypographyH2 className="mb-4 gradient-text">Procedimientos Especializados</TypographyH2>
                <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
                <TypographyP>
                  Realizamos una amplia gama de procedimientos urológicos especializados en próstata con las técnicas
                  más avanzadas.
                </TypographyP>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {procedures.map((procedure, index) => (
                <ScrollAnimation key={index} animation="fade-in-up" delay={index * 100}>
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-8 border border-green-100 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold text-green-700 mb-4">{procedure.name}</h3>
                    <p className="text-gray-600 mb-6">{procedure.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Duración</div>
                        <div className="font-medium text-green-700">{procedure.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Recuperación</div>
                        <div className="font-medium text-green-700">{procedure.recovery}</div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-green-700 text-green-700 hover:bg-green-50 rounded-full"
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
        <Section id="sobre-mi" background="gradient" spacing="lg">
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
                  <h3 className="text-xl text-green-600 mb-2">Tu especialista en cirugía de próstata</h3>
                  <TypographyH2 className="mb-4 gradient-text">Dr. Mario Martínez Thomas</TypographyH2>
                  <div className="w-20 h-1 bg-green-500 mb-6"></div>
                </div>

                <TypographyP>
                  Cirujano Urólogo especializado en cirugía de próstata con más de 15 años de experiencia. Certificado
                  por el Consejo Nacional Mexicano de Urología y entrenado en las técnicas más avanzadas de cirugía
                  mínimamente invasiva.
                </TypographyP>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Más de 500 cirugías de próstata realizadas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Certificación en laparoscopia urológica avanzada</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Miembro de la Asociación Americana de Urología</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Especialista en preservación de función sexual</span>
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
        <Section background="white" spacing="lg">
          <ResponsiveContainer>
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center content-narrow mb-16">
                <TypographyH2 className="mb-4 gradient-text">
                  Preguntas Frecuentes sobre Cirugía de Próstata
                </TypographyH2>
                <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
                <TypographyP>Respuestas a las dudas más comunes sobre los procedimientos de próstata.</TypographyP>
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
                      ¿Cuándo es necesaria una cirugía de próstata?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        La cirugía de próstata puede ser necesaria en casos de cáncer de próstata localizado,
                        hiperplasia prostática benigna severa que no responde a medicamentos, o cuando hay obstrucción
                        urinaria significativa que afecta la calidad de vida del paciente.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Qué ventajas tiene la cirugía laparoscópica?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        La cirugía laparoscópica ofrece múltiples ventajas: menor dolor postoperatorio, cicatrices más
                        pequeñas, menor pérdida de sangre, recuperación más rápida, menor riesgo de infección y mejor
                        preservación de la función sexual y urinaria.
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
                        El tiempo de recuperación varía según el tipo de procedimiento. Para cirugías mínimamente
                        invasivas, la mayoría de pacientes pueden retomar actividades normales en 1-2 semanas, mientras
                        que la recuperación completa puede tomar 4-6 semanas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="border border-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="hover:bg-green-50 px-6 py-4 text-left font-medium text-green-800 text-lg focus-visible-ring">
                      ¿Se puede preservar la función sexual?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      <p>
                        Sí, utilizamos técnicas de preservación nerviosa que mantienen la función sexual en la mayoría
                        de los casos. El éxito depende de factores como la edad del paciente, la función preoperatoria y
                        la extensión del procedimiento requerido.
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
                Clínica especializada en cirugía de próstata en Ciudad de México, ofreciendo atención médica de la más
                alta calidad.
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
                    Prostatectomía Laparoscópica
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Resección Transuretral
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Enucleación con Láser
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-green-100 hover:text-white text-base transition-colors flex items-center gap-2 elegant-underline focus-visible-ring"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Biopsia Guiada
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
            <p>© {new Date().getFullYear()} Urodex - Clínica de Cirugía de Próstata. Todos los derechos reservados.</p>
          </div>
        </ResponsiveContainer>
      </footer>
    </div>
  )
}
