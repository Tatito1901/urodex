
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Phone, MapPin, Clock } from "lucide-react"
import { ResponsiveContainer } from "./responsive-container"

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-700 text-white">
      <div className="py-16">
        <ResponsiveContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/urodex-logo-white.png"
                  alt="Urodex Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
                <span className="text-3xl font-serif font-bold">URODEX</span>
              </div>
              <p className="text-green-100 leading-relaxed mb-6">
                Clínica especializada en urología y cirugía de próstata en Ciudad de México, 
                comprometida con la excelencia médica y el cuidado personalizado.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="https://www.facebook.com/drmariomartinezuro/" 
                  target="_blank"
                  className="text-white hover:text-green-200 transition-colors p-2 rounded-full hover:bg-green-600"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://www.instagram.com/urologo.mariothomas" 
                  target="_blank"
                  className="text-white hover:text-green-200 transition-colors p-2 rounded-full hover:bg-green-600"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Navegación</h3>
              <ul className="space-y-3">
                {[
                  { href: "#inicio", label: "Inicio" },
                  { href: "#sobre-mi", label: "Dr. Mario Martínez" },
                  { href: "#servicios", label: "Servicios" },
                  { href: "#clinicas", label: "Clínicas" },
                  { href: "#contacto", label: "Contacto" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-green-100 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Especialidades</h3>
              <ul className="space-y-3">
                {[
                  "Cirugía de Próstata",
                  "Tratamiento de VPH",
                  "Circuncisión Láser",
                  "Cálculos Renales",
                  "Cáncer Urológico",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-green-100 hover:text-white transition-colors cursor-pointer">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-white">Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">(55) 1694 2925</p>
                    <p className="text-green-100 text-sm">WhatsApp 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Polanco, Satélite & INTERMED</p>
                    <p className="text-green-100 text-sm">Ciudad de México</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Lun - Vie: 9:00 - 19:00</p>
                    <p className="text-green-100 text-sm">Sáb: 9:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      <div className="border-t border-green-600">
        <ResponsiveContainer>
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-100 text-center md:text-left">
              © {new Date().getFullYear()} Urodex - Dr. Mario Martínez Thomas. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-green-100">
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </footer>
  )
}