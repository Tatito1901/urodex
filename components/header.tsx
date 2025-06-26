"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X, Facebook, Instagram, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { ResponsiveContainer } from "./responsive-container"

interface HeaderProps {
  activeSection: string
}

export function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-transform duration-500 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden mobile-menu`}
      >
        <ResponsiveContainer className="h-full flex flex-col">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Image src="/images/urodex-logo.png" alt="Urodex Logo" width={40} height={40} className="h-10 w-auto" />
              <span className="text-2xl font-serif font-bold text-green-700">URODEX</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="focus-visible-ring">
              <X className="h-6 w-6 text-green-700" />
              <span className="sr-only">Cerrar menú</span>
            </Button>
          </div>

          <nav className="flex-1 flex flex-col justify-center space-y-6">
            <Link href="#inicio" className="mobile-nav-item focus-visible-ring" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </Link>
            <Link href="#servicios" className="mobile-nav-item focus-visible-ring" onClick={() => setIsMenuOpen(false)}>
              Servicios
            </Link>
            <Link href="#sobre-mi" className="mobile-nav-item focus-visible-ring" onClick={() => setIsMenuOpen(false)}>
              Sobre Mí
            </Link>
            <Link href="/blog" className="mobile-nav-item focus-visible-ring" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link href="#contacto" className="mobile-nav-item focus-visible-ring" onClick={() => setIsMenuOpen(false)}>
              Contacto
            </Link>
          </nav>

          <div className="py-8 flex justify-center">
            <Button
              className="bg-green-700 hover:bg-green-600 btn-elegant rounded-full px-6 focus-visible-ring"
              onClick={() => {
                setIsMenuOpen(false)
                window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")
              }}
            >
              Agendar Cita
            </Button>
          </div>

          <div className="pb-8 flex justify-center space-x-6">
            <Link href="#" className="text-green-700 hover:text-green-600 transition-colors focus-visible-ring">
              <Facebook className="h-6 w-6 social-icon" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-green-700 hover:text-green-600 transition-colors focus-visible-ring">
              <Instagram className="h-6 w-6 social-icon" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-green-700 hover:text-green-600 transition-colors focus-visible-ring">
              <Twitter className="h-6 w-6 social-icon" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </ResponsiveContainer>
      </div>

      <header className={cn("sticky-header", isScrolled && "scrolled")}>
        <ResponsiveContainer>
          <div className="flex h-16 md:h-20 items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="#inicio" className="flex items-center gap-2 md:gap-3 focus-visible-ring">
                <div className="relative">
                  <div className="absolute -inset-1 bg-green-100 rounded-full blur-sm opacity-70"></div>
                  <Image
                    src="/images/urodex-logo.png"
                    alt="Urodex Logo"
                    width={32}
                    height={32}
                    className="h-8 md:h-10 w-auto relative z-10"
                  />
                </div>
                <span className="text-lg md:text-2xl font-serif font-bold text-green-700">URODEX</span>
              </Link>
            </div>

            <nav className="hidden md:flex gap-8">
              <Link
                href="#inicio"
                className={`text-sm font-medium transition-colors relative group focus-visible-ring ${
                  activeSection === "inicio" ? "text-green-700" : "text-gray-600 hover:text-green-700"
                }`}
              >
                Inicio
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all duration-300 ${
                    activeSection === "inicio" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
              <Link
                href="#servicios"
                className={`text-sm font-medium transition-colors relative group focus-visible-ring ${
                  activeSection === "servicios" ? "text-green-700" : "text-gray-600 hover:text-green-700"
                }`}
              >
                Servicios
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all duration-300 ${
                    activeSection === "servicios" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
              <Link
                href="#sobre-mi"
                className={`text-sm font-medium transition-colors relative group focus-visible-ring ${
                  activeSection === "sobre-mi" ? "text-green-700" : "text-gray-600 hover:text-green-700"
                }`}
              >
                Sobre Mí
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all duration-300 ${
                    activeSection === "sobre-mi" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
              <Link
                href="/blog"
                className={`text-sm font-medium transition-colors relative group focus-visible-ring ${
                  activeSection === "blog" ? "text-green-700" : "text-gray-600 hover:text-green-700"
                }`}
              >
                Blog
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all duration-300 ${
                    activeSection === "blog" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
              <Link
                href="#contacto"
                className={`text-sm font-medium transition-colors relative group focus-visible-ring ${
                  activeSection === "contacto" ? "text-green-700" : "text-gray-600 hover:text-green-700"
                }`}
              >
                Contacto
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all duration-300 ${
                    activeSection === "contacto" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            </nav>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-700 menu-button focus-visible-ring"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <div className="flex items-center gap-2 pr-3 xl:pr-4 border-r border-gray-200">
                <Phone className="h-3 xl:h-4 w-3 xl:w-4 text-green-600" />
                <span className="text-xs xl:text-sm text-gray-600">(55) 1694 2925</span>
              </div>
              <div className="flex space-x-2 xl:space-x-3 pr-3 xl:pr-4">
                <Link href="#" className="text-green-700 hover:text-green-600 transition-colors focus-visible-ring">
                  <Facebook className="h-4 xl:h-5 w-4 xl:w-5 social-icon" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-green-700 hover:text-green-600 transition-colors focus-visible-ring">
                  <Instagram className="h-4 xl:h-5 w-4 xl:w-5 social-icon" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
              <Button
                className="bg-green-700 hover:bg-green-600 btn-elegant rounded-full px-4 xl:px-6 py-2 xl:py-3 focus-visible-ring text-sm xl:text-base"
                onClick={() => window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")}
              >
                Agendar Cita
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </header>
    </>
  )
}
