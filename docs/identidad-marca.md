# Identidad de Marca — Reservas Carrizo

## Propósito

Este documento resume los lineamientos visuales de **Reservas Carrizo** para mantener una interfaz coherente entre páginas, componentes y dispositivos.

## Logo

- **Recurso identificado en el frontend:** `frontend/src/assets/logo.png`.
- **Uso principal:** encabezado y pie de página, según la implementación de cada componente.
- Mantener las proporciones del logo y evitar deformarlo, recolorearlo o colocarlo sobre fondos que dificulten su lectura.

> La documentación anterior mencionaba `logo.svg` y `/assets/logo.svg`, pero en el repositorio revisado se identifica `frontend/src/assets/logo.png`. Actualizar esta referencia si el recurso cambia.

## Paleta de colores

Los siguientes valores corresponden a las variables definidas en `frontend/src/styles/variables.css`.

| Variable CSS | Color | Uso |
|---|---|---|
| `--color-primario` | `#2F7D62` | Acciones y elementos principales de marca. |
| `--color-primario-hover` | `#256A52` | Estado hover e interacciones. |
| `--color-header-bg` | `#173F35` | Fondo del encabezado. |
| `--color-footer-bg` | `#1D4A3E` | Fondo del pie de página. |
| `--color-secundario` | `#E8F3EE` | Fondos secundarios y detalles suaves. |
| `--color-fondo` | `#F6F8F7` | Fondo general de la aplicación. |
| `--color-superficie` | `#FFFFFF` | Tarjetas, formularios y bloques de contenido. |
| `--color-superficie-secundaria` | `#F0F5F2` | Superficies y elementos destacados. |
| `--color-texto` | `#1F2933` | Texto principal. |
| `--color-texto-secundario` | `#667085` | Texto de apoyo. |
| `--color-texto-invertido` | `#FFFFFF` | Texto sobre fondos oscuros. |
| `--color-exito` | `#2E7D32` | Mensajes y estados exitosos. |
| `--color-error` | `#C62828` | Mensajes y estados de error. |
| `--color-alerta` | `#B7791F` | Advertencias. |

## Lineamientos de uso

- Utilizar las variables CSS existentes en lugar de repetir valores de color en los estilos.
- Mantener contraste suficiente entre texto, fondos y controles.
- Usar los verdes de marca en elementos principales y reservar los colores de estado para mensajes de éxito, error y advertencia.
- Conservar una apariencia consistente entre encabezado, pie de página, botones, formularios, tarjetas y páginas administrativas.
- Verificar la legibilidad y la adaptación visual en pantallas de escritorio y dispositivos móviles.

## Implementación

La paleta se centraliza en `frontend/src/styles/variables.css`. Antes de incorporar nuevos colores o cambiar los existentes, revisar las variables disponibles y actualizar este documento si la identidad visual cambia.

---

**Última revisión:** octubre de 2026.
