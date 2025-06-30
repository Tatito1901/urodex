"use client"
// Este archivo representa `app/clinica-vph/page.tsx`
// Contiene la lógica y la UI completa en un solo lugar según lo solicitado.

import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";

import { ScrollProgressBar, CustomCursor } from "@/components/scroll-animations"; // Asumimos que existen y son Client Components
import { Header } from "@/components/header"; // Asumimos que es un Client Component para el scroll-spy
import { Section } from "@/components/section";
import { ResponsiveContainer } from "@/components/responsive-container";
import { Button } from "@/components/ui/button"; // Asumimos que soporta la prop `asChild`
import { Footer } from "@/components/footer";

import {
  Phone,
  Facebook,
  Instagram,
  ArrowRight,
  Shield,
  CheckCircle,
  Star,
  Stethoscope,
  Calendar,
  Lock,
  Zap,
  Target,
  Eye,
} from "lucide-react";

// -----------------------------------------------------------------------------
// --- 1. DEFINICIÓN DE TIPOS Y DATOS ESTÁTICOS ---
// En un proyecto real, esto estaría en `lib/types.ts` y `lib/data.ts`
// -----------------------------------------------------------------------------

type Treatment = {
  name: string;
  description: string;
  duration: string;
  recovery: string;
  benefits: string[];
  icon: React.ReactNode;
};

type VphInfo = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const treatmentsData: Treatment[] = [
    {
      name: "Electrocauterización",
      description: "Remoción de lesiones utilizando corriente eléctrica controlada.",
      duration: "20-45 minutos",
      recovery: "2-3 semanas",
      benefits: [ "Procedimiento ambulatorio", "Alta precisión", "Resultados inmediatos", "Mínimo sangrado" ],
      icon: <Zap className="h-6 w-6 text-emerald-700" />
    },
    {
      name: "Láser CO2",
      description: "Tratamiento de precisión para eliminar verrugas y lesiones por VPH.",
      duration: "30-60 minutos",
      recovery: "1-3 semanas",
      benefits: [ "Tecnología láser avanzada", "Mínimo dolor", "Cicatrización superior", "Preservación del tejido sano" ],
      icon: <Target className="h-6 w-6 text-emerald-700" />
    }
];

const vphInfoData: VphInfo[] = [
  {
    title: "¿Qué es el VPH?",
    description: "El Virus del Papiloma Humano (VPH) es una infección viral común que puede afectar la piel y las mucosas. Existen más de 100 tipos diferentes, algunos de los cuales pueden causar verrugas genitales o cambios celulares que podrían derivar en cáncer.",
    icon: <Eye className="h-5 w-5 text-emerald-700" />
  },
  {
    title: "Detección Temprana",
    description: "La detección temprana del VPH es crucial para un tratamiento efectivo. Realizamos diagnósticos precisos utilizando técnicas avanzadas de identificación viral y evaluación de lesiones.",
    icon: <Target className="h-5 w-5 text-emerald-700" />
  },
  {
    title: "Tratamiento Confidencial",
    description: "Entendemos la importancia de la privacidad en estos casos. Ofrecemos un ambiente completamente confidencial y profesional, con atención personalizada y discreta.",
    icon: <Lock className="h-5 w-5 text-emerald-700" />
  }
];


// -----------------------------------------------------------------------------
// --- 2. LÓGICA DEL FORMULARIO Y SERVER ACTION ---
// En un proyecto real, esto estaría en `lib/actions.ts`
// -----------------------------------------------------------------------------

type FormState = {
  message: string;
  errors?: {
    name?: string[];
    phone?: string[];
    message?: string[];
  };
  isSuccess: boolean;
};

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  phone: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {

  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Error de validación. Por favor, revisa los campos.",
      errors: validatedFields.error.flatten().fieldErrors,
      isSuccess: false,
    };
  }

  try {
    console.log("Lead recibido:", validatedFields.data);
    // Aquí iría la lógica para enviar email (con Resend) o guardar en DB (con Prisma).
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simular latencia de red

    return { message: "¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.", isSuccess: true };
  } catch (error) {
    console.error("Error en la Server Action:", error);
    return { message: "Ocurrió un error en el servidor. Por favor, intenta de nuevo.", isSuccess: false };
  }
}

// -----------------------------------------------------------------------------
// --- 3. COMPONENTE DE CLIENTE PARA EL FORMULARIO INTERACTIVO ---
// En un proyecto real, este sería un archivo separado: `components/contact-form.tsx`
// -----------------------------------------------------------------------------

function ContactFormSection() {
  "use client";

  const initialState: FormState = { message: "", isSuccess: false, errors: {} };
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.isSuccess) {
      formRef.current?.reset();
    }
  }, [state.isSuccess]);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {pending ? "Enviando Consulta..." : "Enviar Consulta Confidencial"}
        {!pending && <Lock className="h-4 w-4 ml-2" />}
      </Button>
    );
  };
  
  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=5215516942925&text=Hola%20dr.%20mario%20me%20gustaria%20obtener%20mas%20informacion%20acerca%20de%20sus%20servicios", "_blank")
  }

  return (
    <section id="contacto" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl"></div>
      </div>
      
      <ResponsiveContainer className="relative z-10">
        <div className="mb-12">
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 px-4 sm:px-0">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-md">
              <Phone className="h-4 w-4" />
              Agenda tu Consulta
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
              Contacto Confidencial
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-emerald-100/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-4">
                  Solicitar Información Confidencial
                </h3>
                <p className="text-slate-600 mb-6">
                  Envíanos tus datos y nos pondremos en contacto contigo de forma discreta para resolver tus dudas.
                </p>
              </div>
              
              <form ref={formRef} action={formAction} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                  <input type="text" id="name" name="name" className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="Tu nombre" required />
                  {state.errors?.name && <p aria-live="polite" className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                  <input type="tel" id="phone" name="phone" className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="Tu número de teléfono" required />
                  {state.errors?.phone && <p aria-live="polite" className="text-sm text-red-500 mt-1">{state.errors.phone[0]}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                  <textarea id="message" name="message" rows={3} className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="¿Cómo podemos ayudarte?" required></textarea>
                  {state.errors?.message && <p aria-live="polite" className="text-sm text-red-500 mt-1">{state.errors.message[0]}</p>}
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="confidencial" name="confidencial" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 mr-2" />
                  <label htmlFor="confidencial" className="text-sm text-slate-600">Solicito que mi consulta sea tratada de manera confidencial</label>
                </div>
                
                <SubmitButton />

                {state.message && (
                  <p aria-live="polite" className={`text-sm font-medium text-center mt-4 ${state.isSuccess ? 'text-emerald-700' : 'text-red-500'}`}>
                    {state.message}
                  </p>
                )}
              </form>
              <div className="mt-4 text-xs text-slate-500 text-center">
                Tu información está protegida bajo nuestras políticas de privacidad.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-6">¿Atención inmediata?</h3>
                <p className="mb-8 text-white/90">No postergues tu salud. Agenda una consulta confidencial y recibe el tratamiento que necesitas.</p>
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg"><Phone className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-semibold text-lg">Teléfono</h4>
                      <a href="tel:5215516942925" className="text-white/90 hover:text-white block transition-colors">+52 1 55 1694 2925</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg"><Calendar className="h-5 w-5" /></div>
                    <div>
                      <h4 className="font-semibold text-lg">Horario de atención</h4>
                      <p className="text-white/90">Lunes a Viernes: 9:00 - 18:00</p>
                      <p className="text-white/90">Sábados: 9:00 - 13:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={openWhatsApp} className="w-full bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl px-6 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

// -----------------------------------------------------------------------------
// --- 4. PÁGINA PRINCIPAL (SERVER COMPONENT) ---
// Este es el componente principal de la ruta. Es un Server Component por defecto.
// -----------------------------------------------------------------------------

export default function ClinicaVPHPage() {

  // La función para abrir WhatsApp se puede definir aquí si es usada por Server Components
  // Pero como los botones de acción están en el cliente, la definimos allí.
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50/80 via-white to-emerald-50/20">
      <ScrollProgressBar />
      <CustomCursor />
      <Header /> {/* Header necesita ser 'use client' para el scroll spy */}

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-center py-16 md:py-12">
          <div className="absolute inset-0 w-full h-full">
            <Image src="/images/vph_thomas.png" alt="Clínica de VPH" fill className="object-cover object-center" priority quality={90} sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-slate-800/90 to-emerald-800/85 backdrop-blur-[1px]"></div>
          </div>
          <ResponsiveContainer className="relative z-10">
            <div className="max-w-4xl px-4 md:px-0">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6 shadow-lg">
                <Shield className="h-4 w-4 text-emerald-300" />
                Tratamiento Especializado VPH
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">Clínica de VPH</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent mb-6 rounded-full"></div>
              <p className="text-lg md:text-2xl text-white/95 leading-relaxed mb-8 max-w-3xl">
                Diagnóstico temprano y tratamiento especializado del Virus del Papiloma Humano con tecnología de última generación en un ambiente <span className="font-semibold text-emerald-200">100% confidencial</span> y profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full px-8 py-4 text-base font-semibold shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Link href="#contacto"><Calendar className="h-5 w-5 mr-2" />Consulta Confidencial</Link>
                </Button>
                <Button variant="outline" asChild className="border-2 border-white/70 text-white bg-white/10 hover:bg-white/20 hover:border-white rounded-full px-8 py-4 text-base font-semibold backdrop-blur-md shadow-lg transition-all duration-300">
                  <Link href="#tratamientos">Ver Tratamientos</Link>
                </Button>
              </div>
            </div>
          </ResponsiveContainer>
        </section>

        {/* VPH Info Section */}
        <section id="vph-info" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 overflow-hidden">
            <ResponsiveContainer className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {vphInfoData.map((info) => (
                        <div key={info.title} className="group bg-gradient-to-br from-white via-emerald-50/50 to-white rounded-2xl p-7 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:-translate-y-1">
                            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">{info.icon}</div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent mb-4">{info.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{info.description}</p>
                        </div>
                    ))}
                </div>
            </ResponsiveContainer>
        </section>

        {/* Treatments Section */}
        <section id="tratamientos" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 overflow-hidden">
            <ResponsiveContainer className="relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-14">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Tecnología de Vanguardia</h2>
                    <p className="text-xl text-white/90 leading-relaxed">Técnicas avanzadas para el tratamiento del VPH, garantizando resultados óptimos.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {treatmentsData.map((treatment) => (
                        <div key={treatment.name} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-emerald-500/20 transition-all duration-500 border border-white/10 hover:border-white/20 transform hover:-translate-y-1">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">{treatment.icon}</div>
                            <h3 className="text-2xl font-bold text-white text-center mb-4">{treatment.name}</h3>
                            <p className="text-white/80 text-center leading-relaxed mb-6">{treatment.description}</p>
                            <div className="space-y-3 mb-6">
                                {treatment.benefits.map((benefit) => (
                                    <div key={benefit} className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" /><span className="text-white/80">{benefit}</span></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ResponsiveContainer>
        </section>

        {/* El resto de secciones (Sobre Mi, etc.) seguirían el mismo patrón de ser Server Components estáticos */}

        {/* Contact Form Section (Client Component) */}
        <ContactFormSection />

      </main>
      <Footer />
    </div>
  );
}