# 🏡 Reservas Carrizo

Aplicación web para consultar productos de alojamiento, revisar disponibilidad y gestionar reservas. Los usuarios pueden registrarse, iniciar sesión, guardar favoritos, consultar sus reservas y valorar productos. El panel administrativo permite gestionar productos, categorías, características y usuarios según los permisos configurados.

## ⚙️ Tecnologías

### Frontend
- React 19
- JavaScript y JSX
- Vite 7
- React Router
- Axios
- CSS

### Backend
- Java 17
- Spring Boot 4.0.2
- Spring Data JPA
- Spring Security y JWT
- Bean Validation
- H2 Database
- Java Mail Sender para notificaciones por correo
- Maven

## ✨ Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Catálogo, detalle y búsqueda de productos.
- Filtrado por categorías y consulta de disponibilidad.
- Registro e historial de reservas.
- Gestión de productos favoritos.
- Valoraciones de productos.
- Contacto con el proveedor mediante WhatsApp.
- Notificaciones por correo asociadas a las reservas.
- Administración de productos, categorías, características y usuarios.

## 📁 Estructura del proyecto

```text
reservas-carrizo/
├── frontend/   # Aplicación React + Vite
├── backend/    # API REST con Java y Spring Boot
└── docs/       # Documentación, bitácora y casos de prueba
```

## 🚀 Instalación y ejecución local

### Requisitos previos

- Node.js y npm.
- JDK 17.
- Git.
- Conexión a Internet para instalar las dependencias.

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd proyecto-reservas-carrizo
```

Reemplazá `<URL_DEL_REPOSITORIO>` por la URL real del repositorio.

### 2. Configurar y ejecutar el backend

Desde la raíz del proyecto:

```bash
cd backend
```

Revisá `src/main/resources/application.properties` antes de ejecutar la aplicación. La configuración actual utiliza H2 en memoria, por lo que los datos se reinician cuando se detiene el backend.

Configurá las credenciales de correo y cualquier secreto mediante variables de entorno o una configuración local no versionada. **No publiques contraseñas, claves JWT ni credenciales SMTP en Git.**

Para ejecutar con Maven Wrapper en Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

En Linux o macOS:

```bash
./mvnw spring-boot:run
```

El backend se ejecuta normalmente en:

`http://localhost:8080`

La consola H2 está configurada en:

`http://localhost:8080/h2-console`

La disponibilidad de la consola depende de la configuración de seguridad y del entorno de ejecución.

### 3. Configurar y ejecutar el frontend

En otra terminal, desde la raíz del repositorio:

```bash
cd frontend
npm install
npm run dev
```

Vite informa en la terminal la dirección local de la aplicación; la configuración habitual es:

`http://localhost:5173`

Si la URL del backend se configura mediante variables de entorno, revisá los servicios del frontend y el archivo de configuración correspondiente antes de crear o modificar un `.env`.

### 4. Compilar y revisar el frontend

Desde `frontend/`:

```bash
npm run build
npm run lint
```

## 📬 API REST

El backend expone endpoints REST para las principales funcionalidades del sistema. Entre las operaciones documentadas se encuentran:

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/producto/{id}` | Consultar el detalle de un producto. |
| `GET` | `/api/producto/buscar?texto={texto}` | Buscar productos por texto. |
| `GET` | `/api/reserva/disponibles` | Consultar productos disponibles para un rango de fechas. |
| `GET` | `/api/reserva/disponibilidad/{productoId}` | Consultar reservas asociadas a un producto. |
| `POST` | `/api/reserva` | Registrar una reserva. |
| `GET` | `/api/reserva/mis-reservas` | Consultar el historial del usuario autenticado. |

Los parámetros requeridos, el formato de las solicitudes y las reglas de autorización deben consultarse en los controladores y en `docs/DOCUMENTACION_BACKEND.md`.

## 🧪 Testing

La carpeta `docs/` contiene casos de prueba manuales organizados por sprint:

- `testsS1.md`
- `testsS2.md`
- `testsS3.md`
- `testsS4.md`


El frontend incluye scripts para compilar y ejecutar ESLint. Actualmente, `package.json` no define un script `npm test`.

## 📚 Documentación

La carpeta `docs/` contiene información complementaria del proyecto:

- `DOCUMENTACION_FRONTEND.md`: arquitectura y funcionalidades del frontend.
- `DOCUMENTACION_BACKEND.md`: arquitectura, servicios y endpoints del backend.
- `bitacora.md`: evolución del proyecto por sprint e historias de usuario.
- `identidad-marca.md`: lineamientos visuales.
- `testsS1.md`, `testsS2.md`, `testsS3.md` y `testsS4.md`: casos de prueba por sprint.

## 🔐 Seguridad y configuración

- No subir archivos con contraseñas, tokens, claves JWT ni credenciales de correo.
- Usar credenciales de prueba y variables de entorno para la configuración local.
- La base H2 está configurada en memoria y con `create-drop`; no debe considerarse almacenamiento persistente para producción.
- Antes de desplegar, revisar la configuración de seguridad, CORS, base de datos, correo y secretos.

## 👥 Autores

Proyecto academico realizado por Joaquin Carrizo Paglialunga

