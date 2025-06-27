import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Phone, MapPin, Clock } from "lucide-react"
import { ResponsiveContainer } from "./responsive-container"
import { useMemo } from "react"

export const Footer = () => {
  // Memorizar datos para evitar recreación en cada render
  const navigationLinks = useMemo(() => [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-mi", label: "Dr. Mario Martínez" },
    { href: "#servicios", label: "Servicios" },
    { href: "#clinicas", label: "Clínicas" },
    { href: "#contacto", label: "Contacto" },
  ], []);

  const specialties = useMemo(() => [
    "Cirugía de Próstata",
    "Tratamiento de VPH",
    "Circuncisión Láser",
    "Cálculos Renales",
    "Cáncer Urológico",
  ], []);

  const contactInfo = useMemo(() => [
    {
      icon: <Phone className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />,
      title: "(55) 1694 2925",
      subtitle: "WhatsApp 24/7"
    },
    {
      icon: <MapPin className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />,
      title: "Polanco, Satélite & INTERMED",
      subtitle: "Ciudad de México"
    },
    {
      icon: <Clock className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />,
      title: "Lun - Vie: 9:00 - 19:00",
      subtitle: "Sáb: 9:00 - 14:00"
    }
  ], []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
      <div className="py-12 md:py-16">
        <ResponsiveContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Logo y descripción */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <Image
                    src="/images/isotipo_Fondo_Blanco.jpg"
                    alt="Urodex Logo"
                    width={48}
                    height={48}
                    className="h-10 w-auto"
                  />
                </div>
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                  URODEX
                </span>
              </div>
              <p className="text-green-100 leading-relaxed mb-6 text-sm md:text-base">
                Clínica especializada en urología y cirugía de próstata en Ciudad de México, 
                comprometida con la excelencia médica y el cuidado personalizado.
              </p>
              <div className="flex space-x-3">
                <Link 
                  href="https://www.facebook.com/drmariomartinezuro/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition-colors p-2 rounded-full hover:bg-gradient-to-r from-blue-600 to-blue-800"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://www.instagram.com/urologo.mariothomas" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition-colors p-2 rounded-full hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Navegación */}
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-5 text-white flex items-center gap-2">
                <div className="w-3 h-0.5 bg-green-300"></div>
                Navegación
              </h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-green-100 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-2 h-0.5 bg-green-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Especialidades */}
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-5 text-white flex items-center gap-2">
                <div className="w-3 h-0.5 bg-green-300"></div>
                Especialidades
              </h3>
              <ul className="space-y-3">
                {specialties.map((service) => (
                  <li key={service}>
                    <span className="text-green-100 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                      <span className="w-2 h-0.5 bg-green-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-5 text-white flex items-center gap-2">
                <div className="w-3 h-0.5 bg-green-300"></div>
                Contacto
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-800/50 p-2 rounded-lg border border-green-700/50">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">{item.title}</p>
                      <p className="text-green-100 text-xs md:text-sm mt-1">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      <div className="border-t border-green-700/50">
        <ResponsiveContainer>
          <div className="py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-green-100 text-center md:text-left text-sm">
              © {currentYear} Urodex - Dr. Mario Martínez Thomas. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-5 text-sm text-green-100">
              <Link 
                href="/privacidad" 
                className="hover:text-white transition-colors text-xs md:text-sm"
              >
                Política de Privacidad
              </Link>
              <Link 
                href="/terminos" 
                className="hover:text-white transition-colors text-xs md:text-sm"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </footer>
  )
}