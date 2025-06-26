"use client"

import { Copy, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { ScrollAnimation } from "./scroll-animations"
import { ResponsiveContainer } from "./responsive-container"
import { Section } from "./section"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

// Función para abrir WhatsApp
const openWhatsApp = () => {
  window.open("https://wa.me/5516942925?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20con%20el%20Dr.%20Mario%20Martínez", "_blank");
}

// Función para copiar al portapapeles
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // Aquí se podría implementar una notificación o toast
}

export const ContactoSection = () => {
  return (
    <Section id="contacto" background="white" spacing="xl">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollAnimation animation="fade-in-right">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <MessageCircle className="h-4 w-4" />
                  Agenda Tu Consulta
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-green-700 mb-6">
                  Estamos Aquí Para Ayudarte
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mb-6"></div>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Agenda una cita en cualquiera de nuestras ubicaciones y comienza tu camino hacia una mejor salud urológica con atención personalizada y tratamientos de vanguardia.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group p-4 hover:bg-green-50 rounded-xl transition-all duration-300 cursor-pointer"
                  onClick={() => copyToClipboard("+525516942925")}>
                  <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                    <Phone className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      Teléfono
                      <Copy className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </h3>
                    <p className="text-gray-600">+52 55 1694 2925</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group p-4 hover:bg-green-50 rounded-xl transition-all duration-300 cursor-pointer"
                  onClick={() => copyToClipboard("contacto@urodex.com.mx")}>
                  <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                    <Mail className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      Correo Electrónico
                      <Copy className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </h3>
                    <p className="text-gray-600">contacto@urodex.com.mx</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 hover:bg-green-50 rounded-xl transition-all duration-300">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Ubicaciones</h3>
                    <p className="text-gray-600 mb-2">Polanco - Ciudad de México</p>
                    <p className="text-gray-600 mb-2">Satélite - Estado de México</p>
                    <p className="text-gray-600">INTERMED - Ciudad de México</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in-left">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
              <h3 className="text-2xl font-bold text-green-700 mb-6">Envíanos un Mensaje</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre Completo</label>
                    <Input id="nombre" placeholder="Tu nombre" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="text-sm font-medium text-gray-700">Teléfono</label>
                    <Input id="telefono" placeholder="Tu teléfono" className="rounded-xl" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <Input id="email" placeholder="Tu email" className="rounded-xl" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="asunto" className="text-sm font-medium text-gray-700">Asunto</label>
                  <Input id="asunto" placeholder="El motivo de tu mensaje" className="rounded-xl" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="mensaje" className="text-sm font-medium text-gray-700">Mensaje</label>
                  <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí" rows={4} className="rounded-xl resize-none" />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white rounded-full py-6 font-medium transition-all duration-300 text-lg">
                    Enviar Mensaje
                  </Button>
                </div>
                
                <p className="text-center text-xs text-gray-500">
                  Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos personales.
                </p>
              </form>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <Button 
                  onClick={openWhatsApp}
                  className="w-full bg-green-50 hover:bg-green-100 text-green-700 rounded-full py-5 font-medium transition-all duration-300 border-2 border-green-200 flex items-center justify-center gap-3"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Contáctanos por WhatsApp
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </ResponsiveContainer>
    </Section>
  )
}