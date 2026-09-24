**\# 📚 Documentación Backend - Proyecto Reservas Carrizo**

**\## 📌 Resumen**

El backend de **\*\*Reservas Carrizo\*\*** es una aplicación
desarrollada con **\*\*Java y Spring Boot\*\***, responsable de
gestionar la lógica de negocio, persistencia de datos, usuarios,
productos, categorías y comunicación con el frontend mediante una API
REST.

Durante el **\*\*Sprint 1\*\***, el backend comenzó a incorporar la
estructura necesaria para centralizar la persistencia de productos y
usuarios mediante una base de datos H2.

Durante el **\*\*Sprint 2\*\***, el backend evolucionó incorporando
nuevas funcionalidades relacionadas con:

\- Categorías.

\- Asociación entre productos y categorías.

\- Filtrado de productos por categoría.

\- Gestión de usuarios.

\- Roles de usuario.

\- Funcionalidades administrativas.

\- Integración con el frontend mediante API REST.

\- Mejoras en la organización de las entidades y DTOs.

Actualmente el backend funciona como la fuente principal de persistencia
de la aplicación.

La arquitectura está organizada en diferentes capas para separar las
responsabilidades:

\`\`\`text

Controller

    │

    ▼

Service

    │

    ▼

Repository

    │

    ▼

Entity

    │

    ▼

Base de datos H2

Los datos enviados al frontend son gestionados mediante DTOs para evitar
exponer directamente las entidades de persistencia.

🏗️ Arquitectura General

El backend utiliza una arquitectura por capas basada en Spring Boot.

Cada capa tiene una responsabilidad específica y se comunica con la
siguiente mediante dependencias controladas.

Flujo general

┌──────────────────────────────┐

│          Frontend            │

│       React / Vite           │

└──────────────┬───────────────┘

               │

               │ HTTP / REST

               ▼

┌──────────────────────────────┐

│         Controllers          │

│                              │

│     Endpoints REST API       │

└──────────────┬───────────────┘

               │

               ▼

┌──────────────────────────────┐

│           Services           │

│                              │

│      Lógica de negocio       │

└──────────────┬───────────────┘

               │

               ▼

┌──────────────────────────────┐

│         Repositories         │

│                              │

│       Acceso a datos         │

└──────────────┬───────────────┘

               │

               ▼

┌──────────────────────────────┐

│       Entities / Models      │

│                              │

│       Producto, Usuario,     │

│       Categoria, etc.        │

└──────────────┬───────────────┘

               │

               ▼

┌──────────────────────────────┐

│          Base H2             │

└──────────────────────────────┘

🧱 Responsabilidades de las capas

Controllers

Los Controllers reciben las peticiones HTTP realizadas por el frontend y
exponen los endpoints de la API REST.

Sus responsabilidades principales son:

Recibir solicitudes HTTP.

Obtener parámetros de las peticiones.

Recibir DTOs.

Invocar los Services correspondientes.

Convertir entidades a DTOs cuando corresponde.

Construir las respuestas HTTP.

Informar códigos de estado adecuados.

Los Controllers no deberían concentrar la lógica principal del negocio.

Services

Los Services contienen la lógica de negocio de la aplicación.

Sus responsabilidades incluyen:

Validar operaciones.

Coordinar el acceso a los Repositories.

Aplicar reglas de negocio.

Consultar y modificar entidades.

Gestionar operaciones relacionadas con productos, usuarios y categorías.

Esta capa permite mantener la lógica de negocio separada de los
endpoints HTTP.

Repositories

Los Repositories son responsables del acceso a la base de datos.

Se implementan utilizando Spring Data JPA y permiten realizar
operaciones como:

Crear registros.

Buscar registros.

Actualizar registros.

Eliminar registros.

Consultar información mediante métodos personalizados.

La mayor parte de las operaciones CRUD son proporcionadas
automáticamente por JpaRepository.

Entities / Models

Las entidades representan los objetos persistidos en la base de datos.

Entre las entidades principales del proyecto se encuentran:

Producto

Usuario

Categoria

Estas clases utilizan anotaciones JPA para definir cómo se representan
en la base de datos H2.

Las entidades contienen los atributos y relaciones necesarios para
representar el modelo de datos de la aplicación.

DTOs

Los DTOs (Data Transfer Objects) se utilizan para transferir información
entre el backend y el frontend.

Su utilización permite separar:

Entidad JPA

    │

    ▼

DTO

    │

    ▼

Frontend

De esta manera, el backend no necesita exponer directamente las
entidades utilizadas para la persistencia.

🔄 Flujo completo de una petición

Una operación típica del sistema sigue el siguiente flujo:

Frontend

   │

   │ HTTP Request

   ▼

Controller

   │

   ▼

Service

   │

   ▼

Repository

   │

   ▼

Base de datos H2

   │

   ▼

Repository

   │

   ▼

Service

   │

   ▼

Controller

   │

   ▼

DTO

   │

   ▼

Frontend

Este flujo permite mantener separadas las responsabilidades de cada
capa.

🛠️ Stack Tecnológico

Backend

Tecnología  Uso

Java 17  Lenguaje de programación

Spring Boot Framework principal del backend

Spring Data JPA   Persistencia y acceso a datos

Spring Security   Seguridad y gestión de usuarios/roles

H2 Database Base de datos utilizada durante el desarrollo

Maven Gestión de dependencias y compilación

Comunicación

El backend expone una API REST consumida por el frontend.

Durante el desarrollo local:

Frontend → http://localhost:5173

Backend  → http://localhost:8080

La comunicación se realiza mediante solicitudes HTTP utilizando métodos
como:

GET

POST

PUT

DELETE

según la operación requerida.

🗄️ Base de datos

Durante el desarrollo se utiliza H2 Database como sistema de
persistencia.

H2 permite disponer de una base de datos liviana y adecuada para las
etapas de desarrollo y testing del proyecto.

La aplicación utiliza JPA/Hibernate para realizar el mapeo entre las
entidades Java y las tablas de la base de datos.

Conceptualmente:

Clase Java

    │

    ▼

Entidad JPA

    │

    ▼

Hibernate

    │

    ▼

Tabla H2

La consola de H2 permite inspeccionar los datos almacenados durante el
desarrollo.

🔄 Evolución entre Sprint 1 y Sprint 2

Sprint 1

Durante el primer sprint se construyó la estructura inicial del backend.

Se incorporaron principalmente:

Entidad Producto.

Entidad Usuario.

Repositories.

Services.

DTO de producto.

Controllers.

Persistencia mediante H2.

Registro y consulta de productos.

Operaciones relacionadas con usuarios.

Primeras medidas de seguridad para contraseñas.

Sprint 2

Durante el segundo sprint se amplió el backend para soportar nuevas
funcionalidades.

Los principales cambios fueron:

Incorporación de Categoria.

Relación entre productos y categorías.

Endpoints relacionados con categorías.

Filtrado de productos por categoría.

Gestión de usuarios y roles.

Funcionalidades administrativas.

Mejoras en DTOs y comunicación con el frontend.

Integración con las nuevas funcionalidades del frontend.

También se realizó una revisión del modelo de producto.

Inicialmente Producto utilizaba un atributo:

tipo

para representar la clasificación del producto.

Con la incorporación de Categoria, se decidió eliminar tipo y utilizar
la categoría como mecanismo principal de clasificación.

El modelo conceptual actual es:

Producto

├── id

├── nombre

├── descripcion

├── imagenes

└── categoria

De esta manera se evita mantener dos mecanismos diferentes para
representar la clasificación de los productos.

📌 Estado actual

Al finalizar el Sprint 2, el backend funciona como la capa central de
persistencia y lógica de negocio de la aplicación.

Actualmente es responsable de:

Gestionar productos.

Gestionar categorías.

Gestionar usuarios.

Gestionar roles.

Aplicar reglas de negocio.

Persistir información en H2.

Exponer endpoints REST.

Proporcionar datos al frontend.

Gestionar relaciones entre entidades.

Aplicar las configuraciones de seguridad correspondientes.

Las funcionalidades implementadas durante el Sprint 2 fueron verificadas
mediante las pruebas documentadas en:

testsS1.md / testsS2.md / testsS3.md

Las funcionalidades opcionales que no forman parte del cierre del sprint
se mantienen como tareas futuras

\
\## 🚀 Funcionalidades del Sprint 3

Durante el Sprint 3, el backend se amplió para soportar nuevas
funcionalidades orientadas a la experiencia de reserva y a la
interacción de los usuarios con los productos.

Las principales funcionalidades incorporadas fueron:

-   Búsqueda de productos por nombre.
-   Consulta de disponibilidad de alojamientos.
-   Gestión de productos favoritos.
-   Listado de productos favoritos por usuario.
-   Sistema de valoraciones y reseñas.
-   Cálculo dinámico del promedio de valoraciones.
-   Políticas informativas asociadas a los productos.
-   Compartición de productos desde el frontend.
-   Eliminación de categorías manteniendo los productos asociados.

Estas funcionalidades mantienen la arquitectura existente y se integran
mediante:

``` text
Controller
    ↓
Service
    ↓
Repository
    ↓
Base de datos H2
```

### 🔎 HU22 --- Realizar búsqueda

El backend incorpora una operación de búsqueda de productos mediante
texto.

El endpoint utilizado es:

``` text
GET /api/producto/buscar?texto={texto}
```

La búsqueda se realiza sobre el nombre del producto utilizando una
consulta que permite coincidencias sin distinguir mayúsculas y
minúsculas.

El flujo es:

``` text
Frontend
   ↓
GET /api/producto/buscar
   ↓
ProductoController
   ↓
ProductoService
   ↓
ProductoRepository
   ↓
Base de datos
   ↓
Productos encontrados
   ↓
ProductoDTO
   ↓
Frontend
```

La lógica de búsqueda se mantiene en el backend, mientras que el
frontend se encarga de presentar los resultados y las sugerencias de
búsqueda.

### 📅 HU23 --- Visualizar disponibilidad

El backend proporciona la información necesaria para consultar las
reservas existentes de un producto y determinar las fechas ocupadas.

El frontend utiliza esta información para construir el calendario de
disponibilidad y evitar seleccionar rangos que contengan fechas
ocupadas.

El flujo general es:

``` text
Frontend
   ↓
Consulta de disponibilidad
   ↓
ReservaController
   ↓
ReservaService
   ↓
ReservaRepository
   ↓
Base de datos
   ↓
Reservas del producto
   ↓
Frontend
```

Durante el Sprint 3 también se incorporaron consultas en
`ReservaRepository` para trabajar con las reservas asociadas a un
producto y determinar si una reserva finalizó.

Estas operaciones sirven además como parte de las reglas necesarias para
las valoraciones.

### ❤️ HU24 --- Marcar como favorito

El backend incorpora la gestión de productos favoritos por usuario.

La relación se implementa mediante una relación `ManyToMany` entre
`Usuario` y `Producto`.

Conceptualmente:

``` text
Usuario
   │
   └── favoritos
          │
          ├── Producto
          ├── Producto
          └── Producto
```

La relación utiliza una tabla intermedia:

``` text
usuario_favorito
```

Endpoints principales:

  -------------------------------------------------------------------------------
  Método                  Endpoint                        Función
  ----------------------- ------------------------------- -----------------------
  `POST`                  `/api/favoritos/{productoId}`   Agregar producto a
                                                          favoritos

  `DELETE`                `/api/favoritos/{productoId}`   Eliminar producto de
                                                          favoritos

  `GET`                   `/api/favoritos`                Obtener favoritos del
                                                          usuario autenticado
  -------------------------------------------------------------------------------

El usuario se identifica mediante el contexto de autenticación del
backend.

El `FavoritoService` se encarga de:

-   Obtener el usuario.
-   Buscar el producto.
-   Agregarlo a favoritos.
-   Evitar duplicados.
-   Eliminar favoritos.
-   Obtener la lista de favoritos.

### ⭐ HU25 --- Listar productos favoritos

El endpoint:

``` text
GET /api/favoritos
```

devuelve los productos favoritos del usuario autenticado.

La respuesta utiliza `ProductoDTO`, evitando exponer directamente las
entidades JPA.

El flujo es:

``` text
Usuario autenticado
        ↓
FavoritoController
        ↓
FavoritoService
        ↓
UsuarioRepository / ProductoRepository
        ↓
Productos favoritos
        ↓
ProductoDTO
        ↓
Frontend
```

El backend devuelve únicamente los favoritos correspondientes al usuario
autenticado.

### 📋 HU26 --- Políticas de producto

Las políticas mostradas en el detalle del producto corresponden a
información presentada por el frontend.

No se incorporó una nueva entidad o endpoint específico de políticas en
el backend durante este Sprint 3.

Por lo tanto, esta funcionalidad se mantiene principalmente como una
responsabilidad de presentación del frontend.

### 🔗 HU27 --- Compartir productos

La funcionalidad de compartir productos se implementó principalmente en
el frontend.

El backend continúa proporcionando la información del producto mediante
sus endpoints existentes.

No fue necesario incorporar un endpoint específico para compartir
productos.

El flujo utiliza la URL del producto generada por el frontend y
servicios externos de compartición cuando corresponde.

### ⭐ HU28 --- Valorar productos

El Sprint 3 incorpora un sistema completo de valoraciones asociado a los
productos.

Se agregó la entidad:

``` text
Valoracion
```

Cada valoración relaciona:

``` text
Usuario
   │
   └── Valoracion ─── Producto
```

La valoración contiene información como:

-   Usuario.
-   Producto.
-   Puntuación.
-   Comentario.
-   Fecha.

La puntuación se encuentra limitada al rango de 1 a 5.

Además, se controla que un usuario no pueda valorar dos veces el mismo
producto.

#### Requisito de reserva finalizada

Para crear una valoración, el backend verifica que el usuario haya
realizado una reserva del producto y que dicha reserva haya finalizado.

Esta regla se procesa en la capa de Service y utiliza las consultas
disponibles en `ReservaRepository`.

#### Endpoints de valoraciones

  --------------------------------------------------------------------------------------------
  Método                  Endpoint                                     Función
  ----------------------- -------------------------------------------- -----------------------
  `GET`                   `/api/valoraciones/producto/{productoId}`    Obtener valoraciones de
                                                                       un producto

  `GET`                   `/api/valoraciones/ya-valoro/{productoId}`   Comprobar si el usuario
                                                                       ya valoró

  `POST`                  `/api/valoraciones`                          Crear una valoración
  --------------------------------------------------------------------------------------------

Las operaciones de creación reciben un DTO validado mediante `@Valid`.

#### Promedio de valoraciones

El backend calcula dinámicamente:

``` text
puntuacionPromedio
cantidadValoraciones
```

Estos datos se incorporaron a `ProductoDTO`.

De esta manera, tanto el detalle del producto como los listados pueden
mostrar:

``` text
Promedio de estrellas
Cantidad total de valoraciones
```

El cálculo se actualiza cuando se incorporan nuevas valoraciones.

### 🗑️ HU29 --- Eliminar categoría

Durante el Sprint 3 se modificó la eliminación de categorías para evitar
eliminar los productos asociados.

La relación entre `Categoria` y `Producto` permite que un producto pueda
quedar sin categoría.

El flujo de eliminación es:

``` text
Administrador
      ↓
CategoriaController
      ↓
CategoriaService
      ↓
Buscar categoría
      ↓
Obtener productos asociados
      ↓
categoria = null
      ↓
Guardar productos
      ↓
Eliminar categoría
```

La operación se ejecuta dentro de una transacción mediante
`@Transactional`.

De esta manera:

-   La categoría seleccionada se elimina.
-   Los productos asociados permanecen en la base de datos.
-   Los productos quedan con `categoria = null`.
-   El frontend puede mostrar esos productos como `Sin categoría`.

Este comportamiento evita la eliminación accidental de productos cuando
se elimina una categoría.

------------------------------------------------------------------------

## 🧩 Nuevos elementos técnicos del Sprint 3

### `Valoracion.java`

La nueva entidad representa las reseñas realizadas por los usuarios.

Se incorporaron restricciones para:

-   Limitar la puntuación entre 1 y 5.
-   Asociar una valoración a un usuario.
-   Asociar una valoración a un producto.
-   Registrar la fecha.
-   Evitar valoraciones duplicadas para la misma combinación
    usuario/producto.

### `ValoracionRepository.java`

Permite consultar las valoraciones relacionadas con un producto y
realizar comprobaciones necesarias para las reglas de negocio.

Entre las operaciones utilizadas se encuentran consultas para:

-   Obtener valoraciones de un producto.
-   Comprobar si un usuario ya valoró.
-   Contar valoraciones.
-   Trabajar con el promedio de puntuación.

### `ValoracionService.java`

Centraliza la lógica de negocio relacionada con las valoraciones.

Entre sus responsabilidades se encuentran:

-   Crear valoraciones.
-   Validar que el usuario pueda valorar.
-   Comprobar que exista una reserva finalizada.
-   Evitar valoraciones duplicadas.
-   Obtener las valoraciones de un producto.
-   Determinar el promedio y cantidad de valoraciones.

### `FavoritoService.java`

Centraliza la lógica relacionada con favoritos.

Permite:

-   Agregar favoritos.
-   Eliminar favoritos.
-   Obtener favoritos.
-   Evitar duplicados.
-   Identificar al usuario mediante su email autenticado.

### `FavoritoController.java`

Expone los endpoints REST utilizados para administrar los favoritos del
usuario autenticado.

Las operaciones de favoritos requieren autenticación.

### `ReservaRepository.java`

Durante el Sprint 3 se incorporaron consultas utilizadas para:

-   Obtener reservas por producto.
-   Comprobar si un usuario tiene una reserva finalizada de un producto.

Estas consultas son utilizadas principalmente por la lógica de
disponibilidad y por la validación de permisos para valorar productos.

------------------------------------------------------------------------

## 🔐 Seguridad y autenticación en Sprint 3

Durante el Sprint 3 se mantuvo la infraestructura de seguridad
incorporada previamente y se aplicó a las nuevas funcionalidades
privadas.

Los endpoints de favoritos requieren que exista un usuario autenticado.

La identidad del usuario se obtiene mediante:

``` java
Authentication authentication
```

y:

``` java
authentication.getName()
```

Esto permite que el backend trabaje con el usuario autenticado sin
recibir el email como un dato confiable enviado libremente por el
frontend.

Las operaciones administrativas y las operaciones privadas continúan
protegidas mediante Spring Security.

------------------------------------------------------------------------

## 🧪 Validaciones del Sprint 3

Además de las validaciones existentes, durante el Sprint 3 se
incorporaron reglas específicas de negocio.

### Favoritos

Se verifica:

-   Existencia del usuario.
-   Existencia del producto.
-   Evitar agregar el mismo producto dos veces.
-   Usuario autenticado para acceder a la funcionalidad.

### Valoraciones

Se verifica:

-   Usuario autenticado.
-   Existencia de una reserva finalizada.
-   Puntuación entre 1 y 5.
-   Evitar una segunda valoración del mismo producto.

### Eliminación de categorías

Se verifica:

-   Existencia de la categoría.
-   Desasociación de los productos antes de eliminarla.
-   Ejecución transaccional de la operación.

------------------------------------------------------------------------

## 📋 Historias de Usuario --- Sprint 3

  -----------------------------------------------------------------------
  HU                      Funcionalidad           Participación del
                                                  Backend
  ----------------------- ----------------------- -----------------------
  HU22                    Realizar búsqueda       Endpoint de búsqueda y
                                                  consulta por nombre

  HU23                    Visualizar              Consulta de reservas y
                          disponibilidad          disponibilidad

  HU24                    Marcar como favorito    Relación
                                                  usuario-producto y
                                                  endpoints de favoritos

  HU25                    Listar productos        Consulta de favoritos
                          favoritos               del usuario autenticado

  HU26                    Políticas de producto   Sin cambios específicos
                                                  en backend

  HU27                    Compartir productos     Sin endpoint
                                                  específico; utiliza
                                                  información existente

  HU28                    Valorar productos       Entidad, DTO,
                                                  repository, service,
                                                  controller y reglas de
                                                  negocio

  HU29                    Eliminar categoría      Desasociación de
                                                  productos y eliminación
                                                  transaccional
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## ⚙️ Decisiones Técnicas del Sprint 3

Las principales decisiones tomadas durante el Sprint 3 fueron:

-   Mantener la arquitectura por capas existente.
-   Mantener la lógica de negocio dentro de los Services.
-   Utilizar Repositories para el acceso a datos.
-   Incorporar una relación `ManyToMany` para favoritos.
-   Identificar al usuario autenticado mediante `Authentication`.
-   Utilizar DTOs para las respuestas de la API.
-   Incorporar validaciones de negocio para las valoraciones.
-   Utilizar `@Valid` en la creación de valoraciones.
-   Impedir valoraciones duplicadas.
-   Exigir una reserva finalizada para poder valorar.
-   Incorporar promedio y cantidad de valoraciones a `ProductoDTO`.
-   Utilizar transacciones para la eliminación de categorías.
-   Mantener los productos existentes cuando se elimina una categoría.
-   Permitir productos sin categoría.
-   Mantener separadas las responsabilidades del backend y frontend.

------------------------------------------------------------------------

## 📊 Estado Final del Backend --- Sprint 3

Al finalizar el Sprint 3, el backend cuenta con:

-   Arquitectura por capas.
-   API REST.
-   Persistencia mediante H2.
-   Gestión de productos.
-   Gestión de categorías.
-   Gestión de usuarios.
-   Roles y funcionalidades administrativas.
-   Autenticación y autorización mediante Spring Security.
-   DTOs.
-   Validaciones.
-   Manejo global de excepciones.
-   Configuración CORS.
-   Búsqueda de productos.
-   Consulta de disponibilidad.
-   Favoritos por usuario.
-   Listado de favoritos.
-   Sistema de valoraciones.
-   Reseñas con puntuación y comentario.
-   Promedio y cantidad de valoraciones.
-   Control de reserva finalizada para valorar.
-   Eliminación de categorías sin eliminar productos asociados.
-   Integración con las nuevas funcionalidades del frontend.

------------------------------------------------------------------------

## 🧪 QA y Testing --- Sprint 3

Las pruebas del Sprint 3 se documentan en:

``` text
testsS3.md
```

El archivo de pruebas registra las verificaciones realizadas sobre las
Historias de Usuario del Sprint 3.

Las principales áreas verificadas fueron:

-   Búsqueda de productos.
-   Autocompletado y búsqueda.
-   Disponibilidad de fechas.
-   Fechas ocupadas.
-   Agregado y eliminación de favoritos.
-   Listado de favoritos.
-   Valoraciones.
-   Restricción de valoración sin reserva finalizada.
-   Restricción de valoración duplicada.
-   Promedio de valoraciones.
-   Eliminación de categorías.
-   Conservación de productos asociados.
-   Desasociación de categoría.
-   Integración entre frontend y backend.

------------------------------------------------------------------------

## 🏁 Cierre del Sprint 3

El Sprint 3 amplió el backend para cubrir funcionalidades relacionadas
con la interacción de los usuarios con los alojamientos.

La arquitectura mantiene el flujo:

``` text
Controller
    ↓
Service
    ↓
Repository
    ↓
Entity
    ↓
Database
```

Las nuevas funcionalidades se incorporaron sin modificar la separación
de responsabilidades existente.

El backend ahora permite gestionar:

``` text
Productos
   │
   ├── Búsqueda
   ├── Disponibilidad
   ├── Favoritos
   └── Valoraciones

Categorías
   │
   └── Eliminación sin eliminar productos

Usuarios
   │
   ├── Autenticación
   ├── Roles
   └── Favoritos / Valoraciones

Reservas
   │
   ├── Disponibilidad
   └── Validación de reserva finalizada
```

Con estas incorporaciones, el backend queda integrado con las
funcionalidades principales desarrolladas durante el Sprint 3 y
preparado para continuar con las siguientes etapas del proyecto.

## 🗂️ Estructura del Backend

El backend está organizado mediante una arquitectura por capas, donde
cada paquete tiene una responsabilidad específica.

\`\`\`text

backend/

└── src/

    └── main/

        └── java/

            └── ...

                ├── controller/

                ├── service/

                ├── repository/

                ├── model/

                ├── dto/

                ├── config/

                └── exception/

controller/

Contiene los Controllers REST encargados de recibir las solicitudes HTTP
y devolver las respuestas al frontend.

Principales responsabilidades:

Exponer endpoints REST.

Recibir parámetros y DTOs.

Invocar los Services.

Construir las respuestas HTTP.

service/

Contiene la lógica de negocio.

Se encarga de:

Validar operaciones.

Coordinar los Repositories.

Aplicar reglas de negocio.

Gestionar productos, usuarios y categorías.

repository/

Contiene las interfaces de acceso a datos mediante Spring Data JPA.

Permite realizar operaciones CRUD y consultas personalizadas sobre las
entidades.

model/

Contiene las entidades JPA utilizadas para representar la información
persistida en la base de datos.

Las principales entidades del proyecto son:

Producto

Usuario

Categoria

dto/

Contiene los objetos utilizados para transferir información entre el
backend y el frontend.

Los DTOs permiten separar los datos expuestos por la API de las
entidades utilizadas para la persistencia.

config/

Contiene las configuraciones generales del backend, incluyendo las
relacionadas con seguridad y funcionamiento de la aplicación.

exception/

Contiene las clases relacionadas con el manejo de excepciones y errores
de la aplicación.

Permite centralizar el tratamiento de determinados errores producidos
durante las operaciones del backend.

🔄 Flujo entre capas

Una operación típica sigue este recorrido:

Controller

    ↓

Service

    ↓

Repository

    ↓

Database

La respuesta realiza el recorrido inverso hasta llegar nuevamente al
frontend.

Esta organización permite mantener separadas la API, la lógica de
negocio y el acceso a datos.

\## 🗃️ Entidades y Relaciones JPA

Las entidades representan los datos persistidos en la base H2 y utilizan
anotaciones de \*\*JPA/Hibernate\*\* para definir su correspondencia con
las tablas.

---

\### \`Producto.java\`

Representa los productos registrados en la aplicación.

Campos principales:

\- \`id\`: identificador único.

\- \`nombre\`: nombre del producto.

\- \`descripcion\`: descripción.

\- \`imagenes\`: lista de imágenes asociadas.

\- \`categoria\`: categoría asociada al producto.

La lista de imágenes se persiste mediante \`@ElementCollection\`.

El campo \`nombre\` mantiene la restricción correspondiente para evitar
productos duplicados.

\### Cambio realizado en Sprint 2

El atributo \`tipo\` fue eliminado de \`Producto\`.

Anteriormente:

\`\`\`text

Producto

├── nombre

├── descripcion

├── tipo

└── imagenes

Actualmente:

Producto

├── nombre

├── descripcion

├── imagenes

└── categoria

La categoría pasa a ser el mecanismo utilizado para clasificar los
productos.

Categoria.java

Representa las categorías utilizadas para clasificar los productos.

Sus datos principales son:

id

nombre

descripcion

imagen

Las categorías se almacenan en la base de datos y pueden ser gestionadas
desde las funcionalidades administrativas.

Relación Producto → Categoria

La relación permite asociar un producto con una categoría.

Conceptualmente:

Producto ──────► Categoria

Esta relación es utilizada para:

Clasificar productos.

Filtrar productos.

Mostrar la categoría asociada en el frontend.

Un producto puede existir sin categoría asignada. En ese caso, el
frontend muestra:

Sin categoría

Usuario.java

Representa a los usuarios registrados en el sistema.

Sus principales datos son:

id

nombre

email

contraseña

información relacionada con el rol/permisos.

La contraseña se almacena utilizando BCrypt, evitando guardar la
contraseña original directamente.

🔗 Resumen de relaciones

Usuario

   │

   └── Rol / permisos

Producto

   │

   ├── Imagenes

   │

   └── Categoria

Estas entidades forman parte de la estructura principal utilizada por el
backend durante el Sprint 2

\## 🗄️ Repositories

Los Repositories utilizan \*\*Spring Data JPA\*\* para acceder a la base
de datos.

Cada Repository se encuentra asociado a una entidad y hereda de
\`JpaRepository\`, obteniendo automáticamente las operaciones CRUD
principales.

---

\### \`ProductoRepository.java\`

Gestiona el acceso a los datos de \`Producto\`.

Además de las operaciones CRUD, dispone de consultas utilizadas para:

\- Buscar productos por nombre.

\- Verificar si existe un producto con determinado nombre.

\- Realizar las consultas necesarias para los listados y filtros.

---

\### \`UsuarioRepository.java\`

Gestiona el acceso a los datos de \`Usuario\`.

Dispone de una búsqueda por email:

\`\`\`text

findByEmail()

Esta operación se utiliza principalmente durante la autenticación y
validación de usuarios.

CategoriaRepository.java

Gestiona el acceso a los datos de Categoria.

Permite realizar las operaciones CRUD necesarias para:

Crear categorías.

Obtener categorías.

Buscar categorías.

Actualizar categorías.

Eliminar categorías.

También permite realizar las consultas necesarias para trabajar con las
categorías asociadas a los productos.

🔄 Funcionamiento

Los Controllers no acceden directamente a los Repositories.

El acceso se realiza mediante los Services:

Controller

    ↓

Service

    ↓

Repository

    ↓

H2

De esta manera, la lógica de negocio permanece separada del acceso
directo a la base de datos

\## ⚙️ Services

Los Services contienen la lógica de negocio del backend y funcionan como
intermediarios entre los Controllers y los Repositories.

---

\### \`ProductoService.java\`

Gestiona las operaciones relacionadas con los productos.

Entre sus principales funciones se encuentran:

\- Registrar productos.

\- Validar nombres duplicados.

\- Obtener productos por ID.

\- Obtener todos los productos.

\- Obtener productos paginados.

\- Obtener productos aleatorios.

\- Eliminar productos.

\- Gestionar las operaciones relacionadas con categorías.

La validación de productos duplicados se realiza antes de persistir la
información.

---

\### \`UsuarioService.java\`

Gestiona las operaciones relacionadas con los usuarios.

Sus principales funciones son:

\- Crear usuarios.

\- Buscar usuarios por email.

\- Validar credenciales.

\- Gestionar el almacenamiento seguro de contraseñas.

Las contraseñas se procesan mediante \`BCryptPasswordEncoder\`.

Durante la autenticación se utiliza:

\`\`\`text

passwordEncoder.matches()

para comparar la contraseña ingresada con el hash almacenado.

CategoriaService.java

Gestiona la lógica relacionada con las categorías.

Sus principales operaciones permiten:

Crear categorías.

Obtener categorías.

Buscar categorías.

Actualizar categorías.

Eliminar categorías.

Gestionar las operaciones necesarias para asociar categorías a
productos.

La lógica relacionada con categorías se mantiene separada de la lógica
específica de productos.

🔄 Flujo de los Services

Las operaciones siguen el esquema:

Controller

    ↓

Service

    ↓

Repository

    ↓

Base de datos

El Service valida y procesa la operación antes de solicitar al
Repository la modificación o consulta de los datos.

Esto permite mantener la lógica de negocio separada de los endpoints
REST y del acceso directo a la base de datos.

\## 📦 DTOs

Los DTOs (\`Data Transfer Objects\`) se utilizan para transportar
información entre el backend y el frontend.

Permiten separar los datos expuestos por la API de las entidades JPA
utilizadas para la persistencia.

---

\### \`ProductoDTO.java\`

Representa la información de un producto que se intercambia mediante la
API.

Incluye los datos principales del producto y la información relacionada
con su categoría.

Conceptualmente:

\`\`\`text

ProductoDTO

├── id

├── nombre

├── descripcion

├── imagenes

└── categoria

El DTO ya no utiliza el atributo tipo, debido al cambio realizado
durante el Sprint 2.

UsuarioDTO.java

Se utiliza para transferir la información necesaria de los usuarios
entre el backend y el frontend.

Permite evitar exponer directamente la entidad Usuario y sus datos de
persistencia.

La contraseña no debe exponerse en las respuestas destinadas al
frontend.

DTOs de categorías

Los DTOs relacionados con categorías permiten transportar la información
necesaria para:

Crear categorías.

Consultar categorías.

Asociar categorías a productos.

Mostrar información de categorías en el frontend.

La información de categoría puede incluir:

id

nombre

descripcion

imagen

🔄 Conversión Entity → DTO

Los Controllers realizan la conversión entre las entidades y los DTOs
antes de enviar información al frontend.

Flujo:

Entity

   ↓

DTO

   ↓

Response HTTP

   ↓

Frontend

De esta manera, la API mantiene separado el modelo de persistencia del
modelo utilizado para la comunicación con el frontend.

\## 🌐 Controllers y API REST

Los Controllers exponen los endpoints REST utilizados por el frontend.

Su función principal es recibir las solicitudes HTTP, delegar la
operación al Service correspondiente y devolver la respuesta.

---

\### \`ProductoController.java\`

Gestiona los endpoints relacionados con productos.

\| Método \| Endpoint \| Función \|

\|---\|---\|---\|

\| \`POST\` \| \`/api/producto\` \| Crear producto \|

\| \`GET\` \| \`/api/producto/aleatorios\` \| Obtener productos
aleatorios \|

\| \`GET\` \| \`/api/producto/{id}\` \| Obtener producto por ID \|

\| \`GET\` \| \`/api/producto/paginados\` \| Obtener productos paginados
\|

\| \`GET\` \| \`/api/producto/admin\` \| Obtener productos para
administración \|

\| \`DELETE\` \| \`/api/producto\` \| Eliminar todos los productos \|

\| \`DELETE\` \| \`/api/producto/{id}\` \| Eliminar un producto \|

Las respuestas destinadas al frontend utilizan DTOs.

---

\### \`CategoriaController.java\`

Gestiona las operaciones relacionadas con las categorías.

Sus endpoints permiten:

\- Crear categorías.

\- Obtener categorías.

\- Consultar categorías.

\- Actualizar categorías cuando corresponde.

\- Eliminar categorías cuando corresponde.

\- Gestionar las operaciones relacionadas con categorías de productos.

La información se devuelve mediante los DTOs correspondientes.

---

\### \`UsuarioController.java\`

Gestiona las operaciones relacionadas con usuarios y autenticación.

Entre sus responsabilidades se encuentran:

\- Registrar usuarios.

\- Consultar usuarios según las operaciones disponibles.

\- Validar credenciales.

\- Gestionar las operaciones relacionadas con usuarios.

Las contraseñas no se devuelven directamente al frontend.

---

\### \`AdminController.java\`

Contiene endpoints destinados a operaciones administrativas.

El acceso a estas operaciones depende de los permisos y roles
configurados para el usuario.

Se utiliza principalmente para las funcionalidades de administración
incorporadas durante el Sprint 2.

---

\## 🔄 Flujo de una petición REST

Una petición típica sigue el siguiente recorrido:

\`\`\`text

Frontend

   ↓

HTTP Request

   ↓

Controller

   ↓

Service

   ↓

Repository

   ↓

H2

   ↓

Repository

   ↓

Service

   ↓

Controller

   ↓

DTO

   ↓

HTTP Response

   ↓

Frontend

Los Controllers no contienen la lógica principal de negocio, sino que
delegan las operaciones a la capa de Services.

📡 Comunicación con el Frontend

El backend permite que el frontend consulte y modifique la información
mediante solicitudes HTTP.

Las operaciones principales utilizan:

GET     → Consultas

POST    → Creación

PUT     → Actualización

DELETE  → Eliminación

Durante el desarrollo local, la API se encuentra disponible en:

http://localhost:8080

y utiliza rutas bajo el prefijo:

/api/

🌐 CORS

El backend permite las solicitudes provenientes del frontend utilizado
durante el desarrollo local:

http://localhost:5173

Esta configuración permite la comunicación entre ambas aplicaciones
cuando se ejecutan por separado.

Para un entorno de producción, el dominio permitido deberá configurarse
de acuerdo con la infraestructura utilizada.

\## 🔐 Seguridad, Autenticación y Roles

El backend utiliza \*\*Spring Security\*\* para gestionar la
autenticación y el acceso a funcionalidades administrativas.

---

\### Contraseñas

Las contraseñas de los usuarios se almacenan utilizando:

\`\`\`text

BCryptPasswordEncoder

Al registrar un usuario, la contraseña es convertida a un hash antes de
almacenarse en la base de datos.

Durante el inicio de sesión se utiliza:

passwordEncoder.matches()

para comparar la contraseña ingresada con el hash almacenado.

De esta manera, la contraseña original no se guarda directamente en la
base de datos.

Autenticación

El usuario proporciona sus credenciales desde el frontend.

El backend:

Busca el usuario mediante su email.

Comprueba la contraseña utilizando BCrypt.

Determina si las credenciales son válidas.

Devuelve la respuesta correspondiente al frontend.

El frontend utiliza esta respuesta para actualizar el estado de la
sesión.

Roles

El sistema diferencia los usuarios según sus permisos.

El rol de administrador permite acceder a funcionalidades específicas de
gestión, como:

Administración de productos.

Administración de categorías.

Operaciones relacionadas con usuarios.

Otras funcionalidades administrativas.

Las operaciones sensibles deben ser validadas por el backend y no
únicamente por la interfaz del frontend.

Administrador inicial

Durante el desarrollo se establece inicialmente un usuario con permisos
de administrador mediante herramientas como:

Postman.

Consola de H2.

Esto permite disponer de un primer administrador para realizar las
operaciones administrativas necesarias.

Una vez disponible este usuario, puede utilizarse para las
funcionalidades de administración de usuarios.

Esta configuración corresponde al entorno de desarrollo y no representa
un procedimiento destinado al usuario final.

CORS

El backend permite actualmente las solicitudes provenientes del frontend
local:

http://localhost:5173

Esta configuración permite que ambas aplicaciones puedan ejecutarse de
forma independiente durante el desarrollo.

En producción deberá configurarse el dominio correspondiente.

Consideraciones de seguridad

Actualmente:

Las contraseñas se almacenan mediante BCrypt.

Las operaciones administrativas requieren permisos correspondientes.

El acceso a la base de datos H2 se utiliza principalmente durante el
desarrollo.

CORS está configurado para el frontend local.

La implementación de mecanismos adicionales de autenticación, como JWT u
OAuth2, queda como posible mejora futura si el proyecto lo requiere.

\## 🏷️ Categorías y Cambios del Sprint 2

Durante el Sprint 2 se incorporó \`Categoria\` como entidad propia del
sistema y se modificó el modelo de \`Producto\` para utilizarla como
mecanismo de clasificación.

\### \`Categoria\`

La categoría permite organizar y clasificar los productos.

Sus principales datos son:

\- \`id\`

\- \`nombre\`

\- \`descripcion\`

\- \`imagen\`

Las categorías pueden ser gestionadas desde el panel de administración
mediante los endpoints correspondientes.

---

\### Relación con \`Producto\`

Los productos pueden asociarse a una categoría:

\`\`\`text

Producto

    │

    └── Categoria

Esta relación permite utilizar la misma información para:

Clasificación.

Filtrado.

Visualización.

Administración.

Un producto puede existir sin una categoría asignada.

🔄 Filtrado por categoría

El backend proporciona las operaciones necesarias para obtener productos
según las categorías seleccionadas.

El flujo general es:

Frontend

   ↓

Solicitud de productos por categoría

   ↓

Controller

   ↓

Service

   ↓

Repository

   ↓

Base de datos

   ↓

Productos filtrados

   ↓

Frontend

El filtrado permite seleccionar una o más categorías desde la interfaz.

🧹 Eliminación de tipo

Durante el Sprint 2 se eliminó el atributo tipo de Producto.

Anteriormente:

Producto

├── nombre

├── descripcion

├── tipo

└── imagenes

Actualmente:

Producto

├── nombre

├── descripcion

├── imagenes

└── categoria

La modificación evita mantener dos mecanismos diferentes de
clasificación.

También fue necesario actualizar las partes del backend que utilizaban
tipo, incluyendo:

Entidad Producto.

DTOs.

Controllers.

Services.

Consultas.

Datos enviados y recibidos mediante la API.

📡 API de categorías

La API permite realizar las operaciones necesarias para gestionar las
categorías.

Conceptualmente:

POST   → Crear categoría

GET    → Obtener categorías

PUT    → Actualizar categoría

DELETE → Eliminar categoría

Las operaciones disponibles dependen de los endpoints implementados en
el Controller correspondiente.

🖼️ Imagen de categoría

Las categorías pueden almacenar una imagen representativa.

El frontend realiza las validaciones iniciales del archivo antes de
enviarlo.

El backend recibe y persiste la información correspondiente a la
categoría junto con sus demás datos.

📌 Resultado del Sprint 2

Con estos cambios, el backend utiliza Categoria como mecanismo principal
para clasificar los productos.

Esto permite que el frontend y backend trabajen sobre una misma
estructura:

Producto

    │

    ▼

Categoria

    │

    ├── Visualización

    └── Filtrado

La eliminación de tipo simplifica el modelo y evita duplicidad de
información.

\## 📋 Historias de Usuario --- Sprint 2

Durante el Sprint 2 se incorporaron funcionalidades relacionadas con
productos, categorías, usuarios y administración.

\| HU \| Funcionalidad \| Participación del Backend \|

\|---\|---\|---\|

\| HU12 \| Categorías de productos \| Entidad, persistencia y asociación
con productos \|

\| HU13 \| Registro de usuarios \| Creación y persistencia de usuarios
\|

\| HU14 \| Inicio de sesión \| Validación de credenciales \|

\| HU15 \| Gestión de sesión \| Autenticación y respuesta al frontend \|

\| HU16 \| Gestión de administradores \| Roles y permisos
administrativos \|

\| HU17 \| Gestión de características \| Persistencia y operaciones
correspondientes \|

\| HU18 \| Visualización de características \| Consulta y entrega de
información \|

\| HU20 \| Filtrado por categoría \| Consultas de productos por
categoría \|

\| HU21 \| Administración de categorías \| CRUD y persistencia de
categorías \|

\### HU12 --- Categorías de productos

El backend incorpora \`Categoria\` y la relación con \`Producto\`.

Esto permite:

\- Asociar productos con categorías.

\- Consultar categorías.

\- Filtrar productos.

\- Devolver la categoría asociada al frontend.

---

\### HU13 --- Registro de usuarios

El backend recibe los datos del usuario, valida la operación y persiste
la información mediante \`UsuarioService\` y \`UsuarioRepository\`.

Las contraseñas se almacenan utilizando BCrypt.

---

\### HU14 --- Inicio de sesión

El backend recibe las credenciales y utiliza \`UsuarioService\` para
comprobar el usuario y validar la contraseña mediante BCrypt.

---

\### HU15 --- Gestión de sesión

El backend proporciona las operaciones necesarias para que el frontend
pueda determinar si las credenciales proporcionadas son válidas y
gestionar el acceso correspondiente.

---

\### HU16 --- Gestión de administradores

El backend diferencia los usuarios según sus roles y permite proteger
las operaciones administrativas.

Durante el desarrollo se utiliza un usuario administrador inicial
configurado mediante Postman o la consola de H2.

---

\### HU17 --- Gestión de características

El backend proporciona la persistencia y las operaciones necesarias para
las funcionalidades correspondientes a esta HU.

---

\### HU18 --- Visualización de características

Los datos correspondientes se consultan desde el backend y se envían al
frontend mediante la API REST.

---

\### HU20 --- Filtrado por categoría

El backend procesa las solicitudes de filtrado y obtiene los productos
correspondientes a las categorías seleccionadas.

El resultado se devuelve al frontend mediante la API REST.

---

\### HU21 --- Administración de categorías

El backend permite gestionar las categorías mediante las operaciones
correspondientes.

La información se almacena en H2 y puede ser consultada por el frontend.

---

\## 📊 Estado del Sprint 2

Las funcionalidades correspondientes a las HUs incluidas en el Sprint 2
fueron implementadas y verificadas mediante las pruebas documentadas en:

\`\`\`text

testsS1.md / testsS2.md / testsS3.md

La HU19, al ser opcional, no forma parte del cierre actual y queda
pendiente para una etapa posterior.

\## 🧪 QA y Testing

Las pruebas funcionales del proyecto se encuentran documentadas en:

\`\`\`text

testsS1.md / testsS2.md / testsS3.md

Este archivo contiene los casos de prueba correspondientes a las
Historias de Usuario y registra el resultado de las verificaciones
realizadas.

El backend fue probado conjuntamente con el frontend para verificar
principalmente:

Comunicación mediante API REST.

Persistencia en H2.

Registro y consulta de productos.

Gestión de categorías.

Asociación entre productos y categorías.

Filtrado por categoría.

Registro y autenticación de usuarios.

Acceso a funcionalidades administrativas.

⚙️ Decisiones Técnicas del Sprint 2

Las principales decisiones tomadas durante el sprint fueron:

Incorporar Categoria como entidad independiente.

Asociar productos con categorías.

Eliminar el atributo tipo de Producto.

Utilizar DTOs para la comunicación con el frontend.

Mantener la lógica de negocio dentro de los Services.

Mantener el acceso a datos dentro de los Repositories.

Utilizar BCrypt para almacenar contraseñas de forma segura.

Utilizar roles para diferenciar funcionalidades administrativas.

Mantener H2 como base de datos durante el desarrollo.

Mantener la API REST como mecanismo de comunicación con el frontend.

🗄️ Persistencia y Base de Datos

La persistencia se realiza mediante:

Spring Data JPA

       ↓

   Hibernate

       ↓

      H2

Las entidades principales son:

Usuario

Producto

Categoria

Las relaciones entre entidades permiten representar la estructura
necesaria para las funcionalidades desarrolladas durante el Sprint 2.

La consola de H2 continúa siendo una herramienta útil durante el
desarrollo para inspeccionar y modificar los datos cuando sea necesario.

🔐 Estado de Seguridad

Al finalizar el Sprint 2:

Las contraseñas se almacenan mediante BCrypt.

Los usuarios poseen información relacionada con sus roles.

Las operaciones administrativas requieren los permisos correspondientes.

CORS permite la comunicación con el frontend local.

La configuración de seguridad se encuentra preparada para continuar
evolucionando.

La incorporación de mecanismos adicionales como JWT u OAuth2 puede
considerarse una mejora futura si los próximos requisitos del proyecto
lo requieren.

📊 Estado Final del Backend

Al finalizar el Sprint 2, el backend cuenta con:

Arquitectura por capas.

API REST.

Persistencia mediante H2.

Gestión de productos.

Gestión de categorías.

Asociación Producto → Categoría.

Filtrado de productos por categoría.

Gestión de usuarios.

Autenticación.

Roles y funcionalidades administrativas.

DTOs para comunicación con el frontend.

Validaciones de negocio.

Manejo de excepciones.

Configuración de CORS.

Integración completa con el frontend.

Las funcionalidades previstas para el Sprint 2 fueron implementadas y
verificadas mediante las pruebas correspondientes.

📚 Documentación Relacionada

Frontend

DOCUMENTACION_FRONTEND.md

Contiene la arquitectura, páginas, componentes, hooks y funcionalidades
del frontend.

Backend

DOCUMENTACION_BACKEND.md

Contiene la arquitectura, entidades, repositories, services, DTOs,
controllers y configuración del backend.

QA / Testing

testsS1.md / testsS2.md / testsS3.md

Contiene los casos de prueba y el resultado de las verificaciones
realizadas.

🚀 Próximas Extensiones

HU19

La HU19 fue considerada una funcionalidad opcional y se decidió
postergarla para una etapa posterior del proyecto.

No forma parte de las funcionalidades necesarias para considerar
terminado el Sprint 2.

🏁 Cierre del Sprint 2

El Sprint 2 permitió completar la integración entre frontend y backend y
ampliar la aplicación con funcionalidades de usuarios, administración y
categorías.

La arquitectura actual permite continuar el desarrollo manteniendo
separadas:

Controller

    ↓

Service

    ↓

Repository

    ↓

Entity

    ↓

Database

El backend queda preparado para continuar con los siguientes sprints y
futuras funcionalidades del proyecto.

\### Con esto terminamos el Backend

Ya tenemos las \*\*11 etapas completas\*\*:

\`\`\`text

1\. Resumen, arquitectura y Stack       ✅

2\. Estructura del Backend              ✅

3\. Entidades y relaciones JPA          ✅

4\. Repositories                         ✅

5\. Services                             ✅

6\. DTOs                                 ✅

7\. Controllers y API REST              ✅

8\. Seguridad y roles                    ✅

9\. Categorías y cambios del Sprint 2   ✅

10\. Historias de Usuario                ✅

11\. QA y cierre                          ✅

------------------------------------------------------------------------

## 📚 Documentación relacionada

### Frontend

`DOCUMENTACION_FRONTEND.md`

Contiene la arquitectura, páginas, componentes, hooks, servicios y
funcionalidades del frontend.

### Backend

`DOCUMENTACION_BACKEND.md`

Contiene la arquitectura, entidades, repositories, services, DTOs,
controllers, seguridad, API REST y funcionalidades del backend.

### QA / Testing

``` text
testsS1.md
testsS2.md
testsS3.md
```

Estos archivos contienen los casos de prueba y las verificaciones
realizadas durante los distintos sprints.

------------------------------------------------------------------------

## 🏁 Cierre general del Backend

El backend de Reservas Carrizo evolucionó progresivamente durante los
tres primeros sprints.

### Sprint 1

Se construyó la estructura inicial:

``` text
Controller
    ↓
Service
    ↓
Repository
    ↓
Entity
    ↓
H2
```

### Sprint 2

Se incorporaron:

-   Categorías.
-   Roles.
-   Administración.
-   Validaciones.
-   Integración ampliada con el frontend.
-   Seguridad mediante Spring Security.

### Sprint 3

Se incorporaron:

-   Búsqueda.
-   Disponibilidad.
-   Favoritos.
-   Valoraciones.
-   Reglas de negocio relacionadas con reservas finalizadas.
-   Eliminación de categorías sin eliminar productos.

La evolución mantiene como principio central la separación de
responsabilidades y permite que las nuevas funcionalidades se integren
sobre la arquitectura existente.
