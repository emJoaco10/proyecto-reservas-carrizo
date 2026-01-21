# Identidad Visual del Proyecto

Este documento define los lineamientos de identidad visual y paleta de colores
para el proyecto **Reservas Carrizo**. Su objetivo es asegurar consistencia en
todos los componentes de la aplicación.

---

## Logo
- **Ubicación principal:** Header y Footer del sitio.
- **Formato:** `logo.svg`.
- **Uso:** 
  - Encabezado de todas las páginas.
  - Footer como elemento de identidad.
  - Favicons y tarjetas de producto.

---

## Paleta de Colores

| Nombre        | Hex      | Uso principal |
|---------------|----------|---------------|
| Primario      | #2ECC71  | Botones, links, elementos destacados |
| Secundario    | #27AE60  | Hover y detalles |
| Header BG     | #1B5E20; | Background del header |
| Fondo general | #F1F8E9  | Fondo principal |
| Color de texto| #212121  | Texto principal |
| Texto invertido| #FFFFFF | Texto sobre fondos oscuros|
| Color exito   | #00C853  | Confirmaciones
| Color error   | #C62828  | Errores
| Color alerta  | #F9A825  | Advertencias

*(Los valores hexadecimales deben confirmarse con los definidos en `src/styles/variables.css`.)*

---

## Lineamientos de Uso
- Mantener contraste suficiente para accesibilidad.
- Usar la paleta de forma consistente en header, footer y componentes.
- Evitar tonos fuera de la paleta definida salvo en imágenes o ilustraciones.
- Centralizar los colores en variables CSS (`:root { --color-primario: ... }`).

---

## Implementación Técnica
- Los colores están definidos en `src/styles/variables.css`.
- El logo se referencia desde `/assets/logo.svg`.
- Todos los componentes deben importar las variables de color para mantener coherencia.
- Se recomienda revisar con DevTools la accesibilidad de contraste en botones y textos.
