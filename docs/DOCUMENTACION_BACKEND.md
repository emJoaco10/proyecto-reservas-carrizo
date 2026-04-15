# 📚 Documentación Backend - Comentarios Completos

## Resumen de Cambios

Se han agregado **comentarios exhaustivos** en todas las capas del backend para facilitar la comprensión del código:

---

## 🗂️ Estructura de Capas

### 1. **Models** (Entidades JPA)

#### `Producto.java`
- **Propósito:** Mapea tabla `productos` en BD H2
- **Campos clave:**
  - `id`: Long (autoincrement)
  - `nombre`: String (UNIQUE, NOT NULL) - para evitar duplicados
  - `descripcion`: String
  - `tipo`: String ('casa' | 'departamento' | 'hotel')
  - `imagenes`: List<String> (@ElementCollection - tabla separada en BD)

**Comentarios agregados:**
- Documentación de clase (propósito, versión)
- Explicación de cada anotación JPA (@Entity, @Table, @Id, @Column, @ElementCollection)
- Comentarios en campos (propósito, constraints)
- Constructores documentados (con parámetros y sin parámetros para JPA)

---

#### `Usuario.java`
- **Propósito:** Mapea tabla `usuarios` en BD H2
- **Campos clave:**
  - `id`: Long (autoincrement)
  - `nombre`: String
  - `email`: String (UNIQUE)
  - `contraseña`: String (almacenada hasheada con BCrypt)

**Comentarios agregados:**
- Documentación de clase (propósito, seguridad de contraseña)
- Explicación de anotaciones JPA
- ⚠️ Advertencia sobre contraseñas hasheadas
- Documentación detallada de constructores
- Nota de seguridad en setter de contraseña

---

### 2. **Repositories** (Acceso a Datos)

#### `ProductoRepository.java`
- Interfaz que extiende `JpaRepository<Producto, Long>`
- Proporciona CRUD automático (save, findById, findAll, delete, exists, etc.)
- Método personalizado: `findByNombre()` - para validar duplicados

**Comentarios agregados:**
- Documentación de clase (propósito, herencia)
- Lista de operaciones CRUD proporcionadas automáticamente
- Documentación del método personalizado
- Explicación de Optional para manejo seguro

---

#### `UsuarioRepository.java`
- Interfaz que extiende `JpaRepository<Usuario, Long>`
- Método personalizado: `findByEmail()` - para login

**Comentarios agregados:**
- Documentación de clase (propósito, métodos CRUD)
- Explicación del método personalizado (para login)
- Uso de Optional

---

### 3. **Services** (Lógica de Negocio)

#### `ProductoService.java`

**Métodos documentados:**

1. **`guardarProducto(Producto)`**
   - Valida que no exista producto con mismo nombre
   - Lanza `IllegalArgumentException` si duplicado
   - Retorna producto guardado con ID asignado

2. **`obtenerProductosAleatorios(int cantidad)`**
   - Obtiene todos los productos
   - Los baraja con Collections.shuffle()
   - Limita a cantidad solicitada
   - NOTA: Para BDs grandes, considerar usar SQL RANDOM()

3. **`obtenerPorId(Long id)`**
   - Busca producto por ID
   - Retorna Optional<Producto>

4. **`obtenerPaginados(int page, int size)`**
   - Retorna Page<Producto> con metadata
   - Útil para listados grandes
   - page es 0-indexed

5. **`obtenerTodos()`**
   - Retorna lista completa sin paginación
   - ⚠️ CUIDADO: Puede ser lento en tablas grandes

6. **`borrarTodos()`**
   - ⚠️ OPERACIÓN DESTRUCTIVA
   - Usar solo en testing/reseteo

7. **`eliminarProducto(Long id)`**
   - Valida que producto exista
   - Lanza excepción si no existe
   - Elimina producto

**Comentarios agregados:**
- Documentación de clase (propósito, validación)
- Documentación de cada método con flujo paso-a-paso
- Parámetros y retorno documentados
- Excepciones y advertencias destacadas
- Notas sobre optimización futura

---

#### `UsuarioService.java`

**Métodos documentados:**

1. **`crearUsuario(Usuario usuario)`**
   - Hashea contraseña con BCryptPasswordEncoder
   - Guarda usuario en BD
   - Retorna usuario con ID asignado

2. **`findByEmail(String email)`**
   - Busca usuario por email
   - Retorna Optional<Usuario>
   - Útil para verificar email registrado

3. **`validarLogin(String email, String contraseña)`**
   - Busca usuario por email
   - Compara contraseña ingresada con hash
   - Usa `passwordEncoder.matches()` (seguro)
   - Retorna boolean

**Comentarios agregados:**
- Documentación de clase (propósito, seguridad)
- Documentación de inyección de dependencias
- Documentación detallada de cada método con flujo
- ⚠️ Advertencias de seguridad (nunca comparar strings directamente)
- Explicación de BCrypt y passwordEncoder.matches()

---

### 4. **DTOs** (Data Transfer Objects)

#### `ProductoDTO.java`

- **Propósito:** Transferir datos Producto entre Backend-Frontend
- **Diferencia Entity vs DTO:**
  - Entity: Mapea BD, contiene lógica de persistencia
  - DTO: Ligero, solo datos necesarios
- **Conversion:** Controller convierte Producto → ProductoDTO

**Comentarios agregados:**
- Documentación de clase (propósito, ventajas DTO)
- Explicación de diferencia Entity vs DTO
- Documentación de cada campo
- Documentación de constructores (default y completo)
- Explicación de mapeo Entity → DTO

---

### 5. **Controllers** (Endpoints REST)

#### `ProductoController.java`

**Endpoints documentados:**

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/producto` | Registrar nuevo producto |
| GET | `/api/producto/aleatorios` | Obtener aleatorios (10) |
| GET | `/api/producto/{id}` | Obtener por ID |
| GET | `/api/producto/paginados` | Obtener paginados |
| GET | `/api/producto/admin` | Obtener todos (admin) |
| DELETE | `/api/producto` | Eliminar TODOS (⚠️) |
| DELETE | `/api/producto/{id}` | Eliminar uno |

**Comentarios agregados por endpoint:**
- Documentación de clase (propósito, CORS, endpoints)
- Ruta base y lista de endpoints
- Documentación completa de cada método:
  - Explicación de parámetros
  - Flujo paso-a-paso
  - Validaciones
  - Códigos HTTP esperados
  - Mapeo Entity → DTO
  - Casos de uso en frontend

**Patrones destacados:**
1. **Siempre se retorna DTO, nunca Entity**
2. **Mapeo manual (no MapStruct) en Sprint 1**
3. **CORS habilitado para http://localhost:5173**
4. **Manejo de errores con IllegalArgumentException en Service**
5. **ResponseEntity<?> para respuestas flexibles**

---

## 🔄 Flujos Principales

### Flujo de Creación de Producto

```
1. Frontend → POST /api/producto (ProductoDTO en cuerpo)
2. Controller recibe ProductoDTO
3. Controller mapea DTO → Entity (Producto)
4. Controller llama Service.guardarProducto()
5. Service valida nombre no duplicado
6. Service persiste en BD (id autoincrement)
7. Service retorna Entity guardado
8. Controller mapea Entity → DTO
9. Controller retorna 200 OK + ProductoDTO con id
10. Frontend recibe respuesta
```

### Flujo de Login de Usuario

```
1. Frontend → POST /api/usuario/login (email, contraseña)
2. Controller recibe credenciales
3. Controller llama Service.validarLogin()
4. Service busca usuario por email
5. Service compara contraseña con hash (passwordEncoder.matches)
6. Service retorna true/false
7. Controller retorna 200 OK + JWT token (futuro)
8. Frontend almacena token
```

---

## 🔐 Consideraciones de Seguridad

### Contraseñas
- ✅ Se hashean con **BCryptPasswordEncoder**
- ✅ Nunca se transmiten en texto plano (futuro: usar HTTPS)
- ✅ Se comparan con `passwordEncoder.matches()` (seguro)
- ⚠️ Actualmente **Sin JWT/OAuth2** (TODO)

### CORS
- ✅ Limitado a `http://localhost:5173` (frontend)
- ⚠️ En producción: configurar dominio real

### Validación
- ✅ Nombres únicos (evita duplicados)
- ✅ Email único (evita duplicados)
- ✅ Campos required en Entity (@Column nullable=false)
- ⚠️ TODO: Agregar @Valid y Bean Validation

---

## 📋 Checklist de Cobertura

### Models ✅
- [x] Producto.java - Comentarios completos
- [x] Usuario.java - Comentarios completos

### Repositories ✅
- [x] ProductoRepository.java - Comentarios completos
- [x] UsuarioRepository.java - Comentarios completos

### Services ✅
- [x] ProductoService.java - Comentarios exhaustivos
- [x] UsuarioService.java - Comentarios exhaustivos

### DTOs ✅
- [x] ProductoDTO.java - Comentarios completos
- [ ] UsuarioDTO.java - Por documentar (futura tarea)

### Controllers ✅
- [x] ProductoController.java - Comentarios EXHAUSTIVOS
- [ ] UsuarioController.java - Por documentar (futura tarea)
- [ ] AdminController.java - Por documentar (futura tarea)

---

## 🎯 Próximos Pasos

1. **UsuarioDTO.java** - Documentar DTO de usuario
2. **UsuarioController.java** - Documentar endpoints de autenticación
3. **AdminController.java** - Documentar endpoints de admin
4. **GlobalExceptionHandler.java** - Documentar manejo de excepciones
5. **SecurityConfig.java** - Documentar configuración de seguridad

---

## 💡 Tips para Leer el Código

1. **Comienza por ProductoController.java** - Entiende los endpoints
2. **Sigue a ProductoService.java** - Entiende la lógica
3. **Revisa ProductoRepository.java** - Entiende acceso a datos
4. **Consulta Producto.java** - Entiende estructura de datos
5. **Verifica ProductoDTO.java** - Entiende transformación de datos

---

## 📖 Referencias

- **Arquitectura:** Ver `/AGENTS.md` para visión general
- **Bitácora:** Ver `/docs/bitacora.md` para historia de features
- **BD:** `localhost:8080/h2-console` para inspeccionar datos
- **Swagger:** (futuro) `/v3/api-docs` para documentación interactiva

---

**Última actualización:** 2026-04-15
**Versión Backend:** Spring Boot 4.0.2, Java 17

