"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Header } from "@/components/header"
import {
  Phone,
  ArrowRight,
  Shield,
  CheckCircle,
  Star,
  Stethoscope,
  Calendar,
  Users,
  Zap,
  Target,
  Heart,
  Activity,
  Award,
  ChevronDown,
  Clock,
  MapPin,
  Mail,
  MessageCircle,
  Plus,
  Minus,
  AlertTriangle,
  Thermometer,
  Lock,
  Timer,
  DollarSign,
  FileText,
  PhoneCall,
  CheckSquare
} from "lucide-react"
import { Footer } from "@/components/footer"

// Componente optimizado para FAQ con mejor UX
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: "fade-in-up" | "fade-in-left" | "fade-in-right" | "fade-in" | "scale-in";
  delay?: number;
  className?: string;
}

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

interface TreatmentItem {
  name: string;
  description: string;
  duration: string;
  recovery: string;

  benefits: string[];
  ideal: string;
  icon: JSX.Element;
  bgColor: string;
  featured?: boolean;
  price?: string; // Agregado para mostrar el precio si está disponible
}

interface ConditionItem {
  title: string;
  description: string;
  symptoms: string[];
  icon: JSX.Element;
  urgency: string;
  urgencyColor: string;
}

interface FAQDataEntry {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer, isOpen, onToggle, index }: FAQItemProps) => (
  <div className="border border-emerald-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
    <button
      onClick={onToggle}
      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-emerald-50/50 transition-colors duration-200 group-hover:bg-emerald-50/30"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${index}`}
    >
      <span className="font-semibold text-slate-800 text-sm sm:text-base pr-4 group-hover:text-emerald-700 transition-colors duration-200">
        {question}
      </span>
      <div className="flex-shrink-0 bg-emerald-50 p-1.5 rounded-lg group-hover:bg-emerald-100 transition-colors duration-200">
        {isOpen ? (
          <Minus className="h-4 w-4 text-emerald-600" />
        ) : (
          <Plus className="h-4 w-4 text-emerald-600" />
        )}
      </div>
    </button>
    {isOpen && (
      <div 
        id={`faq-answer-${index}`}
        className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0 animate-in slide-in-from-top-1 duration-300"
      >
        <div className="border-t border-emerald-100 pt-4">
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{answer}</p>
        </div>
      </div>
    )}
  </div>
)

// Componente optimizado para scroll progress
const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-emerald-100 z-50">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  )
}

// Componente para animaciones de scroll optimizado
const ScrollAnimation = ({ children, animation = "fade-in-up", delay = 0, className = "" }: ScrollAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [elementRef, setElementRef] = useState(null)

  useEffect(() => {
    if (!elementRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(elementRef)
    return () => observer.disconnect()
  }, [elementRef, delay])

  const animationClasses = {
    "fade-in-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    "fade-in-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
    "fade-in-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "scale-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
  }

  return (
    <div 
      ref={(el) => {
        if (el && !isVisible) {
          const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
            }
          })
          observer.observe(el)
        }
      }}
      className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}
    >
      {children}
    </div>
  )
}

// Componente para estadísticas con contador animado
const StatCounter = ({ value, label, suffix = "", delay = 0 }: StatCounterProps) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      const increment = value / 30
      const interval = setInterval(() => {
        setCount(prev => {
          const next = prev + increment
          if (next >= value) {
            clearInterval(interval)
            return value
          }
          return next
        })
      }, 50)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, value, delay])

  return (
    <div 
      ref={(el) => {
        if (el && !isVisible) {
          const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
            }
          })
          observer.observe(el)
        }
      }}
      className="text-center"
    >
      <div className="text-xl sm:text-2xl font-bold text-emerald-300 mb-1 sm:mb-2">
        {Math.floor(count)}{suffix}
      </div>
      <p className="text-white/80 text-xs sm:text-sm">{label}</p>
    </div>
  )
}

export default function ClinicaCircuncision() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const sections = ["inicio", "tratamientos", "sobre-mi", "faq", "contacto"]
    
    for (const section of sections) {
      const element = document.getElementById(section)
      if (!element) continue

      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveSection(section)
        break
      }
    }
  }, [])

  useEffect(() => {
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [handleScroll])

  // Memoized data con mejores iconos y utilidad
  const treatments: TreatmentItem[] = useMemo(() => [
    {
      name: "Circuncisión Tradicional",
      description: "Procedimiento clásico con técnica refinada.",
      duration: "45-60 min",
      recovery: "2-3 semanas",
      benefits: [
        "Técnica probada y segura",
        "Resultados estéticos excelentes", 
        "Procedimiento ambulatorio",
        "Anestesia local efectiva"
      ],
      ideal: "Casos complejos y revisiones",
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
      bgColor: "from-emerald-600 to-emerald-700",
      price: "$7,500 MXN"
    },
    {
      name: "Circuncisión con Láser",
      description: "Láser de última generación para resultados superiores.",
      duration: "30-45 min", 
      recovery: "1-2 semanas",
      benefits: [
        "Tecnología láser avanzada",
        "Mínimo dolor post-operatorio",
        "Cicatrización óptima",
        "Menor tiempo de recuperación"
      ],
      ideal: "Primera opción recomendada",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
      bgColor: "from-teal-600 to-teal-700",
      featured: true,
      price: "$9,500 MXN"
    },
    {
      name: "Frenuloplastía",
      description: "Corrección del frenillo para mejorar función y comodidad.",
      duration: "30-45 min",
      recovery: "1-2 semanas",
      benefits: [
        "Preserva tejido prepucial",
        "Mejora la función sexual",
        "Técnica conservadora",
        "Resultados naturales"
      ],
      ideal: "Problemas de frenillo únicamente",
      icon: <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
      bgColor: "from-emerald-600 to-teal-600",
      price: "$6,500 MXN"
    }
  ], [])

  const conditions: ConditionItem[] = useMemo(() => [
    {
      title: "Fimosis",
      description: "Estrechez del prepucio que impide su retracción normal sobre el glande.",
      symptoms: ["Dificultad para retraer el prepucio", "Dolor durante las relaciones", "Infecciones recurrentes"],
      icon: <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-700" />,
      urgency: "Moderada",
      urgencyColor: "text-amber-600"
    },
    {
      title: "Balanitis", 
      description: "Inflamación del glande y prepucio, frecuentemente recurrente.",
      symptoms: ["Enrojecimiento e hinchazón", "Secreción con mal olor", "Picazón y ardor"],
      icon: <Thermometer className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-700" />,
      urgency: "Alta",
      urgencyColor: "text-red-600"
    },
    {
      title: "Parafimosis",
      description: "Imposibilidad de devolver el prepucio a su posición normal.",
      symptoms: ["Prepucio retraído y apretado", "Dolor intenso", "Hinchazón del glande"],
      icon: <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-700" />,
      urgency: "Urgente",
      urgencyColor: "text-red-700"
    }
  ], [])

  const faqData: FAQDataEntry[] = useMemo(() => [
    {
      question: "¿Qué edad es la más adecuada para realizar una circuncisión?",
      answer: "La circuncisión puede realizarse a cualquier edad, desde recién nacidos hasta adultos. En adultos, generalmente se recomienda cuando hay problemas médicos como fimosis, balanitis recurrente o parafimosis. La edad ideal depende de cada caso específico y la evaluación médica."
    },
    {
      question: "¿Cuánto tiempo dura el procedimiento y qué incluye?",
      answer: "El tiempo varía según la técnica: circuncisión tradicional (45-60 min) y láser (30-45 min). Incluye consulta preoperatoria, preparación, procedimiento, tiempo de observación y entrega de instrucciones post-operatorias detalladas."
    },
    {
      question: "¿Es muy doloroso el proceso de recuperación?",
      answer: "Con las técnicas modernas, especialmente láser, el dolor es mínimo. Se prescribe medicación analgésica y antiinflamatoria efectiva. La mayoría reportan molestias leves que mejoran significativamente en 3-5 días. El láser reduce considerablemente las molestias."
    },
    {
      question: "¿Cuándo puedo retomar mis actividades normales?",
      answer: "Actividades cotidianas: 2-3 días. Trabajo de oficina: 1 semana. Ejercicio ligero: 2 semanas. Actividad sexual: 4-6 semanas. Cada caso recibe instrucciones personalizadas según la evolución y técnica utilizada."
    },
    {
      question: "¿Qué ventajas específicas tiene la circuncisión con láser?",
      answer: "Láser CO2 de última generación: mayor precisión, menos sangrado, menor riesgo de infección, cicatrización más rápida, menos dolor post-operatorio, mejores resultados estéticos y menor tiempo de recuperación. Es nuestra técnica más avanzada."
    },
    {
      question: "¿La circuncisión afecta la sensibilidad o función sexual?",
      answer: "Estudios científicos demuestran que la circuncisión correcta no afecta significativamente la sensibilidad. Muchos pacientes reportan mejoras en su vida sexual al resolver problemas como fimosis o infecciones recurrentes."
    },
    {
      question: "¿Qué incluye el costo y hay opciones de financiamiento?",
      answer: "El costo incluye: consulta inicial, procedimiento, materiales, medicamentos básicos y seguimiento post-operatorio. Ofrecemos planes de financiamiento sin intereses, pagos diferidos y opciones de seguro médico."
    },
    {
      question: "¿Qué garantías ofrecen y cuál es el protocolo de seguimiento?",
      answer: "Garantizamos el procedimiento con seguimiento completo: revisión a 7 días, 1 mes y 3 meses. Disponibilidad 24/7 para consultas post-operatorias. Reintervención gratuita en casos excepcionales según criterio médico."
    }
  ], [])

  const openWhatsApp = useCallback(() => {
    window.open("https://api.whatsapp.com/send?phone=5215516942925&text=Hola%20Dr.%20Mario,%20me%20gustaría%20obtener%20más%20información%20sobre%20la%20circuncisión%20y%20agendar%20una%20consulta", "_blank")
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50/80 via-white to-emerald-50/20">
      <ScrollProgressBar />
      <Header activeSection={activeSection} />

      <main className="flex-1">
        {/* Hero Section Mejorado */}
        <section id="inicio" className="relative overflow-hidden min-h-[85vh] sm:min-h-[75vh] flex items-center">
          <div className="absolute inset-0 w-full h-full">
            {/* Gradient overlay más sofisticado */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-slate-900/90 to-emerald-900/85"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(16,185,129,0.2)_0%,_transparent_50%)]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-4xl">
              <ScrollAnimation animation="fade-in-up">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/15 rounded-full px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-md">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <span>Especialistas en Circuncisión Moderna</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  Clínica Especializada en<br />
                  <span className="text-emerald-400">Circuncisión</span>
                </h1>
                
                <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mb-4 sm:mb-6 rounded-full"></div>
                
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-light">
                  Procedimientos avanzados de circuncisión con tecnología láser CO2 para máxima precisión, 
                  mínimo dolor y cicatrización óptima. La solución definitiva para fimosis, balanitis y parafimosis.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <button
                    onClick={openWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-medium shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Calendar className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Agendar Consulta Gratuita
                  </button>
                  <button
                    onClick={() => scrollToSection("tratamientos")}
                    className="border border-white/50 text-white hover:bg-white/10 rounded-lg px-4 sm:px-6 py-3 text-sm sm:text-base backdrop-blur-sm shadow-md justify-center flex items-center transition-all duration-300 group"
                  >
                    Ver Procedimientos
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Beneficios clave */}
                <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-emerald-300 font-medium text-sm">
                      <CheckCircle className="h-4 w-4" />
                      500+ Cirugías Exitosas
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-emerald-300 font-medium text-sm">
                      <Timer className="h-4 w-4" />
                      Láser CO2 Avanzado
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-emerald-300 font-medium text-sm">
                      <Award className="h-4 w-4" />
                      15+ Años Experiencia
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex">
            <div className="h-10 sm:h-12 w-6 sm:w-8 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Conditions Section Mejorado */}
        <section className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-6 shadow-md">
                  <Activity className="h-4 w-4" />
                  Condiciones que Tratamos
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-3 sm:mb-6 leading-tight">
                  Soluciones Definitivas
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-3 sm:mb-6 rounded-full"></div>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-light">
                  Tratamos diversas condiciones del prepucio y glande con técnicas especializadas 
                  para restaurar la función normal y mejorar la calidad de vida.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {conditions.map((condition, index) => (
                <ScrollAnimation key={condition.title} animation="fade-in-up" delay={index * 150}>
                  <div className="group relative bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        {condition.icon}
                      </div>
                      <div className={`text-xs font-bold px-2 py-1 rounded-full bg-white shadow-sm ${condition.urgencyColor}`}>
                        {condition.urgency}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-3 sm:mb-4">
                      {condition.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                      {condition.description}
                    </p>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3 text-sm sm:text-base">Síntomas comunes:</h4>
                      <ul className="space-y-2">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                            <span className="text-slate-700 text-xs sm:text-sm">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Treatments Section Mejorado */}
        <section id="tratamientos" className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-teal-300/30 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-6 shadow-md">
                  <Stethoscope className="h-4 w-4" />
                  Procedimientos Disponibles
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-3 sm:mb-6 leading-tight">
                  Técnicas Especializadas
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-3 sm:mb-6 rounded-full"></div>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-light">
                  Ofrecemos diferentes técnicas de circuncisión adaptadas a cada caso específico, 
                  garantizando los mejores resultados estéticos y funcionales.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {treatments.map((treatment, index) => (
                <ScrollAnimation key={treatment.name} animation="scale-in" delay={index * 150}>
                  <div className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border transition-all duration-500 h-full transform hover:-translate-y-1 ${
                    treatment.featured 
                      ? 'border-emerald-300 ring-2 ring-emerald-100 hover:shadow-2xl' 
                      : 'border-slate-200 hover:shadow-xl'
                  }`}>
                    {/* Featured badge */}
                    {treatment.featured && (
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 text-xs font-bold">
                        🌟 TÉCNICA RECOMENDADA
                      </div>
                    )}

                    {/* Header with gradient background */}
                    <div className={`bg-gradient-to-r ${treatment.bgColor} p-4 sm:p-6 text-white text-center relative`}>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        {treatment.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                        {treatment.name}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-sm sm:text-base mb-3">
                        {treatment.description}
                      </p>
                      <div className="bg-white/20 rounded-lg p-2 text-sm font-medium">
                        {treatment.ideal}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="bg-slate-50 p-2 sm:p-3 rounded-lg text-center">
                          <Clock className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
                          <span className="font-bold text-emerald-700 text-xs sm:text-sm block">{treatment.duration}</span>
                          <span className="text-xs text-slate-600">Duración</span>
                        </div>
                        <div className="bg-slate-50 p-2 sm:p-3 rounded-lg text-center">
                          <Timer className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
                          <span className="font-bold text-emerald-700 text-xs sm:text-sm block">{treatment.recovery}</span>
                          <span className="text-xs text-slate-600">Recuperación</span>
                        </div>
                        <div className="bg-slate-50 p-2 sm:p-3 rounded-lg text-center">
                          <DollarSign className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
                          <span className="font-bold text-emerald-700 text-xs sm:text-sm block">{treatment.price}</span>
                          <span className="text-xs text-slate-600">Costo</span>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        <h4 className="font-bold text-slate-800 mb-3 sm:mb-4 text-sm sm:text-base">Beneficios:</h4>
                        {treatment.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 sm:gap-3">
                            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-xs sm:text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={openWhatsApp}
                        className={`w-full bg-gradient-to-r ${treatment.bgColor} hover:opacity-90 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base flex items-center justify-center group`}
                      >
                        <PhoneCall className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Consultar Procedimiento
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Doctor Section con estadísticas animadas */}
        <section id="sobre-mi" className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10 sm:opacity-15">
            <div className="absolute top-1/3 left-1/3 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-400/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-48 sm:w-72 h-48 sm:h-72 bg-teal-400/30 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <ScrollAnimation animation="fade-in-right" className="lg:w-2/5 w-full max-w-md lg:max-w-none">
                <div className="relative">
                  <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-emerald-100 via-emerald-50 to-white rounded-xl sm:rounded-2xl blur-xl sm:blur-2xl opacity-40 sm:opacity-60"></div>
                  <div className="relative bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xl">
                    <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg sm:rounded-xl overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-emerald-700">
                        <div className="text-center">
                          <Users className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 sm:mb-4" />
                          <p className="text-sm sm:text-base font-medium">Dr. Mario Martínez Thomas</p>
                          <p className="text-xs sm:text-sm text-emerald-600">Cirujano Urólogo</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1">
                        <CheckSquare className="h-3 w-3 sm:h-5 sm:w-5" />
                        <span className="font-bold text-sm sm:text-lg">500+</span>
                      </div>
                      <p className="text-xs font-medium">Cirugías Exitosas</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in-left" className="lg:w-3/5 space-y-4 sm:space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-6 shadow-lg">
                    <Award className="h-4 w-4" />
                    Especialista Certificado en Circuncisión
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-6 leading-tight">
                    Dr. Mario Martínez Thomas
                  </h2>
                  <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 mb-4 sm:mb-6 rounded-full"></div>
                  <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                    Cirujano Urólogo egresado de CMN 20 de Noviembre, con mención honorífica otorgada 
                    por la Universidad Nacional Autónoma de México. Especialista en circuncisión con 
                    técnicas tradicionales y láser CO2 para resultados óptimos.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Experiencia Comprobada</h3>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <StatCounter value={500} label="Circuncisiones realizadas" suffix="+" delay={0} />
                    <StatCounter value={15} label="Años de experiencia" suffix="+" delay={200} />
                    <StatCounter value={98} label="Pacientes satisfechos" suffix="%" delay={400} />
                    <StatCounter value={3} label="Técnicas especializadas" delay={600} />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm sm:text-base">Tecnología Láser CO2 Avanzada</h4>
                      <p className="text-white/80 text-xs sm:text-sm">Equipos de última generación para procedimientos más precisos, menos dolor y mejor cicatrización.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm sm:text-base">Seguimiento Personalizado 24/7</h4>
                      <p className="text-white/80 text-xs sm:text-sm">Atención continua durante todo el proceso de recuperación con consultas ilimitadas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm sm:text-base">Garantía de Satisfacción</h4>
                      <p className="text-white/80 text-xs sm:text-sm">Compromiso total con resultados óptimos y reintervención gratuita si es necesaria.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={openWhatsApp}
                    className="bg-white text-emerald-700 hover:bg-emerald-50 px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base flex items-center justify-center w-full sm:w-auto group"
                  >
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Consulta Especializada Gratuita
                  </button>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* FAQ Section Mejorado */}
        <section id="faq" className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-white via-emerald-50/30 to-slate-50 overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-teal-200/30 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-6 shadow-md">
                  <MessageCircle className="h-4 w-4" />
                  Preguntas Frecuentes
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-3 sm:mb-6 leading-tight">
                  Resolvemos tus Dudas
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-3 sm:mb-6 rounded-full"></div>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-light">
                  Las respuestas más completas sobre nuestros procedimientos de circuncisión y proceso de atención.
                </p>
              </div>
            </ScrollAnimation>

            <div className="space-y-3 sm:space-y-4">
              {faqData.map((faq, index) => (
                <ScrollAnimation key={index} animation="fade-in-up" delay={index * 100}>
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                    index={index}
                  />
                </ScrollAnimation>
              ))}
            </div>

            {/* CTA adicional en FAQ */}
            <ScrollAnimation animation="fade-in-up" delay={800}>
              <div className="mt-8 sm:mt-12 text-center">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 sm:p-8 border border-emerald-100">
                  <h3 className="text-lg sm:text-xl font-bold text-emerald-800 mb-3">
                    ¿Tienes más preguntas?
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm sm:text-base">
                    Nuestro equipo está disponible para resolver todas tus dudas sin compromiso.
                  </p>
                  <button
                    onClick={openWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center mx-auto text-sm sm:text-base group"
                  >
                    <MessageCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Hacer una Pregunta
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="relative py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 sm:opacity-15">
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-emerald-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-80 h-48 sm:h-80 bg-teal-300/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollAnimation animation="fade-in-up">
              <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-xl sm:rounded-2xl overflow-hidden border border-emerald-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                <div className="flex flex-col items-center text-center p-6 sm:p-8 lg:p-12">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 sm:px-4 py-2 rounded-full text-xs font-medium mb-4 sm:mb-6">
                    <Calendar className="h-4 w-4" />
                    Consulta especializada gratuita
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-emerald-800 mb-3 sm:mb-4">
                    ¿Listo para el siguiente paso?
                  </h3>
                  
                  <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-slate-700 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                    Termina con tus problemas de balanitis, fimosis o parafimosis. Agenda tu consulta gratuita 
                    y recibe un plan de tratamiento personalizado sin compromiso.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md mx-auto">
                    <button
                      onClick={openWhatsApp}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 sm:px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base flex items-center justify-center group"
                    >
                      <Phone className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Consulta Gratuita por WhatsApp
                    </button>
                    <button
                      onClick={() => scrollToSection("inicio")}
                      className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-4 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base flex items-center justify-center transition-all duration-300 group"
                    >
                      <MapPin className="h-4 w-4 mr-2 group-hover:bounce transition-transform duration-300" />
                      Ver Más Información
                    </button>
                  </div>

                  {/* Beneficios adicionales */}
                  <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg mb-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">Consulta sin costo</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg mb-2">
                        <FileText className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">Plan personalizado</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-emerald-100 p-2 rounded-lg mb-2">
                        <Award className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">Garantía incluida</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}