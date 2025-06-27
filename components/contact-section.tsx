"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsiveContainer } from "@/components/responsive-container";
import { ScrollAnimation } from "@/components/scroll-animations";
import { GoogleMap } from "@/components/google-map";
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  Shield,
  Star,
  CheckCircle,
  Building2,
  MapPinned,
  ArrowRight,
} from "lucide-react";

interface Location {
  name: string;
  address: string;
  schedule: { weekdays: string; saturday: string };
  phone: string;
  mapUrl: string;
  features: string[];
}

type LocationKey = "polanco" | "satelite" | "intermed";

interface ContactFormData {
  nombre: string;
  correo: string;
  celular: string;
  diagnostico: string;
  comentarios: string;
}

const locations: Record<LocationKey, Location> = {
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
    address:
      "Cto Centro Comercial 20, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.",
    schedule: { weekdays: "9:00 AM - 7:00 PM", saturday: "9:00 AM - 2:00 PM" },
    phone: "(55) 1694 2925",
    mapUrl: "https://maps.app.goo.gl/Yx5Yx5Yx5Yx5Yx5Y6",
    features: ["Centro comercial", "Múltiples accesos", "Estacionamiento gratuito"],
  },
  intermed: {
    name: "INTERMED",
    address:
      "Calz de Guadalupe 442, Industrial, Gustavo A. Madero, 07800 Ciudad de México, CDMX",
    schedule: { weekdays: "9:00 AM - 7:00 PM", saturday: "9:00 AM - 2:00 PM" },
    phone: "(55) 5739 3939",
    mapUrl: "https://maps.app.goo.gl/IntermedLocation",
    features: ["Hospital certificado", "Equipos especializados", "Atención integral"],
  },
};

export function ContactSection({ className = "" }: { className?: string }) {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationKey>("polanco");
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: "",
    correo: "",
    celular: "",
    diagnostico: "",
    comentarios: "",
  });

  const currentLocation = locations[selectedLocation];

  const openWhatsApp = () => {
    const message =
      "Hola Dr. Mario, vi su página web y me interesa más información sobre sus servicios urológicos";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://api.whatsapp.com/send?phone=5215516942925&text=${encodedMessage}`,
      "_blank"
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, diagnostico: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error al enviar el formulario");
      alert("¡Gracias! Nos pondremos en contacto contigo muy pronto.");
      setFormData({
        nombre: "",
        correo: "",
        celular: "",
        diagnostico: "",
        comentarios: "",
      });
    } catch (error) {
      console.error("Error:", error);
      openWhatsApp();
    }
  };

  return (
    <div className={className}>
      {/* Sección de Contacto */}
      <section
        id="contacto"
        className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl" />
        </div>

        <ResponsiveContainer className="relative z-10">
          {/* Encabezado */}
          <ScrollAnimation animation="fade-in-up">
            <div className="text-center max-w-4xl mx-auto mb-10 px-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold shadow-md mb-4">
                <Phone className="h-4 w-4" /> Agenda tu Cita
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent mb-4 leading-tight">
                Contacto y Ubicaciones
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 mx-auto mb-4 rounded-full" />
              <p className="text-lg text-slate-600 font-light">
                Agenda tu cita de valoración con el Dr. Mario Martínez en cualquiera de
                nuestras ubicaciones.
              </p>
            </div>
          </ScrollAnimation>

          {/* Tarjeta principal */}
          <ScrollAnimation animation="fade-in-up" delay={100}>
            <div className="bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100/50 max-w-7xl mx-auto">
              {/* Imagen Hero */}
              <div className="relative h-48 md:h-64 lg:h-80">
                <Image
                  src="/images/clinic-background.png"
                  alt="Clínica Urodex - Instalaciones modernas"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 via-slate-700/80 to-emerald-700/90" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center text-white max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-4">
                      <Shield className="h-4 w-4" /> Atención Profesional
                      Garantizada
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                      Tu Salud Urológica es Nuestra Prioridad
                    </h3>
                    <p className="text-lg md:text-xl font-light opacity-90 mb-6">
                      Contáctanos para agendar tu cita y recibir atención médica
                      especializada.
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                      <div className="inline-flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-300" /> 15+ años de
                        experiencia
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-300" /> Tecnología
                        de vanguardia
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 md:p-8 lg:p-10 grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Formulario */}
                <div className="xl:col-span-2">
                  <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-6 md:p-8 border border-emerald-100/50 shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl">
                        <Calendar className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent">
                          Solicita tu Cita
                        </h4>
                        <p className="text-slate-600">
                          Completa el formulario y nos contactaremos contigo.
                        </p>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="nombre"
                            className="block text-sm font-semibold text-slate-700 mb-2"
                          >
                            Nombre completo *
                          </label>
                          <Input
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre completo"
                            className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg h-12"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="celular"
                            className="block text-sm font-semibold text-slate-700 mb-2"
                          >
                            Teléfono *
                          </label>
                          <Input
                            id="celular"
                            name="celular"
                            placeholder="(55) 1234-5678"
                            className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg h-12"
                            value={formData.celular}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="correo"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Correo electrónico *
                        </label>
                        <Input
                          id="correo"
                          name="correo"
                          type="email"
                          placeholder="tu.email@ejemplo.com"
                          className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg h-12"
                          value={formData.correo}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="diagnostico"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          ¿Cuenta con diagnóstico previo?
                        </label>
                        <Select
                          name="diagnostico"
                          value={formData.diagnostico}
                          onValueChange={handleSelectChange}
                        >
                          <SelectTrigger className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg h-12">
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="si">Sí, tengo diagnóstico</SelectItem>
                            <SelectItem value="no">No, es primera consulta</SelectItem>
                            <SelectItem value="revision">
                              Busco segunda opinión
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label
                          htmlFor="comentarios"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Describe tu consulta
                        </label>
                        <Textarea
                          id="comentarios"
                          name="comentarios"
                          placeholder="Describe brevemente tu motivo de consulta..."
                          className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 min-h-[120px] rounded-lg"
                          value={formData.comentarios}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-teal-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          <Calendar className="h-5 w-5 mr-2" /> Enviar Solicitud
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={openWhatsApp}
                          className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50 py-4 rounded-xl font-semibold transition-all duration-300"
                        >
                          <Phone className="h-5 w-5 mr-2" /> WhatsApp Directo
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Información de Ubicaciones */}
                <div className="xl:col-span-1 space-y-6">
                  <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-6 border border-emerald-100/50 shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl">
                        <Building2 className="h-6 w-6 text-emerald-700" />
                      </div>
                      <h4 className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-slate-700 bg-clip-text text-transparent">
                        Nuestras Ubicaciones
                      </h4>
                    </div>
                    <div className="space-y-3 mb-6">
                      {Object.entries(locations).map(([key, loc]) => (
                        <Button
                          key={key}
                          type="button"
                          variant={selectedLocation === key ? "default" : "outline"}
                          className="w-full py-4 rounded-xl transition-all duration-300 font-medium"
                          onClick={() => setSelectedLocation(key as LocationKey)}
                        >
                          <MapPinned className="h-4 w-4 mr-2" />
                          {loc.name}
                        </Button>
                      ))}
                    </div>

                    {/* Datos de la ubicación seleccionada */}
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-5 border border-emerald-100 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl">
                            <MapPin className="h-5 w-5 text-emerald-700" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-bold text-slate-900 mb-2">
                              {currentLocation.name}
                            </h5>
                            <p className="text-slate-600 mb-3 leading-relaxed">
                              {currentLocation.address}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {currentLocation.features.map((feat, i) => (
                                <span
                                  key={i}
                                  className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium"
                                >
                                  {feat}
                                </span>
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-emerald-700 hover:text-emerald-800 p-0 h-auto font-medium"
                              onClick={() => window.open(currentLocation.mapUrl, "_blank")}
                            >
                              Ver en Google Maps <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="h-4 w-4 text-emerald-700" />
                            <span className="font-bold text-slate-900">
                              Lunes - Viernes
                            </span>
                          </div>
                          <p className="text-slate-600 font-medium">
                            {currentLocation.schedule.weekdays}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="h-4 w-4 text-emerald-700" />
                            <span className="font-bold text-slate-900">Sábados</span>
                          </div>
                          <p className="text-slate-600 font-medium">
                            {currentLocation.schedule.saturday}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-5 border border-emerald-100 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-xl">
                            <Phone className="h-5 w-5 text-emerald-700" />
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900 mb-1">
                              Contacto Directo
                            </h5>
                            <p className="text-slate-600 font-medium mb-1">
                              {currentLocation.phone}
                            </p>
                            <p className="text-slate-500 text-sm">
                              WhatsApp disponible 24/7
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Urgencias */}
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-center">
                      <div className="bg-white/20 p-4 rounded-xl w-fit mx-auto mb-4">
                        <Phone className="h-8 w-8" />
                      </div>
                      <h5 className="font-bold text-xl mb-2">
                        ¿Necesitas atención urgente?
                      </h5>
                      <p className="text-white/90 mb-4">
                        Contáctanos inmediatamente por WhatsApp para consultas urgentes
                        o emergencias urológicas.
                      </p>
                      <Button
                        onClick={openWhatsApp}
                        className="bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Phone className="h-5 w-5 mr-2" /> Contactar Ahora
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </ResponsiveContainer>
      </section>

      {/* Sección de Mapa */}
      <section className="relative py-8 sm:py-12 bg-gradient-to-br from-slate-100 via-emerald-50/50 to-slate-100">
        <ResponsiveContainer>
          <ScrollAnimation animation="fade-in-up">
            <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-lg">
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
                <GoogleMap address={currentLocation.address} />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-emerald-100">
                  <div className="text-center">
                    <h5 className="font-bold text-emerald-700 mb-2">
                      {currentLocation.name}
                    </h5>
                    <p className="text-slate-600 text-sm mb-3">
                      Fácil acceso y estacionamiento.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => window.open(currentLocation.mapUrl, "_blank")}
                      className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      <MapPin className="h-3 w-3 mr-1" /> Cómo llegar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
