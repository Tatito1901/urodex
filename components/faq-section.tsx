"use client"

import { Award, CheckCircle } from "lucide-react"
import { ScrollAnimation } from "./scroll-animations"
import { ResponsiveContainer } from "./responsive-container"
import { Section } from "./section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

// Datos para las preguntas frecuentes
interface FAQItem {
  id: string
  question: string
  answer: string | React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "¿Cuándo debo consultar a un urólogo?",
    answer: "Debes consultar a un urólogo si presentas síntomas como dolor al orinar, sangre en la orina, incontinencia, infecciones urinarias recurrentes, disfunción eréctil o dificultad para orinar. También se recomienda una evaluación preventiva anual a partir de los 45 años."
  },
  {
    id: "item-2",
    question: "¿Qué ventajas tiene la cirugía láser de próstata?",
    answer: (
      <>
        <p className="mb-4">
          La cirugía láser de próstata ofrece múltiples beneficios comparada con técnicas tradicionales:
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Menor tiempo de recuperación y hospitalización</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Preservación de la función sexual y continencia</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Procedimiento ambulatorio en la mayoría de casos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Resultados inmediatos y duraderos</span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "item-3",
    question: "¿El tratamiento urológico también es para mujeres?",
    answer: (
      <>
        <p className="mb-4">
          Absolutamente. El urólogo trata diversas condiciones del aparato urinario femenino:
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Infecciones urinarias recurrentes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Incontinencia urinaria</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Cálculos renales y vesicales</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Cistitis intersticial y vejiga hiperactiva</span>
          </li>
        </ul>
      </>
    )
  },
  {
    id: "item-4",
    question: "¿Qué incluye una consulta urológica?",
    answer: (
      <>
        <p className="mb-4">
          Una consulta urológica completa incluye:
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Historia clínica detallada y evaluación de síntomas</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Exploración física</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Evaluación de estudios previos y prescripción de estudios adicionales si es necesario</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <span>Plan de tratamiento personalizado</span>
          </li>
        </ul>
      </>
    )
  },
]

export const FAQSection = () => {
  return (
    <Section id="faq" background="white" spacing="xl" hasDivider={true} dividerType="triangle">
      <ResponsiveContainer>
        <ScrollAnimation animation="fade-in-up">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Preguntas Frecuentes
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-green-700 mb-6">
              Resolvemos Tus Dudas
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Información clara y profesional sobre los tratamientos urológicos más comunes.
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="fade-in-up" delay={100}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-gradient-to-br from-green-50 to-white border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <AccordionTrigger className="hover:bg-green-50/50 px-8 py-6 text-left font-bold text-green-800 text-lg [&[data-state=open]]:bg-green-50/50">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-gray-700 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimation>
        </div>
      </ResponsiveContainer>
    </Section>
  )
}