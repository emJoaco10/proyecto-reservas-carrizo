# Documentación del Backend — Reservas Carrizo

## 1. Introducción

El backend de **Reservas Carrizo** es una aplicación desarrollada con **Java 17 y Spring Boot**. Expone una API REST que utiliza el frontend React para consultar productos, gestionar usuarios y categorías, administrar características, registrar reservas, consultar disponibilidad, gestionar favoritos y valoraciones y enviar la notificación de confirmación de una reserva por correo electrónico.

El código fuente principal se encuentra en `backend/src/main/java/com/example/demo/`. La aplicación está organizada por capas para separar la recepción de peticiones HTTP, la lógica de negocio, el acceso a datos y el modelo persistido.

Esta documentación describe la estructura y los comportamientos identificados en el repositorio entregado, incluidas las HU30 a HU35 del Sprint 4. La existencia de un endpoint o de una implementación no implica que todos sus casos hayan sido probados; el estado de las pruebas debe registrarse en los archivos de testing del proyecto.

## 2. Tecnologías

| Tecnología | Uso |
|---|---|
| Java 17 | Lenguaje de programación del backend. |
| Spring Boot 4.0.2 | Configuración y ejecución de la aplicación. |
| Spring Web MVC | Definición de controladores y endpoints REST. |
| Spring Data JPA | Persistencia y consultas sobre entidades. |
| Hibernate | Implementación ORM utilizada por JPA. |
| H2 Database | Base de datos configurada para desarrollo. |
| Spring Security | Autorización de solicitudes y protección de endpoints. |
| OAuth2 Resource Server / JWT | Validación de tokens JWT enviados por el cliente. |
| BCrypt | Codificación de contraseñas. |
| Jakarta Validation | Dependencia disponible para validaciones. |
| Spring Boot Starter Mail | Envío de correos electrónicos. |
| Maven | Gestión de dependencias y compilación. |
| Spring Boot DevTools | Herramientas de desarrollo. |

Las dependencias concretas están declaradas en `backend/pom.xml`.

## 3. Estructura del backend

```text
backend/
├── pom.xml
└── src/
    └── main/
        ├── java/com/example/demo/
        │   ├── BackendApplication.java
        │   ├── CorsConfig.java
        │   ├── SecurityConfig.java
        │   ├── GlobalExceptionHandler.java
        │   ├── controller/
        │   ├── dto/
        │   ├── model/
        │   ├── repository/
        │   └── service/
        └── resources/
            └── application.properties
```

### 3.1. Clase de inicio

`BackendApplication.java` es la clase de entrada de Spring Boot y permite iniciar la aplicación.

### 3.2. `controller/`

Los controladores reciben las solicitudes HTTP, extraen parámetros o cuerpos de petición, invocan los servicios y construyen las respuestas HTTP. No representan por sí solos la persistencia ni la totalidad de las reglas de negocio.

Controladores principales:

- `AdminController`
- `CaracteristicaController`
- `CategoriaController`
- `FavoritoController`
- `ProductoController`
- `ReservaController`
- `UsuarioController`
- `ValoracionController`

### 3.3. `service/`

Los servicios concentran las operaciones y reglas de negocio:

- `CaracteristicaService`: operaciones sobre características.
- `CategoriaService`: operaciones sobre categorías y eliminación de una categoría.
- `EmailService`: composición y envío de la confirmación de reserva.
- `FavoritoService`: agregar, quitar y consultar favoritos.
- `JwtService`: generación de tokens JWT.
- `ProductoService`: consulta, alta, actualización, eliminación, búsqueda y conversión de productos.
- `ReservaService`: registro de reservas, consulta de disponibilidad, historial y elegibilidad para valorar.
- `UsuarioService`: registro, inicio de sesión, roles y gestión de usuarios.
- `ValoracionService`: operaciones relacionadas con las valoraciones.

### 3.4. `repository/`

Los repositorios extienden `JpaRepository` y proporcionan las operaciones de persistencia y las consultas declaradas por el proyecto:

- `CaracteristicaRepository`
- `CategoriaRepository`
- `ProductoRepository`
- `ReservaRepository`
- `UsuarioRepository`
- `ValoracionRepository`

Spring Data JPA implementa las operaciones CRUD estándar. Los métodos de consulta adicionales definidos en cada interfaz se utilizan para búsquedas específicas, por ejemplo, por producto, usuario, correo o fechas.

### 3.5. `model/`

Las entidades JPA representan los datos persistidos:

| Entidad | Responsabilidad |
|---|---|
| `Producto` | Información del producto, ubicación, imágenes, categoría y características. |
| `Usuario` | Datos del usuario, credenciales, rol y productos favoritos. |
| `Categoria` | Clasificación de productos. |
| `Caracteristica` | Características que pueden asociarse a productos. |
| `Reserva` | Usuario, producto, fechas, huéspedes y datos adicionales de una reserva. |
| `Valoracion` | Usuario, producto, puntuación, comentario y fecha. |

Las relaciones se expresan con anotaciones JPA como `@ManyToOne`, `@OneToMany` y `@ManyToMany`.

### 3.6. `dto/`

Los DTO (*Data Transfer Objects*) definen los datos que se reciben o devuelven en las operaciones de la API. Entre ellos se encuentran:

- `ProductoDTO`
- `UsuarioDTO`
- `LoginDTO` y `LoginResponseDTO`
- `CategoriaDTO`
- `CaracteristicaDTO`
- `ReservaDTO` y `ReservaHistorialDTO`
- `DisponibilidadDTO`
- `RolDTO`
- `ValoracionDTO`

Por ejemplo, `LoginResponseDTO` contiene un `UsuarioDTO` y un token. `ProductoDTO` incluye la información del producto, datos de categoría y características, y campos para el promedio y la cantidad de valoraciones.

### 3.7. Configuración y manejo de errores

- `SecurityConfig.java`: configura el encoder de contraseñas, JWT, CORS y las reglas de autorización.
- `CorsConfig.java`: contiene configuración relacionada con CORS; debe leerse junto con la configuración CORS definida en `SecurityConfig`.
- `GlobalExceptionHandler.java`: centraliza el tratamiento de excepciones que contempla el proyecto.

## 4. Arquitectura y flujo de una petición

El flujo general es:

```text
Frontend React
     │
     │ HTTP / JSON / JWT cuando corresponde
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
Entidad JPA / Hibernate
     │
     ▼
Base de datos H2
```

La respuesta vuelve desde el servicio al controlador, que devuelve el DTO o el resultado correspondiente al frontend.

Esta separación permite mantener las rutas HTTP, las reglas de negocio y la persistencia en capas diferentes.

## 5. Configuración de la aplicación

La configuración principal se encuentra en `backend/src/main/resources/application.properties`.

### 5.1. Base de datos

El archivo configura H2 en memoria con la URL `jdbc:h2:mem:testdb`, el usuario `sa` y contraseña vacía. También habilita la consola en `/h2-console`.

La propiedad `spring.jpa.hibernate.ddl-auto=create-drop` indica que el esquema se crea al iniciar la aplicación y se elimina al cerrarla. Por tanto, esta configuración es apropiada para desarrollo o pruebas, pero **no conserva los datos entre reinicios** y no debe interpretarse como configuración de producción.

### 5.2. Correo electrónico

La aplicación configura SMTP mediante Gmail y utiliza el puerto 587 con autenticación y STARTTLS. `EmailService` obtiene la dirección del remitente desde `spring.mail.username`.

Las credenciales SMTP y la clave de firma JWT están configuradas en archivos del proyecto. **No deben copiarse a documentación pública ni mantenerse como secretos versionados en un repositorio compartido.** Para un entorno real deben trasladarse a variables de entorno o a un gestor de secretos, y cualquier credencial expuesta debe rotarse.

### 5.3. Direcciones locales

La configuración de desarrollo suele utilizar:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- Consola H2: `http://localhost:8080/h2-console`

Estas direcciones dependen de la configuración y del entorno donde se ejecute la aplicación.

## 6. Seguridad y autenticación

### 6.1. Contraseñas

`SecurityConfig` declara un `PasswordEncoder` basado en `BCryptPasswordEncoder`. `UsuarioService` utiliza el encoder para trabajar con contraseñas sin guardarlas como texto plano.

### 6.2. JWT

`JwtService` genera tokens JWT. `SecurityConfig` declara un `JwtEncoder`, un `JwtDecoder` y un conversor de autoridades que toma el claim `rol` y le antepone `ROLE_` para mapearlo a las autoridades de Spring Security.

El frontend debe enviar el token en la cabecera `Authorization` con el esquema `Bearer` para acceder a endpoints protegidos.

### 6.3. Autorización por rol

La configuración define endpoints administrativos que requieren `ADMIN`, entre ellos:

- Gestión de roles y listado/eliminación de usuarios.
- Consulta administrativa, alta, modificación y eliminación de productos.
- Asignación de categoría y características a productos.
- Alta, modificación y eliminación de categorías.
- Alta, modificación y eliminación de características.

Las rutas de registro e inicio de sesión y determinadas consultas GET de productos, categorías y características se declaran públicas. Las demás solicitudes quedan sujetas a las reglas generales de seguridad configuradas en Spring Security.

La autorización del backend es la barrera efectiva de seguridad. Ocultar botones o proteger visualmente rutas en el frontend no sustituye estas reglas.

### 6.4. CORS y consola H2

`SecurityConfig` permite el origen local `http://localhost:5173`, los métodos `GET`, `POST`, `PUT`, `DELETE` y `OPTIONS`, y las cabeceras `Authorization` y `Content-Type`. También deshabilita CSRF y permite el uso de frames para la consola H2.

La consola H2 se encuentra habilitada y permitida en la configuración revisada. Estas decisiones deben revisarse antes de desplegar la aplicación en un entorno público.

## 7. Endpoints REST

Los endpoints siguientes se agrupan por controlador y se basan en los mappings presentes en el código. Los parámetros obligatorios, los DTO de entrada y los códigos HTTP concretos deben confirmarse en el método correspondiente.

### 7.1. Productos — `/api/producto`

| Método | Ruta | Función |
|---|---|---|
| `POST` | `/api/producto` | Registrar un producto. |
| `GET` | `/api/producto/aleatorios` | Obtener productos aleatorios. |
| `GET` | `/api/producto/buscar?texto={texto}` | Buscar productos por nombre. |
| `GET` | `/api/producto/{id}` | Obtener un producto por ID. |
| `GET` | `/api/producto/paginados` | Consultar productos paginados. |
| `GET` | `/api/producto/admin` | Obtener productos para administración. |
| `DELETE` | `/api/producto` | Eliminar todos los productos. |
| `DELETE` | `/api/producto/{id}` | Eliminar un producto. |
| `PUT` | `/api/producto/{id}` | Actualizar un producto. |
| `PUT` | `/api/producto/{id}/categoria` | Asignar una categoría. |
| `PUT` | `/api/producto/{id}/caracteristicas` | Asignar características. |
| `GET` | `/api/producto/categoria/{id}` | Obtener productos de una categoría. |
| `GET` | `/api/producto/categoriasFiltro?ids={ids}` | Filtrar por varios IDs de categoría. |
| `GET` | `/api/producto/categorias` | Obtener categorías usadas por la operación de productos. |

La búsqueda por nombre se implementa en `ProductoService`. La consulta por categorías y la conversión a `ProductoDTO` también se resuelven en la capa de servicio.

### 7.2. Categorías — `/api/categoria`

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/api/categoria` | Listar categorías. |
| `GET` | `/api/categoria/{id}` | Consultar una categoría. |
| `POST` | `/api/categoria` | Crear una categoría. |
| `PUT` | `/api/categoria/{id}` | Actualizar una categoría. |
| `DELETE` | `/api/categoria/{id}` | Eliminar una categoría. |

La eliminación se implementa en `CategoriaService` con una operación transaccional. La lógica del servicio debe consultarse para verificar cómo trata los productos asociados.

### 7.3. Características — `/api/caracteristica`

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/api/caracteristica` | Listar características. |
| `GET` | `/api/caracteristica/{id}` | Consultar una característica. |
| `POST` | `/api/caracteristica` | Crear una característica. |
| `PUT` | `/api/caracteristica/{id}` | Actualizar una característica. |
| `DELETE` | `/api/caracteristica/{id}` | Eliminar una característica. |

### 7.4. Usuarios — `/api/usuario`

| Método | Ruta | Función |
|---|---|---|
| `POST` | `/api/usuario/registro` | Registrar un usuario. |
| `POST` | `/api/usuario/login` | Iniciar sesión y obtener la respuesta de autenticación. |
| `PUT` | `/api/usuario/{id}/rol` | Cambiar el rol de un usuario. |
| `DELETE` | `/api/usuario` | Eliminar todos los usuarios. |
| `GET` | `/api/usuario` | Obtener el listado de usuarios. |

Las operaciones de listado, eliminación masiva y modificación de roles están restringidas al rol administrativo en `SecurityConfig`.

### 7.5. Reservas — `/api/reserva`

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/api/reserva/disponibilidad/{productoId}` | Consultar los períodos reservados de un producto. |
| `POST` | `/api/reserva` | Registrar una reserva. |
| `GET` | `/api/reserva/mis-reservas` | Consultar el historial del usuario autenticado. |
| `GET` | `/api/reserva/puede-valorar/{productoId}` | Consultar si el usuario puede valorar el producto. |
| `GET` | `/api/reserva/disponibles?fechaInicio={fechaInicio}&fechaFin={fechaFin}` | Consultar productos disponibles para un rango de fechas. |

`ReservaController` obtiene la identidad del usuario autenticado para las operaciones que lo requieren. `ReservaService` valida los datos, consulta las reservas existentes y aplica las reglas de disponibilidad.

### 7.6. Favoritos — `/api/favoritos`

| Método | Ruta | Función |
|---|---|---|
| `POST` | `/api/favoritos/{productoId}` | Agregar un producto a favoritos. |
| `DELETE` | `/api/favoritos/{productoId}` | Quitar un producto de favoritos. |
| `GET` | `/api/favoritos` | Consultar los favoritos del usuario. |

Estas operaciones se implementan en `FavoritoService` y se asocian al usuario identificado por su correo.

### 7.7. Valoraciones — `/api/valoraciones`

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/api/valoraciones/producto/{productoId}` | Consultar valoraciones de un producto. |
| `GET` | `/api/valoraciones/producto/{productoId}/ya-valoro` | Consultar si el usuario ya valoró el producto. |
| `POST` | `/api/valoraciones/producto/{productoId}` | Registrar una valoración. |

`ValoracionService` contiene la lógica de consulta y registro. `ProductoService` incorpora a los DTO de producto información de promedio y cantidad de valoraciones.

### 7.8. Administración — `/api/administracion`

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/api/administracion/menu` | Obtener las funciones administrativas disponibles. |

## 8. Modelo de datos y relaciones

### 8.1. Producto y categoría

`Producto` contiene nombre, descripción, ubicación, imágenes, una categoría opcional y una lista de características. La relación con `Categoria` se representa con `@ManyToOne`; la categoría tiene una colección de productos mediante `@OneToMany`.

La categoría es el mecanismo de clasificación del producto. La relación admite que `categoria_id` sea nulo.

### 8.2. Producto y características

La relación entre `Producto` y `Caracteristica` es de muchos a muchos. Un producto puede tener varias características y una característica puede asociarse a varios productos.

### 8.3. Usuario y favoritos

`Usuario` mantiene una lista de productos favoritos y `Producto` mantiene la relación inversa con los usuarios que lo marcaron. La relación se representa mediante una tabla de unión JPA.

### 8.4. Usuario, producto y reserva

`Reserva` se relaciona con un usuario y un producto mediante relaciones `@ManyToOne`. Almacena fechas de inicio y fin, cantidad de huéspedes, DNI, edades y observaciones.

### 8.5. Valoraciones

`Valoracion` referencia al usuario y al producto, y almacena puntuación, comentario y fecha. Las relaciones con usuario y producto son obligatorias según las anotaciones de la entidad.

## 9. Funcionalidades por sprint

### 9.1. Sprint 1 — Base del backend

La primera etapa estableció la estructura por capas, las entidades principales y la persistencia inicial. Se trabajó sobre productos y usuarios, repositorios, servicios, DTO y controladores, con H2 como base de datos de desarrollo.

### 9.2. Sprint 2 — Administración y clasificación

La segunda etapa amplió el backend con:

- Categorías y relación con productos.
- Consulta y filtrado por categorías.
- Operaciones de administración de productos.
- Registro e inicio de sesión.
- Codificación de contraseñas.
- Gestión de usuarios y roles.
- Reglas de acceso para endpoints administrativos.
- DTO para separar datos de entrada/salida de las entidades persistidas.

La clasificación de productos pasó a apoyarse en `Categoria` en lugar de utilizar un campo independiente de tipo de producto.

### 9.3. Sprint 3 — Búsqueda, disponibilidad y participación

La tercera etapa incorporó o amplió:

- Búsqueda de productos por nombre.
- Consulta de disponibilidad.
- Registro y consulta de favoritos.
- Registro y consulta de valoraciones.
- Cálculo de promedio y cantidad de valoraciones.
- Eliminación de categorías con tratamiento de productos relacionados.
- Integración de las nuevas operaciones con el frontend.

### 9.4. Sprint 4 — Reservas, historial, WhatsApp y correo

Las HU del Sprint 4 compartidas para este proyecto son HU30 a HU35. Las operaciones de backend relacionadas con reservas y correo se describen a continuación.

#### HU30 — Reservas: seleccionar fecha

**Objetivo:** permitir búsquedas por fecha para encontrar productos que coincidan con los intereses del usuario.

El backend ofrece:

- `GET /api/reserva/disponibles`, que recibe las fechas `fechaInicio` y `fechaFin`.
- `GET /api/reserva/disponibilidad/{productoId}`, que devuelve los períodos reservados de un producto.

`ReservaService.obtenerProductosDisponibles` comprueba que ambas fechas estén presentes y que la fecha final no sea anterior a la inicial. Después consulta los productos y descarta aquellos cuyas reservas se superponen con el rango solicitado.

La detección de superposición compara las fechas de las reservas existentes con el rango recibido. Deben tenerse en cuenta las reglas de inclusión de los extremos que implementa el código al diseñar los casos de prueba.

#### HU31 — Reservas: visualizar detalles

**Objetivo:** permitir que un usuario autenticado visualice una página de reservas con el detalle del producto para poder reservarlo.

El detalle del producto se obtiene a través de `GET /api/producto/{id}`, que utiliza `ProductoController` y `ProductoService`. El DTO de producto incluye información general, categoría, características y datos de valoraciones.

El backend proporciona información de disponibilidad mediante los endpoints de reservas. La interfaz de detalle y la navegación al flujo de reserva corresponden al frontend; la autorización y las reglas de reserva deben comprobarse en el servidor.

#### HU32 — Realizar reserva

**Objetivo:** permitir que un usuario autenticado registre una reserva para utilizar un producto.

`POST /api/reserva` recibe los datos de reserva y `ReservaController` delega la operación en `ReservaService.crearReserva`. El servicio:

1. Comprueba que se informen las fechas y que la fecha final no sea anterior a la inicial.
2. Comprueba que la cantidad de huéspedes sea mayor que cero.
3. Comprueba que DNI, edades y observaciones estén informados.
4. Cuenta las edades no vacías y verifica que coincidan con la cantidad de huéspedes.
5. Comprueba que exista el producto solicitado.
6. Identifica al usuario a partir del correo asociado al contexto autenticado.
7. Consulta las reservas del producto y rechaza el registro si encuentra superposición.
8. Crea y persiste la reserva.
9. Invoca `EmailService.enviarConfirmacionReserva`.
10. Devuelve un `ReservaDTO` con los datos de la reserva guardada.

El servicio comprueba nuevamente que la fecha final no sea anterior a la inicial en otro bloque de validación. La validación de superposición se implementa en la capa de negocio y no depende únicamente de los controles del frontend.

#### HU33 — Acceder al historial

**Objetivo:** permitir que un usuario autenticado consulte sus reservas anteriores.

`GET /api/reserva/mis-reservas` utiliza el contexto de autenticación para identificar al usuario. `ReservaService.obtenerReservasDelUsuario` consulta las reservas asociadas al correo y las ordena por fecha de inicio descendente mediante el repositorio.

El servicio calcula un estado para cada reserva:

- `FINALIZADA`: la fecha de fin es anterior al día actual.
- `PRÓXIMA`: la fecha de inicio es posterior al día actual.
- `EN CURSO`: los demás casos.

El resultado se transforma a `ReservaHistorialDTO`, que incluye el identificador de la reserva, el producto, el nombre del producto, las fechas, la cantidad de huéspedes y el estado calculado.

#### HU34 — WhatsApp: iniciar chat

**Objetivo:** permitir que el usuario se comunique con el proveedor por WhatsApp.

En el código revisado, el inicio del chat se resuelve desde el frontend mediante una URL `wa.me`. No se identifica un endpoint específico del backend dedicado a iniciar la conversación de WhatsApp.

Por lo tanto, esta HU corresponde principalmente a la integración del frontend. El backend no debe documentarse como responsable de enviar mensajes de WhatsApp si no existe una operación que lo implemente.

#### HU35 — Notificación: confirmar reserva por correo

**Objetivo:** enviar al usuario registrado un correo con los datos de su reserva después de su ejecución.

El repositorio contiene `EmailService`, que utiliza `JavaMailSender` y `SimpleMailMessage` para construir un correo con:

- Nombre y apellido del usuario.
- Nombre del producto.
- Fecha de ingreso.
- Fecha de salida.
- Cantidad de huéspedes.

El asunto definido es `Confirmación de reserva - Reservas Carrizo`. El destinatario se obtiene del correo del usuario asociado a la reserva y el remitente de la propiedad `spring.mail.username`.

`ReservaService.crearReserva` invoca el envío después de guardar la reserva. `EmailService` está condicionado a que exista la propiedad `spring.mail.host`.

**Importante:** que el método de envío esté implementado no demuestra que el SMTP esté correctamente configurado ni que el correo llegue al destinatario. La HU debe verificarse con una configuración válida y pruebas de envío/recepción. Además, como el envío se invoca dentro del flujo de creación, un error de correo puede afectar la respuesta de la operación según el manejo de excepciones vigente.

## 10. Reglas de negocio de reservas

Las reglas identificadas en `ReservaService` incluyen:

- La fecha inicial y la final son obligatorias.
- La fecha final no puede ser anterior a la inicial.
- La cantidad de huéspedes debe ser mayor que cero.
- El DNI es obligatorio.
- Las edades de los huéspedes son obligatorias.
- La cantidad de edades no vacías debe coincidir con la cantidad de huéspedes.
- Las observaciones son obligatorias.
- El producto debe existir.
- El usuario identificado por la autenticación debe existir.
- No se permite registrar una reserva si las fechas se superponen con otra reserva del mismo producto.

La disponibilidad se consulta a partir de las reservas almacenadas. El cálculo de estado del historial utiliza la fecha actual del servidor mediante `LocalDate.now()`.

## 11. DTO principales

| DTO | Datos principales |
|---|---|
| `ProductoDTO` | ID, nombre, descripción, ubicación, imágenes, categoría, características, promedio y cantidad de valoraciones. |
| `UsuarioDTO` | ID, nombre, apellido, email, contraseña para operaciones de entrada cuando corresponde y rol. El servicio debe evitar exponer contraseñas en respuestas. |
| `LoginDTO` | Email y contraseña para iniciar sesión. |
| `LoginResponseDTO` | Usuario y token JWT. |
| `ReservaDTO` | ID, producto, fechas, huéspedes, DNI, edades y observaciones. |
| `ReservaHistorialDTO` | ID de reserva, producto, nombre, fechas, huéspedes y estado calculado. |
| `DisponibilidadDTO` | ID de reserva, ID de producto y fechas reservadas. |
| `CategoriaDTO` | ID, nombre, descripción e imagen. |
| `CaracteristicaDTO` | ID, nombre e icono. |
| `RolDTO` | Rol solicitado. |
| `ValoracionDTO` | ID, nombre de usuario, puntuación, comentario y fecha. |

El DTO concreto utilizado depende de cada endpoint. Los campos sensibles y los datos que se aceptan desde el cliente deben revisarse tanto en la conversión como en la lógica del servicio.

## 12. Manejo de excepciones y respuestas

Los controladores devuelven objetos `ResponseEntity` y los servicios pueden producir excepciones cuando una operación no cumple sus reglas. `GlobalExceptionHandler` centraliza los tipos de excepción que tenga definidos.

Al documentar o probar un endpoint, debe verificarse:

- El código HTTP de éxito.
- El formato del cuerpo de respuesta.
- El tratamiento de identificadores inexistentes.
- El comportamiento ante campos obligatorios ausentes.
- La respuesta frente a fechas inválidas o superpuestas.
- Los errores de autenticación y autorización.
- Los errores de conexión con la base de datos o el servidor SMTP.

No debe suponerse que todas las excepciones tienen el mismo código o formato: esto depende de las reglas implementadas en el controlador y en el manejador global.

## 13. Pruebas y QA

La carpeta `docs/` incluye documentos de casos de prueba para los Sprints 1, 2 y 3. Para el Sprint 4 se recomienda mantener un documento `testsS4.md` con los casos de HU30 a HU35.

Cada caso debería registrar:

- Identificador de prueba.
- HU y criterio de aceptación.
- Precondiciones y datos de prueba.
- Pasos ejecutados.
- Resultado esperado.
- Resultado observado.
- Estado: `OK`, `ERROR` o `PENDIENTE`.
- Evidencia o comentario cuando corresponda.

### Cobertura sugerida del Sprint 4

| HU | Casos que conviene probar |
|---|---|
| HU30 | Búsqueda con fechas válidas, fechas ausentes, rango invertido, productos disponibles y ausencia de resultados. |
| HU31 | Consulta de producto existente e inexistente, DTO devuelto y consulta de disponibilidad. |
| HU32 | Reserva válida, campos obligatorios, cantidad de huéspedes, edades, fechas invertidas, producto inexistente, usuario no autenticado y superposición de reservas. |
| HU33 | Historial con reservas, sin reservas, orden descendente y aislamiento por usuario autenticado. |
| HU34 | No requiere endpoint de backend según la implementación revisada; validar la integración del frontend por separado. |
| HU35 | Configuración SMTP, destinatario, asunto y contenido del mensaje, envío exitoso y tratamiento del fallo de correo. |

Esta tabla es una propuesta de cobertura. No indica que los casos se hayan ejecutado. Solo se deben marcar como aprobados los que hayan sido probados y cuenten con resultado observado.

## 14. Instalación y ejecución local

Desde la carpeta `backend/`, el proyecto utiliza Maven. Con Java 17 instalado, los comandos habituales son:

```bash
cd backend
mvn clean test
mvn spring-boot:run
```

También puede iniciarse desde IntelliJ IDEA utilizando la clase `BackendApplication`.

La ejecución necesita una configuración compatible con `application.properties`. Para probar el envío de correo se requieren credenciales SMTP válidas y accesibles desde el entorno. No deben incluirse secretos reales en commits, capturas ni documentación pública.

## 15. Documentación relacionada

| Archivo | Propósito |
|---|---|
| `DOCUMENTACION_BACKEND.md` | Arquitectura, configuración, endpoints y funcionalidades del backend. |
| `DOCUMENTACION_FRONTEND.md` | Estructura y comportamiento del frontend. |
| `bitacora.md` | Registro de avances, decisiones y tareas por sprint. |
| `testsS1.md` | Casos de prueba del Sprint 1. |
| `testsS2.md` | Casos de prueba del Sprint 2. |
| `testsS3.md` | Casos de prueba del Sprint 3. |
| `testsS4.md` | Casos de prueba del Sprint 4. |

## 16. Observaciones pendientes de verificación

1. **Persistencia:** H2 está configurada en memoria con `create-drop`; los datos se pierden al detener la aplicación.
2. **Secretos:** las propiedades de JWT y SMTP deben externalizarse y cualquier credencial expuesta debe rotarse.
3. **Correo:** `EmailService` está implementado y se invoca al crear una reserva, pero debe verificarse el funcionamiento real con SMTP.
4. **Error al enviar correo:** el envío se realiza después de guardar la reserva y no se observa un manejo local de excepción dentro de `EmailService`; debe probarse qué respuesta recibe el cliente si falla SMTP después de persistir la reserva.
5. **Seguridad de endpoints:** revisar la matriz completa de reglas de `SecurityConfig` junto con las anotaciones y el uso de la identidad autenticada en cada controlador, especialmente para reservas, favoritos y valoraciones.
6. **Pruebas:** los casos de prueba deben reflejar ejecuciones reales y no deducirse únicamente de la presencia del código.

---

**Fin de la documentación del backend de Reservas Carrizo.**
