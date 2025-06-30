import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicUrobot = dynamic(() => import("./Urobot"));

export default function UrobotButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Un botón para controlar la visibilidad del componente Urobot
  const handleToggleUrobot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Este es el botón que el usuario ve inicialmente */}
      <button onClick={handleToggleUrobot}>
        {isOpen ? "Cerrar Asistente" : "Abrir Asistente IA"}
      </button>

      {/* Renderizado condicional: El componente DynamicUrobot solo se montará 
        en el DOM cuando `isOpen` sea `true`. En ese momento, Next.js
        iniciará la descarga de su código.
      */}
      {isOpen && <DynamicUrobot isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}