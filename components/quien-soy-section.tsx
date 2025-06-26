import Image from "next/image";
import React from "react";
import { Stethoscope, GraduationCap, CheckCircle, Award, Shield, Star } from "lucide-react";
import { ResponsiveContainer } from "./responsive-container";
import { Section } from "./section";
import { ScrollAnimation } from "./scroll-animations";

// Individual feature card data
const features = [
  {
    Icon: GraduationCap,
    title: "Certificación IRCAD",
    description: "Laparoscopia urológica avanzada en IRCAD Latinoamérica, uno de los mejores centros de entrenamiento en cirugía laparoscópica y robótica.",
  },
  {
    Icon: CheckCircle,
    title: "Certificación Vigente",
    description: "Consejo Nacional Mexicano de Urología - Garantía de actualización continua y excelencia profesional.",
  },
  {
    Icon: Award,
    title: "Miembro AUA",
    description: "Asociación Americana de Urología - Acceso a los últimos avances e investigaciones médicas.",
  },
  {
    Icon: Shield,
    title: "Miembro EAU",
    description: "Asociación Europea de Urología - Estándares internacionales de calidad y excelencia.",
  },
];

// Reusable FeatureCard component
function FeatureCard({ Icon, title, description }: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100 hover:shadow-xl transition-transform duration-300 group">
      <div className="flex items-start gap-4">
        <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6 text-green-700" />
        </div>
        <div>
          <h4 className="font-bold text-green-700 text-lg mb-2">{title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export const QuienSoySection: React.FC = () => {
  return (
    <Section id="sobre-mi" background="white" spacing="xl" hasDivider dividerType="wave">
      <ResponsiveContainer>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Imagen y experiencia */}
          <ScrollAnimation animation="fade-in-right" className="lg:w-2/5">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-tr from-green-100 via-green-50 to-white rounded-3xl blur-2xl opacity-60"></div>
              <div className="relative bg-white rounded-3xl p-3 shadow-2xl">
                <Image
                  src="/images/dr_mario_martinez.jpg"
                  alt="Dr. Mario Martínez Thomas - Urólogo Certificado"
                  width={500}
                  height={600}
                  className="rounded-2xl w-full h-auto"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="h-6 w-6 fill-current" />
                    <span className="font-bold text-2xl">15+</span>
                  </div>
                  <p className="text-sm font-medium">Años de experiencia</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Texto y características */}
          <ScrollAnimation animation="fade-in-left" className="lg:w-3/5 space-y-8">
            <header>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-4">
                <Stethoscope className="h-4 w-4" />
                Cirujano Urólogo Certificado
              </div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent mb-4">
                Dr. Mario Martínez Thomas
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mb-6"></div>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Cirujano Urólogo egresado de CMN 20 de Noviembre con mención honorífica de la Universidad Nacional Autónoma de México. Mi compromiso es ofrecer la más alta calidad en atención urológica, 
                combinando experiencia clínica con técnicas avanzadas.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  Icon={feature.Icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </ResponsiveContainer>
    </Section>
  );
};
