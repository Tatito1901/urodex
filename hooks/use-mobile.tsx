import { useSyncExternalStore, useCallback, useMemo, useRef } from "react"

// Breakpoints simplificados y más intuitivos
export const BREAKPOINTS = {
  mobile: 640,    // Móviles
  tablet: 768,    // Tablets
  laptop: 1024,   // Laptops
  desktop: 1280,  // Desktop
} as const

export type Breakpoint = keyof typeof BREAKPOINTS
export type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop'

export interface ViewportState {
  width: number
  height: number
  device: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  orientation: 'portrait' | 'landscape'
}

/**
 * Store global para viewport - evita recrear listeners múltiples veces
 */
class ViewportStore {
  private listeners = new Set<() => void>()
  private state: ViewportState | null = null
  private isListening = false

  private getDevice(width: number): DeviceType {
    if (width >= BREAKPOINTS.desktop) return 'desktop'
    if (width >= BREAKPOINTS.laptop) return 'laptop' 
    if (width >= BREAKPOINTS.tablet) return 'tablet'
    return 'mobile'
  }

  private updateState = () => {
    if (typeof window === 'undefined') return

    const width = window.innerWidth
    const height = window.innerHeight
    const device = this.getDevice(width)
    
    this.state = {
      width,
      height,
      device,
      isMobile: device === 'mobile',
      isTablet: device === 'tablet', 
      isDesktop: device === 'desktop' || device === 'laptop',
      isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      orientation: width > height ? 'landscape' : 'portrait'
    }

    // Notificar a todos los listeners
    this.listeners.forEach(listener => listener())
  }

  private startListening() {
    if (this.isListening || typeof window === 'undefined') return
    
    this.isListening = true
    this.updateState() // Estado inicial
    
    // Debounce para evitar múltiples actualizaciones
    let timeoutId: NodeJS.Timeout
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(this.updateState, 16) // ~60fps
    }

    window.addEventListener('resize', debouncedUpdate, { passive: true })
    window.addEventListener('orientationchange', debouncedUpdate, { passive: true })
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    
    if (this.listeners.size === 1) {
      this.startListening()
    }

    return () => {
      this.listeners.delete(listener)
    }
  }

  getSnapshot = (): ViewportState => {
    if (!this.state && typeof window !== 'undefined') {
      this.updateState()
    }
    
    return this.state || {
      width: 1024,
      height: 768,
      device: 'laptop',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      orientation: 'landscape'
    }
  }
}

// Instancia global del store
const viewportStore = new ViewportStore()

/**
 * Hook principal optimizado para viewport
 */
export function useViewport(): ViewportState {
  return useSyncExternalStore(
    viewportStore.subscribe,
    viewportStore.getSnapshot,
    viewportStore.getSnapshot
  )
}

/**
 * Hook simple para detectar móvil con opciones
 */
export function useIsMobile(options?: {
  includeTablet?: boolean
  maxWidth?: number
}): boolean {
  const { width, device } = useViewport()
  const { includeTablet = false, maxWidth } = options || {}

  return useMemo(() => {
    if (maxWidth) {
      return width <= maxWidth
    }
    
    if (includeTablet) {
      return device === 'mobile' || device === 'tablet'
    }
    
    return device === 'mobile'
  }, [width, device, includeTablet, maxWidth])
}

/**
 * Hook para detectar dispositivo específico
 */
export function useDevice(): {
  isMobile: boolean
  isTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
  device: DeviceType
} {
  const { device } = useViewport()
  
  return useMemo(() => ({
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isLaptop: device === 'laptop',
    isDesktop: device === 'desktop',
    device
  }), [device])
}

/**
 * Hook para media queries simples
 */
export function useMediaQuery(query: string): boolean {
  const mediaQueryRef = useRef<MediaQueryList>()
  
  const subscribe = useCallback((callback: () => void) => {
    if (typeof window === 'undefined') return () => {}
    
    if (!mediaQueryRef.current) {
      mediaQueryRef.current = window.matchMedia(query)
    }
    
    const mql = mediaQueryRef.current
    mql.addEventListener('change', callback)
    
    return () => mql.removeEventListener('change', callback)
  }, [query])

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return false
    
    if (!mediaQueryRef.current) {
      mediaQueryRef.current = window.matchMedia(query)
    }
    
    return mediaQueryRef.current.matches
  }, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

/**
 * Hook para breakpoints con API simple
 */
export function useBreakpoint(breakpoint: Breakpoint): {
  isAbove: boolean
  isBelow: boolean
  current: DeviceType
} {
  const { width, device } = useViewport()
  const breakpointValue = BREAKPOINTS[breakpoint]
  
  return useMemo(() => ({
    isAbove: width >= breakpointValue,
    isBelow: width < breakpointValue,
    current: device
  }), [width, device, breakpointValue])
}

/**
 * Hook para valores responsivos - API simplificada
 */
export function useResponsive<T>(values: {
  mobile?: T
  tablet?: T
  laptop?: T
  desktop?: T
  default?: T
}): T | undefined {
  const { device } = useViewport()
  
  return useMemo(() => {
    // Buscar valor exacto primero
    if (values[device] !== undefined) {
      return values[device]
    }
    
    // Fallback en orden de menor a mayor
    const fallbackOrder: DeviceType[] = ['mobile', 'tablet', 'laptop', 'desktop']
    const deviceIndex = fallbackOrder.indexOf(device)
    
    // Buscar hacia atrás el último valor disponible
    for (let i = deviceIndex; i >= 0; i--) {
      const key = fallbackOrder[i]
      if (values[key] !== undefined) {
        return values[key]
      }
    }
    
    return values.default
  }, [values, device])
}

/**
 * Hook para orientación
 */
export function useOrientation(): 'portrait' | 'landscape' {
  const { orientation } = useViewport()
  return orientation
}

/**
 * Hook para pantalla táctil
 */
export function useIsTouch(): boolean {
  const { isTouch } = useViewport()
  return isTouch
}

/**
 * Componente para renderizado condicional simple
 */
export function ShowOn({ 
  children, 
  device,
  above,
  below 
}: {
  children: React.ReactNode
  device?: DeviceType | DeviceType[]
  above?: Breakpoint
  below?: Breakpoint
}) {
  const viewport = useViewport()
  
  const shouldShow = useMemo(() => {
    if (above && viewport.width < BREAKPOINTS[above]) return false
    if (below && viewport.width >= BREAKPOINTS[below]) return false
    
    if (device) {
      const devices = Array.isArray(device) ? device : [device]
      return devices.includes(viewport.device)
    }
    
    return true
  }, [viewport.width, viewport.device, device, above, below])

  return shouldShow ? <>{children}</> : null
}

/**
 * Utilidades adicionales
 */
export const viewport = {
  /**
   * Obtener device type desde width
   */
  getDevice: (width: number): DeviceType => {
    if (width >= BREAKPOINTS.desktop) return 'desktop'
    if (width >= BREAKPOINTS.laptop) return 'laptop'
    if (width >= BREAKPOINTS.tablet) return 'tablet'
    return 'mobile'
  },

  /**
   * Verificar si un device es mayor o igual a otro
   */
  isDeviceUp: (current: DeviceType, target: DeviceType): boolean => {
    const order = ['mobile', 'tablet', 'laptop', 'desktop']
    return order.indexOf(current) >= order.indexOf(target)
  },

  /**
   * Breakpoints para uso directo
   */
  breakpoints: BREAKPOINTS
}