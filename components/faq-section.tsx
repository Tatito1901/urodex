
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Section } from "./section";
import { ResponsiveContainer } from "./responsive-container";
import { ScrollAnimation } from "./scroll-animations";
import { Award, CheckCircle } from "lucide-react";

interface FaqSectionProps {
  background?: "white" | "pearl" | "teal" | "primary-dark";
}

export const FaqSection: React.FC<FaqSectionProps> = ({ background = "pearl" }) => {
  return (
    <Section 
      background={background} 
      spacing="lg" 
      className="overflow-hidden"
    >
      <ResponsiveContainer padding="lg">
        <ScrollAnimation animation="fade-in-up">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4 shadow">
              <Award className="h-3 w-3 md:h-4 md:w-4" />
              Preguntas Frecuentes
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 mb-3 md:mb-4 leading-tight">
              Resolvemos Tus Dudas
            </h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-4 md:mb-6 rounded-full"></div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
              Información clara y profesional sobre los tratamientos urológicos más comunes.
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-5xl mx-auto">
          <ScrollAnimation animation="fade-in-up" delay={100}>
            <Accordion type="single" collapsible className="space-y-4 md:space-y-5">
              <AccordionItem
                value="item-1"
                className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
              >
                <AccordionTrigger className="hover:bg-teal-50/50 px-4 md:px-6 py-4 md:py-5 text-left font-bold text-teal-800 text-base md:text-lg [&[data-state=open]]:bg-teal-50/50 transition-all duration-300">
                  ¿Cuándo debo consultar a un urólogo?
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 md:pb-5 text-slate-600 leading-relaxed text-sm md:text-base">
                  Debes consultar a un urólogo si presentas síntomas como dolor al orinar, sangre en la orina,
                  incontinencia, infecciones urinarias recurrentes, disfunción eréctil o dificultad para orinar.
                  También se recomienda una evaluación preventiva anual a partir de los 45 años.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
              >
                <AccordionTrigger className="hover:bg-teal-50/50 px-4 md:px-6 py-4 md:py-5 text-left font-bold text-teal-800 text-base md:text-lg [&[data-state=open]]:bg-teal-50/50 transition-all duration-300">
                  ¿Qué ventajas tiene la cirugía láser de próstata?
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 md:pb-5 text-slate-600 leading-relaxed text-sm md:text-base">
                  <p className="mb-3 md:mb-4">
                    La cirugía láser de próstata ofrece múltiples beneficios comparada con técnicas tradicionales:
                  </p>
                  <ul className="space-y-2 md:space-y-3 ml-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Menor tiempo de recuperación y hospitalización</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Preservación de la función sexual y continencia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Procedimiento ambulatorio en la mayoría de casos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Resultados inmediatos y duraderos</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
              >
                <AccordionTrigger className="hover:bg-teal-50/50 px-4 md:px-6 py-4 md:py-5 text-left font-bold text-teal-800 text-base md:text-lg [&[data-state=open]]:bg-teal-50/50 transition-all duration-300">
                  ¿El tratamiento urológico también es para mujeres?
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 md:pb-5 text-slate-600 leading-relaxed text-sm md:text-base">
                  <p className="mb-3 md:mb-4">
                    Absolutamente. El urólogo trata diversas condiciones del aparato urinario femenino:
                  </p>
                  <ul className="space-y-2 md:space-y-3 ml-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Infecciones urinarias recurrentes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Incontinencia urinaria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Cálculos renales y vesicales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Cistitis intersticial y vejiga hiperactiva</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
              >
                <AccordionTrigger className="hover:bg-teal-50/50 px-4 md:px-6 py-4 md:py-5 text-left font-bold text-teal-800 text-base md:text-lg [&[data-state=open]]:bg-teal-50/50 transition-all duration-300">
                  ¿Qué incluye una consulta urológica?
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 md:pb-5 text-slate-600 leading-relaxed text-sm md:text-base">
                  <p className="mb-3 md:mb-4">
                    Una consulta urológica completa incluye:
                  </p>
                  <ul className="space-y-2 md:space-y-3 ml-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Historia clínica detallada y evaluación de síntomas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Examen físico especializado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Análisis de estudios previos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Plan de tratamiento personalizado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Resolución de dudas y orientación</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
              >
                <AccordionTrigger className="hover:bg-teal-50/50 px-4 md:px-6 py-4 md:py-5 text-left font-bold text-teal-800 text-base md:text-lg [&[data-state=open]]:bg-teal-50/50 transition-all duration-300">
                  ¿Cuál es el tiempo de recuperación de la circuncisión láser?
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-4 md:pb-5 text-slate-600 leading-relaxed text-sm md:text-base">
                  <p className="mb-3 md:mb-4">
                    La circuncisión con láser ofrece una recuperación significativamente más rápida:
                  </p>
                  <ul className="space-y-2 md:space-y-3 ml-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Recuperación inicial: 3-5 días</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Retorno a actividades normales: 1-2 semanas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Cicatrización completa: 3-4 semanas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                      <span>Menor dolor y sangrado comparado con técnicas tradicionales</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollAnimation>
        </div>
      </ResponsiveContainer>
    </Section>
  );
};
