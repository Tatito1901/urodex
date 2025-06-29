
import React, { memo } from "react";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle, Shield, Users } from "lucide-react";
import { LazyMotion, domAnimation, m, Variants } from "framer-motion";
import { ResponsiveContainer } from "./responsive-container";
import { Section } from "./section";
import { Button } from "./ui/button";

// === Interfaces ===
interface Clinic {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}

// === Datos de Clínicas ===
const clinics: Clinic[] = [
  {
    id: "prostata",
    name: "Clínica de Cirugía de Próstata",
    description:
      "Centro especializado en el diagnóstico y tratamiento integral de enfermedades prostáticas con técnicas láser de última generación y cirugía mínimamente invasiva.",
    features: ["Enucleación con Láser", "Resección Transuretral (RTU)", "Biopsia de Próstata Guiada"],
    icon: Award,
    link: "/clinica-prostata",
  },
  {
    id: "vph",
    name: "Clínica de VPH",
    description:
      "Diagnóstico temprano y tratamiento especializado del Virus del Papiloma Humano con tecnología de última generación en un ambiente confidencial y profesional.",
    features: ["Electrocauterización", "Láser CO2", "Seguimiento especializado"],
    icon: Shield,
    link: "/clinica-vph",
  },
  {
    id: "circuncision",
    name: "Clínica de Circuncisión",
    description:
      "Procedimientos de circuncisión con tecnología láser para máxima precisión, mínimo dolor y cicatrización óptima. Solución definitiva para fimosis y balanitis.",
    features: ["Circuncisión Tradicional", "Circuncisión con Láser", "Frenuloplastía"],
    icon: Users,
    link: "/clinica-circuncision",
  },
];

// === Variants Tipados ===
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// === Opciones de viewport estáticas ===
const viewportOptions = { once: true, margin: "-100px" };

// === ClinicCard memoizado ===
interface ClinicCardProps {
  clinic: Clinic;
}

const ClinicCard: React.FC<ClinicCardProps> = memo(({ clinic }) => {
  const IconComponent = clinic.icon;

  return (
    <m.div
      variants={itemVariants}
      className="group relative bg-gradient-to-br from-white to-teal-50 rounded-2xl p-6 border border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col transform-gpu will-change-transform"
    >
      <div className="absolute top-5 right-5">
        <div className="bg-teal-50 p-3 rounded-xl group-hover:bg-teal-100 transition-colors">
          <IconComponent className="h-7 w-7 text-teal-700" />
        </div>
      </div>

      <div className="pt-4 flex-grow">
        <h3 className="text-xl font-bold text-teal-800 mb-4">{clinic.name}</h3>
        <p className="text-gray-600 mb-5 leading-relaxed text-base">
          {clinic.description}
        </p>

        <div className="space-y-3 mb-6">
          {clinic.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 font-medium text-base">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Link href={clinic.link} aria-label={`Conocer más sobre ${clinic.name}`}>
          <Button
            className="w-full bg-teal-700 hover:bg-teal-600 text-white py-3 rounded-full font-medium transition-all duration-300 group-hover:shadow-md"
            size="lg"
          >
            <span>Conocer Clínica</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </m.div>
  );
});
ClinicCard.displayName = "ClinicCard";

// === Componente Principal ===
interface ClinicsSectionProps {
  background?: "white" | "pearl" | "teal" | "gradient" | "gradient-subtle" | "gradient-strong" | "primary" | "primary-light" | "primary-dark" | "secondary" | "secondary-light" | "dark" | "none";
}

export const ClinicsSection: React.FC<ClinicsSectionProps> = ({ background = "white" }) => {
  return (
    <Section
      id="clinicas"
      background={background}
      spacing="xl"
      hasDivider
      dividerType="wave"
    >
      <ResponsiveContainer breakpointPadding={{ base: "px-4", sm: "px-6" }}>
        <LazyMotion features={domAnimation}>
          {/* Header Animado */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto mb-14 md:mb-16"
          >
            <m.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-5 py-2.5 rounded-full text-sm font-medium mb-6"
            >
              <Users className="h-4 w-4" />
              Clínicas Especializadas
            </m.div>

            <m.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-800 mb-5"
            >
              Centros de Excelencia Médica
            </m.h2>

            <m.div
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-teal-600 to-teal-400 mx-auto mb-6 rounded-full"
            />

            <m.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              Clínicas especializadas con protocolos específicos y tecnología
              dedicada para cada condición urológica.
            </m.p>
          </m.div>

          {/* Grid de Tarjetas */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {clinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </m.div>
        </LazyMotion>
      </ResponsiveContainer>
    </Section>
  );
};
