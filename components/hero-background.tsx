// components/HeroBackground.tsx
'use client';

import { useEffect, useRef } from 'react';

// --- TIPOS Y CONSTANTES CENTRALIZADAS ---

/** Paleta de colores para la animación, exportada como una constante para asegurar la inmutabilidad. */
const COLOR_PALETTE = {
  primary: 'rgba(14, 80, 65, 0.04)',
  secondary: 'rgba(26, 125, 103, 0.05)',
  accent: 'rgba(42, 155, 119, 0.06)',
  light: 'rgba(230, 245, 240, 0.08)',
  highlight: 'rgba(42, 155, 119, 0.1)',
} as const;

/** Tipos de formas que pueden ser renderizadas, basados en un array constante. */
const SHAPE_TYPES = ['hexagon', 'cross', 'diamond', 'circle', 'plus'] as const;
type ShapeType = (typeof SHAPE_TYPES)[number];

// --- LÓGICA DE LA ANIMACIÓN (SEPARADA DEL COMPONENTE REACT) ---

/**
 * Gestiona toda la lógica de renderizado y animación del canvas.
 * Esta clase encapsula el estado y los comportamientos de la animación,
 * permitiendo que el componente React se mantenga simple y declarativo.
 */
class CanvasAnimator {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  
  private gridLines: GridLine[] = [];
  private medicalShapes: MedicalShape[] = [];
  private particles: Particle[] = [];
  
  private width = 0;
  private height = 0;
  private dpr = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('No se pudo obtener el contexto 2D del canvas.');
    }
    this.ctx = context;
    this.setup();
  }
  
  /** Configura las dimensiones iniciales, los elementos y los listeners de eventos. */
  private setup(): void {
    this.setCanvasDimensions();
    this.createElements();
    window.addEventListener('resize', this.debouncedResize);
  }

  /** Establece las dimensiones del canvas, ajustándose a la densidad de píxeles del dispositivo. */
  private setCanvasDimensions = (): void => {
    this.dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  /** Crea las instancias iniciales de todos los elementos visuales. */
  private createElements(): void {
    const horizontalLines = 8;
    const verticalLines = 12;

    this.gridLines = [];
    for (let i = 0; i < horizontalLines; i++) {
        const line = GridLine.create(true, this.ctx, this.width, this.height);
        line.y = (this.height / (horizontalLines - 1)) * i;
        this.gridLines.push(line);
    }
    for (let i = 0; i < verticalLines; i++) {
        this.gridLines.push(GridLine.create(false, this.ctx, this.width, this.height));
    }
    
    const shapeCount = Math.max(1, Math.min(Math.floor(this.width / 200), 8));
    this.medicalShapes = Array.from({ length: shapeCount }, () => new MedicalShape(this.ctx, this.width, this.height));
    
    const particleCount = Math.max(10, Math.min(Math.floor(this.width / 50), 30));
    this.particles = Array.from({ length: particleCount }, () => new Particle(this.ctx, this.width, this.height));
  }

  /** Manejador de redimensionamiento optimizado con debounce para mejorar el rendimiento. */
  private debouncedResize = debounce(() => {
    this.setCanvasDimensions();
    this.createElements();
  }, 250);

  /** El bucle principal de la animación que se ejecuta en cada frame. */
  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.gridLines.forEach(l => { l.update(this.width); l.draw(); });
    this.medicalShapes.forEach(s => { s.update(); s.draw(); });
    this.particles.forEach(p => { p.update(this.width, this.height); p.draw(); });
    this.connectParticles();
    
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
  
  /** Dibuja líneas de conexión entre partículas cercanas. */
  private connectParticles(): void {
      const maxDistance = 150;
      for (let a = 0; a < this.particles.length; a++) {
        for (let b = a + 1; b < this.particles.length; b++) {
          const dx = this.particles[a].x - this.particles[b].x;
          const dy = this.particles[a].y - this.particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.05;
            this.ctx.strokeStyle = `rgba(42, 155, 119, ${opacity})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
            this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
            this.ctx.stroke();
          }
        }
      }
  }

  /** Inicia el bucle de animación. */
  public start(): void {
    if (!this.animationFrameId) {
      this.animate();
    }
  }

  /** Detiene la animación y limpia los recursos (listeners, frames) para evitar fugas de memoria. */
  public destroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    window.removeEventListener('resize', this.debouncedResize);
  }
}

// --- CLASES DE ELEMENTOS DE LA ANIMACIÓN ---

class GridLine {
  constructor(
    public readonly ctx: CanvasRenderingContext2D,
    public readonly isHorizontal: boolean,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public readonly speed: number,
    public opacity: number,
    public readonly color: string
  ) {}

  static create(isHorizontal: boolean, ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): GridLine {
    const colorOptions = [COLOR_PALETTE.primary, COLOR_PALETTE.secondary, COLOR_PALETTE.accent];
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    const opacity = Math.random() * 0.07 + 0.02;

    if (isHorizontal) {
      return new GridLine(ctx, true, 0, Math.random() * canvasHeight, canvasWidth, Math.random() + 0.5, 0, opacity, color);
    } else {
      const speed = (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
      return new GridLine(ctx, false, Math.random() * canvasWidth, 0, Math.random() + 0.5, canvasHeight, speed, opacity, color);
    }
  }

  update(canvasWidth: number): void {
    if (!this.isHorizontal) {
      this.x += this.speed;
      if ((this.speed > 0 && this.x > canvasWidth) || (this.speed < 0 && this.x + this.width < 0)) {
        this.x = this.speed > 0 ? -this.width : canvasWidth;
        this.opacity = Math.random() * 0.07 + 0.02;
      }
    }
  }

  draw(): void {
    this.ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`);
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class MedicalShape {
  private readonly ctx: CanvasRenderingContext2D;
  x: number; y: number; size: number; rotation: number; rotationSpeed: number;
  shape: ShapeType; color: string; opacity: number; pulsePhase: number; pulseSpeed: number;

  constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.ctx = ctx;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 40 + 20;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() * 0.001 - 0.0005) * Math.PI;
    this.shape = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    this.color = Math.random() > 0.7 ? COLOR_PALETTE.highlight : COLOR_PALETTE.light;
    this.opacity = Math.random() * 0.1 + 0.05;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
  }

  update(): void {
    this.rotation += this.rotationSpeed;
    this.pulsePhase += this.pulseSpeed;
    const isHighlight = this.color === COLOR_PALETTE.highlight;
    this.opacity = (Math.sin(this.pulsePhase) * 0.05 + 0.1) * (isHighlight ? 1 : 0.6);
  }

  draw(): void {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    this.ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`);
    this.ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity * 1.5})`);
    this.ctx.lineWidth = 0.5;

    // Llama al método de dibujo correspondiente a la forma
    switch (this.shape) {
      case 'hexagon': this.drawHexagon(); break;
      case 'cross': this.drawCross(); break;
      case 'diamond': this.drawDiamond(); break;
      case 'circle': this.drawCircle(); break;
      case 'plus': this.drawPlus(); break;
    }
    
    this.ctx.restore();
  }

  private drawHexagon(): void {
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = this.size * Math.cos(angle);
      const y = this.size * Math.sin(angle);
      i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawCross(): void {
    const s = this.size * 0.8;
    this.ctx.beginPath();
    this.ctx.moveTo(-s, -s / 5); this.ctx.lineTo(-s / 5, -s / 5); this.ctx.lineTo(-s / 5, -s);
    this.ctx.lineTo(s / 5, -s); this.ctx.lineTo(s / 5, -s / 5); this.ctx.lineTo(s, -s / 5);
    this.ctx.lineTo(s, s / 5); this.ctx.lineTo(s / 5, s / 5); this.ctx.lineTo(s / 5, s);
    this.ctx.lineTo(-s / 5, s); this.ctx.lineTo(-s / 5, s / 5); this.ctx.lineTo(-s, s / 5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawDiamond(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.size); this.ctx.lineTo(this.size, 0);
    this.ctx.lineTo(0, this.size); this.ctx.lineTo(-this.size, 0);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawCircle(): void {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawPlus(): void {
    const s = this.size * 0.8;
    const w = this.size * 0.25;
    this.ctx.beginPath();
    this.ctx.rect(-s, -w, s * 2, w * 2);
    this.ctx.rect(-w, -s, w * 2, s * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }
}

class Particle {
  x: number; y: number; size: number; speedX: number; speedY: number; readonly color: string; opacity: number;
  
  constructor(private readonly ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = COLOR_PALETTE.primary;
    this.opacity = Math.random() * 0.3 + 0.05;
  }
  
  update(canvasWidth: number, canvasHeight: number): void {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
  }

  draw(): void {
    this.ctx.fillStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`);
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// --- FUNCIÓN DE UTILIDAD ---

/**
 * Crea una versión "debounced" de una función que retrasa su ejecución
 * hasta que haya pasado un tiempo determinado sin ser llamada.
 * @param func La función a la que se le aplicará debounce.
 * @param waitFor El tiempo de espera en milisegundos.
 */
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), waitFor);
  };
}

// --- COMPONENTE REACT (SIMPLIFICADO Y ROBUSTO) ---

/**
 * Renderiza un fondo animado de canvas.
 * Este componente es un 'Client Component' y delega toda la lógica de la animación
 * a la clase CanvasAnimator para mantener la separación de responsabilidades y la testabilidad.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let animator: CanvasAnimator | null = null;
    try {
      animator = new CanvasAnimator(canvasRef.current);
      animator.start();
    } catch (error) {
      console.error("Fallo al inicializar la animación del canvas:", error);
      // En un caso real, podríamos tener un estado para mostrar un fondo estático como fallback.
    }

    // La función de limpieza de useEffect es crucial para la gestión de recursos.
    // Se asegura de que la animación se detenga y los listeners se eliminen cuando el componente se desmonte.
    return () => {
      animator?.destroy();
    };
  }, []); // El array de dependencias vacío asegura que esto se ejecuta solo en mount/unmount.

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 -z-10 h-full w-full pointer-events-none" 
      aria-hidden="true" 
    />
  );
}