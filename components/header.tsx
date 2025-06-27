
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X, Facebook, Instagram } from "lucide-react"
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

    window.addEventListener("scroll", handleScroll, { passive: true })
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

  const navigationItems = [
    { href: "/", label: "Inicio", section: "inicio" },
    { href: "#sobre-mi", label: "Sobre Mí", section: "sobre-mi" },
    { href: "#servicios", label: "Servicios", section: "servicios" },
    { href: "#clinicas", label: "Clínicas", section: "clinicas" },
    { href: "#contacto", label: "Contacto", section: "contacto" },
  ]

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=5215516942925", "_blank")
  }

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-transform duration-500 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden mobile-menu`}
      >
        <ResponsiveContainer className="h-full flex flex-col">
          {/* Mobile Header */}
          <div className="flex justify-between items-center py-6 border-b border-green-100">
            <div className="flex items-center gap-3">
              <Image 
                  src="/images/Isotipo_Negativo Fondo Color (4).png" 
                  alt="Urodex Logo" 
                  width={40} 
                  height={40} 
                  className="h-10 w-auto relative z-10" 
                />
              <span className="text-2xl font-sans font-bold text-green-700">URODEX</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-green-700 hover:bg-green-50"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Cerrar menú</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 flex flex-col justify-center space-y-8 px-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`text-2xl font-medium transition-all duration-300 text-center py-4 rounded-xl hover:bg-green-50 ${
                  activeSection === item.section 
                    ? "text-green-700 bg-green-50 shadow-sm" 
                    : "text-gray-600 hover:text-green-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="py-8 flex justify-center">
            <Button
              className="bg-green-700 hover:bg-green-600 text-white rounded-full px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                setIsMenuOpen(false)
                openWhatsApp()
              }}
            >
              <Phone className="h-5 w-5 mr-2" />
              Agendar Cita
            </Button>
          </div>

          {/* Mobile Social Links */}
          <div className="pb-8 flex justify-center space-x-6">
            <Link 
              href="https://www.facebook.com/drmariomartinezuro/" 
              target="_blank"
              className="text-green-700 hover:text-green-600 transition-colors p-3 rounded-full hover:bg-green-50"
            >
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link 
              href="https://www.instagram.com/urologo.mariothomas" 
              target="_blank"
              className="text-green-700 hover:text-green-600 transition-colors p-3 rounded-full hover:bg-green-50"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Desktop Header */}
      <header className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-green-100" 
          : "bg-white/80 backdrop-blur-sm"
      )}>
        <ResponsiveContainer>
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link href="#inicio" className="flex items-center gap-3 md:gap-4 group">
                <Image
                      src="/images/Isotipo_Negativo Fondo Color (4).png"
                      alt="Urodex Logo"
                      width={36}
                      height={36}
                      className="h-8 md:h-10 w-auto relative z-10"
                      priority
                    />
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-sans font-bold text-green-700 leading-tight">
                    URODEX
                  </span>
                  <span className="text-xs text-green-600 font-medium hidden md:block leading-tight">
                    Dr. Mario Martínez Thomas
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm lg:text-base font-medium transition-all duration-300 relative group py-2 px-1 ${
                    activeSection === item.section 
                      ? "text-green-700" 
                      : "text-gray-600 hover:text-green-700"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all duration-300 ${
                      activeSection === item.section 
                        ? "w-full" 
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Contact Info */}
              <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">(55) 1694 2925</span>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-2">
                <Link 
                  href="https://www.facebook.com/drmariomartinezuro/" 
                  target="_blank"
                  className="text-green-700 hover:text-green-600 transition-colors p-2 rounded-full hover:bg-green-50"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link 
                  href="https://www.instagram.com/urologo.mariothomas" 
                  target="_blank"
                  className="text-green-700 hover:text-green-600 transition-colors p-2 rounded-full hover:bg-green-50"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
              
              {/* CTA Button */}
              <Button
                className="bg-green-700 hover:bg-green-600 text-white rounded-full px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={openWhatsApp}
              >
                <Phone className="h-4 w-4 mr-2" />
                Agendar Cita
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-700 hover:bg-green-50 menu-button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </header>
    </>
  )
}