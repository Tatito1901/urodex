
"use client"

import { useEffect, useState } from "react"
import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"
import { QuienSoySection } from "@/components/quien-soy-section"
import { TratamientosSection } from "@/components/tratamientos-section"
import { ContactSection } from "@/components/contact-section"
import { ClinicsSection } from "@/components/clinicas-section"
import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HomeBlogSection } from "@/components/home-blog-section"
import { FaqSection } from "@/components/faq-section"
import { InstalacionesSection } from "@/components/instalaciones-section"



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
        <InstalacionesSection />
        <FaqSection background="pearl" />
        <ContactSection background="primary-dark" />
        <HomeBlogSection />
      </main>

      <Footer />
    </div>
  )
}