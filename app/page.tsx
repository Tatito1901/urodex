// 9. MAIN PAGE.TSX - Integración Completa
// ============================================

"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { QuienSoySection } from "@/components/quien-soy-section"
import { TratamientosSection } from "@/components/tratamientos-section"
import { ContactSection } from "@/components/contact-section"
import {ClinicsSection} from "@/components/clinicas-section"
import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Section } from "@/components/section"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Button } from "@/components/ui/button" 
import { Building2, Camera } from "lucide-react"
import Image from "next/image"
import { ScrollAnimation } from "@/components/scroll-animations"
import { HomeBlogSection } from "@/components/home-blog-section"
import { FaqSection } from "@/components/faq-section"

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
      src: "/images/sala_de_espera.png",
      alt: "Sala de Recuperación Confortable",
      caption: "Un espacio privado, tranquilo y con atención personalizada para garantizar una recuperación postoperatoria óptima y en condiciones de máximo confort."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollProgressBar />
      <CustomCursor />
      <Header activeSection={activeSection} />

      <main className="flex-1">
        <HeroSection />
        <QuienSoySection background="pearl" />
        <TratamientosSection background="primary-dark" />
        <ClinicsSection background="pearl" />

        {/* Instalaciones Section - Fondo Emerald */}
        <Section 
          id="instalaciones" 
          background="primary-dark" 
          spacing="lg" 
          className="overflow-hidden"
        >
          <ResponsiveContainer padding="lg">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-5xl mx-auto mb-12 lg:mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full text-sm lg:text-base font-semibold mb-6 shadow-md">
                  <Building2 className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                  Nuestras Instalaciones
                </div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                  Instalaciones Modernas
                </h2>
                <div className="w-24 lg:w-32 h-1.5 bg-emerald-600 mx-auto mb-6 lg:mb-8 rounded-full"></div>
                <p className="text-lg lg:text-xl xl:text-2xl text-white leading-relaxed font-medium">
                  Espacios diseñados para brindar la máxima comodidad y confianza a nuestros pacientes, 
                  equipados con la tecnología más avanzada.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
              {facilityImages.map((image, index) => (
                <ScrollAnimation key={image.id} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg border-2 border-emerald-200/50 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-64 lg:h-72 xl:h-80 overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/90 backdrop-blur-sm p-3 lg:p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        <Camera className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-700" />
                      </div>
                    </div>
                    <div className="p-6 lg:p-8 bg-white/95 backdrop-blur-sm">
                      <h3 className="font-bold text-emerald-800 text-lg lg:text-xl xl:text-2xl mb-3 lg:mb-4">{image.alt}</h3>
                      <p className="text-slate-600 leading-relaxed text-base lg:text-lg">{image.caption}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ResponsiveContainer>
        </Section>

        <FaqSection background="pearl" />

        <ContactSection background="gradient-teal-dark" />
        <HomeBlogSection />
      </main>

      <Footer />
    </div>
  )
}