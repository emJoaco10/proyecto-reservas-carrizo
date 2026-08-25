# 📚 Documentación Frontend - Proyecto Reservas Carrizo

## 📌 Resumen

El frontend de **Reservas Carrizo** es una aplicación web desarrollada con **React**, responsable de la interfaz de usuario y de la comunicación con el backend mediante una API REST.

Durante el Sprint 1 se desarrolló principalmente la estructura visual y se utilizó `localStorage` para la persistencia inicial.

En el Sprint 2 se incorporó la integración con el backend desarrollado en **Spring Boot**, pasando a utilizar la API REST como fuente principal de datos para productos y categorías.

Actualmente el frontend permite:

- Visualizar, registrar, editar y eliminar productos.
- Gestionar y filtrar productos por categoría.
- Crear categorías desde el panel de administración.
- Registrar e iniciar sesión con usuarios.
- Diferenciar funcionalidades según el rol.
- Acceder a funcionalidades administrativas.
- Validar formularios e imágenes.
- Mostrar estados de carga y errores.
- Utilizar una interfaz responsive.

La aplicación mantiene una separación entre páginas, componentes, hooks, helpers y estilos.

---

## 🏗️ Arquitectura

El frontend utiliza una arquitectura basada en componentes React.

La organización principal es:

```text
Pages
   │
   ▼
Components
   │
   ▼
Hooks / Helpers
   │
   ▼
API REST
   │
   ▼
Backend Spring Boot
   │
   ▼
Base de datos H2
Principales responsabilidades

Pages

Representan las diferentes vistas de la aplicación y organizan los componentes utilizados en cada pantalla.

Components

Contienen elementos reutilizables de la interfaz, como formularios, filtros, listados y tarjetas.

Hooks

Centralizan lógica reutilizable. El principal hook utilizado para la comunicación con el backend es useProductoAPI.

Helpers

Contienen funciones auxiliares relacionadas con validaciones, almacenamiento y tratamiento de datos.

Styles

Contienen los estilos CSS de páginas y componentes.

🛠️ Stack Tecnológico
Frontend
Tecnología	Uso
React	Desarrollo de la interfaz
JavaScript	Lógica de la aplicación
JSX	Componentes React
React Router	Navegación
CSS	Estilos
Vite	Desarrollo y compilación
Integración con Backend
Tecnología	Uso
Spring Boot	Backend
Spring Data JPA	Persistencia
Spring Security	Seguridad y roles
H2	Base de datos
Comunicación

La comunicación entre frontend y backend se realiza mediante HTTP y una API REST.

Durante el desarrollo local:

Frontend → http://localhost:5173
Backend  → http://localhost:8080

El hook useProductoAPI centraliza las principales operaciones relacionadas con productos y categorías.

🔄 Evolución Sprint 1 → Sprint 2
Sprint 1

Durante el primer sprint se desarrolló la estructura inicial del frontend y las principales funcionalidades de productos y usuarios.

La persistencia inicial utilizaba principalmente:

localStorage
Sprint 2

Durante el segundo sprint se incorporó:

Integración con la API REST.
Gestión de categorías.
Asociación de categorías a productos.
Filtrado por categoría.
Administración de categorías.
Gestión de usuarios y roles.
Mejoras en formularios y validaciones.
Mejoras visuales y responsive.

También se eliminó el atributo tipo del producto.

La clasificación pasó a realizarse mediante Categoria, evitando mantener dos mecanismos diferentes para clasificar los productos.

El modelo actual se representa conceptualmente como:

Producto
├── id
├── nombre
├── descripcion
├── imagenes
└── categoria

Las tarjetas muestran la categoría asociada y, cuando no existe, muestran:

Sin categoría
📊 Estado actual

Al finalizar el Sprint 2, el frontend se encuentra integrado con el backend y las funcionalidades previstas fueron verificadas mediante los casos de prueba documentados en:

tests.md

La HU19, al ser opcional, fue postergada para una etapa posterior del proyecto.

## 🗂️ Estructura del Proyecto

El frontend se organiza separando las páginas de la aplicación, los componentes reutilizables, la lógica compartida y los estilos.

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── helpers/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── eslint.config.js
src/pages/

Contiene las páginas principales de la aplicación.

Entre las principales se encuentran:

Página	Función
Main.jsx	Página principal, productos y filtros
AgregarProducto.jsx	Registro de productos
EditarProducto.jsx	Edición de productos
DetalleProducto.jsx	Detalle de un producto
Administracion.jsx	Panel administrativo
AdministracionCategorias.jsx	Administración de categorías
AgregarCategorias.jsx	Acceso al formulario de categorías

Las páginas organizan los componentes necesarios para cada vista y gestionan los flujos principales de navegación.

src/components/

Contiene componentes reutilizables de la interfaz.

Entre los principales:

Componente	Función
CategoryFilter.jsx	Selección de categorías para filtrar productos
ListadoProductos.jsx	Listado general de productos
ListadoProductosFiltrados.jsx	Listado después de aplicar filtros
FormularioCategoria.jsx	Creación de nuevas categorías

Los componentes reciben información mediante props y se comunican con sus páginas mediante callbacks cuando es necesario.

src/hooks/

Contiene hooks personalizados utilizados para centralizar lógica reutilizable.

El principal hook incorporado durante el Sprint 2 es:

useProductoAPI.js

Este hook centraliza las operaciones de comunicación con el backend relacionadas principalmente con:

Productos.
Categorías.
Consultas.
Creación.
Actualización.
Eliminación.

De esta manera, los componentes no necesitan implementar directamente toda la lógica de las peticiones HTTP.

src/helpers/

Contiene funciones auxiliares reutilizables.

Entre los principales archivos se encuentran:

productoUtils.js
storageUtils.js
validaciones.js

Sus responsabilidades incluyen:

Tratamiento y normalización de productos.
Operaciones auxiliares de almacenamiento.
Validaciones.
Funciones compartidas por diferentes componentes.

Con la integración del backend, localStorage dejó de ser la fuente principal de productos, aunque algunas utilidades de almacenamiento pueden continuar utilizándose para información propia del frontend.

src/styles/

Contiene los estilos CSS de la aplicación.

Se organiza principalmente en:

styles/
├── components/
└── pages/

Esto permite mantener separados los estilos correspondientes a componentes reutilizables de los estilos específicos de cada página.

Durante el Sprint 2 se realizaron mejoras visuales principalmente en:

Formularios.
Tarjetas de productos.
Filtros.
Formularios de categorías.
Botones.
Diseño responsive.
src/assets/

Contiene recursos utilizados directamente por la aplicación, como imágenes y otros archivos estáticos importados desde los componentes.

public/

Contiene recursos públicos que pueden ser utilizados directamente por la aplicación sin formar parte del proceso de importación de componentes.

App.jsx

Es uno de los archivos principales del frontend.

Se encarga de definir la estructura de navegación mediante React Router y asociar las rutas con las páginas correspondientes.

Conceptualmente:

App.jsx
   │
   ├── /
   ├── /producto/:id
   ├── /agregar-producto
   ├── /editar-producto/:id
   ├── /administración
   ├── /categorias-admin
   └── /agregar-categoria
main.jsx

Es el punto de entrada de la aplicación React.

Se encarga de iniciar el árbol principal de componentes y renderizar la aplicación.

package.json

Define las dependencias y scripts utilizados por el proyecto.

Entre las tecnologías principales utilizadas se encuentran React, React Router y Vite.

vite.config.js

Contiene la configuración utilizada por Vite para el desarrollo y compilación del frontend.

eslint.config.js

Contiene la configuración de ESLint utilizada para detectar problemas y mantener determinadas reglas de calidad en el código JavaScript/React.

📐 Principios de organización

La estructura actual busca mantener una separación clara de responsabilidades:

Pages
  ↓
Components
  ↓
Hooks / Helpers
  ↓
API REST

Esto permite que:

Las páginas gestionen las vistas.
Los componentes sean reutilizables.
Los hooks centralicen lógica operativa.
Los helpers agrupen funciones auxiliares.
Los estilos permanezcan separados de la lógica.

Esta organización facilita el mantenimiento y permite incorporar nuevas funcionalidades sin concentrar toda la lógica en un único archivo.

## 🔄 Gestión de Datos y Comunicación con la API

Durante el Sprint 1, parte de la información se gestionaba mediante `localStorage`.

Con la integración del backend en el Sprint 2, los productos y categorías utilizan principalmente la API REST como fuente de datos.

El frontend se comunica con el backend mediante el hook `useProductoAPI`.

---

## 🪝 `useProductoAPI`

El hook:

```text
src/hooks/useProductoAPI.js

centraliza las operaciones relacionadas con la API.

Su objetivo es evitar que cada componente tenga que implementar directamente las peticiones HTTP.

Entre las operaciones principales se encuentran:

Obtener productos.
Obtener productos aleatorios.
Obtener productos por ID.
Obtener productos paginados.
Crear productos.
Actualizar productos.
Eliminar productos.
Obtener categorías.
Consultar productos por categoría.

El flujo general es:

Componente
    ↓
useProductoAPI
    ↓
API REST
    ↓
Backend
    ↓
Respuesta
    ↓
Componente
📦 Gestión de Productos

Las operaciones de productos se realizan principalmente mediante la API REST.

El frontend puede solicitar información para:

Listados.
Detalles.
Paginación.
Productos aleatorios.
Filtrado.
Creación.
Edición.
Eliminación.

Los datos recibidos se utilizan posteriormente para actualizar el estado de los componentes y mostrar la información correspondiente.

🏷️ Gestión de Categorías

Las categorías también se obtienen y gestionan mediante la API.

El frontend puede:

Obtener las categorías disponibles.
Utilizarlas para filtrar productos.
Crear nuevas categorías desde el panel administrativo.
Mostrar la categoría asociada a un producto.

La categoría pasó a ser el mecanismo principal de clasificación de los productos durante el Sprint 2.

🔍 Filtrado por Categoría

El filtrado comienza en CategoryFilter.jsx.

El usuario selecciona una o más categorías y esa información se comunica a Main.jsx.

El flujo es:

CategoryFilter
      ↓
Categorías seleccionadas
      ↓
Main.jsx
      ↓
useProductoAPI
      ↓
Backend
      ↓
Productos filtrados
      ↓
ListadoProductosFiltrados

Cuando no hay categorías seleccionadas, se muestra nuevamente el listado general.

💾 localStorage

El proyecto utiliza utilidades de almacenamiento local mediante:

src/helpers/storageUtils.js

Durante el Sprint 1, localStorage tenía un papel más importante en la gestión de datos.

Con la incorporación del backend, dejó de ser la fuente principal de productos y categorías.

Actualmente se utiliza únicamente cuando una funcionalidad del frontend necesita conservar información local durante la navegación.

🧰 Helpers

Los helpers contienen funciones auxiliares reutilizables.

productoUtils.js

Agrupa funciones relacionadas con el tratamiento y manejo de información de productos.

storageUtils.js

Centraliza las operaciones relacionadas con localStorage.

validaciones.js

Contiene validaciones reutilizables utilizadas por los formularios.

Esta separación evita duplicar lógica dentro de los componentes.

⚠️ Validaciones

El frontend realiza validaciones iniciales antes de enviar determinados datos al backend.

Estas validaciones permiten detectar errores básicos directamente en la interfaz.

Las reglas de negocio y validaciones definitivas corresponden al backend.

🖼️ Validación de imágenes

El formulario de categorías valida las imágenes seleccionadas antes de procesarlas.

Formatos permitidos:

JPG
PNG
WEBP

Tamaño máximo:

5 MB

Si el archivo no cumple alguna condición, se informa al usuario y no se continúa con el procesamiento.

👁️ Vista previa de imágenes

Cuando se selecciona una imagen válida en FormularioCategoria.jsx, se utiliza FileReader para generar una representación que permite mostrar una vista previa.

El flujo es:

Seleccionar archivo
      ↓
Validar formato
      ↓
Validar tamaño
      ↓
FileReader
      ↓
Vista previa

Esto permite comprobar visualmente la imagen antes de completar el formulario.

⏳ Estados de carga y errores

Las operaciones que dependen de la API pueden requerir estados de carga mientras se espera una respuesta.

El frontend contempla también situaciones como:

Error en una petición.
Datos inválidos.
Producto inexistente.
Categoría inexistente.
Archivo de imagen inválido.

La interfaz puede informar estos estados al usuario sin interrumpir el funcionamiento general de la aplicación.

🔁 Evolución del manejo de datos
Sprint 1
React
  ↓
localStorage
Sprint 2
React
  ↓
useProductoAPI
  ↓
API REST
  ↓
Spring Boot
  ↓
H2

El cambio permite centralizar la persistencia y mantener sincronizados frontend y backend.

📌 Principio de separación

La gestión actual busca mantener separadas tres responsabilidades:

Componentes
    ↓
Interfaz y estado visual

Hooks
    ↓
Comunicación y lógica reutilizable

Backend
    ↓
Persistencia y reglas de negocio

Esto permite que los componentes se concentren principalmente en la interfaz y que la comunicación con el backend se encuentre centralizada.

## 🧭 Routing y Navegación

La navegación del frontend se gestiona mediante **React Router** y se encuentra centralizada principalmente en:

```text
src/App.jsx

React Router permite cambiar entre las diferentes vistas sin recargar completamente la aplicación.

🛣️ Principales rutas
Ruta	Página	Función
/	Main.jsx	Página principal y listado de productos
/producto/:id	DetalleProducto.jsx	Detalle de un producto
/agregar-producto	AgregarProducto.jsx	Registro de productos
/editar-producto/:id	EditarProducto.jsx	Edición de productos
/administración	Administracion.jsx	Panel administrativo
/categorias-admin	AdministracionCategorias.jsx	Administración de categorías
/agregar-categoria	AgregarCategorias.jsx	Creación de categorías

Las rutas que contienen :id utilizan un parámetro dinámico para identificar el recurso correspondiente.

🔗 Navegación entre vistas

El proyecto utiliza diferentes herramientas de React Router según la necesidad:

Link

Permite crear enlaces internos entre páginas sin recargar la aplicación.

useNavigate

Permite realizar navegación programáticamente, por ejemplo después de completar correctamente una operación.

useParams

Permite obtener parámetros de la URL, como el identificador de un producto:

/producto/:id
🔐 Navegación administrativa

Las funcionalidades administrativas se encuentran separadas de las vistas públicas.

El flujo principal es:

Administracion.jsx
       │
       ├── Gestión de productos
       │
       └── Gestión de categorías
              │
              ▼
      AdministracionCategorias
              │
              ▼
        AgregarCategorias
              │
              ▼
     FormularioCategoria

El acceso a las funcionalidades administrativas depende del usuario y sus permisos.

La validación de seguridad definitiva corresponde al backend.

🔄 Flujo principal de navegación

La navegación general puede resumirse en:

Página principal
      │
      ├── Producto
      │      └── Detalle
      │
      └── Administración
             ├── Productos
             └── Categorías
                    └── Agregar categoría

La utilización de React Router permite mantener una estructura de navegación tipo SPA y separar cada funcionalidad en su propia página.

## 🧩 Páginas y Componentes Principales

Las páginas representan las vistas principales de la aplicación y utilizan componentes reutilizables para construir la interfaz.

---

## 📄 Páginas principales

### `Main.jsx`

Es la página principal de la aplicación.

Se encarga principalmente de:

- Mostrar productos.
- Obtener información desde la API.
- Gestionar el filtrado por categorías.
- Mostrar el listado correspondiente.
- Coordinar los componentes principales de la pantalla.

Utiliza `CategoryFilter`, `ListadoProductos` y `ListadoProductosFiltrados`.

---

### `AgregarProducto.jsx`

Contiene la vista utilizada para registrar nuevos productos.

Permite ingresar los datos correspondientes y enviarlos al backend.

Durante el Sprint 2 se eliminó el campo `tipo` del formulario, ya que la clasificación del producto pasó a realizarse mediante `Categoria`.

---

### `EditarProducto.jsx`

Permite modificar un producto existente.

Utiliza el identificador recibido mediante la ruta para obtener el producto correspondiente y cargar sus datos en el formulario.

---

### `DetalleProducto.jsx`

Muestra la información de un producto seleccionado.

El producto se obtiene utilizando el identificador incluido en la URL.

---

### `Administracion.jsx`

Es la página principal de las funcionalidades administrativas.

Centraliza el acceso a las diferentes herramientas disponibles para usuarios con permisos de administrador.

---

### `AdministracionCategorias.jsx`

Página destinada a la gestión de categorías.

Permite acceder a las funcionalidades relacionadas con la administración de categorías.

---

### `AgregarCategorias.jsx`

Página que contiene el formulario utilizado para crear nuevas categorías.

Renderiza el componente:

```text
FormularioCategoria.jsx
🧱 Componentes principales
ListadoProductos.jsx

Muestra el listado general de productos mediante tarjetas.

La información visual incluye principalmente:

Imagen.
Nombre.
Descripción.
Categoría.

Cuando un producto no posee categoría, se muestra:

Sin categoría
ListadoProductosFiltrados.jsx

Muestra los productos obtenidos después de aplicar un filtro por categoría.

Mantiene la misma estructura visual que el listado general.

CategoryFilter.jsx

Permite seleccionar las categorías utilizadas para filtrar productos.

Las categorías seleccionadas son comunicadas a Main.jsx, que coordina la consulta correspondiente mediante useProductoAPI.

FormularioCategoria.jsx

Contiene el formulario para crear categorías.

Campos principales:

Nombre
Descripción
Imagen

La imagen seleccionada se valida y posteriormente se muestra mediante una vista previa.

Validaciones principales:

Formatos: JPG, PNG, WEBP
Tamaño máximo: 5 MB
🔄 Relación entre páginas y componentes

La estructura principal de productos puede resumirse como:

Main.jsx
   │
   ├── CategoryFilter
   │
   ├── ListadoProductos
   │
   └── ListadoProductosFiltrados

La administración de categorías:

AdministracionCategorias.jsx
        │
        ▼
AgregarCategorias.jsx
        │
        ▼
FormularioCategoria.jsx

Esta separación permite mantener las páginas enfocadas en organizar las vistas y los componentes en funcionalidades reutilizables.  

## 🗃️ Modelo de Datos: Producto y Categoría

Durante el Sprint 2 se modificó el modelo utilizado para clasificar los productos.

Inicialmente, `Producto` utilizaba un atributo `tipo`. Con la incorporación de `Categoria`, se decidió eliminarlo y utilizar la categoría asociada como mecanismo principal de clasificación.

---

## 🏠 Producto

El producto contiene los datos principales de una propiedad:

```js
{
  id,
  nombre,
  descripcion,
  imagenes,
  categoria
}

La información se obtiene principalmente desde el backend mediante la API REST.

🏷️ Categoría

La categoría representa la clasificación de los productos.

Conceptualmente contiene:

{
  id,
  nombre,
  descripcion,
  imagen
}

Las categorías son gestionadas desde el panel administrativo.

🔗 Relación Producto → Categoría

Un producto puede tener una categoría asociada:

Producto
    │
    └── Categoria

Esta relación se utiliza para:

Clasificar productos.
Filtrar productos.
Mostrar la categoría en las tarjetas.
Gestionar la información desde el panel administrativo.

Un producto puede existir sin categoría.

En ese caso, la interfaz muestra:

Sin categoría
🧹 Eliminación de tipo

El modelo anterior utilizaba:

Producto
├── nombre
├── descripcion
├── tipo
└── imagenes

El modelo actual utiliza:

Producto
├── nombre
├── descripcion
├── imagenes
└── categoria

El cambio evita mantener dos mecanismos diferentes de clasificación.

También se eliminaron las referencias a tipo de los formularios y componentes que utilizaban ese atributo.

🖥️ Uso en la interfaz

La categoría asociada se muestra actualmente en las tarjetas de productos.

Conceptualmente:

Producto
   │
   ▼
ListadoProductos
   │
   ▼
producto.categoria
   │
   ▼
Nombre de categoría

Si no existe una asociación, se muestra Sin categoría.

🔍 Uso en el filtrado

Las categorías también funcionan como criterio de búsqueda.

El usuario selecciona categorías mediante CategoryFilter.jsx y el frontend solicita los productos correspondientes mediante useProductoAPI.

CategoryFilter
      ↓
Categorías seleccionadas
      ↓
useProductoAPI
      ↓
Backend
      ↓
Productos filtrados

De esta manera, la misma categoría se utiliza tanto para clasificar como para filtrar los productos.

## 📋 Historias de Usuario — Sprint 2

Durante el Sprint 2 se incorporaron funcionalidades relacionadas con usuarios, administración, productos y categorías.

| HU | Funcionalidad | Participación del Frontend |
|---|---|---|
| HU12 | Categorías de productos | Visualización y utilización de categorías |
| HU13 | Registro de usuarios | Formulario y envío de datos |
| HU14 | Inicio de sesión | Formulario y comunicación con la API |
| HU15 | Gestión de sesión | Estado del usuario y cierre de sesión |
| HU16 | Gestión de administradores | Acceso a funcionalidades administrativas |
| HU17 | Gestión de características | Interfaz para las operaciones correspondientes |
| HU18 | Visualización de características | Presentación de la información |
| HU20 | Filtrado por categoría | Selección y visualización de productos filtrados |
| HU21 | Administración de categorías | Panel y formulario de creación |

---

### HU12 — Categorías

El frontend incorpora las categorías como mecanismo de clasificación de productos.

La asociación de una categoría a un producto se realiza desde la gestión y edición del producto.

Las categorías se utilizan principalmente para:

- Clasificar productos.
- Filtrar productos.
- Mostrar la categoría asociada en las tarjetas.
- Administrar categorías desde el panel correspondiente.

Si un producto no posee una categoría asociada, se muestra `Sin categoría`.

---

### HU13 — Registro de usuarios

El frontend proporciona el formulario necesario para registrar usuarios y envía los datos al backend mediante la API REST.

---

### HU14 — Inicio de sesión

El usuario puede ingresar sus credenciales desde el formulario de autenticación.

El frontend envía la información al backend y utiliza la respuesta para continuar con el flujo correspondiente.

---

### HU15 — Gestión de sesión

El frontend mantiene el estado necesario para identificar al usuario autenticado y permite cerrar la sesión.

Al cerrar sesión se limpia la información correspondiente y se actualiza la interfaz.

---

### HU16 — Administración

El frontend incorpora las vistas y navegación necesarias para las funcionalidades administrativas.

El acceso a estas funcionalidades depende del rol del usuario.

La validación definitiva de permisos corresponde al backend.

---

### HU17 — Administrar características de producto

El frontend proporciona las vistas necesarias para administrar las características de los productos.

Estas funcionalidades incluyen:

- Visualizar las características registradas.
- Crear nuevas características.
- Editar características existentes.
- Eliminar características.
- Asociar una o más características a un producto.

---

### HU18 — Visualizar características del producto

El frontend muestra las características asociadas a un producto dentro de su detalle.

Cada característica puede incluir:

- Nombre.
- Icono asociado.

El bloque de características se adapta a diferentes tamaños de pantalla para mantener una correcta visualización en desktop, tablet y dispositivos móviles.

### HU20 — Filtrado por categoría

El filtrado utiliza `CategoryFilter.jsx`.

El usuario selecciona una o más categorías y la aplicación solicita los productos correspondientes mediante `useProductoAPI`.

```text
CategoryFilter
      ↓
Categorías seleccionadas
      ↓
useProductoAPI
      ↓
Backend
      ↓
Productos filtrados
      ↓
ListadoProductosFiltrados
HU21 — Administración de categorías

Se incorporó un flujo específico para la creación de categorías:

AdministracionCategorias
          ↓
AgregarCategorias
          ↓
FormularioCategoria
          ↓
API REST

El formulario permite ingresar:

Nombre.
Descripción.
Imagen.

La imagen se valida antes de ser procesada y se muestra una vista previa.

🧪 Verificación de las HUs

Las pruebas funcionales de estas historias de usuario se encuentran documentadas en:

tests.md

El archivo contiene los casos de prueba, pasos, resultados esperados y estado de cada verificación.

La HU19, al ser opcional, fue postergada y no forma parte del cierre del Sprint 2.

## ⚙️ Decisiones Técnicas y Mejoras — Sprint 2

Durante el Sprint 2 se realizaron cambios destinados a mejorar la integración con el backend, simplificar el modelo de productos y mejorar la experiencia de usuario.

---

## 🔌 Integración con la API

Los productos y categorías pasaron a gestionarse principalmente mediante la API REST.

Para evitar repetir peticiones y lógica HTTP en los componentes, se centralizaron las operaciones principales en:

```text
src/hooks/useProductoAPI.js

Esto permite mantener separadas la interfaz y la comunicación con el backend.

🏷️ Uso de categorías

Se decidió utilizar Categoria como mecanismo principal para clasificar los productos.

Como consecuencia, se eliminó el campo tipo de los formularios y componentes que lo utilizaban.

La categoría ahora se utiliza para:

Clasificar productos.
Filtrar productos.
Mostrar información en las tarjetas.
Gestionar productos desde las funcionalidades administrativas.
🖼️ Validación de imágenes

El formulario de categorías incorpora validaciones antes de procesar las imágenes.

Se permiten:

JPG
PNG
WEBP

con un tamaño máximo de:

5 MB

Las imágenes válidas generan una vista previa mediante FileReader.

🧩 Separación de responsabilidades

Se mantiene una separación entre:

Pages
   ↓
Components
   ↓
Hooks / Helpers
   ↓
API

Las páginas organizan las vistas, los componentes manejan elementos reutilizables y los hooks centralizan lógica compartida y comunicación con el backend.

🎨 Mejoras visuales

Durante el Sprint 2 se realizaron mejoras en diferentes elementos de la interfaz:

Formularios.
Tarjetas de productos.
Filtros.
Botones.
Formularios de categorías.
Vista previa de imágenes.
Diseño responsive.

Se buscó mantener una apariencia consistente entre las diferentes secciones de la aplicación.

📱 Responsive

Los estilos incluyen reglas específicas para pantallas pequeñas.

Entre los principales ajustes se encuentran:

Formularios adaptados al ancho disponible.
Botones adaptados a dispositivos móviles.
Espaciado reducido cuando es necesario.
Conservación de la legibilidad de los elementos principales.
🛡️ Validaciones en Frontend

El frontend realiza validaciones iniciales para proporcionar una respuesta rápida al usuario.

Estas validaciones no reemplazan las reglas de negocio del backend.

El backend continúa siendo responsable de validar y procesar definitivamente la información recibida.

📌 Principales decisiones

Las decisiones más importantes del Sprint 2 fueron:

Utilizar la API REST como fuente principal de productos y categorías.
Centralizar la comunicación mediante useProductoAPI.
Utilizar categorías como clasificación de productos.
Eliminar el atributo tipo.
Mostrar Sin categoría cuando un producto no posee asociación.
Incorporar filtrado por categorías.
Incorporar administración de categorías.
Validar imágenes antes de procesarlas.
Mantener separación entre páginas, componentes y lógica reutilizable.
Mejorar la interfaz y su adaptación a dispositivos móviles.

## 🧪 QA y Testing

Las pruebas funcionales del frontend se encuentran documentadas en:

```text
tests.md

Este archivo contiene los casos de prueba correspondientes a las Historias de Usuario y registra los pasos, resultados esperados y estado de cada prueba.

✅ Cobertura del Sprint 2

Las funcionalidades verificadas durante el Sprint 2 corresponden principalmente a:

HU	Funcionalidad	Estado
HU12	Categorías de productos	✅ OK
HU13	Registro de usuarios	✅ OK
HU14	Inicio de sesión	✅ OK
HU15	Gestión de sesión	✅ OK
HU16	Administración y roles	✅ OK
HU17	Gestión de características	✅ OK
HU18	Visualización de características	✅ OK
HU20	Filtrado por categoría	✅ OK
HU21	Administración de categorías	✅ OK

La HU19 es opcional y fue postergada para una etapa posterior.

🔍 Verificaciones principales

Durante las pruebas se verificó el funcionamiento de:

Comunicación entre frontend y backend.
Registro y edición de productos.
Eliminación de productos.
Registro e inicio de sesión de usuarios.
Acceso a funcionalidades administrativas.
Creación y gestión de categorías.
Asociación de categorías a productos.
Filtrado por categoría.
Visualización de categorías en las tarjetas.
Mensajes y estados de las operaciones.
Validación de imágenes.
Vista previa de imágenes.
Adaptación responsive.
🐞 Correcciones realizadas

Durante el desarrollo se realizaron correcciones y ajustes derivados de las pruebas funcionales.

Entre los cambios más importantes se encuentran:

Corrección de la visualización de categorías.
Eliminación de referencias al antiguo atributo tipo.
Ajustes en formularios.
Correcciones en la comunicación con la API.
Ajustes en filtros y listados.
Mejoras en mensajes y estados de la interfaz.
Correcciones visuales y responsive.

Después de estos ajustes, las funcionalidades previstas para el Sprint 2 fueron verificadas nuevamente.

📋 Relación con tests.md

La documentación técnica explica cómo está construido el frontend, mientras que tests.md concentra el detalle de las pruebas.

DOCUMENTACION_FRONTEND.md
        │
        └── Cómo funciona el sistema

tests.md
        │
        └── Cómo se verificó su funcionamiento

Esta separación permite mantener la documentación técnica y la documentación de QA organizadas de forma independiente.
