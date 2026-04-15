# 📚 Documentación Frontend - Proyecto Reservas Carrizo

## Visión General

**Proyecto Reservas Carrizo** es una aplicación React para reservas de propiedades (casas, departamentos, hoteles) con arquitectura frontend separada que consume APIs REST del backend.

**Estado actual:** Sprint 1 completado. Data almacenada en localStorage, sin backend integrado aún.

---

## 🏗️ Arquitectura y Stack

### Stack Tecnológico
- **React 19.2.0** + **React Router 7.9.5**
- **Vite 7.2.2** (build tool)
- **ESLint** (linting)
- **CSS Modules** (estilos)
- **localStorage** (persistencia temporal)

### Estructura de Carpetas
```
frontend/
├── src/
│   ├── main.jsx / App.jsx              # Punto entrada + routing
│   ├── pages/                          # Componentes de ruta (Page components)
│   │   ├── Main.jsx                    # Home (/)
│   │   ├── DetalleProductos.jsx        # Detalle producto (/producto/:id)
│   │   ├── Administracion.jsx          # Panel admin (/administración)
│   │   ├── AgregarProducto.jsx         # Agregar producto
│   │   └── ListaProductosAdmin.jsx     # Listar para admin
│   ├── components/                     # Componentes reutilizables
│   │   ├── Header.jsx                  # Header global (fixed)
│   │   ├── Footer.jsx                  # Footer global
│   │   ├── ListadoProductos.jsx        # Lista home con paginación
│   │   ├── GaleriaProductos.jsx        # Galería 5 imágenes
│   │   └── [varios componentes]
│   ├── hooks/                          # Custom React hooks
│   │   ├── useProductosAleatorios.js   # Lógica aleatoria (Fisher-Yates)
│   │   ├── useProductosLocalStorage.js # Lectura/escritura localStorage
│   │   └── [hooks personalizados]
│   ├── helpers/                        # Funciones puras (sin estado)
│   │   ├── storageUtils.js             # Wrapper localStorage seguro
│   │   ├── productoUtils.js            # Helpers productos
│   │   ├── imageUtils.js               # Helpers imágenes
│   │   └── validaciones.js             # Validaciones comunes
│   ├── styles/
│   │   ├── variables.css               # Paleta de colores (CSS variables)
│   │   ├── components/                 # CSS por componente
│   │   └── pages/                      # CSS por página
│   └── assets/
│       ├── logo.png / placeholder.png
├── public/
│   └── assets/                         # Imágenes estáticas
├── package.json                        # Dependencias
├── vite.config.js                      # Config Vite
└── eslint.config.js                    # Config ESLint
```

---

## 🎯 Patrones y Convenciones

### 1. **Separación de Responsabilidades**
- **Pages**: Componentes de ruta (páginas completas)
- **Components**: Componentes reutilizables
- **Hooks**: Lógica de estado y efectos
- **Helpers**: Funciones puras, sin estado

### 2. **Nombrado de Archivos**
- **PascalCase**: Componentes (`Header.jsx`, `ProductoCard.jsx`)
- **camelCase**: Hooks (`useProductosAleatorios.js`)
- **camelCase**: Helpers (`storageUtils.js`, `productoUtils.js`)

### 3. **Estructura CSS**
- **variables.css**: Paleta global de colores
- **components/**: CSS por componente
- **pages/**: CSS por página
- **CSS Modules**: Estilos scoped por componente

### 4. **Data Flow**
- **localStorage**: Persistencia temporal
- **Helpers**: Acceso seguro a localStorage
- **Hooks**: Gestión de estado y efectos
- **Components**: UI y eventos

---

## 🌐 Routing y Navegación

### Rutas Principales
```javascript
// App.jsx
<Routes>
  <Route path="/" element={<Main />} />
  <Route path="/administración" element={<Administracion />} />
  <Route path="/agregar-producto" element={<AgregarProducto />} />
  <Route path="/lista-productos" element={<ListaProductosAdmin />} />
  <Route path="/producto/:id" element={<DetalleProductos />} />
</Routes>
```

### Patrón de Navegación
- **useNavigate()**: Navegación programática
- **Link**: Navegación declarativa
- **useParams()**: Captura de parámetros URL

---

## 💾 Gestión de Estado y Datos

### Modelo de Producto
```javascript
{
  id: number,           // Date.now() en creación
  nombre: string,       // Requerido, sin duplicados
  descripcion: string,  // Requerido
  tipo: string,         // 'casa' | 'departamento' | 'hotel'
  imagenes: string[]    // Array de base64 o URLs
}
```

### Acceso a Datos (localStorage)
```javascript
// ✅ CORRECTO - Usar helpers
import { leerLocal, escribirLocal, updateLocal } from './helpers/storageUtils';

const productos = leerLocal('productos', []);
escribirLocal('productos', [...productos, nuevoProducto]);
updateLocal('productos', (lista) => lista.filter(p => p.id !== id));

// ❌ INCORRECTO - Acceso directo
localStorage.setItem('productos', JSON.stringify(...));
```

### Validación
```javascript
// Helpers para validación
import { existeProducto, crearProducto } from './helpers/productoUtils';

if (existeProducto(productos, nuevoNombre)) {
  mostrarError("Ya existe un producto con ese nombre");
  return;
}
```

---

## 🎨 Sistema de Estilos

### Variables Globales (variables.css)
```css
:root {
  /* Base verde */
  --color-primario: #2ECC71;   /* Botones principales, acentos */
  --color-secundario: #27AE60; /* Hover, enlaces, detalles */

  /* Fondos */
  --color-header-bg: #1B5E20;  /* Verde profundo para header */
  --color-footer-bg: #3d9141;  /* Verde oscuro para footer */
  --color-fondo: #F1F8E9;      /* Verde muy claro para contenido principal */

  /* Texto */
  --color-texto: #212121;      /* Gris oscuro para legibilidad */
  --color-texto-invertido: #FFFFFF; /* Texto sobre header/footer oscuros */

  /* Estados */
  --color-exito: #00C853;      /* Verde intenso para confirmaciones */
  --color-error: #C62828;      /* Rojo controlado para errores */
  --color-alerta: #F9A825;     /* Amarillo para advertencias */
}
```

### Patrón de Estilos
- **CSS por componente**: `Header.css`, `Footer.css`
- **CSS por página**: `Main.css`, `Administracion.css`
- **Responsive**: Media queries en cada componente
- **Consistencia**: Variables globales para colores

---

## 🔧 Hooks y Helpers Principales

### Custom Hooks

#### `useProductosAleatorios.js`
```javascript
// Lógica de selección aleatoria (Fisher-Yates)
const productosAleatorios = useProductosAleatorios(productos, 10);
```

#### `useProductosLocalStorage.js`
```javascript
// Gestión de estado con localStorage
const { productos, agregarProducto, eliminarProducto } = useProductosLocalStorage();
```

### Helpers

#### `storageUtils.js`
```javascript
// Wrapper seguro para localStorage
leerLocal(clave, defecto)      // Lee con manejo de errores
escribirLocal(clave, valor)    // Escribe con validación
updateLocal(clave, callback)   // Actualiza atómicamente
```

#### `productoUtils.js`
```javascript
// Funciones puras para productos
crearProducto({ nombre, descripcion, tipo, imagenes })
existeProducto(productos, nombre)
obtenerProductoPorId(productos, id)
obtenerProductosAleatorios(productos, cantidad)
```

---

## 📱 Componentes Principales

### Layout Global
- **Header**: Fixed, navegación, logo
- **Footer**: Información legal, logo

### Páginas (Pages)
- **Main**: Home con productos aleatorios
- **DetalleProductos**: Vista detalle producto
- **Administracion**: Panel admin (desktop-only)
- **AgregarProducto**: Formulario agregar
- **ListaProductosAdmin**: Tabla admin

### Componentes Reutilizables
- **ListadoProductos**: Lista con paginación
- **GaleriaProductos**: Galería 5 imágenes + modal
- **Paginador**: Componente de paginación
- **FormularioProducto**: Formulario con validación

---

## 🔄 Flujos de Usuario

### Flujo de Home
```
1. Usuario ingresa a /
2. Main.jsx carga productos aleatorios
3. useProductosAleatorios() obtiene 10 productos random
4. ListadoProductos muestra grid de productos
5. Usuario hace click en producto
6. Navega a /producto/:id
```

### Flujo de Detalle
```
1. Usuario en /producto/:id
2. useParams() captura id
3. obtenerProductoPorId() busca en localStorage
4. GaleriaProductos muestra imágenes (5 + modal)
5. Usuario puede volver con navigate(-1)
```

### Flujo de Admin
```
1. Usuario va a /administración
2. useDispositivo() verifica si es desktop
3. Si mobile: muestra mensaje de restricción
4. Si desktop: muestra panel con opciones
5. Navegación a /agregar-producto o /lista-productos
```

---

## 🛠️ Workflows de Desarrollo

### Build & Run
```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev                    # localhost:5173

# Build para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

### Testing
```javascript
// En DevTools Console
// Ver productos en localStorage
console.log(leerLocal('productos', []));

// Limpiar datos de prueba
localStorage.clear();
```

---

## 📋 Checklist de Features (Sprint 1)

### ✅ Completadas
- [x] **HU 1**: Header con navegación
- [x] **HU 2**: Layout principal (Main)
- [x] **HU 3**: Formulario agregar producto
- [x] **HU 4**: Productos aleatorios en home
- [x] **HU 5**: Detalle de producto
- [x] **HU 6**: Galería de imágenes
- [x] **HU 7**: Footer
- [x] **HU 8**: Paginación
- [x] **HU 9**: Panel admin (desktop-only)
- [x] **HU 10**: Listar productos admin
- [x] **HU 11**: Eliminar producto

### 📊 Estadísticas
- **11 Historias de Usuario** completadas
- **~20 Componentes** creados
- **~10 Hooks/Helpers** implementados
- **Responsive Design** en componentes públicos
- **localStorage** como BD temporal

---

## 🚀 Próximas Extensiones

### Sprint 2 (Backend Integration)
- [ ] Reemplazar localStorage con fetch a APIs
- [ ] Implementar autenticación JWT
- [ ] Migrar imágenes a cloud storage
- [ ] Agregar búsqueda y filtros
- [ ] Implementar reviews de productos

### Mejoras Técnicas
- [ ] TypeScript migration
- [ ] Context API o Redux para estado global
- [ ] Testing con Vitest + RTL
- [ ] PWA capabilities
- [ ] Internationalization (i18n)

---

## 💡 Tips para Desarrolladores

1. **Siempre usar helpers** para localStorage (nunca acceso directo)
2. **Validar antes de guardar** con existeProducto()
3. **Usar variables CSS** para colores consistentes
4. **Hooks para lógica** de estado, helpers para funciones puras
5. **Responsive first** en componentes públicos, desktop-only en admin
6. **Componentes modulares** y reutilizables
7. **Efectos secundarios** solo en hooks, no en render

---

## 📖 Referencias

- **Backend**: Ver `/docs/DOCUMENTACION_BACKEND.md`
- **Bitácora**: Ver `/docs/bitacora.md` (detalle de HUs)
- **Identidad**: Ver `/docs/identidad-marca.md`
- **AGENTS**: Ver `/AGENTS.md` (contexto general)

---

**Última actualización:** 2026-04-15
**Frontend:** React 19.2.0 + Vite 7.2.2
**Estado:** Sprint 1 completado ✅
