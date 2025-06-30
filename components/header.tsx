import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X, Facebook, Instagram, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activeSection: string
}

// Componente optimizado para el contenedor responsivo
const ResponsiveContainer = ({ children, className = "", padding = "default" }: {
  children: React.ReactNode
  className?: string
  padding?: "none" | "sm" | "default" | "md" | "lg"
}) => {
  const paddingClasses = {
    none: "",
    sm: "px-4",
    default: "px-4 sm:px-6",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-12"
  }

  return (
    <div className={cn("max-w-7xl mx-auto w-full", paddingClasses[padding], className)}>
      {children}
    </div>
  )
}

export function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  // Memoized clinic detection
  const clinicInfo = useMemo(() => {
    const isClinicPage = pathname?.includes("/clinica-")
    const currentClinic = isClinicPage ? pathname?.split("/")[1] : null
    
    return {
      isClinicPage,
      currentClinic,
      clinicPages: [
        { path: "/clinica-prostata", label: "Clínica de Próstata", shortLabel: "Próstata" },
        { path: "/clinica-circuncision", label: "Clínica de Circuncisión", shortLabel: "Circuncisión" },
        { path: "/clinica-vph", label: "Clínica de VPH", shortLabel: "VPH" }
      ].filter(clinic => `/${currentClinic}` !== clinic.path)
    }
  }, [pathname])

  // Memoized contact phones
  const contactPhones = useMemo(() => [
    { label: "(55) 1694 2925", tel: "5516942925" },
    { label: "(55) 5572 1463", tel: "5555721463" }
  ], [])

  // Memoized navigation items
  const navigationItems = useMemo(() => [
    { href: "/", label: "Inicio", section: "inicio" },
    { href: "#sobre-mi", label: "Sobre Mí", section: "sobre-mi" },
    { href: "#servicios", label: "Servicios", section: "servicios" },
    { href: "#clinicas", label: "Clínicas", section: "clinicas" },
    { href: "#contacto", label: "Contacto", section: "contacto" }
  ], [])

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setIsScrolled(scrollY > 10)
  }, [])

  // Optimized WhatsApp handler
  const openWhatsApp = useCallback(() => {
    window.open(
      "https://api.whatsapp.com/send?phone=5215516942925&text=Hola%20Dr.%20Mario,%20me%20gustaría%20obtener%20más%20información%20acerca%20de%20sus%20servicios",
      "_blank"
    )
  }, [])

  // Close menu handler
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Toggle menu handler
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  // Scroll effect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        closeMenu()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen, closeMenu])

  // Body overflow handler
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 transition-transform duration-500 transform lg:hidden mobile-menu",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ResponsiveContainer className="h-full flex flex-col" padding="md">
          {/* Mobile Header */}
          <div className="flex justify-between items-center py-4 sm:py-6 border-b border-emerald-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/images/Isotipo_Negativo Fondo Color (4).png"
                alt="Urodex Logo"
                width={40}
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
              <span className="text-xl sm:text-2xl font-bold text-emerald-700">
                URODEX
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              className="text-emerald-700 hover:bg-emerald-50 h-10 w-10"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6 px-2 sm:px-4">
            {clinicInfo.isClinicPage ? (
              <>
                {/* Back to home button */}
                <Link
                  href="/"
                  className="text-lg sm:text-xl font-semibold text-center py-4 sm:py-6 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center gap-2 sm:gap-3 shadow-sm transition-all duration-300"
                  onClick={closeMenu}
                >
                  <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  Regresar a inicio
                </Link>
                
                {/* Other clinics navigation */}
                {clinicInfo.clinicPages.length > 0 && (
                  <div className="mt-2 sm:mt-4">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-3 sm:mb-4 text-center">
                      Otras Clínicas
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {clinicInfo.clinicPages.map((clinic) => (
                        <Link
                          key={clinic.path}
                          href={clinic.path}
                          className="text-sm sm:text-base font-medium text-center py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-100 flex items-center justify-center gap-2 transition-all duration-300"
                          onClick={closeMenu}
                        >
                          {clinic.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Main navigation for home page */
              navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg sm:text-xl font-semibold transition-all duration-300 text-center py-3 sm:py-4 rounded-xl hover:bg-emerald-50",
                    activeSection === item.section
                      ? "text-emerald-700 bg-emerald-50 shadow-sm"
                      : "text-slate-600 hover:text-emerald-700"
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))
            )}
          </nav>

          {/* Mobile CTA */}
          <div className="py-6 sm:py-8 flex justify-center">
            <Button
              className="bg-emerald-700 hover:bg-emerald-600 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                closeMenu()
                openWhatsApp()
              }}
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Agendar Cita
            </Button>
          </div>

          {/* Mobile Social Links */}
          <div className="pb-6 sm:pb-8 flex justify-center space-x-4 sm:space-x-6">
            <Link
              href="https://www.facebook.com/drmariomartinezuro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-600 transition-colors p-2 sm:p-3 rounded-full hover:bg-emerald-50"
            >
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
            <Link
              href="https://www.instagram.com/urologo.mariothomas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-600 transition-colors p-2 sm:p-3 rounded-full hover:bg-emerald-50"
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Desktop Header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-emerald-100"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <ResponsiveContainer padding="md">
          <div className="flex h-16 sm:h-18 lg:h-20 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 lg:gap-4">
              <Link
                href={clinicInfo.isClinicPage ? "/" : "#inicio"}
                className="flex items-center gap-3 lg:gap-4 group"
              >
                <Image
                  src="/images/Isotipo_Negativo Fondo Color (4).png"
                  alt="Urodex Logo"
                  width={40}
                  height={40}
                  className="h-8 lg:h-10 w-auto"
                  priority
                />
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-700 leading-tight">
                    URODEX
                  </span>
                  <span className="text-xs text-emerald-600 font-medium hidden lg:block leading-tight">
                    Dr. Mario Martínez Thomas
                  </span>
                </div>
              </Link>
              
              {/* Cross-clinic navigation - Desktop */}
              {clinicInfo.isClinicPage && clinicInfo.clinicPages.length > 0 && (
                <div className="hidden lg:flex items-center space-x-1 border-l border-emerald-100 pl-4 xl:pl-6 ml-4 xl:ml-6">
                  <span className="text-xs xl:text-sm font-medium text-slate-500 mr-2 xl:mr-3">
                    Otras clínicas:
                  </span>
                  {clinicInfo.clinicPages.map((clinic) => (
                    <Link
                      key={clinic.path}
                      href={clinic.path}
                      className="px-2 xl:px-3 py-1 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-100"
                    >
                      {clinic.shortLabel}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Navigation - Only show on main site */}
            {!clinicInfo.isClinicPage && (
              <nav className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const isActive =
                    (activeSection === item.section && item.href.startsWith("#")) ||
                    (item.href === "/" && pathname === "/" && !activeSection) ||
                    (item.href !== "/" && item.href !== "#" && pathname?.startsWith(item.href))

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-3 xl:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-emerald-50 text-emerald-700 shadow-sm"
                          : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            )}

            {/* Desktop Right Section */}
            <div className="hidden xl:flex items-center gap-3 2xl:gap-6">
              {/* Contact Info */}
              <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <div className="flex flex-col 2xl:flex-row 2xl:space-x-4">
                  {contactPhones.map(({ label, tel }) => (
                    <a
                      key={tel}
                      href={`tel:${tel}`}
                      className="text-xs 2xl:text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-1 2xl:space-x-2">
                <Link
                  href="https://www.facebook.com/drmariomartinezuro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  href="https://www.instagram.com/urologo.mariothomas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              </div>

              {/* CTA Button */}
              <Button
                className="bg-emerald-700 hover:bg-emerald-600 text-white rounded-full px-4 2xl:px-6 py-2.5 2xl:py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={openWhatsApp}
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden 2xl:inline">Agendar Cita</span>
                <span className="2xl:hidden">Cita</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-emerald-700 hover:bg-emerald-50 menu-button h-10 w-10"
                onClick={toggleMenu}
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </header>
    </>
  )
}