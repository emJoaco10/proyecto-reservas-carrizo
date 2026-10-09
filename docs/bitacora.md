# 📑 Bitácora del Proyecto — Reservas Carrizo

## Índice general

- [Sprint 1 — Estructura inicial](#sprint-1--estructura-inicial)
- [Sprint 2 — Usuarios, sesión y administración](#sprint-2--usuarios-sesión-y-administración)
- [Sprint 3 — Búsqueda, disponibilidad y participación](#sprint-3--búsqueda-disponibilidad-y-participación)
- [Sprint 4 — Reservas y contacto](#sprint-4--reservas-y-contacto)
- [Resumen de estado y pendientes](#resumen-de-estado-y-pendientes)

### Historias de Usuario del Sprint 1


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

---

# Sprint 1 — Estructura inicial

El Sprint 1 estableció la estructura visual y los primeros flujos de navegación y administración de productos. Las historias documentadas en esta sección corresponden al contenido original de la bitácora.

## HU 1 — Colocar encabezado
Se desarrolló el encabezado global con logotipo, lema y acciones de navegación para crear una cuenta e iniciar sesión. La estructura se diseñó para reutilizarse en las páginas de la aplicación y adaptarse a diferentes resoluciones.

**Referencias registradas en la bitácora original:** `Header.jsx` y sus estilos.

## HU 2 — Definir el cuerpo del sitio
Se definió la página principal con buscador, categorías y recomendaciones de productos, separando la composición de la página de los componentes que presentan los listados.

**Referencias registradas en la bitácora original:** `Main.jsx`, `ListadoProductos.jsx` y `Main.css`.

## HU 3 — Registrar producto
Se documentó el formulario de alta de producto, con campos de información, carga de imágenes, validaciones y actualización del listado. La bitácora original describe una implementación inicial apoyada en `localStorage`; el proyecto evolucionó posteriormente hacia la integración con la API.

## HU 4 — Visualizar productos en el home
Se implementó una vista de productos destacados/aleatorios en el inicio, con tarjetas y disposición adaptable a pantallas pequeñas.

## HU 5 — Visualizar detalle de producto
Se documentó una página de detalle con navegación desde el listado y presentación de la información del producto. Los nombres de archivos de la primera versión pueden diferir de los componentes actuales.

## HU 6 — Visualizar galería de imágenes
Se documentó la galería de imágenes con una imagen principal, imágenes secundarias y acceso a una vista ampliada.

## HU 7 — Colocar pie de página
Se incorporó un pie de página global con identidad visual y año dinámico.

## HU 8 — Paginar productos
Se documentó la paginación del listado de productos para facilitar su navegación cuando la cantidad de resultados es grande.

## HU 9 — Panel de administración
Se documentó la creación del acceso al área de administración para centralizar las operaciones de gestión.

## HU 10 — Listar productos
Se documentó la tabla administrativa de productos con identificador, nombre y acciones disponibles.

## HU 11 — Eliminar producto
Se documentó la eliminación con confirmación previa. En la implementación inicial, la bitácora describe el uso de `localStorage`; el comportamiento vigente debe verificarse en los componentes y servicios actuales.

> **Nota de trazabilidad del Sprint 1:** los nombres y rutas de archivos de esta sección provienen de la bitácora original y reflejan la etapa inicial. No todos tienen por qué coincidir con la estructura actual del frontend y backend.

---

# Sprint 2 — Usuarios, sesión y administración

Durante el Sprint 2 se amplió la aplicación desde la estructura inicial hacia una aplicación integrada con backend, con gestión de usuarios, sesión, roles, categorías y características de productos.

## HU 12 — Categorías de productos

Se incorporó la clasificación de productos mediante categorías. La interfaz permite visualizar y utilizar categorías y asociarlas a productos. En el backend se incorporaron las entidades, relaciones y operaciones necesarias para persistir esa información.

## HU 13 — Registro de usuarios

Se desarrolló el formulario de registro y su integración con el servicio de usuarios. El backend procesa el registro, persiste el usuario y utiliza un codificador de contraseñas para no almacenar la contraseña en texto plano.

## HU 14 — Inicio de sesión / gestión de sesión

La documentación de Sprint 2 registra el inicio de sesión y la gestión de sesión del usuario. El frontend presenta las opciones correspondientes al estado del usuario y utiliza el almacenamiento local para recuperar los datos que necesita mostrar. El backend valida las credenciales y entrega la respuesta de autenticación según la implementación vigente.

La numeración y el título de esta HU varían entre algunos documentos históricos: `DOCUMENTACION_FRONTEND.md` la describe como inicio de sesión, mientras que `testsS2.md` documenta casos de cierre de sesión. Conviene conservar la denominación oficial del tablero de HU del equipo al hacer la entrega final.

## HU 15 — Funcionalidades del usuario autenticado

Se incorporó el acceso a la información del perfil del usuario. La página `MiPerfil.jsx` recupera los datos guardados localmente y muestra `MiPerfilInfo`; si no encuentra un usuario, redirige a la página principal.

## HU 16 — Identificar administrador

Se incorporó la diferenciación de permisos administrativos. El frontend dispone de rutas y paneles de administración, y el backend configura reglas de autorización por rol para operaciones restringidas. La seguridad efectiva debe comprobarse en el servidor y no solo mediante la visibilidad de opciones en la interfaz.

## HU 17 — Administrar características de producto

Se desarrollaron las pantallas y operaciones administrativas para listar, crear, editar y eliminar características. La implementación utiliza componentes, hooks y servicios para comunicarse con el backend.

## HU 18 — Visualizar características del producto

Se incorporó la presentación de características asociadas a un producto, incluyendo nombre e icono cuando está disponible.

## HU 19 — Notificación de confirmación de registro

La documentación de Sprint 2 identifica esta historia como opcional y postergada. No debe marcarse como completada sin verificar su implementación y sus pruebas.

## HU 20 — Filtrado por categoría

Se desarrolló el filtro de productos por una o varias categorías. La página principal pasa las categorías seleccionadas al componente de filtro y presenta los resultados correspondientes.

## HU 21 — Administración de categorías

Se incorporaron páginas y operaciones administrativas para listar, crear y editar categorías, junto con validaciones y comunicación con la API.

### Decisiones técnicas registradas para el Sprint 2

- Separación de la interfaz, hooks, servicios y backend.
- Uso de DTO para transferir datos entre el frontend y la API.
- Persistencia de categorías, usuarios y características en la base de datos configurada.
- Codificación de contraseñas en el backend.
- Control de acceso a operaciones administrativas mediante roles.
- Uso de componentes reutilizables para formularios y listados.

### Referencias de pruebas

El repositorio contiene `docs/testsS2.md`, con casos para HU12, HU13, HU14, HU15, HU16, HU17, HU18, HU20 y HU21. HU19 figura como opcional/postergada en la documentación de testing.

---

# Sprint 3 — Búsqueda, disponibilidad y participación

El Sprint 3 amplió la experiencia de consulta de productos y agregó funcionalidades de interacción de usuarios.

## HU 22 — Realizar búsqueda

Se incorporó la búsqueda de productos por palabra clave. El frontend ofrece sugerencias y resultados y puede combinar la búsqueda con un rango de fechas. El backend dispone de `GET /api/producto/buscar?texto={texto}` para buscar productos por nombre.

## HU 23 — Visualizar disponibilidad

Se incorporó el calendario de disponibilidad en el detalle del producto. El frontend consulta las reservas existentes, presenta fechas ocupadas y permite seleccionar un rango disponible. El backend expone operaciones para consultar la disponibilidad de un producto.

## HU 24 — Marcar como favorito

Se incorporó la posibilidad de agregar y quitar productos de favoritos. El backend mantiene la relación entre usuarios y productos y asocia las operaciones al usuario autenticado.

## HU 25 — Listar productos favoritos

Se incorporó la página `MisFavoritos.jsx`, que consulta los favoritos, presenta estados de carga/error/lista vacía y permite acceder al detalle o quitar un producto de la lista.

## HU 26 — Políticas de producto

Se agregó una sección informativa de políticas en el detalle del producto. La funcionalidad es principalmente de presentación en el frontend; la documentación del backend no identifica una entidad o endpoint específico para políticas.

## HU 27 — Compartir productos

Se incorporaron opciones para compartir el enlace del producto desde la interfaz. Esta funcionalidad se resuelve principalmente en el frontend y no requiere un endpoint específico del backend según la documentación disponible.

## HU 28 — Valorar productos

Se incorporó el sistema de valoraciones. El backend utiliza la entidad `Valoracion` y sus operaciones para asociar puntuación y comentario a un usuario y un producto. Se contemplan restricciones de puntuación, prevención de valoraciones duplicadas y la condición de haber finalizado una reserva para poder valorar.

Los datos de promedio y cantidad de valoraciones se integran en la información de los productos.

## HU 29 — Eliminar categoría

Se ajustó la eliminación de categorías para conservar los productos asociados. Según la implementación documentada en el backend, los productos que estaban asociados quedan sin categoría y la categoría se elimina dentro de una transacción.

### Decisiones técnicas registradas para el Sprint 3

- Búsqueda de productos delegada al backend.
- Consulta de disponibilidad basada en las reservas almacenadas.
- Relación muchos a muchos entre usuarios y productos favoritos.
- Entidad, repositorio y servicio específicos para valoraciones.
- Cálculo del promedio de puntuaciones y cantidad de valoraciones.
- Desasociación de productos antes de eliminar una categoría.
- Reutilización de componentes y servicios en el frontend.

### Referencias de pruebas

El repositorio contiene `docs/testsS3.md`, con casos de prueba para HU22 a HU29. Ese documento registra la cobertura y los estados consignados en el archivo existente. Cualquier cambio posterior en el código debe acompañarse de una nueva ejecución cuando corresponda.

---

# Sprint 4 — Reservas y contacto

El Sprint 4 aborda seis historias de usuario: búsqueda por fechas, visualización de detalles para reservar, registro de reservas, historial, contacto por WhatsApp y notificación por correo.

## HU 30 — Reservas: seleccionar fecha

**Historia:** como usuario, quiero poder realizar búsquedas por fecha para encontrar productos que coincidan con mis intereses.

**Trabajo frontend:**
- `BuscadorProductos.jsx` incorpora la selección de fecha inicial y final.
- La búsqueda utiliza el hook `useReservaAPI` para consultar productos disponibles en un rango.
- El hook `useProductoAPI` se utiliza para la búsqueda por texto.
- La interfaz presenta los resultados y permite navegar al detalle del producto.

**Trabajo backend:**
- `GET /api/reserva/disponibles` recibe las fechas de inicio y fin.
- `ReservaService` valida la presencia de ambas fechas y que la fecha final no sea anterior a la inicial.
- El servicio consulta las reservas existentes y descarta los productos con rangos superpuestos.

**Pendiente de verificar:** probar rangos válidos, rango invertido, resultados vacíos y los límites exactos de inclusión de las fechas de entrada y salida.

## HU 31 — Reservas: visualizar detalles

**Historia:** como usuario autenticado, quiero poder visualizar una página de reservas con el detalle del producto para poder reservarlo.

**Trabajo frontend:**
- `DetalleProductos.jsx` obtiene el producto a partir del ID de la ruta.
- Presenta información general, imágenes, características, políticas y valoraciones.
- Integra `CalendarioDisponibilidad.jsx` para consultar fechas ocupadas y seleccionar un rango.
- Permite avanzar al flujo de reserva y ofrece la opción de contacto por WhatsApp.

**Trabajo backend:**
- `GET /api/producto/{id}` devuelve la información del producto.
- Los endpoints de disponibilidad permiten consultar reservas existentes.

**Pendiente de verificar:** confirmar que la navegación al flujo de reserva respete el estado de autenticación esperado y que el backend aplique los controles necesarios. La página de detalle está declarada como pública en el frontend; eso no equivale a autorizar una reserva.

## HU 32 — Realizar reserva

**Historia:** como usuario autenticado, quiero poder realizar reservas para poder utilizar los productos.

**Trabajo frontend:**
- `Reserva.jsx` carga el producto y utiliza las fechas recibidas mediante el estado de navegación cuando están disponibles.
- Presenta información del producto y del usuario.
- Recopila cantidad de huéspedes, DNI, edades y observaciones.
- Valida campos obligatorios y que la cantidad de edades ingresadas coincida con la cantidad de huéspedes.
- Envía los datos mediante `registrarReserva`.
- Muestra estados de procesamiento, errores y la interfaz de confirmación cuando la respuesta se interpreta como exitosa.

**Trabajo backend:**
- `POST /api/reserva` delega la operación en `ReservaService`.
- Se validan fechas, cantidad de huéspedes, DNI, edades y observaciones.
- Se verifica que existan el producto y el usuario autenticado.
- Se comprueba la superposición con reservas existentes.
- Se persiste la reserva y se invoca el servicio de correo.

**Pendiente de verificar:** probar campos inválidos, producto inexistente, usuario no autenticado, fechas superpuestas y la respuesta ante errores de persistencia o de envío de correo. La confirmación visual del frontend no demuestra por sí sola la entrega de una notificación.

## HU 33 — Acceder a historial

**Historia:** como usuario autenticado, quiero poder visualizar mis reservas anteriores para conocer mi historial.

**Trabajo frontend:**
- `ListaReservas.jsx` consulta las reservas mediante `fetchMisReservas`.
- Presenta estados de carga, error y lista vacía.
- Muestra tarjetas con nombre del producto, estado, fechas y cantidad de huéspedes.

**Trabajo backend:**
- `GET /api/reserva/mis-reservas` obtiene las reservas asociadas al usuario autenticado.
- El servicio transforma los resultados a `ReservaHistorialDTO`.
- Las reservas se ordenan por fecha de inicio descendente.
- El estado se calcula como `FINALIZADA`, `PRÓXIMA` o `EN CURSO` según las fechas y la fecha actual del servidor.

**Pendiente de verificar:** comprobar que cada usuario solo reciba sus propias reservas, que el listado se ordene correctamente y que se manejen los casos sin resultados y de error. Revisar también las reglas de seguridad de la ruta y del endpoint.

## HU 34 — WhatsApp: iniciar chat

**Historia:** como usuario, quiero poder comunicarme con el proveedor del producto a través de WhatsApp para consultarle si tengo alguna duda.

**Trabajo frontend:**
- `DetalleProductos.jsx` construye un enlace `wa.me`.
- El enlace incluye un mensaje inicial codificado para URL.
- El navegador intenta abrir el chat en una nueva pestaña.

**Trabajo backend:**
- En el código revisado no se identifica un endpoint específico para iniciar chats de WhatsApp. La funcionalidad está implementada principalmente en el frontend.

**Pendiente de verificar:** confirmar que el enlace contiene el número correcto, que el mensaje se forma adecuadamente y que el comportamiento se entiende como apertura del chat, no como envío automático de un mensaje.

## HU 35 — Notificación: confirmar reserva por correo

**Historia:** como usuario registrado, quiero recibir un correo electrónico con los datos de mi reserva luego de su ejecución para validarlos y encontrarlos fácilmente.

**Trabajo backend:**
- Existe `EmailService`, que utiliza `JavaMailSender` y `SimpleMailMessage`.
- El correo incluye datos del usuario, producto, fechas y cantidad de huéspedes.
- Se define el asunto `Confirmación de reserva - Reservas Carrizo`.
- `ReservaService` invoca el envío después de guardar la reserva.
- El remitente se obtiene de la configuración `spring.mail.username`; el envío depende de la configuración SMTP.

**Trabajo frontend:**
- `Reserva.jsx` muestra la interfaz de confirmación según la respuesta de la operación de reserva.
- Esa confirmación no demuestra por sí sola que el correo se haya enviado o recibido.

**Pendiente de verificar:** ejecutar una prueba con SMTP válido, comprobar destinatario, asunto, contenido y recepción del correo. Registrar también el comportamiento cuando el servidor SMTP falla después de persistir la reserva.

---

# Resumen de estado y pendientes

## Funcionalidades documentadas por sprint

| Sprint | Alcance principal | Documento de pruebas |
|---|---|---|
| Sprint 1 | Estructura visual, navegación, productos y administración inicial | Casos originales registrados en la bitácora |
| Sprint 2 | Categorías, registro, sesión, roles, características y administración | `testsS2.md` |
| Sprint 3 | Búsqueda, disponibilidad, favoritos, políticas, compartir, valoraciones y eliminación de categorías | `testsS3.md` |
| Sprint 4 | Búsqueda por fechas, detalle, reservas, historial, WhatsApp y correo | Se recomienda crear y mantener `testsS4.md` |

## Criterio de actualización

Esta bitácora describe el alcance y las decisiones técnicas reflejadas en la documentación y el código revisados. Si una funcionalidad cambia, debe actualizarse su sección y el documento de testing correspondiente. Los resultados de pruebas solo deben consignarse después de su ejecución.

---

**Fin de la bitácora del proyecto Reservas Carrizo.**
