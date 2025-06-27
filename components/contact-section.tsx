"use client";

import React, { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ResponsiveContainer } from "@/components/responsive-container";
import { Section } from "@/components/section";
import { ScrollAnimation } from "@/components/scroll-animations";
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  Shield,
  Star,
  CheckCircle,
  Building2,
  ArrowRight,
} from "lucide-react";

// Lazy loading optimizado
const GoogleMap = dynamic(
  () => import("@/components/google-map").then((mod) => mod.GoogleMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center">
        <div className="text-slate-500">Cargando mapa...</div>
      </div>
    )
  }
);

type LocationKey = "polanco" | "satelite" | "intermed";

interface Location {
  name: string;
  address: string;
  schedule: { weekdays: string; saturday: string };
  phone: string;
  mapUrl: string;
  features: string[];
}

const LOCATIONS: Record<LocationKey, Location> = {
  polanco: {
    name: "Polanco",
    address: "Temístocles 210, Polanco, Ciudad de México",
    schedule: { weekdays: "9:00 AM - 7:00 PM", saturday: "9:00 AM - 2:00 PM" },
    phone: "(55) 1694 2925",
    mapUrl: "https://maps.app.goo.gl/YFminzdq8uixrNxB9?g_st=com.google.maps.preview.copy",
    features: ["Estacionamiento disponible", "Acceso fácil", "Zona segura"],
  },
  satelite: {
    name: "Ciudad Satélite",
    address: "Cto Centro Comercial 20, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.",
    schedule: { weekdays: "9:00 AM - 7:00 PM", saturday: "9:00 AM - 2:00 PM" },
    phone: "(55) 1694 2925",
    mapUrl: "https://maps.app.goo.gl/jRVYpn8B6QNdaFth6",
    features: ["Centro comercial", "Múltiples accesos", "Estacionamiento gratuito"],
  },
  intermed: {
    name: "INTERMED",
    address: "Calz de Guadalupe 442, Industrial, Gustavo A. Madero, 07800 Ciudad de México, CDMX",
    schedule: { weekdays: "9:00 AM - 7:00 PM", saturday: "9:00 AM - 2:00 PM" },
    phone: "(55) 5739 3939",
    mapUrl: "https://maps.app.goo.gl/IntermedLocation",
    features: ["Hospital certificado", "Equipos especializados", "Atención integral"],
  },
};

interface ContactFormData {
  nombre: string;
  correo: string;
  celular: string;
  diagnostico: string;
  comentarios: string;
}

const INITIAL_FORM: ContactFormData = {
  nombre: "",
  correo: "",
  celular: "",
  diagnostico: "",
  comentarios: "",
};

interface ContactSectionProps {
  className?: string;
  background?: "white" | "pearl" | "teal" | "gradient" | "gradient-subtle" | "gradient-strong" | "gradient-teal-dark" | "primary" | "primary-light" | "primary-dark" | "secondary" | "secondary-light" | "dark" | "none";
}

export const ContactSection: React.FC<ContactSectionProps> = React.memo(
  ({ className = "", background = "white" }) => {
    const [selectedLocation, setSelectedLocation] = useState<LocationKey>("polanco");
    const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentLocation = useMemo(() => LOCATIONS[selectedLocation], [selectedLocation]);

    const openWhatsApp = useCallback(() => {
      const msg = "Hola Dr. Mario, vi su página web y me interesa más información sobre sus servicios urológicos";
      window.open(
        `https://api.whatsapp.com/send?phone=5215516942925&text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }, []);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      },
      []
    );

    const handleSelectChange = useCallback((val: string) => {
      setFormData((prev) => ({ ...prev, diagnostico: val }));
    }, []);

    const handleLocationChange = useCallback((location: LocationKey) => {
      setSelectedLocation(location);
    }, []);

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
          const res = await fetch("/api/mailchimp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          
          if (!res.ok) throw new Error("Error al enviar formulario");
          
          alert("¡Gracias! Nos pondremos en contacto contigo muy pronto.");
          setFormData(INITIAL_FORM);
        } catch {
          openWhatsApp();
        } finally {
          setIsSubmitting(false);
        }
      },
      [formData, openWhatsApp]
    );

    return (
      <Section id="contacto" background={background} spacing="lg" className={className}>
        <ResponsiveContainer breakpointPadding={{ base: "px-3" }}>
          {/* SECCIÓN 1: HEADER */}
          <ScrollAnimation animation="fade-in-up">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md mb-4">
                <Phone className="h-4 w-4" /> 
                Agenda tu Cita
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                Contacto y Ubicaciones
              </h2>
              <div className="w-16 h-1 bg-teal-600 mx-auto mb-4 rounded-full" />
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                Agenda tu cita de valoración con el Dr. Mario Martínez en cualquiera de nuestras ubicaciones.
              </p>
            </div>
          </ScrollAnimation>

          {/* SECCIÓN 2: IMAGEN HERO */}
          <ScrollAnimation animation="fade-in-up" delay={100}>
            <div className="mb-8 sm:mb-12">
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/consultorio.png"
                  alt="Instalaciones modernas"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-slate-900/70" />
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                  <div className="text-center text-white max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-medium mb-4">
                      <Shield className="h-4 w-4" /> 
                      Atención Profesional Garantizada
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      Tu Salud Urológica es Nuestra Prioridad
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg font-light opacity-90 mb-6 leading-relaxed">
                      Contáctanos para agendar tu cita y recibir atención especializada.
                    </p>
                    <div className="flex flex-col xs:flex-row justify-center gap-4 text-xs sm:text-sm">
                      <div className="inline-flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" /> 
                        15+ años de experiencia
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-teal-400" /> 
                        Tecnología de vanguardia
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* SECCIÓN 3: FORMULARIO DE CONTACTO */}
          <ScrollAnimation animation="fade-in-up" delay={200}>
            <div className="mb-8 sm:mb-12">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="bg-teal-100 p-3 rounded-xl">
                        <Calendar className="h-6 w-6 text-teal-700" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                          Solicita tu Cita
                        </h4>
                        <p className="text-sm sm:text-base text-slate-600 mt-1">
                          Completa el formulario y nos contactaremos contigo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Nombre y Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="nombre" className="block text-sm font-semibold text-slate-800">
                          Nombre completo *
                        </label>
                        <Input
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Tu nombre completo"
                          className="h-11 rounded-lg border-slate-300 focus:ring-teal-500 focus:border-teal-500 text-slate-900 placeholder:text-slate-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="celular" className="block text-sm font-semibold text-slate-800">
                          Teléfono *
                        </label>
                        <Input
                          id="celular"
                          name="celular"
                          value={formData.celular}
                          onChange={handleInputChange}
                          placeholder="(55) 1234-5678"
                          className="h-11 rounded-lg border-slate-300 focus:ring-teal-500 focus:border-teal-500 text-slate-900 placeholder:text-slate-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="correo" className="block text-sm font-semibold text-slate-800">
                        Correo electrónico *
                      </label>
                      <Input
                        id="correo"
                        name="correo"
                        type="email"
                        value={formData.correo}
                        onChange={handleInputChange}
                        placeholder="tu.email@ejemplo.com"
                        className="h-11 rounded-lg border-slate-300 focus:ring-teal-500 focus:border-teal-500 text-slate-900 placeholder:text-slate-500"
                        required
                      />
                    </div>

                    {/* Diagnóstico */}
                    <div className="space-y-2">
                      <label htmlFor="diagnostico" className="block text-sm font-semibold text-slate-800">
                        ¿Cuenta con diagnóstico previo?
                      </label>
                      <Select name="diagnostico" value={formData.diagnostico} onValueChange={handleSelectChange}>
                        <SelectTrigger className="h-11 rounded-lg border-slate-300 focus:ring-teal-500 focus:border-teal-500">
                          <SelectValue placeholder="Seleccione una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">Sí, tengo diagnóstico</SelectItem>
                          <SelectItem value="no">No, es primera consulta</SelectItem>
                          <SelectItem value="revision">Busco segunda opinión</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Comentarios */}
                    <div className="space-y-2">
                      <label htmlFor="comentarios" className="block text-sm font-semibold text-slate-800">
                        Describe tu consulta
                      </label>
                      <Textarea
                        id="comentarios"
                        name="comentarios"
                        value={formData.comentarios}
                        onChange={handleInputChange}
                        placeholder="Motivo de consulta, síntomas o información adicional..."
                        className="min-h-[100px] rounded-lg border-slate-300 focus:ring-teal-500 focus:border-teal-500 text-slate-900 placeholder:text-slate-500 resize-none"
                      />
                    </div>

                    {/* Botones */}
                    <div className="pt-4">
                      <div className="flex flex-col gap-3">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold shadow-md transition-colors duration-200 disabled:opacity-50"
                        >
                          <Calendar className="h-5 w-5 mr-2" />
                          {isSubmitting ? "Enviando..." : "Enviar Solicitud de Cita"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={openWhatsApp}
                          className="w-full border-2 border-teal-600 text-teal-700 hover:bg-teal-50 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors duration-200"
                        >
                          <Phone className="h-5 w-5 mr-2" />
                          Contactar por WhatsApp
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* SECCIÓN 4: SELECTOR DE UBICACIONES */}
          <ScrollAnimation animation="fade-in-up" delay={300}>
            <div className="mb-8 sm:mb-12">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    Nuestras Ubicaciones
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600">
                    Selecciona la ubicación más conveniente para ti
                  </p>
                </div>

                {/* Selector de ubicaciones */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {Object.entries(LOCATIONS).map(([key, location]) => (
                    <button
                      key={key}
                      onClick={() => handleLocationChange(key as LocationKey)}
                      className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedLocation === key
                          ? "border-teal-600 bg-teal-50 shadow-md"
                          : "border-slate-200 bg-white hover:border-teal-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Building2
                          className={`h-5 w-5 ${
                            selectedLocation === key ? "text-teal-700" : "text-slate-500"
                          }`}
                        />
                        <h5
                          className={`font-bold text-base ${
                            selectedLocation === key ? "text-teal-700" : "text-slate-700"
                          }`}
                        >
                          {location.name}
                        </h5>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {location.address.split(",")[0]}...
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* SECCIÓN 5: INFORMACIÓN DE LA UBICACIÓN SELECCIONADA */}
          <ScrollAnimation animation="fade-in-up" delay={400}>
            <div className="mb-8 sm:mb-12">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-200 shadow-lg">
                  {/* Dirección y características */}
                  <div className="mb-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-teal-100 p-3 rounded-xl shrink-0">
                        <MapPin className="h-6 w-6 text-teal-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                          {currentLocation.name}
                        </h5>
                        <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
                          {currentLocation.address}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {currentLocation.features.map((feature, i) => (
                            <span
                              key={i}
                              className="bg-teal-100 text-teal-800 px-3 py-1 rounded-lg text-xs font-medium border border-teal-200"
                            >
                              ✓ {feature}
                            </span>
                          ))}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 p-0 h-auto font-semibold"
                          onClick={() => window.open(currentLocation.mapUrl, "_blank")}
                        >
                          Ver en Google Maps <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Horarios */}
                  <div className="mb-6">
                    <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-teal-700" />
                      Horarios de Atención
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-teal-100 p-1.5 rounded-lg">
                            <Calendar className="h-4 w-4 text-teal-700" />
                          </div>
                          <h6 className="font-bold text-slate-900 text-sm">Lunes - Viernes</h6>
                        </div>
                        <p className="text-base font-semibold text-teal-700">
                          {currentLocation.schedule.weekdays}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-teal-100 p-1.5 rounded-lg">
                            <Calendar className="h-4 w-4 text-teal-700" />
                          </div>
                          <h6 className="font-bold text-slate-900 text-sm">Sábados</h6>
                        </div>
                        <p className="text-base font-semibold text-teal-700">
                          {currentLocation.schedule.saturday}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-teal-100 p-2.5 rounded-lg">
                        <Phone className="h-5 w-5 text-teal-700" />
                      </div>
                      <div>
                        <h5 className="font-bold text-base text-slate-900 mb-1">Contacto Directo</h5>
                        <p className="text-lg text-teal-700 font-semibold mb-0.5">
                          {currentLocation.phone}
                        </p>
                        <p className="text-slate-500 text-sm">WhatsApp disponible 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* SECCIÓN 6: MAPA */}
          <ScrollAnimation animation="fade-in-up" delay={500}>
            <div className="mb-8 sm:mb-12">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-6">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    Ubicación en el Mapa
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600">
                    Encuentra fácilmente nuestra ubicación
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg border-2 border-slate-200">
                  <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
                    <GoogleMap address={currentLocation.address} />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-md border border-slate-200 max-w-xs">
                      <h5 className="font-bold text-teal-700 text-sm sm:text-base mb-2">
                        {currentLocation.name}
                      </h5>
                      <p className="text-slate-600 text-xs sm:text-sm mb-3 leading-relaxed">
                        Fácil acceso y estacionamiento disponible.
                      </p>
                      <Button
                        size="sm"
                        onClick={() => window.open(currentLocation.mapUrl, "_blank")}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg font-medium text-xs sm:text-sm shadow-sm transition-colors duration-200"
                      >
                        <MapPin className="h-3 w-3 mr-1" /> 
                        Cómo llegar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* SECCIÓN 7: EMERGENCIAS */}
          <ScrollAnimation animation="fade-in-up" delay={600}>
            <div>
              <div className="max-w-3xl mx-auto">
                <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
                  <div className="text-center">
                    <div className="bg-white/20 p-4 rounded-xl w-fit mx-auto mb-4">
                      <Phone className="h-8 w-8" />
                    </div>
                    <h5 className="font-bold text-xl sm:text-2xl md:text-3xl mb-3">
                      ¿Necesitas atención urgente?
                    </h5>
                    <p className="text-base sm:text-lg text-white/90 mb-6 leading-relaxed max-w-xl mx-auto">
                      Contáctanos inmediatamente por WhatsApp para consultas urgentes o emergencias urológicas.
                    </p>
                    <Button
                      onClick={openWhatsApp}
                      className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-xl font-bold shadow-md transition-colors duration-200"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Contactar Ahora
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </ResponsiveContainer>
      </Section>
    );
  }
);

ContactSection.displayName = "ContactSection";