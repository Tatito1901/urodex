// components/Footer.tsx
import React, { memo, useState } from "react";
import { 
  InstagramIcon, 
  ChevronDown, 
  ChevronUp,
  Facebook,
  Phone,
  MapPin,
  Clock
} from "lucide-react";

// --- NOTAS DE CORRECCIÓN ---
// Se han eliminado las importaciones de "next/image", "next/link" y "next/dynamic"
// porque no son parte del entorno de React estándar y causaban errores de compilación.
// - `next/image` fue reemplazado por la etiqueta `<img>` estándar de HTML.
// - `next/link` fue reemplazado por la etiqueta `<a>` estándar de HTML.
// - `next/dynamic` fue eliminado y los iconos ahora se importan estáticamente.

// --- ALIAS DE ICONOS (para mantener consistencia con el código original) ---
const FacebookIcon = Facebook;
const PhoneIcon = Phone;
const MapPinIcon = MapPin;
const ClockIcon = Clock;

// --- DATOS ESTÁTICOS (SIN CAMBIOS) ---
const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Dr. Mario Martínez" },
  { href: "#servicios", label: "Servicios" },
  { href: "#clinicas", label: "Clínicas" },
  { href: "#contacto", label: "Contacto" },
] as const;

const SPECIALTIES = [
  "Cirugía de Próstata",
  "Tratamiento de VPH",
  "Circuncisión Láser",
  "Cálculos Renales",
  "Cáncer Urológico",
] as const;

const CONTACTS = [
  {
    Icon: PhoneIcon,
    title: "(55) 1694 2925",
    subtitle: "WhatsApp 24/7",
    href: "tel:+525516942925",
  },
  {
    Icon: MapPinIcon,
    title: "Polanco, Satélite & INTERMED",
    subtitle: "Ciudad de México",
    href: "https://maps.google.com",
  },
  {
    Icon: ClockIcon,
    title: "Lun - Vie: 9:00 - 19:00",
    subtitle: "Sáb: 9:00 - 14:00",
    href: null,
  },
] as const;

const CURRENT_YEAR = new Date().getFullYear();

// --- COMPONENTE ACCORDION (SIN CAMBIOS FUNCIONALES) ---
const MobileAccordion = memo(function MobileAccordion({
  title,
  children,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-teal-700/30 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <span className="w-4 h-px bg-teal-300"></span>
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-teal-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-teal-300" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
});

// --- COMPONENTE FOOTER CORREGIDO Y REFACTORIZADO ---
export const Footer = memo(function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white">
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <div className="text-center md:text-left lg:col-span-1">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                  {/* REEMPLAZADO: <Image> de Next.js por <img> estándar de HTML */}
                  <img
                    src="https://placehold.co/48x48/ffffff/0d9488?text=U"
                    alt="Urodex Logo"
                    width={48}
                    height={48}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/48x48/1f2937/ffffff?text=Error'; }}
                  />
                </div>
                <span className="font-bold bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl">
                  URODEX
                </span>
              </div>
              
              <p className="text-teal-100 leading-relaxed mb-6 text-sm md:text-base max-w-md mx-auto md:mx-0">
                Clínica de vanguardia en urología y cirugía de próstata, impulsando el futuro de la salud con tecnología y calidez humana.
              </p>
              
              <div className="flex space-x-4 justify-center md:justify-start">
                {/* REEMPLAZADO: <Link> de Next.js por <a> estándar de HTML */}
                <a
                  href="https://www.facebook.com/drmariomartinezuro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <FacebookIcon className="h-6 w-6 hover:text-blue-400 transition" />
                </a>
                <a
                  href="https://www.instagram.com/urologo.mariothomas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <InstagramIcon className="h-6 w-6 hover:text-pink-400 transition" />
                </a>
              </div>
            </div>

            <nav aria-label="Footer navigation" className="hidden md:block lg:col-span-1">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-teal-300"></span>
                Navegación
              </h3>
              <ul className="space-y-3">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="group flex items-center gap-2 text-teal-100 hover:text-white transition-colors"
                    >
                      <span className="w-2 h-px bg-teal-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="hidden md:block lg:col-span-1">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-teal-300"></span>
                Especialidades
              </h3>
              <ul className="space-y-3">
                {SPECIALTIES.map((specialty) => (
                  <li
                    key={specialty}
                    className="group text-teal-100 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span className="w-2 h-px bg-teal-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="hidden md:block lg:col-span-1">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-teal-300"></span>
                Contacto
              </h3>
              <div className="space-y-4">
                {CONTACTS.map(({ Icon, title, subtitle, href }, i) => {
                  const content = (
                    <div className="flex items-start gap-3 group">
                      <div className="bg-teal-800/50 p-2 rounded-lg border border-teal-700/50 group-hover:bg-teal-700/50 transition-colors">
                        <Icon className="h-5 w-5 text-teal-300" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm md:text-base group-hover:text-teal-100 transition-colors">
                          {title}
                        </p>
                        <p className="text-teal-100 text-xs md:text-sm">{subtitle}</p>
                      </div>
                    </div>
                  );
                  return href ? (
                    <a key={i} href={href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={i}>{content}</div>
                  );
                })}
              </div>
            </div>

            <div className="block md:hidden col-span-1 -mt-4">
              <MobileAccordion title="Navegación">
                <ul className="space-y-3 pl-4">
                  {NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} className="block py-2 text-teal-100 hover:text-white transition-colors">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </MobileAccordion>

              <MobileAccordion title="Especialidades">
                <ul className="space-y-3 pl-4">
                  {SPECIALTIES.map((specialty) => (
                    <li key={specialty} className="py-2 text-teal-100 hover:text-white transition-colors">
                      {specialty}
                    </li>
                  ))}
                </ul>
              </MobileAccordion>

              <MobileAccordion title="Contacto" defaultOpen>
                <div className="space-y-4 pl-4">
                  {CONTACTS.map(({ Icon, title, subtitle, href }, i) => {
                    const content = (
                      <div className="flex items-start gap-3 py-2">
                         <div className="bg-teal-800/50 p-2 rounded-lg border border-teal-700/50">
                           <Icon className="h-5 w-5 text-teal-300" />
                         </div>
                         <div>
                           <p className="text-white font-medium text-sm">{title}</p>
                           <p className="text-teal-100 text-xs">{subtitle}</p>
                         </div>
                       </div>
                    );
                    return href ? (
                      <a key={i} href={href}>{content}</a>
                    ) : (
                      <div key={i}>{content}</div>
                    );
                  })}
                </div>
              </MobileAccordion>
            </div>
            
          </div>
        </div>
      </div>

      <div className="border-t border-teal-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col text-center gap-3 md:flex-row md:justify-between md:items-center">
            <p className="text-teal-100 text-xs sm:text-sm">
              © {CURRENT_YEAR} Urodex – Dr. Mario Martínez Thomas. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm justify-center">
              <a href="/privacidad" className="hover:text-white transition-colors py-1">
                Política de Privacidad
              </a>
              <a href="/terminos" className="hover:text-white transition-colors py-1">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

