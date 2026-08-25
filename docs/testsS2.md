# Tests — Sprint 2

## Introducción

Este documento reúne los **casos de prueba manuales** correspondientes a las Historias de Usuario HU12, HU13, HU14, HU15, HU16, HU17, HU18, HU20 y HU21 desarrolladas durante el Sprint 2 del proyecto Reservas Carrizo.

Su objetivo es verificar que cada funcionalidad desarrollada cumpla con los **criterios de aceptación definidos** y que la aplicación se comporte de manera consistente, usable y confiable.

La documentación está organizada de la siguiente manera:

- Cada HU se presenta como un bloque independiente.
- Se detallan sus criterios de aceptación.
- Se incluyen casos de prueba manuales para verificar cada funcionalidad.
- Cada caso contiene datos de entrada, pasos, resultado esperado y estado de validación.
- Los casos se ejecutarán posteriormente y su estado se actualizará a `OK` o `ERROR` según el resultado obtenido.

> **HU19 — Notificación: Confirmación de registro de usuario** queda fuera de este documento de ejecución del Sprint 2, ya que es una Historia de Usuario opcional que fue postergada para una etapa posterior del proyecto.


---

# HU 12 – Categorizar productos

## Criterios de aceptación

- Que se pueda asignar una categoría a un producto ya creado desde el panel de administración del sitio web de manera fácil e intuitiva.
- Que se pueda asignar una categoría a productos nuevos desde “Registrar producto” o “Editar producto”.

## Casos de prueba

### Caso 1: Asignar una categoría a un producto existente

- **Datos de entrada:**
  - Producto previamente registrado.
  - Categoría existente.

- **Pasos:**
  1. Ingresar al sistema como administrador.
  2. Acceder al panel de administración.
  3. Acceder a la gestión de productos.
  4. Seleccionar un producto previamente creado.
  5. Seleccionar una categoría.
  6. Guardar los cambios.

- **Resultado esperado:** La categoría se asigna correctamente al producto y la operación se completa sin errores.

- **Estado:** OK


### Caso 2: Verificar la categoría asignada a un producto

- **Datos de entrada:**
  - Producto previamente creado.
  - Categoría asignada al producto.

- **Pasos:**
  1. Ingresar al panel de administración.
  2. Acceder a la gestión de productos.
  3. Seleccionar un producto al que previamente se le haya asignado una categoría.
  4. Acceder a la opción correspondiente para consultar o editar la información del producto.
  5. Verificar la información asociada al producto.

- **Resultado esperado:** La categoría asignada previamente se mantiene correctamente asociada al producto.

- **Estado:** OK


### Caso 3: Asignar una categoría desde “Editar producto”

- **Datos de entrada:**
  - Producto existente.
  - Categoría existente.

- **Pasos:**
  1. Ingresar al panel de administración.
  2. Seleccionar un producto existente.
  3. Acceder a “Editar producto”.
  4. Seleccionar una categoría.
  5. Guardar los cambios.

- **Resultado esperado:** El producto queda correctamente asociado a la categoría seleccionada.

- **Estado:** OK


---

# HU 13 – Registrar usuario

## Criterios de aceptación

- Proporcionar información precisa y válida durante el proceso de registro, como nombre, apellido, dirección de correo electrónico y contraseña.
- Validar que los campos de nombre, apellido, dirección de correo electrónico y contraseña del usuario cumplan con reglas para prevenir errores en los datos proporcionados.
- Proporcionar una experiencia de usuario intuitiva y fácil de usar durante todo el proceso de registro.

## Casos de prueba

### Caso 1: Registro exitoso de un usuario

- **Datos de entrada:**
  - Nombre = “Juan”
  - Apellido = “Pérez”
  - Email = “juan.perez@test.com”
  - Contraseña = contraseña válida

- **Pasos:**
  1. Ingresar al sitio como usuario anónimo.
  2. Seleccionar “Crear cuenta”.
  3. Completar nombre.
  4. Completar apellido.
  5. Completar dirección de correo electrónico.
  6. Completar contraseña.
  7. Enviar el formulario.

- **Resultado esperado:** El usuario se registra correctamente y se informa que el registro fue realizado exitosamente.

- **Estado:** OK


### Caso 2: Validación del nombre

- **Datos de entrada:** Nombre vacío o con datos inválidos.

- **Pasos:**
  1. Acceder al formulario de registro.
  2. Completar los demás campos.
  3. Dejar el nombre vacío o ingresar un valor que no cumpla con las reglas establecidas.
  4. Intentar enviar el formulario.

- **Resultado esperado:** El sistema valida el campo nombre, informa el error correspondiente y no permite completar el registro.

- **Estado:** OK


### Caso 3: Validación del apellido

- **Datos de entrada:** Apellido vacío o con datos inválidos.

- **Pasos:**
  1. Acceder al formulario de registro.
  2. Completar los demás campos.
  3. Dejar el apellido vacío o ingresar un valor que no cumpla con las reglas establecidas.
  4. Intentar enviar el formulario.

- **Resultado esperado:** El sistema valida el campo apellido, informa el error correspondiente y no permite completar el registro.

- **Estado:** OK


### Caso 4: Validación de la dirección de correo electrónico

- **Datos de entrada:** Dirección de correo electrónico inválida.

- **Pasos:**
  1. Acceder al formulario de registro.
  2. Completar nombre, apellido y contraseña.
  3. Ingresar un correo electrónico con formato inválido.
  4. Intentar enviar el formulario.

- **Resultado esperado:** El sistema informa que la dirección de correo electrónico no es válida y no permite completar el registro.

- **Estado:** OK


### Caso 5: Validación de contraseña

- **Datos de entrada:** Contraseña vacía o que no cumple las reglas establecidas.

- **Pasos:**
  1. Acceder al formulario de registro.
  2. Completar nombre, apellido y correo electrónico.
  3. Ingresar una contraseña inválida.
  4. Intentar enviar el formulario.

- **Resultado esperado:** El sistema valida la contraseña, informa el error correspondiente y no permite completar el registro.

- **Estado:** OK


### Caso 6: Registro con campos obligatorios incompletos

- **Datos de entrada:** Uno o más campos obligatorios vacíos.

- **Pasos:**
  1. Acceder al formulario de registro.
  2. Dejar uno o más campos sin completar.
  3. Intentar enviar el formulario.

- **Resultado esperado:** El sistema informa los campos que deben ser completados y no realiza el registro.

- **Estado:** OK


### Caso 7: Experiencia de usuario durante el registro

- **Datos de entrada:** Datos válidos de un nuevo usuario.

- **Pasos:**
  1. Acceder al formulario de registro.
  2. Completar los campos.
  3. Observar la disposición y comportamiento de los campos.
  4. Enviar el formulario.

- **Resultado esperado:** El proceso de registro resulta claro, intuitivo y fácil de utilizar, permitiendo al usuario completar la operación sin confusiones.

- **Estado:** OK


---

# HU 14 – Cerrar sesión

## Criterios de aceptación

- Debe existir una opción “Cerrar sesión” disponible para el usuario autenticado.
- Al seleccionar “Cerrar sesión”, se debe eliminar la información de sesión del usuario.
- El usuario no debe poder acceder a funcionalidades destinadas exclusivamente a usuarios autenticados.
- Luego de cerrar sesión, el usuario debe continuar navegando como usuario anónimo.

## Casos de prueba

### Caso 1: Visualización de la opción “Cerrar sesión”

- **Datos de entrada:** Usuario autenticado.

- **Pasos:**
  1. Iniciar sesión con un usuario registrado.
  2. Abrir el menú del usuario.
  3. Observar las opciones disponibles.

- **Resultado esperado:** Se muestra la opción “Cerrar sesión”.

- **Estado:** OK


### Caso 2: Cierre de sesión exitoso

- **Datos de entrada:** Usuario autenticado.

- **Pasos:**
  1. Iniciar sesión.
  2. Abrir el menú del usuario.
  3. Hacer clic en “Cerrar sesión”.

- **Resultado esperado:** La sesión se cierra correctamente y el usuario vuelve al estado de usuario anónimo.

- **Estado:** OK


### Caso 3: Eliminación de la información de sesión

- **Datos de entrada:** Usuario autenticado.

- **Pasos:**
  1. Iniciar sesión.
  2. Abrir las herramientas de almacenamiento del navegador.
  3. Verificar la información almacenada.
  4. Cerrar sesión.
  5. Volver a verificar el almacenamiento.

- **Resultado esperado:** La información correspondiente al usuario autenticado es eliminada.

- **Estado:** OK


### Caso 4: Acceso posterior al cierre de sesión

- **Datos de entrada:** Usuario que cerró sesión.

- **Pasos:**
  1. Iniciar sesión.
  2. Cerrar sesión.
  3. Intentar acceder nuevamente a una funcionalidad destinada a usuarios autenticados.

- **Resultado esperado:** El usuario no puede utilizar la funcionalidad como usuario autenticado.

- **Estado:** OK


---

# HU 15 – Funcionalidades del usuario autenticado

## Criterios de aceptación

- Un usuario autenticado debe poder acceder a las funcionalidades disponibles para su cuenta.
- El usuario debe poder acceder a “Mi perfil”.
- La información del perfil debe corresponder al usuario autenticado.

## Casos de prueba

### Caso 1: Visualización de “Mi perfil”

- **Datos de entrada:** Usuario autenticado.

- **Pasos:**
  1. Iniciar sesión.
  2. Abrir el menú del usuario.
  3. Seleccionar “Mi perfil”.

- **Resultado esperado:** Se accede correctamente a la página “Mi perfil”.

- **Estado:** OK


### Caso 2: Visualización de los datos del usuario

- **Datos de entrada:** Usuario registrado con datos personales.

- **Pasos:**
  1. Iniciar sesión.
  2. Acceder a “Mi perfil”.
  3. Observar los datos mostrados.

- **Resultado esperado:** Se muestran los datos correspondientes al usuario autenticado.

- **Estado:** OK


### Caso 3: Acceso al perfil sin autenticación

- **Datos de entrada:** Usuario no autenticado.

- **Pasos:**
  1. Cerrar sesión.
  2. Intentar acceder a la página de perfil.

- **Resultado esperado:** El usuario no puede acceder a la funcionalidad destinada a usuarios autenticados.

- **Estado:** OK


---

# HU 16 – Identificar administrador

## Criterios de aceptación

- Asignar a un usuario como administrador para que pueda acceder a secciones de administración.
- Permitir añadir o quitar los permisos de administrador desde un listado de usuario registrado.
- Garantizar que el permiso se aplique de manera efectiva y que los usuarios solo puedan realizar acciones que tengan permitidas.

## Casos de prueba

### Caso 1: Asignación inicial de permisos de administrador

- **Datos de entrada:**
  - Usuario registrado.
  - Rol = ADMIN.

- **Precondición:** Debe existir un usuario registrado que pueda ser configurado como administrador.

- **Pasos:**
  1. Registrar un usuario en el sistema.
  2. Acceder a Postman o a la consola H2.
  3. Modificar el rol del usuario para asignarle el rol `ADMIN`.
  4. Guardar los cambios.
  5. Iniciar sesión con dicho usuario.

- **Resultado esperado:** El usuario queda identificado como administrador y puede acceder a las secciones de administración disponibles.

- **Estado:** OK


### Caso 2: Acceso de un administrador a las secciones de administración

- **Datos de entrada:** Usuario con rol `ADMIN`.

- **Pasos:**
  1. Iniciar sesión con un usuario administrador.
  2. Observar el menú y las opciones disponibles.
  3. Acceder al panel de administración.

- **Resultado esperado:** El usuario administrador puede acceder correctamente a las secciones destinadas a la administración del sitio.

- **Estado:** OK


### Caso 3: Acceso de un usuario común a las secciones de administración

- **Datos de entrada:** Usuario registrado con rol diferente de `ADMIN`.

- **Pasos:**
  1. Iniciar sesión con un usuario común.
  2. Observar las opciones disponibles.
  3. Intentar acceder a una sección de administración.

- **Resultado esperado:** El usuario común no puede acceder a las funcionalidades destinadas exclusivamente a administradores.

- **Estado:** OK


### Caso 4: Asignar permisos de administrador a otro usuario

- **Datos de entrada:**
  - Usuario administrador existente.
  - Usuario registrado sin permisos de administrador.

- **Precondición:** Debe existir un usuario con rol `ADMIN`.

- **Pasos:**
  1. Iniciar sesión como administrador.
  2. Acceder a la gestión de usuarios.
  3. Seleccionar un usuario registrado.
  4. Asignarle permisos de administrador.
  5. Guardar los cambios.
  6. Iniciar sesión con el usuario al que se le asignó el permiso.

- **Resultado esperado:** El usuario seleccionado adquiere el rol de administrador y puede acceder a las secciones de administración permitidas.

- **Estado:** OK


### Caso 5: Quitar permisos de administrador

- **Datos de entrada:** Usuario con rol `ADMIN`.

- **Pasos:**
  1. Iniciar sesión como administrador.
  2. Acceder a la gestión de usuarios.
  3. Seleccionar un usuario que tenga permisos de administrador.
  4. Quitarle los permisos de administrador.
  5. Guardar los cambios.
  6. Iniciar sesión con el usuario modificado.

- **Resultado esperado:** El usuario deja de tener permisos de administrador y ya no puede acceder a las funcionalidades exclusivas de administración.

- **Estado:** OK


### Caso 6: Aplicación efectiva de los permisos

- **Datos de entrada:**
  - Usuario administrador.
  - Usuario común.

- **Pasos:**
  1. Iniciar sesión con el usuario administrador.
  2. Intentar acceder a funcionalidades de administración.
  3. Cerrar sesión.
  4. Iniciar sesión con el usuario común.
  5. Intentar acceder a las mismas funcionalidades.

- **Resultado esperado:** El administrador puede realizar las acciones permitidas, mientras que el usuario común no puede acceder ni ejecutar funcionalidades exclusivas de administración.

- **Estado:** OK


---

# HU 17 – Administrar característica de producto

## Criterios de aceptación

- En el panel de administración existe la opción “Administrar características”.
- Se visualiza el listado de las características registradas con la opción de editar y eliminar.
- Existe un botón “Añadir nueva” que permite registrar una nueva característica indicando su nombre e icono asociado.
- Añadir en la opción de añadir o editar producto la posibilidad de asociar una o más características.

## Casos de prueba

### Caso 1: Acceso a “Administrar características”

- **Datos de entrada:** Usuario con rol `ADMIN`.

- **Pasos:**
  1. Iniciar sesión con un usuario administrador.
  2. Acceder al panel de administración.
  3. Seleccionar la opción “Administrar características”.

- **Resultado esperado:** Se accede correctamente a la sección de administración de características.

- **Estado:** OK


### Caso 2: Visualización de características registradas

- **Datos de entrada:** Características previamente registradas.

- **Pasos:**
  1. Ingresar como administrador.
  2. Acceder a “Administrar características”.
  3. Observar el listado.

- **Resultado esperado:** Se visualiza correctamente el listado de las características registradas.

- **Estado:** OK


### Caso 3: Editar una característica

- **Datos de entrada:**
  - Característica previamente registrada.
  - Nuevo nombre y/o icono.

- **Pasos:**
  1. Acceder a “Administrar características”.
  2. Seleccionar una característica existente.
  3. Seleccionar la opción “Editar”.
  4. Modificar sus datos.
  5. Guardar los cambios.

- **Resultado esperado:** La característica se actualiza correctamente y los nuevos datos se visualizan en el listado.

- **Estado:** OK


### Caso 4: Eliminar una característica

- **Datos de entrada:** Característica previamente registrada.

- **Pasos:**
  1. Acceder a “Administrar características”.
  2. Seleccionar una característica existente.
  3. Seleccionar la opción “Eliminar”.
  4. Confirmar la operación si corresponde.

- **Resultado esperado:** La característica se elimina correctamente y deja de aparecer en el listado.

- **Estado:** OK


### Caso 5: Acceder a “Añadir nueva”

- **Datos de entrada:** Usuario con rol `ADMIN`.

- **Pasos:**
  1. Acceder a “Administrar características”.
  2. Seleccionar el botón “Añadir nueva”.

- **Resultado esperado:** Se muestra el formulario para registrar una nueva característica.

- **Estado:** OK


### Caso 6: Crear una nueva característica

- **Datos de entrada:**
  - Nombre = “WiFi”
  - Icono = icono válido

- **Pasos:**
  1. Acceder a “Añadir nueva”.
  2. Ingresar el nombre de la característica.
  3. Seleccionar o indicar el icono correspondiente.
  4. Guardar la característica.

- **Resultado esperado:** La característica se registra correctamente y aparece en el listado de características.

- **Estado:** OK


---

# HU 18 – Visualizar características al producto

## Criterios de aceptación

- Crear un bloque que tenga el título “Características”.
- Debajo del título listar todas las características.
- Cada característica debe tener un icono asociado.
- El bloque debe ser responsivo a los diferentes tipos de dispositivos.

## Casos de prueba

### Caso 1: Visualización del bloque “Características”

- **Datos de entrada:** Producto que tenga características asociadas.

- **Pasos:**
  1. Ingresar al sitio.
  2. Acceder al detalle de un producto que tenga características.
  3. Observar la información mostrada en el detalle.

- **Resultado esperado:** Se visualiza un bloque con el título “Características”.

- **Estado:** OK


### Caso 2: Listado de características

- **Datos de entrada:** Producto con una o más características asociadas.

- **Pasos:**
  1. Acceder al detalle del producto.
  2. Ubicar el bloque “Características”.
  3. Observar las características mostradas.

- **Resultado esperado:** Debajo del título “Características” se muestran todas las características asociadas al producto.

- **Estado:** OK


### Caso 3: Visualización del icono asociado

- **Datos de entrada:** Producto con características que poseen iconos asociados.

- **Pasos:**
  1. Acceder al detalle del producto.
  2. Ubicar el bloque “Características”.
  3. Observar cada característica.

- **Resultado esperado:** Cada característica se muestra acompañada por su icono correspondiente.

- **Estado:** OK


### Caso 4: Producto con múltiples características

- **Datos de entrada:** Producto con dos o más características asociadas.

- **Pasos:**
  1. Acceder al detalle del producto.
  2. Observar el bloque “Características”.
  3. Contabilizar las características mostradas.
  4. Compararlas con las características asociadas al producto.

- **Resultado esperado:** Se muestran todas las características asociadas al producto, sin omitir ninguna.

- **Estado:** OK


### Caso 5: Visualización responsive

- **Datos de entrada:** Producto con características asociadas.

- **Pasos:**
  1. Acceder al detalle del producto desde una computadora.
  2. Repetir la prueba utilizando una resolución de tablet.
  3. Repetir la prueba utilizando una resolución de dispositivo móvil.
  4. Observar el bloque “Características” en cada resolución.

- **Resultado esperado:** El bloque se adapta correctamente a los diferentes tamaños de pantalla y mantiene sus características visibles y correctamente organizadas.

- **Estado:** OK


---

# HU 20 – Filtrar productos por categoría

## Criterios de aceptación

- Se debe visualizar una lista de categorías de productos en una sección de filtrado junto con los resultados de búsqueda.
- Se debe mostrar claramente la cantidad de productos que cumplen con los filtros aplicados y la cantidad total de productos en la lista de resultados.
- Se debe permitir seleccionar una o varias categorías para filtrar los productos.
- Se debe permitir eliminar los filtros aplicados y volver a la lista de productos original.
- El filtrado debe ser compatible con diferentes navegadores y dispositivos, incluyendo dispositivos móviles y tablets.

## Casos de prueba

### Caso 1: Visualización de las categorías

- **Datos de entrada:** Categorías registradas en el sistema.

- **Pasos:**
  1. Ingresar a la página principal.
  2. Ubicar la sección de categorías.
  3. Observar las categorías disponibles.

- **Resultado esperado:** Se muestra una lista de categorías disponibles para utilizar como filtros.

- **Estado:** OK


### Caso 2: Filtrado por una categoría

- **Datos de entrada:** Una categoría con productos asociados.

- **Pasos:**
  1. Ingresar al Home.
  2. Seleccionar una categoría.
  3. Observar los resultados.

- **Resultado esperado:** Se muestran únicamente los productos correspondientes a la categoría seleccionada.

- **Estado:** OK


### Caso 3: Filtrado por varias categorías

- **Datos de entrada:** Dos o más categorías con productos asociados.

- **Pasos:**
  1. Seleccionar una categoría.
  2. Seleccionar una segunda categoría.
  3. Observar los resultados.

- **Resultado esperado:** Se muestran los productos correspondientes a las categorías seleccionadas.

- **Estado:** OK


### Caso 4: Visualización de cantidades

- **Datos de entrada:** Lista de productos con categorías asignadas.

- **Pasos:**
  1. Aplicar uno o más filtros.
  2. Observar la información de resultados.

- **Resultado esperado:** Se informa claramente la cantidad de productos que cumplen con los filtros y la cantidad total de productos disponibles.

- **Estado:** OK


### Caso 5: Eliminación de filtros

- **Datos de entrada:** Filtros aplicados.

- **Pasos:**
  1. Seleccionar una o más categorías.
  2. Utilizar la opción para limpiar los filtros.
  3. Observar nuevamente los productos.

- **Resultado esperado:** Los filtros se eliminan y se vuelve a la lista original de productos.

- **Estado:** OK


### Caso 6: Categoría sin productos

- **Datos de entrada:** Categoría sin productos asociados.

- **Pasos:**
  1. Seleccionar una categoría que no tenga productos.
  2. Observar los resultados.

- **Resultado esperado:** El sistema informa que no existen productos que coincidan con el filtro y no se producen errores visuales.

- **Estado:** OK


### Caso 7: Visualización responsive

- **Datos de entrada:** Resoluciones desktop, tablet y mobile.

- **Pasos:**
  1. Ingresar al Home desde cada resolución.
  2. Utilizar el selector de categorías.
  3. Aplicar y eliminar filtros.

- **Resultado esperado:** El selector de categorías y los productos filtrados se visualizan correctamente en las distintas resoluciones.

- **Estado:** OK


---

# HU 21 – Agregar categoría

## Criterios de aceptación

- La categoría debe tener como atributos un título, una descripción y una imagen representativa.
- Debe incluirse en el panel de administración con la opción “Agregar categoría”.

## Casos de prueba

### Caso 1: Acceso a “Agregar categoría”

- **Datos de entrada:** Usuario administrador autenticado.

- **Pasos:**
  1. Ingresar al sistema como administrador.
  2. Acceder al panel de administración.
  3. Seleccionar “Agregar categoría”.

- **Resultado esperado:** Se muestra correctamente el formulario para crear una nueva categoría.

- **Estado:** OK


### Caso 2: Visualización de los campos

- **Datos de entrada:** Página “Agregar categoría”.

- **Pasos:**
  1. Ingresar a “Agregar categoría”.
  2. Observar el formulario.

- **Resultado esperado:** El formulario contiene campos para ingresar nombre/título, descripción e imagen.

- **Estado:** OK


### Caso 3: Creación exitosa de categoría

- **Datos de entrada:**
  - Nombre = “Cabañas”
  - Descripción = “Alojamientos rodeados de naturaleza”
  - Imagen = archivo JPG válido

- **Pasos:**
  1. Ingresar al formulario.
  2. Completar nombre.
  3. Completar descripción.
  4. Seleccionar una imagen.
  5. Verificar la vista previa.
  6. Presionar “Crear categoría”.

- **Resultado esperado:** La categoría se crea correctamente y se muestra un mensaje de confirmación.

- **Estado:** OK


### Caso 4: Validación de nombre obligatorio

- **Datos de entrada:** Nombre vacío.

- **Pasos:**
  1. Completar descripción.
  2. Seleccionar imagen.
  3. Presionar “Crear categoría”.

- **Resultado esperado:** Se informa que el nombre es obligatorio y no se realiza el envío.

- **Estado:** OK


### Caso 5: Validación de descripción obligatoria

- **Datos de entrada:** Descripción vacía.

- **Pasos:**
  1. Completar nombre.
  2. Seleccionar imagen.
  3. Presionar “Crear categoría”.

- **Resultado esperado:** Se informa que la descripción es obligatoria y no se realiza el envío.

- **Estado:** OK


### Caso 6: Validación de imagen obligatoria

- **Datos de entrada:** Imagen no seleccionada.

- **Pasos:**
  1. Completar nombre.
  2. Completar descripción.
  3. Presionar “Crear categoría”.

- **Resultado esperado:** Se informa que se debe seleccionar una imagen y no se realiza el envío.

- **Estado:** OK


### Caso 7: Validación del formato de imagen

- **Datos de entrada:** Archivo con formato no permitido.

- **Pasos:**
  1. Seleccionar un archivo que no sea JPG, PNG o WEBP.
  2. Observar el formulario.

- **Resultado esperado:** El archivo es rechazado y se informa que el formato no es válido.

- **Estado:** OK


### Caso 8: Validación del tamaño de imagen

- **Datos de entrada:** Imagen superior a 5 MB.

- **Pasos:**
  1. Seleccionar una imagen superior a 5 MB.
  2. Observar el formulario.

- **Resultado esperado:** La imagen es rechazada y se informa que no puede superar los 5 MB.

- **Estado:** OK


### Caso 9: Categoría duplicada

- **Datos de entrada:** Nombre de una categoría que ya existe.

- **Pasos:**
  1. Completar el formulario con un nombre existente.
  2. Completar descripción.
  3. Seleccionar una imagen.
  4. Presionar “Crear categoría”.

- **Resultado esperado:** Se informa que la categoría ya existe y no se crea un registro duplicado.

- **Estado:** OK


### Caso 10: Estado durante la creación

- **Datos de entrada:** Formulario completo y válido.

- **Pasos:**
  1. Completar todos los campos.
  2. Presionar “Crear categoría”.
  3. Observar el botón mientras se procesa la solicitud.

- **Resultado esperado:** El botón cambia a “Creando...” y queda deshabilitado mientras se procesa la solicitud.

- **Estado:** OK


---

# Resumen de ejecución

Al finalizar la ejecución de los casos de prueba se actualizará el estado de cada caso:

- `OK`: el comportamiento observado coincide con el resultado esperado.
- `ERROR`: el comportamiento observado no coincide con el resultado esperado y requiere revisión.
- `PENDIENTE`: caso todavía no ejecutado.


## HU opcional postergada

| HU | Historia | Estado |
|---|---|---|
| HU19 | Notificación: Confirmación de registro de usuario | Postergada |

