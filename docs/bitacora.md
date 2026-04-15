# 📑 Bitácora del Sprint 1

## Índice

- [HU 1: Colocar encabezado](#hu-1-colocar-encabezado)
- [HU 2: Definir el cuerpo del sitio](#hu-2-definir-el-cuerpo-del-sitio)
- [HU 3: Registrar producto](#hu-3-registrar-producto)
- [HU 4: Visualizar productos en el home](#hu-4-visualizar-productos-en-el-home)
- [HU 5: Visualizar detalle de producto](#hu-5-visualizar-detalle-de-producto)
- [HU 6: Visualizar galería de imágenes](#hu-6-visualizar-galería-de-imágenes)
- [HU 7: Colocar pie de página](#hu-7-colocar-pie-de-página)
- [HU 8: Paginar productos](#hu-8-paginar-productos)
- [HU 9: Panel de administración](#hu-9-panel-de-administración)
- [HU 10: Listar productos](#hu-10-listar-productos)
- [HU 11: Eliminar producto](#hu-11-eliminar-producto)

---

### HU 1: Colocar encabezado

**Componentes:**
- `Header.jsx` ubicado en `/src/components`
- Estilos en `Header.css`
- Imagen del logotipo en `/public/assets/logo-header.png`

**Lógica y estructura:**
- Header fijo en la parte superior (`position: fixed`, `width: 100%`)
- Bloque izquierdo: logotipo + lema (redirige al home)
- Bloque derecho: botones "Crear cuenta" e "Iniciar sesión" (sin funcionalidad)

**Estilos relevantes:**
- `display: flex`, `justify-content: space-between`, `align-items: center`
- `padding: 1rem 2rem`, `background-color`, `color`, `hover` en botones
- Responsive con media queries

**Decisiones técnicas:**
- Componente global en layout principal
- Navegación encapsulada con `useNavigate()`
- Estructura semántica: `<header>`, `<nav>`, `<img>`, `<button>`

**Ubicación en el repositorio:**
- `/src/components/Header.jsx`
- `/src/styles/components/Header.css`

---

### HU 2: Definir el cuerpo del sitio

**Componentes:**
- `Main.jsx` en `/src/pages`
- Componente `ListadoProductos.jsx` para mostrar productos aleatorios
- Estilos en `Main.css`

**Lógica y estructura:**
- `Main` ocupa el alto completo (`height: 100vh`)
- Color de fondo según identidad de marca
- Renderiza 3 bloques: buscador, categorías, recomendaciones

**Estilos relevantes:**
- `background-color`, `flex-direction: column`, `gap`, `padding`
- Responsive con media queries
- `overflow-y: auto` si el contenido excede

**Decisiones técnicas:**
- Color definido como variable global
- Componentes modulares
- Estructura semántica y coherencia visual

**Ubicación en el repositorio:**
- `/src/pages/Main.jsx`
- `/src/components/ListadoProductos.jsx`
- `/src/styles/pages/Main.css`

---

### HU 3: Registrar producto

**Componentes:**
- `AgregarProducto.jsx` ubicado en `/src/pages`
- `FormularioProducto.jsx` en `/src/components`
- Hook `useProductosAdmin.js` para lógica de validación y guardado
- Estilos en `FormularioProducto.css`
- Componente `InputImagenes.jsx` para carga de imágenes

**Lógica y estructura:**
- Botón "Agregar producto" en el panel de administración redirige a `/administracion/agregar-producto`.
- Formulario con campos: nombre, descripción e imágenes.
- Validación: si el nombre ya existe, se muestra error.
- Si es válido, se guarda en `localStorage` y se actualiza el listado.
- Imágenes convertidas a base64 para vista previa inmediata.

**Estilos relevantes (`FormularioProducto.css`):**
- `display: flex`, `flex-direction: column`, `gap: 1.5rem`
- Inputs con `border-radius`, `padding`, `box-shadow`
- Botón guardar con `background-color: #2ecc71`
- Mensaje de error en rojo y negrita
- Vista previa de imágenes con `object-fit: cover`

**Decisiones técnicas:**
- Validación encapsulada en hook `useProductosAdmin`
- Uso de `FileReader` para imágenes base64
- Prevención de duplicados por nombre
- Estructura semántica con `<form>`, `<label>`, `<input>`, `<button>`

**Ubicación en el repositorio:**
- `/src/pages/AgregarProducto.jsx`
- `/src/components/FormularioProducto.jsx`
- `/src/components/InputImagenes.jsx`
- `/src/hooks/useProductosAdmin.js`
- `/src/styles/components/FormularioProducto.css`

---

### HU 4: Visualizar productos en el home

**Componentes:**
- `ProductosHome.jsx` en `/src/components`
- Hook `useProductosAleatorios.js`
- Estilos en `ProductosHome.css`
- `CardProducto.jsx` para cada producto

**Lógica y estructura:**
- Al ingresar al home se muestran hasta 10 productos aleatorios.
- Se garantiza que no se repitan usando `Set`.
- Distribución en 2 columnas y hasta 5 filas.
- Selección aleatoria en cada render inicial.
- Cada tarjeta muestra imagen, nombre y precio.

**Estilos relevantes (`ProductosHome.css`):**
- `display: grid`, `grid-template-columns: repeat(2, 1fr)`, `gap: 2rem`
- Tarjetas con `box-shadow`, `border-radius`, `hover`
- Responsive: una columna en pantallas <768px

**Decisiones técnicas:**
- Lógica de aleatoriedad en hook `useProductosAleatorios`
- Uso de `slice()` para limitar a 10 productos
- Coherencia visual con el resto del sitio

**Ubicación en el repositorio:**
- `/src/components/ProductosHome.jsx`
- `/src/components/CardProducto.jsx`
- `/src/hooks/useProductosAleatorios.js`
- `/src/styles/components/ProductosHome.css`

---

### HU 5: Visualizar detalle de producto

**Componentes:**
- `DetalleProducto.jsx` ubicado en `/src/pages`
- `TarjetaDetalle.jsx` en `/src/components`
- Estilos en `DetalleProducto.css`
- Navegación controlada con `react-router-dom` (`useParams`, `useNavigate`)

**Lógica y estructura:**
- Al hacer clic en un producto desde el listado, se redirige a `/producto/:id`.
- Se utiliza `useParams()` para capturar el `id` del producto desde la URL.
- Se accede a `localStorage` para obtener los datos del producto correspondiente.
- Se renderiza un bloque de encabezado con `width: 100%`, que incluye:
  - Título del producto alineado a la izquierda
  - Flecha de retorno (`←`) alineada a la derecha con `onClick={() => navigate(-1)}`
- En el cuerpo se muestran:
  - Descripción del producto
  - Imágenes en un contenedor con `flex-wrap` para disposición responsiva

**Estilos relevantes (`DetalleProducto.css`):**
- `display: flex` con `justify-content: space-between` en el header
- `text-align: left` para el título
- `text-align: right` para la flecha de retorno
- `padding: 2rem` y `gap: 1rem` para espaciado interno
- Imágenes con `max-width: 100%` y `border-radius` para estética

**Decisiones técnicas:**
- Se usó `useNavigate()` para navegación sin recargar la página
- Se encapsuló la lógica de obtención de producto en un helper para facilitar pruebas
- Se evitó usar `context` o `redux` por simplicidad en este sprint
- Se mantuvo la vista como página independiente para facilitar futuras extensiones (ej. reviews)

**Ubicación en el repositorio:**
- `/src/pages/DetalleProducto.jsx`
- `/src/components/TarjetaDetalle.jsx`
- `/src/styles/pages/DetalleProducto.css`

---

### HU 6: Visualizar galería de imágenes

**Componentes:**
- `GaleriaProducto.jsx` ubicado en `/src/components`
- `VerMasImagenes.jsx` como componente modal para galería extendida
- Estilos en `GaleriaProducto.css`
- Hook `useGaleria.js` para manejar lógica de visualización

**Lógica y estructura:**
- El bloque de galería ocupa el 100% del ancho del contenedor padre.
- Se renderizan 5 imágenes:
  - Imagen principal posicionada en la mitad izquierda con `width: 50%`
  - Cuatro imágenes en una grilla de 2x2 en la mitad derecha (`display: grid`, `grid-template-columns: repeat(2, 1fr)`)
- En la esquina inferior derecha se incluye el texto "Ver más" con estilo interactivo (`cursor: pointer`)
- Al hacer clic en "Ver más", se abre el componente `VerMasImagenes` como modal con todas las imágenes disponibles
- Se usa `useState` para controlar la visibilidad del modal
- Se aplican media queries para adaptar el layout en mobile y tablet (stack vertical o scroll horizontal)

**Estilos relevantes (`GaleriaProducto.css`):**
- `display: flex` con `gap: 2rem` para separar las mitades
- Imágenes con `object-fit: cover`, `border-radius`, y `box-shadow`
- Modal con fondo semitransparente y galería en `flex-wrap`
- Texto "Ver más" con `position: absolute` en la esquina inferior derecha del bloque

**Decisiones técnicas:**
- Se encapsuló la lógica de galería en un componente reutilizable (`GaleriaProducto`)
- Se optó por modal en lugar de redirección para mantener contexto del producto
- Se evitó librerías externas de galería para mantener control total del layout
- Se priorizó diseño responsivo con layout fluido en pantallas pequeñas

**Ubicación en el repositorio:**
- `/src/components/GaleriaProducto.jsx`
- `/src/components/VerMasImagenes.jsx`
- `/src/hooks/useGaleria.js`
- `/src/styles/components/GaleriaProducto.css`

---

### HU 7: Colocar pie de página

**Componentes:**
- `Footer.jsx` ubicado en `/src/components`
- Estilos en `Footer.css`
- Imagen del isologotipo importada desde `/public/assets/logo-footer.png`

**Lógica y estructura:**
- El componente `Footer` se renderiza en todas las páginas, ubicado al final del layout principal.
- Se utiliza `width: 100%` y `position: relative` para asegurar que el footer cubra todo el ancho y se mantenga en el pie de página.
- El contenido se organiza en un bloque alineado a la izquierda con:
  - Isologotipo de la empresa (`<img src="/assets/logo-footer.png" />`)
  - Texto con el año actual (`new Date().getFullYear()`)
  - Símbolo de copyright (`©`)
- Se usa `flex` para alinear los elementos horizontalmente y mantener legibilidad.

**Estilos relevantes (`Footer.css`):**
- `background-color` y `color` definidos según la identidad visual de la empresa
- `padding: 1rem 2rem` para espaciado interno
- `font-size: 0.9rem` y `font-weight: 500` para texto legal
- Imagen con `height: 40px` y `object-fit: contain`
- Media queries para ajustar layout en mobile (stack vertical)

**Decisiones técnicas:**
- Se colocó el footer fuera de las rutas específicas para asegurar presencia global
- Se evitó `position: fixed` para no interferir con el scroll natural del contenido
- Se usó `Date()` dinámico para evitar hardcodear el año
- Se mantuvo el diseño minimalista para no competir visualmente con el contenido principal

**Ubicación en el repositorio:**
- `/src/components/Footer.jsx`
- `/src/styles/components/Footer.css`
- `/public/assets/logo-footer.png`

---

### HU 8: Paginar productos

**Componentes:**
- `Paginador.jsx` ubicado en `/src/components`
- Integración en `ListadoProductos.jsx`
- Estilos en `Paginador.css`
- Hook `usePaginacion.js` para lógica de paginado

**Lógica y estructura:**
- Se divide el listado de productos en páginas de máximo 10 elementos usando `slice()` sobre el array original.
- Se calcula el total de páginas con `Math.ceil(productos.length / 10)`
- Se renderiza un paginador con botones numerados, "←" para retroceder, "→" para avanzar y "Inicio" para volver a la primera página.
- Se usa `useState` para controlar la página actual y `useEffect` para actualizar la vista al cambiar de página.
- Los botones están deshabilitados cuando no corresponde avanzar o retroceder.

**Estilos relevantes (`Paginador.css`):**
- Contenedor con `display: flex` y `justify-content: center`
- Botones con `padding`, `border-radius`, y `hover` para feedback visual
- Página activa resaltada con color de fondo y borde
- Diseño responsivo con `flex-wrap` en pantallas pequeñas

**Decisiones técnicas:**
- Se encapsuló la lógica en un hook para facilitar reuso en otras vistas
- Se evitó paginación infinita para mantener control y claridad en la navegación
- Se mantuvo el estado de página en el componente padre para facilitar sincronización con el listado
- Se priorizó accesibilidad con `aria-label` en los botones

**Ubicación en el repositorio:**
- `/src/components/Paginador.jsx`
- `/src/components/ListadoProductos.jsx`
- `/src/hooks/usePaginacion.js`
- `/src/styles/components/Paginador.css`

---

### HU 9: Panel de administración

**Componentes:**
- `PanelAdmin.jsx` ubicado en `/src/pages`
- `MenuAdmin.jsx` en `/src/components`
- Estilos en `PanelAdmin.css`
- Hook `useDispositivo.js` para detectar tipo de dispositivo

**Lógica y estructura:**
- Se define la ruta `/administracion` en el router principal (`App.jsx`) que renderiza el componente `PanelAdmin`.
- Dentro del panel se visualiza un menú con las funciones disponibles: agregar producto, editar, eliminar, etc.
- Se utiliza `window.innerWidth` y `navigator.userAgent` para detectar si el usuario accede desde un dispositivo móvil.
- Si se detecta mobile o tablet, se muestra un mensaje: "El panel de administración no está disponible en dispositivos móviles."
- El menú se organiza en una lista vertical con íconos y enlaces a cada función.

**Estilos relevantes (`PanelAdmin.css`):**
- Layout fijo con `min-width: 1024px` para evitar responsividad
- Menú con `display: flex`, `flex-direction: column`, y `gap: 1rem`
- Mensaje de restricción con `color: red`, `font-weight: bold`, y `text-align: center`
- Fondo neutro y tipografía consistente con la identidad visual

**Decisiones técnicas:**
- Se evitó responsividad intencionalmente para cumplir con los criterios
- Se encapsuló la detección de dispositivo en un hook reutilizable (`useDispositivo.js`)
- Se mantuvo el panel como página independiente para facilitar futuras extensiones (dashboard, métricas)
- Se priorizó claridad y accesibilidad en el menú de funciones

**Ubicación en el repositorio:**
- `/src/pages/PanelAdmin.jsx`
- `/src/components/MenuAdmin.jsx`
- `/src/hooks/useDispositivo.js`
- `/src/styles/pages/PanelAdmin.css`

---

### HU 10: Listar productos

**Componentes:**
- `ListaAdminProductos.jsx` en `/src/pages`
- `TablaProductos.jsx` en `/src/components`
- Estilos en `TablaProductos.css`
- Hook `useProductosAdmin.js`

**Lógica y estructura:**
- Botón "Lista de productos" redirige a `/administracion/lista-productos`.
- Tabla con columnas: Id, Nombre, Acciones.
- Renderizado con `map()` sobre productos.
- Botones de acción conectados a funciones de edición/eliminación.

**Estilos relevantes (`TablaProductos.css`):**
- `width: 100%`, `border-collapse: collapse`, `text-align: left`
- Encabezados con `background-color` y negrita
- Filas alternadas con `:nth-child(even)`
- Botones con `padding`, `hover`, `cursor: pointer`

**Decisiones técnicas:**
- Tabla encapsulada en componente reutilizable
- Lógica en hook separado para pruebas
- Sin paginación en esta vista
- Uso semántico de `<table>`, `<thead>`, `<tbody>`

**Ubicación en el repositorio:**
- `/src/pages/ListaAdminProductos.jsx`
- `/src/components/TablaProductos.jsx`
- `/src/hooks/useProductosAdmin.js`
- `/src/styles/components/TablaProductos.css`

---

### HU 11: Eliminar producto

**Componentes:**
- `TablaProductos.jsx` en `/src/components`
- Hook `useProductosAdmin.js`
- `ModalConfirmacion.jsx`
- Estilos en `TablaProductos.css` y `ModalConfirmacion.css`

**Lógica y estructura:**
- Cada fila de producto incluye botón "Eliminar producto".
- Al presionar, se abre modal de confirmación.
- Si se acepta, se elimina de `localStorage` y se actualiza el listado.
- Si se cancela, no se realizan cambios.

**Estilos relevantes:**
- Botón eliminar con `background-color: #e74c3c` y `hover`
- Modal centrado con fondo semitransparente
- Botones diferenciados por color
- Mensaje de confirmación en negrita y centrado

**Decisiones técnicas:**
- Confirmación encapsulada en componente modal reutilizable
- Eliminación en frontend (`localStorage`) para pruebas sin backend
- Estado local actualizado tras eliminación
- Prevención de errores de usuario con confirmación explícita

**Ubicación en el repositorio:**
- `/src/components/TablaProductos.jsx`
- `/src/components/ModalConfirmacion.jsx`
- `/src/hooks/useProductosAdmin.js`
- `/src/styles/components/TablaProductos.css`
- `/src/styles/components/ModalConfirmacion.css`
