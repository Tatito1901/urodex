
interface GoogleMapProps {
  className?: string
  address: string
  zoom?: number
}

export function GoogleMap({
  className = "",
  address = "Temístocles 210, Polanco, Ciudad de México",
  zoom = 15,
}: GoogleMapProps) {
  // Codificar la dirección para la URL
  const encodedAddress = encodeURIComponent(address)

  // Usamos un iframe para simplificar la integración
  // La API key es una clave pública de ejemplo para fines de demostración
  return (
    <div
      className={`w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-md border border-teal-100 ${className}`}
    >
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=${zoom}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full min-h-[300px]"
        title="Ubicación de Urodex Clínica"
      />
    </div>
  )
}
