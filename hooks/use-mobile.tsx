import { useSyncExternalStore } from "react"

// Puedes centralizar tus breakpoints aquí
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

/**
 * Devuelve `true` si el viewport es menor al breakpoint indicado.
 *
 * ✔️ Seguro para SSR (useSyncExternalStore)
 * ✔️ Un solo listener de `matchMedia` (no usa window.resize)
 * ✔️ Sin throttling / timers → coste O(1)
 *
 * @param bp  Ancho máximo (número) o clave ("md", "lg"…)
 */
export function useIsMobile(
  bp: number | keyof typeof BREAKPOINTS = "md",
): boolean {
  // Normalizamos el breakpoint
  const maxWidth =
    typeof bp === "number" ? bp : BREAKPOINTS[bp] ?? BREAKPOINTS.md

  // En SSR no hay window → asumimos “no-móvil”
  if (typeof window === "undefined") return false

  // Creamos la media query solo una vez por breakpoint
  const mql = window.matchMedia(`(max-width: ${maxWidth - 1}px)`)

  // useSyncExternalStore gestiona el estado y la suscripción
  return useSyncExternalStore(
    (callback) => {
      // Suscripción eficiente
      mql.addEventListener("change", callback)
      return () => mql.removeEventListener("change", callback)
    },
    () => mql.matches,        // Snapshot en cliente
    () => false,              // Snapshot en SSR
  )
}
