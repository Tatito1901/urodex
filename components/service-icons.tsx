import type React from "react"
import { 
  Activity, 
  Boxes, 
  Scissors, 
  HeartPulse, 
  Pill, 
  Microscope, 
  Wand2, 
  UserRound
} from "lucide-react"

// Función para obtener el ícono correspondiente a cada servicio
export const getServiceIcon = (serviceName: string, className?: string) => {
  switch (serviceName) {
    case "Cirugía de Próstata":
      return <Scissors className={className} />
    case "Tratamiento de VPH":
      return <Microscope className={className} />
    case "Circuncisión":
      return <Scissors className={className} />
    case "Disfunción Eréctil":
      return <HeartPulse className={className} />
    case "Litiasis Renal":
      return <Boxes className={className} />
    case "Cáncer Urológico":
      return <Activity className={className} />
    case "Urodinamia":
      return <Wand2 className={className} />
    case "Uroginecología":
      return <UserRound className={className} />
    default:
      return <Pill className={className} />
  }
}

interface IconProps {
  className?: string
}

export const CancerIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M32 12c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20z" />
    <path d="M32 18c-7.73 0-14 6.27-14 14s6.27 14 14 14 14-6.27 14-14-6.27-14-14-14z" />
    <path d="M32 24c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" />
    <path d="M32 30c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path d="M32 8v4M32 52v4M8 32h4M52 32h4M14.5 14.5l2.83 2.83M46.67 46.67l2.83 2.83M14.5 49.5l2.83-2.83M46.67 17.33l2.83-2.83" />
  </svg>
)

export const CalculosIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 16L10 32l14 20h16l14-20-10-16z" />
    <path d="M24 24l-4 8 6 10h12l6-10-4-8z" />
    <path d="M28 32l-2 4 3 5h6l3-5-2-4z" />
    <path d="M32 12v4M32 48v4M12 32h4M48 32h4" />
    <path d="M38 20l-6 6-6-6M38 44l-6-6-6 6" />
  </svg>
)

export const EyaculacionIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M32 8v12M26 14h12M18 28c0-4.42 6.27-8 14-8s14 3.58 14 8c0 4.42-6.27 8-14 8s-14-3.58-14-8z" />
    <path d="M18 28v8c0 4.42 6.27 8 14 8s14-3.58 14-8v-8" />
    <path d="M18 36v8c0 4.42 6.27 8 14 8s14-3.58 14-8v-8" />
    <path d="M24 24l-6 6M40 24l6 6" />
    <path d="M22 20l-8 8M42 20l8 8" />
  </svg>
)

export const InfeccionIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M32 8c-13.25 0-24 10.75-24 24s10.75 24 24 24 24-10.75 24-24S45.25 8 32 8z" />
    <path d="M32 16c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16-7.16-16-16-16z" />
    <path d="M32 24c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" />
    <path d="M20 20l-4-4M44 20l4-4M20 44l-4 4M44 44l4 4" />
    <path d="M16 32h-4M52 32h-4M32 16v-4M32 52v-4" />
  </svg>
)

export const QuisteIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 16c-8.84 0-16 7.16-16 16s7.16 16 16 16h16c8.84 0 16-7.16 16-16s-7.16-16-16-16H24z" />
    <path d="M24 24c-4.42 0-8 3.58-8 8s3.58 8 8 8h16c4.42 0 8-3.58 8-8s-3.58-8-8-8H24z" />
    <path d="M24 32c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8-8 3.58-8 8z" />
    <path d="M32 12v8M32 44v8M12 32h8M44 32h8" />
  </svg>
)

export const CircuncisionIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M32 8c-6.63 0-12 5.37-12 12v24c0 6.63 5.37 12 12 12s12-5.37 12-12V20c0-6.63-5.37-12-12-12z" />
    <path d="M20 24h24M20 40h24" />
    <path d="M28 16c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4s4-1.79 4-4V20c0-2.21-1.79-4-4-4z" />
    <path d="M36 16c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4s4-1.79 4-4V20c0-2.21-1.79-4-4-4z" />
    <path d="M32 8v8M32 48v8" />
    <path d="M44 32h4M16 32h4" />
  </svg>
)

export const HiperplasiaIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M32 12c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20z" />
    <path d="M32 20c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12z" />
    <path d="M32 28c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
    <path d="M32 12v8M32 44v8M12 32h8M44 32h8" />
    <path d="M18.34 18.34l5.66 5.66M40 40l5.66 5.66M18.34 45.66l5.66-5.66M40 24l5.66-5.66" />
  </svg>
)

export const ItsIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 12h16v16H24z" />
    <path d="M24 28l-8 8v16h32V36l-8-8" />
    <path d="M32 28v16M24 36h16" />
    <path d="M16 44h32M20 52h24" />
    <path d="M28 12v-4M36 12v-4" />
    <path d="M20 20l-4-4M44 20l4-4" />
  </svg>
)
