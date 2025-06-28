// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { memo } from "react";
import {ResponsiveContainer} from "./responsive-container";
import { InstagramIcon } from "lucide-react";

// 1. Dynamic imports para reducción de bundle
const FacebookIcon = dynamic(
  () => import("lucide-react").then((mod) => mod.Facebook),
  { ssr: false }
);
// Repite para Instagram, Phone, MapPin, Clock…

// 2. Datos estáticos fuera del componente
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
    Icon: dynamic(() => import("lucide-react").then((mod) => mod.Phone), { ssr: false }),
    title: "(55) 1694 2925",
    subtitle: "WhatsApp 24/7",
  },
  {
    Icon: dynamic(() => import("lucide-react").then((mod) => mod.MapPin), { ssr: false }),
    title: "Polanco, Satélite & INTERMED",
    subtitle: "Ciudad de México",
  },
  {
    Icon: dynamic(() => import("lucide-react").then((mod) => mod.Clock), { ssr: false }),
    title: "Lun - Vie: 9:00 - 19:00",
    subtitle: "Sáb: 9:00 - 14:00",
  },
] as const;

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white">
      <div className="py-8 md:py-12">
        <ResponsiveContainer className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Logo + Descripción */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                  <Image
                    src="/images/isotipo_Fondo_Blanco.png"
                    alt="Urodex Logo"
                    width={48}
                    height={48}
                    loading="lazy"
                    sizes="(max-width: 640px) 40px, 48px"
                  />
                </div>
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
                  URODEX
                </span>
              </div>
              <p className="text-teal-100 leading-relaxed mb-6 text-sm md:text-base">
                Clínica de vanguardia en urología y cirugía de próstata, impulsando el futuro de la salud con tecnología y calidez humana.
              </p>
              <div className="flex space-x-3">
                <Link href="https://www.facebook.com/drmariomartinezuro/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon className="h-6 w-6 hover:text-blue-400 transition" />
                </Link>
                <Link href="https://www.instagram.com/urologo.mariothomas" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon className="h-6 w-6 hover:text-pink-400 transition" />
                </Link>
              </div>
            </div>

            {/* Navegación */}
            <nav aria-label="Footer navigation">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-teal-300"></span>
                Navegación
              </h3>
              <ul className="space-y-2">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center gap-2 text-teal-100 hover:text-white transition">
                      <span className="w-2 h-px bg-teal-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
                
            {/* Especialidades (podrías envolver esto en un Accordion móvil) */}
            <div>
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-teal-300"></span>
                Especialidades
              </h3>
              <ul className="space-y-2">
                {SPECIALTIES.map((svc) => (
                  <li key={svc} className="text-teal-100 hover:text-white transition cursor-pointer flex items-center gap-2">
                    <span className="w-2 h-px bg-teal-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {svc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-teal-300"></span>
                Contacto
              </h3>
              <div className="space-y-4">
                {CONTACTS.map(({ Icon, title, subtitle }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-teal-800/50 p-2 rounded-lg border border-teal-700/50">
                      <Icon className="h-5 w-5 text-teal-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">{title}</p>
                      <p className="text-teal-100 text-xs md:text-sm">{subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </ResponsiveContainer>
      </div>

      <div className="border-t border-teal-700/50">
        <ResponsiveContainer className="px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-teal-100 text-sm">
              © {CURRENT_YEAR} Urodex – Dr. Mario Martínez Thomas. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <Link href="/privacidad" className="hover:text-white transition">Política de Privacidad</Link>
              <Link href="/terminos" className="hover:text-white transition">Términos y Condiciones</Link>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </footer>
  );
});