# Documentación del Frontend — Reservas Carrizo

## 1. Introducción

El frontend de **Reservas Carrizo** es una aplicación web desarrollada con **React, JavaScript, JSX y Vite**. Su responsabilidad es presentar la interfaz, gestionar la navegación, recoger las acciones del usuario y comunicarse con el backend mediante una API REST.

El código fuente se encuentra en `frontend/src/`. La aplicación organiza la interfaz en páginas y componentes reutilizables, mientras que los hooks, servicios y helpers concentran lógica compartida y operaciones de acceso a datos.

Esta documentación describe la estructura del frontend y la evolución funcional reflejada en el repositorio hasta el **Sprint 4**. Las pruebas manuales se documentan por separado en `testsS1.md`, `testsS2.md`, `testsS3.md` y  `testsS4.md`.

> **Alcance:** este documento describe el comportamiento que puede identificarse en el frontend. La persistencia, las reglas de negocio definitivas, la autorización efectiva y el envío de notificaciones dependen también del backend. La presencia de una interfaz no demuestra por sí sola que una operación haya sido validada en el servidor o que una prueba se haya ejecutado.

## 2. Tecnologías

| Tecnología | Uso en el frontend |
|---|---|
| React | Construcción de la interfaz mediante componentes y estado. |
| JavaScript | Lógica de interacción, transformación de datos y llamadas a funciones. |
| JSX | Declaración de la estructura visual de los componentes React. |
| React Router DOM | Definición de rutas, navegación y lectura de parámetros de URL. |
| CSS | Estilos de páginas, componentes, estados y adaptación responsive. |
| Vite | Entorno de desarrollo y herramienta de compilación del frontend. |
| `react-datepicker` | Selector de fechas utilizado en búsqueda y disponibilidad. |
| `lucide-react` | Iconografía utilizada por componentes de la interfaz. |

La aplicación se comunica con el backend por HTTP mediante los servicios del frontend. En el entorno local utilizado durante el desarrollo, las direcciones habituales son:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

Estas direcciones corresponden a la configuración habitual de desarrollo y pueden variar según el entorno.

## 3. Organización del código

La estructura principal de `frontend/src/` es la siguiente:

```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── constantes/
│   └── iconos.js
├── components/
├── helpers/
├── hooks/
├── pages/
├── services/
└── styles/
    ├── components/
    ├── pages/
    ├── App.css
    ├── Botones.css
    └── variables.css
```

### 3.1. `App.jsx` y `main.jsx`

`main.jsx` es el punto de entrada de React. `App.jsx` organiza las rutas de la aplicación mediante `BrowserRouter`, `Routes` y `Route`. También dispone el encabezado y el pie de página globales.

Las rutas públicas incluyen la página principal, el detalle de un producto, el registro, el inicio de sesión, el flujo de reserva, el perfil, los favoritos y el historial de reservas.

Las rutas administrativas se agrupan bajo `AdminRoute`, que controla el acceso a las vistas de administración en el frontend. La autorización efectiva de las operaciones debe estar respaldada por el backend.

### 3.2. `pages/`

Contiene las vistas que corresponden a páginas o flujos de navegación completos. Entre ellas se encuentran:

- `Main.jsx`: página principal, buscador, filtro por categorías y recomendaciones.
- `DetalleProductos.jsx`: detalle del producto, calendario, políticas, valoraciones y contacto por WhatsApp.
- `DetalleProductosGaleria.jsx`: vista de galería del producto.
- `RegistroUsuario.jsx` e `IniciarSesion.jsx`: páginas de registro e inicio de sesión.
- `MiPerfil.jsx`: acceso a la información del perfil.
- `MisFavoritos.jsx`: listado de productos favoritos.
- `Reserva.jsx`: formulario y flujo de solicitud de reserva.
- `ListaReservas.jsx`: historial de reservas del usuario.
- `Administracion.jsx` y páginas relacionadas: administración de productos, usuarios, categorías y características.
- `AgregarProducto.jsx`, `EditarProducto.jsx` y las páginas de administración relacionadas: formularios de gestión.

### 3.3. `components/`

Contiene elementos reutilizables de la interfaz. Entre los principales se encuentran:

- `Header.jsx` y `Footer.jsx`: estructura global y navegación.
- `ListadoProductos.jsx` y `ListadoProductosFiltrados.jsx`: presentación de listados de productos.
- `BuscadorProductos.jsx`: búsqueda por texto y fechas, sugerencias y resultados.
- `CalendarioDisponibilidad.jsx`: consulta de fechas ocupadas y selección de un rango.
- `InfoProducto.jsx`, `CaracteristicasListado.jsx`, `PoliticasProducto.jsx` y `ValoracionesProducto.jsx`: bloques de información del producto.
- `CompartirProducto.jsx`: opciones para compartir el enlace de un producto.
- `InfoReserva.jsx`, `InformacionPago.jsx` y `ConfirmacionReserva.jsx`: partes de la interfaz del flujo de reserva.
- `ListadoUsuarios.jsx`, `UsuarioCard.jsx` y componentes de paneles administrativos: gestión y visualización de usuarios.
- `BreadcrumAdministracion.jsx`: navegación contextual dentro del área administrativa.

### 3.4. `hooks/`

Los hooks encapsulan operaciones reutilizables y estados relacionados con el acceso a datos:

| Hook | Responsabilidad general |
|---|---|
| `useProductoAPI.js` | Operaciones de productos, búsquedas, categorías relacionadas y favoritos que expone el hook. |
| `useUsuarioAPI.js` | Operaciones de registro, inicio de sesión y gestión de usuarios disponibles en el servicio. |
| `useCategoriaAPI.js` | Operaciones de categorías. |
| `useCaracteristicaAPI.js` | Operaciones de características de productos. |
| `useReservaAPI.js` | Operaciones relacionadas con reservas, disponibilidad y consulta de reservas. |
| `useImageError.js` | Lógica reutilizable relacionada con errores de imágenes. |

Las operaciones exactas disponibles deben consultarse en cada hook; esta tabla resume su propósito general y no reemplaza la revisión de sus implementaciones.

### 3.5. `services/`

Los servicios separan las peticiones HTTP de los componentes visuales:

- `apiService.js`: configuración o funciones comunes para la comunicación con la API.
- `productoService.js`: operaciones relacionadas con productos.
- `usuarioService.js`: operaciones relacionadas con usuarios.
- `categoriaService.js`: operaciones relacionadas con categorías.
- `caracteristicaService.js`: operaciones relacionadas con características.
- `reservaService.js`: operaciones relacionadas con reservas y disponibilidad.
- `favoritoService.js`: operaciones relacionadas con favoritos.
- `valoracionService.js`: operaciones relacionadas con valoraciones.

El hook o componente que necesita información utiliza las funciones correspondientes y luego actualiza el estado de la interfaz según la respuesta recibida.

### 3.6. `helpers/` y `constantes/`

- `storageUtils.js`: funciones auxiliares para leer y escribir información en el almacenamiento local.
- `validaciones.js`: validaciones reutilizables.
- `imageUtils.js`: utilidades para el tratamiento de imágenes.
- `productoUtils.js`: utilidades relacionadas con productos.
- `constantes/iconos.js`: constantes relacionadas con iconos.

### 3.7. `styles/`

Los estilos se organizan en hojas generales y hojas específicas de páginas y componentes. `variables.css` centraliza variables visuales, mientras que las carpetas `styles/pages/` y `styles/components/` agrupan estilos por responsabilidad.

## 4. Arquitectura y flujo de datos

El patrón general de interacción del frontend es:

```text
Página (pages/)
    ↓
Componente reutilizable (components/)
    ↓
Hook (hooks/) o helper (helpers/)
    ↓
Servicio (services/)
    ↓
API REST
    ↓
Backend
    ↓
Respuesta
    ↓
Actualización del estado y renderizado React
```

No todos los componentes necesitan recorrer todas las capas: una página puede delegar una parte de la interfaz a un componente, y ese componente puede usar un hook. La separación busca evitar que las peticiones HTTP queden repetidas en múltiples lugares.

### 4.1. Estado de interfaz

Los componentes utilizan `useState` para mantener datos de formularios, filtros, resultados, mensajes y estados de carga. `useEffect` se utiliza para realizar operaciones asociadas al ciclo de vida del componente, como cargar datos al entrar en una página o cuando cambian determinadas dependencias.

Los estados de carga, error, ausencia de resultados y confirmación se muestran mediante renderizado condicional cuando corresponde.

### 4.2. Almacenamiento local y sesión

`storageUtils.js` proporciona funciones para acceder al almacenamiento local. En distintas partes de la interfaz se utiliza la información almacenada bajo la clave `usuario` para presentar datos del usuario y adaptar algunas opciones de navegación.

La existencia de datos en el almacenamiento local no debe interpretarse como una garantía de autenticación segura. El backend debe verificar la identidad y los permisos en cada operación protegida.

### 4.3. Formularios y validaciones

El frontend realiza validaciones de entrada para mostrar mensajes y evitar envíos incompletos. Estas validaciones mejoran la experiencia de uso, pero no sustituyen las validaciones del backend.

## 5. Rutas principales

Las rutas configuradas en `App.jsx` incluyen:

| Ruta | Vista o propósito |
|---|---|
| `/` | Página principal. |
| `/producto/:id` | Detalle de un producto. |
| `/producto/:id/galeria` | Galería del producto. |
| `/registro-usuario` | Registro de usuario. |
| `/iniciar-sesion` | Inicio de sesión. |
| `/reserva/:id` | Flujo de reserva del producto indicado. |
| `/mi-perfil` | Perfil del usuario. |
| `/mis-favoritos` | Listado de favoritos. |
| `/mis-reservas` | Historial de reservas. |
| `/administracion` | Panel principal de administración. |
| `/productos-admin` | Administración de productos. |
| `/lista-productos` | Listado administrativo de productos. |
| `/agregar-producto` | Alta de producto. |
| `/admin/producto/editar/:id` | Edición de producto. |
| `/usuarios-admin` | Administración de usuarios. |
| `/lista-usuarios` | Listado administrativo de usuarios. |
| `/caracteristicas-admin` | Administración de características. |
| `/lista-caracteristicas` | Listado de características. |
| `/agregar-caracteristica` | Alta de característica. |
| `/editar-caracteristica/:id` | Edición de característica. |
| `/asociar-producto-caracteristica/:id` | Asociación de características a un producto. |
| `/categorias-admin` | Administración de categorías. |
| `/agregar-categoria` | Alta de categoría. |
| `/editar-categoria/:id` | Edición de categoría. |

Las rutas administrativas están anidadas dentro de `AdminRoute`. Las rutas de perfil, favoritos y reservas del usuario se declaran en `App.jsx` sin estar anidadas dentro de ese componente; algunas páginas pueden realizar comprobaciones adicionales por su cuenta.

## 6. Evolución funcional por sprint

### 6.1. Sprint 1 — Estructura inicial

El primer sprint estableció la estructura visual inicial de la aplicación y los flujos básicos de productos y navegación.

Las funcionalidades documentadas para esa etapa incluyen:

- Encabezado, cuerpo principal y pie de página.
- Visualización de productos en la página principal.
- Detalle de producto y galería de imágenes.
- Alta, edición, listado y eliminación de productos.
- Primeras páginas y formularios de usuarios.
- Navegación entre vistas y estilos responsive.
- Uso inicial de `localStorage` en determinadas operaciones.

La implementación inicial fue evolucionando en los siguientes sprints hacia una mayor integración con el backend.

### 6.2. Sprint 2 — Integración y administración

Durante el Sprint 2 se amplió la integración con la API REST y se desarrollaron funcionalidades de administración.

Entre los cambios documentados se encuentran:

- Registro e inicio de sesión.
- Gestión de sesión y presentación de opciones según el usuario.
- Gestión de usuarios y roles.
- Rutas y páginas administrativas.
- Alta, edición y eliminación de categorías.
- Gestión de características de productos y asociación con productos.
- Filtrado de productos por categoría.
- Validaciones de formularios e imágenes.
- Centralización de operaciones mediante hooks y servicios.

La clasificación de productos pasó a realizarse mediante categorías, en lugar de mantener mecanismos de clasificación duplicados. Cuando un producto no tiene una categoría asociada, la interfaz puede mostrar `Sin categoría`.

La HU19 fue descrita en la documentación anterior como opcional y postergada.

### 6.3. Sprint 3 — Búsqueda, disponibilidad e interacción

El Sprint 3 amplió la consulta de productos y la interacción con los alojamientos.

#### HU22 — Realizar búsqueda

`BuscadorProductos.jsx` permite:

- Buscar por palabra clave.
- Mostrar sugerencias durante la escritura.
- Seleccionar una sugerencia.
- Seleccionar fecha inicial y final.
- Ejecutar una búsqueda.
- Presentar resultados relacionados con los criterios ingresados.
- Ordenar los resultados por relevancia textual.

El buscador utiliza operaciones de `useProductoAPI` para la búsqueda por texto y de `useReservaAPI` para consultar productos disponibles según el rango de fechas.

#### HU23 — Visualizar disponibilidad

`CalendarioDisponibilidad.jsx` consulta la disponibilidad del producto, presenta las fechas ocupadas y permite seleccionar un rango. El componente contiene lógica para comprobar si una fecha o un rango incluyen días ocupados, mostrar mensajes y comunicar al componente padre las fechas aceptadas.

El detalle del producto integra el calendario y conserva las fechas seleccionadas para utilizarlas al iniciar el flujo de reserva.

#### HU24 y HU25 — Favoritos

La funcionalidad de favoritos permite marcar productos y consultar la lista guardada por el usuario. `ListadoProductos.jsx` incorpora interacción con favoritos y `MisFavoritos.jsx` presenta los productos favoritos, permite acceder al detalle y solicitar la eliminación de un favorito. La página contempla estados de carga, error y lista vacía.

#### HU26 — Políticas del producto

`PoliticasProducto.jsx` presenta una sección de políticas del alojamiento dentro del detalle del producto.

#### HU27 — Compartir productos

`CompartirProducto.jsx` presenta opciones para compartir el enlace de un producto, incluyendo mecanismos de compartición del navegador cuando están disponibles y opciones de copia o enlaces para compartir, según la implementación del componente.

#### HU28 — Valorar productos

`ValoracionesProducto.jsx` presenta la sección de valoraciones e integra las operaciones disponibles para mostrar o registrar puntuaciones y comentarios. La interfaz contempla información como puntuación, usuario, fecha, comentario, promedio y cantidad de valoraciones, de acuerdo con los datos que recibe.

#### HU29 — Eliminar categoría

La interfaz administrativa permite solicitar la eliminación de una categoría mediante un flujo de confirmación. La documentación de esta funcionalidad indica que los productos asociados deben conservarse y quedar sin categoría; el resultado definitivo depende de la operación del backend.

## 7. Sprint 4 — Reservas y contacto

Durante el Sprint 4 se incorporaron o ampliaron en el frontend las funcionalidades relacionadas con búsqueda por fecha, acceso al detalle para reservar, solicitud de reservas, historial y contacto por WhatsApp. Las Historias de Usuario recibidas son HU30 a HU35.

### 7.1. HU30 — Reservas: seleccionar fecha

**Objetivo:** permitir que el usuario realice búsquedas por fecha para encontrar productos que coincidan con sus intereses.

**Implementación frontend identificada:**

- `BuscadorProductos.jsx` incluye un selector de fechas con `react-datepicker`.
- Mantiene estados para el texto buscado, la fecha inicial, la fecha final, los resultados, la carga, los mensajes y las sugerencias.
- Utiliza `useReservaAPI` para consultar productos disponibles por rango de fechas.
- Utiliza `useProductoAPI` para la búsqueda por palabra clave.
- Presenta los resultados y permite navegar al detalle del producto.

El selector de fechas del buscador y el calendario de disponibilidad del detalle cumplen funciones relacionadas, pero no idénticas: el primero ayuda a buscar productos según fechas; el segundo permite consultar la disponibilidad de un producto concreto y seleccionar un rango para iniciar una reserva.

### 7.2. HU31 — Reservas: visualizar detalles

**Objetivo:** permitir que un usuario autenticado visualice la página de detalle del producto para poder reservarlo.

**Implementación frontend identificada:**

- La ruta `/producto/:id` renderiza `DetalleProductos.jsx`.
- El componente obtiene el identificador mediante `useParams` y consulta el producto mediante `useProductoAPI`.
- Presenta información del producto, imágenes, características, políticas y valoraciones.
- Integra `CalendarioDisponibilidad.jsx` para consultar fechas y seleccionar un rango.
- Mantiene las fechas seleccionadas en el estado de la página.
- Ofrece el paso al flujo de reserva y una opción de contacto por WhatsApp.

**Nota de alcance:** la ruta de detalle está declarada como pública en `App.jsx`; el componente contiene lógica para adaptar el flujo de reserva según la existencia de un usuario leído del almacenamiento local. La autorización real de una reserva debe comprobarse en el backend. Por eso, la descripción de la HU no debe interpretarse como prueba de que la ruta de detalle, por sí sola, exige autenticación.

### 7.3. HU32 — Realizar reserva

**Objetivo:** permitir que un usuario autenticado realice una reserva para utilizar un producto.

**Implementación frontend identificada:**

- La ruta `/reserva/:id` renderiza `Reserva.jsx`.
- El componente obtiene el ID del producto mediante `useParams` y carga su información con `useProductoAPI`.
- Puede inicializar las fechas con valores recibidos a través de `location.state`.
- Muestra los datos del producto y del usuario disponible en el almacenamiento local.
- Recopila cantidad de huéspedes, DNI, edades de los huéspedes y observaciones.
- Valida que se hayan seleccionado fechas, que la cantidad de huéspedes sea mayor que cero, que DNI, edades y observaciones estén informados, y que la cantidad de edades ingresadas coincida con la cantidad de huéspedes.
- Envía los datos a `registrarReserva` mediante `useReservaAPI`.
- Convierte las fechas a cadenas `YYYY-MM-DD` antes de enviarlas.
- Muestra mensajes de error y un estado de procesamiento.
- Si la operación devuelve un resultado verdadero, activa la interfaz `ConfirmacionReserva`.

La pantalla de confirmación indica el resultado que interpreta el frontend a partir de la respuesta recibida. La persistencia y aceptación definitiva de la reserva corresponden al backend.

### 7.4. HU33 — Acceder al historial

**Objetivo:** permitir que un usuario autenticado consulte reservas anteriores.

**Implementación frontend identificada:**

- La ruta `/mis-reservas` renderiza `ListaReservas.jsx`.
- El componente utiliza `fetchMisReservas` de `useReservaAPI`.
- Mantiene estados para la lista, la carga y los errores.
- Muestra mensajes diferenciados durante la carga, ante un error y cuando no hay reservas.
- Si existen resultados, presenta tarjetas con nombre del producto, estado de la reserva, fecha de ingreso, fecha de salida y cantidad de huéspedes.

**Nota de alcance:** la ruta se encuentra declarada en `App.jsx` fuera del grupo `AdminRoute`. La protección de acceso para usuarios autenticados debe revisarse en el flujo completo y garantizarse también desde el backend; la presencia de la página no constituye por sí sola una barrera de seguridad.

### 7.5. HU34 — WhatsApp: iniciar chat

**Objetivo:** permitir que el usuario se comunique con el proveedor del producto por WhatsApp para realizar consultas.

**Implementación frontend identificada:**

- `DetalleProductos.jsx` define una función de contacto que construye una URL `wa.me` con un número configurado y un mensaje inicial.
- El mensaje se codifica para su inclusión en la URL.
- Se intenta abrir el enlace en una pestaña nueva.
- El componente muestra un mensaje de resultado del intento y registra excepciones en consola.

La interfaz informa que WhatsApp se abrió cuando la llamada de apertura se ejecuta sin lanzar una excepción; esto no permite asegurar que el usuario haya enviado un mensaje. El número de contacto se encuentra configurado en el código del componente.

### 7.6. HU35 — Notificación: confirmar reserva por correo

**Objetivo:** que un usuario registrado reciba un correo electrónico con los datos de la reserva después de realizarla.

**Alcance frontend:** el flujo de reserva se comunica con `useReservaAPI` y presenta una confirmación visual a partir de la respuesta de `registrarReserva`. En los componentes de interfaz revisados no se identifica una implementación frontend directa del envío de correo electrónico.

El envío de una notificación por correo suele requerir una operación del backend o de un servicio de notificaciones. Para considerar esta HU completa es necesario comprobar la implementación del backend y las pruebas correspondientes. La confirmación visual de `Reserva.jsx` no demuestra por sí sola que el correo se haya enviado o recibido.

## 8. Flujo frontend de una reserva

El flujo principal que conecta búsqueda, detalle y reserva puede representarse así:

```text
Página principal
    │
    ▼
BuscadorProductos
    │
    ├── Búsqueda por texto
    └── Búsqueda por rango de fechas
    │
    ▼
Resultados de productos
    │
    ▼
DetalleProductos (/producto/:id)
    │
    ├── Información del producto
    ├── Características, políticas y valoraciones
    ├── CalendarioDisponibilidad
    └── Selección de fechas
    │
    ▼
Reserva (/reserva/:id)
    │
    ├── Datos del usuario
    ├── Datos de la reserva
    ├── Validaciones de formulario
    └── Solicitud a registrarReserva
    │
    ▼
Respuesta de la API
    │
    └── Interfaz de confirmación o mensaje de error
```

Las fechas seleccionadas en el detalle pueden transmitirse mediante el estado de navegación. `Reserva.jsx` utiliza esas fechas para inicializar sus estados cuando están disponibles.

## 9. Historial de reservas

`ListaReservas.jsx` consulta las reservas del usuario mediante `fetchMisReservas`. La vista diferencia cuatro situaciones:

1. La consulta todavía está en curso.
2. La consulta produjo un error.
3. La consulta finalizó y no existen reservas.
4. Existen reservas para presentar.

Cada tarjeta muestra el nombre del producto, el estado, las fechas y la cantidad de huéspedes. La clase CSS de la tarjeta se construye a partir del estado de la reserva, permitiendo aplicar estilos según el estado recibido.

El frontend representa los datos que obtiene del servicio; la exactitud del historial y su asociación con el usuario dependen de la respuesta y de las comprobaciones realizadas por el backend.

## 10. Acceso, roles y seguridad

`AdminRoute.jsx` se utiliza para agrupar rutas administrativas en `App.jsx`. Las vistas administrativas incluyen gestión de productos, usuarios, categorías y características.

El frontend puede ocultar opciones o redirigir al usuario según los datos disponibles en la interfaz. Sin embargo:

- Las comprobaciones visuales no sustituyen la autorización del backend.
- Los datos de `localStorage` pueden modificarse desde el navegador.
- Las operaciones administrativas y las reservas deben validar identidad y permisos en el servidor.
- Las páginas declaradas fuera de `AdminRoute` no quedan protegidas automáticamente por ese componente.
- La documentación de una ruta o pantalla no constituye evidencia de una prueba de seguridad.

## 11. Manejo de carga, errores y estados vacíos

En diferentes páginas y componentes se utilizan estados de interfaz para informar al usuario sobre las operaciones asíncronas. Entre los patrones identificados se encuentran:

- Mensajes de carga al consultar productos o reservas.
- Mensajes de error cuando una consulta falla.
- Mensajes alternativos cuando no existen resultados.
- Botones de reintento en algunas vistas.
- Deshabilitación temporal de acciones durante el procesamiento.
- Mensajes de confirmación o error después de una operación.

El comportamiento específico varía según el componente. No todas las operaciones presentan necesariamente el mismo nivel de manejo de errores; debe consultarse el componente correspondiente para conocer su implementación exacta.

## 12. Estilos y diseño responsive

Los estilos se distribuyen entre hojas globales y archivos específicos de cada página o componente. La documentación y los estilos existentes incluyen ajustes para adaptar distintas secciones a resoluciones de escritorio, tablet y dispositivos móviles.

Las áreas con estilos específicos incluyen:

- Encabezado y navegación.
- Listados y tarjetas de productos.
- Formularios de registro, inicio de sesión y administración.
- Buscador y selector de fechas.
- Calendario de disponibilidad.
- Detalle y galería del producto.
- Políticas, valoraciones y compartir.
- Formularios y confirmación de reserva.
- Listados administrativos y perfil del usuario.

La adaptación responsive debe verificarse mediante pruebas visuales en las resoluciones definidas por el equipo; no se considera validada únicamente por la existencia de reglas CSS.

## 13. Pruebas y documentación QA

Los casos de prueba funcionales se organizan en documentos Markdown separados:

```text
docs/
├── testsS1.md
├── testsS2.md
├── testsS3.md
└── testsS4.md
```

Los documentos de los tres primeros sprints contienen casos manuales asociados a las historias documentadas en cada uno. Para el Sprint 4, los casos deben cubrir HU30 a HU35 y registrar, como mínimo:

- Historia de Usuario y criterio de aceptación.
- Datos de entrada y precondiciones.
- Pasos de ejecución.
- Resultado esperado.
- Resultado observado.
- Estado: `OK`, `ERROR` o `PENDIENTE`.

**Importante:** el estado de una prueba debe representar una ejecución real. Si solo se definió el caso, corresponde dejarlo como `PENDIENTE`; no debe marcarse `OK` por el hecho de que exista el componente o la funcionalidad en el código.

### Cobertura recomendada para el Sprint 4

| HU | Funcionalidad | Aspectos que debe cubrir el testing |
|---|---|---|
| HU30 | Seleccionar fecha y buscar productos | Selección de fechas, búsqueda con rango válido, ausencia de resultados y mantenimiento de otras secciones del Home. |
| HU31 | Visualizar detalles | Acceso al detalle, datos del producto, calendario y paso al flujo de reserva según el estado del usuario. |
| HU32 | Realizar reserva | Campos obligatorios, cantidad y edades de huéspedes, fechas, respuesta exitosa y manejo de errores. |
| HU33 | Acceder al historial | Historial con resultados, sin reservas, error de consulta y control de acceso. |
| HU34 | Iniciar chat por WhatsApp | Apertura del enlace, contenido del mensaje inicial y comportamiento ante errores de apertura. |
| HU35 | Confirmar reserva por correo | Generación y envío desde el backend, destinatario, datos de la reserva y manejo de fallos, verificando recepción cuando sea posible. |

Esta tabla propone los aspectos que deben probarse; no afirma que los casos del Sprint 4 hayan sido ejecutados ni aprobados.

## 14. Instalación y ejecución local

El frontend se encuentra en la carpeta `frontend/`. Los comandos exactos deben contrastarse con los scripts declarados en `frontend/package.json`.

Flujo habitual de ejecución en desarrollo:

```bash
cd frontend
npm install
npm run dev
```

Para compilar el frontend, utilizar el script de compilación definido en `package.json`, habitualmente:

```bash
npm run build
```

La ejecución completa de la aplicación requiere que el backend esté disponible y que la configuración de la API apunte a la dirección correspondiente al entorno.

## 15. Documentación relacionada

Dentro de `docs/` se encuentran los siguientes documentos del proyecto:

| Archivo | Contenido |
|---|---|
| `DOCUMENTACION_FRONTEND.md` | Arquitectura, estructura y funcionalidades del frontend. |
| `DOCUMENTACION_BACKEND.md` | Arquitectura e implementación del backend. |
| `bitacora.md` | Registro de avances y decisiones por Historia de Usuario y sprint. |
| `testsS1.md` | Casos de prueba del Sprint 1. |
| `testsS2.md` | Casos de prueba del Sprint 2. |
| `testsS3.md` | Casos de prueba del Sprint 3. |
| `testsS4.md` | Documento que debe reunir los casos de prueba del Sprint 4. |
| `identidad-marca.md` | Referencia de identidad visual del proyecto. |

## 16. Estado y puntos que requieren verificación

A partir de la estructura y los componentes del frontend se identifican las interfaces para buscar por fecha, consultar detalles, iniciar una reserva, mostrar el historial y abrir un contacto por WhatsApp. Hay dos límites que conviene mantener explícitos en la documentación:

1. **HU33 y acceso autenticado:** `/mis-reservas` está declarada fuera del grupo de rutas anidadas bajo `AdminRoute`. Debe verificarse dónde se controla el acceso del usuario y confirmar que el backend devuelve únicamente las reservas del usuario autenticado.
2. **HU35 y correo electrónico:** el flujo frontend presenta una confirmación visual de reserva, pero eso no prueba el envío de un correo. La implementación debe verificarse en el backend y mediante pruebas.

Además, los estados de los tests deben actualizarse únicamente después de ejecutar los casos. La documentación técnica, la bitácora y los tests deben mantenerse coherentes entre sí y con el comportamiento real del repositorio.

---

**Fin de la documentación del frontend de Reservas Carrizo.**
