# Guía de Colores – Urodex Clinic

Esta guía resume la paleta de colores base y las reglas de uso para garantizar consistencia visual y suficiente contraste (WCAG AA) en todo el sitio.

| Token Tailwind | Uso principal | Valor | Notas |
| -------------- | ------------- | ----- | ----- |
| `primary` (`green-700`) | Marca, CTA sólidos | `#0e5041` | Mantener para botones primarios, encabezados destacados. |
| `primary-light` (`green-50`) | Fondos suaves, hovers | `#e6f5f0` | Para estados hover/selección. |
| `gray-900` a `gray-100` | Texto/principales | Tailwind por defecto | Se conserva. |
| **`gray-600`** | Texto secundario | **`#374151`** | Ajustado (antes `#4b5563`) para contraste ≥ 4.5 : 1. |
| `secondary` (neutro claro) | Tarjetas, bordes ligeros | HSL vars `--secondary` | Basado en paleta neutra. |

## Reglas de uso
1. **Texto**
   * `text-foreground` (negro/blanco basado en modo) para texto principal.
   * `text-gray-600` para texto secundario; con la nueva tonalidad cumple contraste.
2. **Acciones / CTA**
   * Botones primarios: `bg-primary` ⇢ `hover:bg-green-600`.
   * Botones secundarios: variante outline o `bg-primary-light`.
3. **Fondos**
   * Secciones destacadas: `bg-primary` con texto blanco.
   * Secciones neutras: `bg-white` o gradientes de la colección `gradient-*`.
4. **Bordes & Divisores**
   * Usar `border-border` (HSL var) para líneas de división.
5. **Accesibilidad**
   * Asegurar >4.5:1 para texto normal; >3:1 para grande. Revisado con Gray-600 y Primary-700.

## Actualizaciones recientes
* 26 jun 2025 – `gray.600` actualizado en `tailwind.config.ts` para mejorar legibilidad.
* No se detectaron otros problemas de contraste importantes.

---
Para cambios futuros, actualiza **una sola vez** la tonalidad en `tailwind.config.ts` y evita valores hex duplicados en componentes.
