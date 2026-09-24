# Tests --- Sprint 3

## Introducción

Este documento reúne los **casos de prueba manuales** correspondientes a
las Historias de Usuario **HU22, HU23, HU24, HU25, HU26, HU27, HU28 y
HU29** desarrolladas durante el Sprint 3 del proyecto **Reservas
Carrizo**.

Su objetivo es verificar que cada funcionalidad desarrollada cumpla con
los **criterios de aceptación definidos** y que la aplicación se
comporte de manera consistente, usable y confiable.

La documentación mantiene la misma estructura utilizada en los tests de
los Sprints 1 y 2:

-   Cada HU se presenta como un bloque independiente.
-   Se detallan sus criterios de aceptación.
-   Se incluyen casos de prueba manuales.
-   Cada caso contiene datos de entrada, pasos, resultado esperado y
    estado de validación.
-   El estado se registra como `OK`, `ERROR` o `PENDIENTE` según el
    resultado obtenido.

------------------------------------------------------------------------

# HU 22 -- Realizar búsqueda

## Criterios de aceptación

-   Debe existir un bloque de búsqueda con título y descripción.
-   Se debe permitir buscar productos mediante palabras clave.
-   Debe existir un selector de fecha inicial y fecha final.
-   Debe existir un botón "Realizar búsqueda".
-   Los resultados deben ser relevantes respecto de la búsqueda
    realizada.
-   Deben existir sugerencias interactivas durante la escritura.
-   La búsqueda debe resultar intuitiva y fácil de utilizar.
-   Las categorías y recomendaciones existentes en el Home deben
    mantenerse disponibles.

## Casos de prueba

### Caso 1: Visualización del bloque de búsqueda

-   **Datos de entrada:** Acceso a la página principal.
-   **Pasos:**
    1.  Ingresar al Home.
    2.  Ubicar la sección del buscador.
    3.  Observar el título, descripción y campos disponibles.
-   **Resultado esperado:** Se visualiza correctamente el bloque de
    búsqueda con sus elementos principales.
-   **Estado:** OK

### Caso 2: Búsqueda por palabra clave

-   **Datos de entrada:** Texto correspondiente al nombre de un producto
    existente.
-   **Pasos:**
    1.  Ingresar al Home.
    2.  Escribir una palabra clave en el campo de búsqueda.
    3.  Presionar "Realizar búsqueda".
-   **Resultado esperado:** Se muestran productos relacionados con la
    palabra ingresada.
-   **Estado:** OK

### Caso 3: Búsqueda sin coincidencias

-   **Datos de entrada:** Texto que no corresponda a ningún producto
    registrado.
-   **Pasos:**
    1.  Ingresar un texto inexistente.
    2.  Presionar "Realizar búsqueda".
    3.  Observar los resultados.
-   **Resultado esperado:** El sistema informa que no existen productos
    que coincidan con la búsqueda y no se producen errores.
-   **Estado:** OK

### Caso 4: Sugerencias durante la escritura

-   **Datos de entrada:** Parte del nombre de un producto existente.
-   **Pasos:**
    1.  Seleccionar el campo de búsqueda.
    2.  Comenzar a escribir el nombre de un producto.
    3.  Observar las sugerencias.
-   **Resultado esperado:** Se muestran sugerencias relacionadas con el
    texto ingresado.
-   **Estado:** OK

### Caso 5: Selección de una sugerencia

-   **Datos de entrada:** Texto parcial de un producto con sugerencias
    disponibles.
-   **Pasos:**
    1.  Escribir parte del nombre del producto.
    2.  Seleccionar una sugerencia.
    3.  Observar el campo de búsqueda.
-   **Resultado esperado:** La sugerencia seleccionada se incorpora
    correctamente al campo de búsqueda.
-   **Estado:** OK

### Caso 6: Selección de fechas

-   **Datos de entrada:** Fecha inicial y fecha final válidas.
-   **Pasos:**
    1.  Abrir el selector de fechas.
    2.  Seleccionar una fecha inicial.
    3.  Seleccionar una fecha final.
-   **Resultado esperado:** El rango de fechas seleccionado se muestra
    correctamente.
-   **Estado:** OK

### Caso 7: Realización de búsqueda con fechas

-   **Datos de entrada:** Palabra clave y rango de fechas válido.
-   **Pasos:**
    1.  Ingresar una palabra clave.
    2.  Seleccionar fecha inicial.
    3.  Seleccionar fecha final.
    4.  Presionar "Realizar búsqueda".
-   **Resultado esperado:** Se ejecuta la búsqueda y se muestran los
    resultados correspondientes.
-   **Estado:** OK

### Caso 8: Mantenimiento de categorías y recomendaciones

-   **Datos de entrada:** Página principal con categorías y
    recomendaciones.
-   **Pasos:**
    1.  Ingresar al Home.
    2.  Utilizar el buscador.
    3.  Observar nuevamente las secciones de categorías y
        recomendaciones.
-   **Resultado esperado:** Las secciones de categorías y
    recomendaciones continúan disponibles y funcionando correctamente.
-   **Estado:** OK

------------------------------------------------------------------------

# HU 23 -- Visualizar disponibilidad

## Criterios de aceptación

-   Debe existir una sección para visualizar la disponibilidad del
    alojamiento.
-   Se deben mostrar las fechas ocupadas.
-   El usuario debe poder seleccionar un rango de fechas.
-   No se debe permitir seleccionar un rango que contenga fechas
    ocupadas.
-   El calendario debe permitir navegar entre meses.
-   La información debe mantenerse correctamente en diferentes
    resoluciones.

## Casos de prueba

### Caso 1: Visualización del calendario

-   **Datos de entrada:** Producto existente con disponibilidad
    registrada.
-   **Pasos:**
    1.  Ingresar al detalle de un producto.
    2.  Ubicar la sección de disponibilidad.
    3.  Observar el calendario.
-   **Resultado esperado:** Se visualiza correctamente el calendario de
    disponibilidad.
-   **Estado:** OK

### Caso 2: Visualización de fechas ocupadas

-   **Datos de entrada:** Producto con una o más reservas existentes.
-   **Pasos:**
    1.  Acceder al detalle del producto.
    2.  Observar el calendario.
    3.  Identificar las fechas ocupadas.
-   **Resultado esperado:** Las fechas correspondientes a reservas
    existentes se muestran como ocupadas.
-   **Estado:** OK

### Caso 3: Selección de un rango disponible

-   **Datos de entrada:** Rango de fechas sin reservas.
-   **Pasos:**
    1.  Seleccionar una fecha inicial disponible.
    2.  Seleccionar una fecha final disponible.
-   **Resultado esperado:** El rango se selecciona correctamente.
-   **Estado:** OK

### Caso 4: Selección de una fecha ocupada

-   **Datos de entrada:** Fecha perteneciente a una reserva existente.
-   **Pasos:**
    1.  Abrir el calendario.
    2.  Intentar seleccionar una fecha ocupada.
-   **Resultado esperado:** La fecha ocupada no puede seleccionarse como
    fecha disponible.
-   **Estado:** OK

### Caso 5: Rango que contiene una fecha ocupada

-   **Datos de entrada:** Fecha inicial y fecha final que incluyen una
    fecha ocupada en el medio.
-   **Pasos:**
    1.  Seleccionar una fecha inicial.
    2.  Seleccionar como fecha final una fecha posterior a una fecha
        ocupada.
-   **Resultado esperado:** El sistema rechaza el rango e informa que
    contiene fechas ocupadas.
-   **Estado:** OK

### Caso 6: Navegación entre meses

-   **Datos de entrada:** Calendario de disponibilidad.
-   **Pasos:**
    1.  Abrir el calendario.
    2.  Utilizar los controles para avanzar de mes.
    3.  Utilizar los controles para retroceder.
-   **Resultado esperado:** El calendario cambia de mes correctamente
    sin perder su funcionamiento.
-   **Estado:** OK

### Caso 7: Visualización responsive

-   **Datos de entrada:** Resoluciones desktop, tablet y mobile.
-   **Pasos:**
    1.  Acceder al detalle del producto desde una computadora.
    2.  Repetir la prueba en una resolución de tablet.
    3.  Repetir la prueba en una resolución móvil.
-   **Resultado esperado:** El calendario se visualiza correctamente en
    las diferentes resoluciones.
-   **Estado:** OK

------------------------------------------------------------------------

# HU 24 -- Marcar como favorito

## Criterios de aceptación

-   Un usuario autenticado debe poder marcar un producto como favorito.
-   El producto debe quedar asociado al usuario.
-   Un usuario no autenticado no debe poder agregar favoritos.
-   Un producto ya marcado como favorito no debe agregarse nuevamente.
-   El usuario debe poder quitar un producto de favoritos.

## Casos de prueba

### Caso 1: Marcar producto como favorito

-   **Datos de entrada:** Usuario autenticado y producto existente.
-   **Pasos:**
    1.  Iniciar sesión.
    2.  Ingresar al listado de productos.
    3.  Seleccionar el botón de favorito de un producto.
-   **Resultado esperado:** El producto queda marcado como favorito.
-   **Estado:** OK

### Caso 2: Verificar persistencia del favorito

-   **Datos de entrada:** Producto marcado como favorito.
-   **Pasos:**
    1.  Marcar un producto como favorito.
    2.  Recargar la página.
    3.  Volver a observar el producto.
-   **Resultado esperado:** El producto continúa identificado como
    favorito para el usuario autenticado.
-   **Estado:** OK

### Caso 3: Intentar marcar favorito sin iniciar sesión

-   **Datos de entrada:** Usuario no autenticado.
-   **Pasos:**
    1.  Cerrar sesión.
    2.  Ingresar al listado de productos.
    3.  Intentar marcar un producto como favorito.
-   **Resultado esperado:** El sistema informa que es necesario iniciar
    sesión para utilizar favoritos.
-   **Estado:** OK

### Caso 4: Evitar favorito duplicado

-   **Datos de entrada:** Producto que ya pertenece a los favoritos del
    usuario.
-   **Pasos:**
    1.  Iniciar sesión.
    2.  Marcar un producto como favorito.
    3.  Intentar marcar nuevamente el mismo producto.
-   **Resultado esperado:** El producto no se agrega dos veces a la
    lista de favoritos.
-   **Estado:** OK

### Caso 5: Eliminar un favorito

-   **Datos de entrada:** Producto previamente marcado como favorito.
-   **Pasos:**
    1.  Iniciar sesión.
    2.  Ubicar un producto favorito.
    3.  Seleccionar nuevamente la opción de favorito.
-   **Resultado esperado:** El producto deja de estar marcado como
    favorito.
-   **Estado:** OK

------------------------------------------------------------------------

# HU 25 -- Listar productos favoritos

## Criterios de aceptación

-   El usuario autenticado debe poder acceder a sus productos favoritos.
-   Se deben mostrar los productos previamente marcados como favoritos.
-   Cada producto debe conservar su información correspondiente.
-   El usuario debe poder eliminar un producto de favoritos.
-   Si no existen favoritos, debe mostrarse un estado informativo.

## Casos de prueba

### Caso 1: Acceso a "Mis favoritos"

-   **Datos de entrada:** Usuario autenticado.
-   **Pasos:**
    1.  Iniciar sesión.
    2.  Abrir el menú del usuario.
    3.  Seleccionar "Mis favoritos".
-   **Resultado esperado:** Se accede correctamente a la página de
    favoritos.
-   **Estado:** OK

### Caso 2: Visualización de productos favoritos

-   **Datos de entrada:** Usuario con uno o más productos favoritos.
-   **Pasos:**
    1.  Acceder a "Mis favoritos".
    2.  Observar el listado.
-   **Resultado esperado:** Se muestran los productos marcados como
    favoritos por el usuario.
-   **Estado:** OK

### Caso 3: Acceso sin favoritos

-   **Datos de entrada:** Usuario autenticado sin productos favoritos.
-   **Pasos:**
    1.  Iniciar sesión.
    2.  Acceder a "Mis favoritos".
-   **Resultado esperado:** Se muestra un mensaje indicando que no
    existen productos favoritos.
-   **Estado:** OK

### Caso 4: Eliminar favorito desde el listado

-   **Datos de entrada:** Usuario con al menos un favorito.
-   **Pasos:**
    1.  Acceder a "Mis favoritos".
    2.  Seleccionar el botón para quitar un favorito.
-   **Resultado esperado:** El producto se elimina del listado de
    favoritos.
-   **Estado:** OK

### Caso 5: Acceso a un producto favorito

-   **Datos de entrada:** Producto mostrado en "Mis favoritos".
-   **Pasos:**
    1.  Acceder a "Mis favoritos".
    2.  Seleccionar uno de los productos.
-   **Resultado esperado:** Se accede correctamente al detalle del
    producto seleccionado.
-   **Estado:** OK

------------------------------------------------------------------------

# HU 26 -- Políticas de producto

## Criterios de aceptación

-   Debe existir una sección de políticas dentro del detalle del
    producto.
-   La sección debe ser visible y fácil de localizar.
-   Deben mostrarse las políticas relacionadas con la estadía.
-   La información debe ser clara y legible.
-   La sección debe adaptarse a diferentes resoluciones.

## Casos de prueba

### Caso 1: Visualización de la sección "Políticas"

-   **Datos de entrada:** Producto existente.
-   **Pasos:**
    1.  Ingresar al detalle de un producto.
    2.  Buscar la sección de políticas.
-   **Resultado esperado:** Se visualiza correctamente la sección
    "Políticas".
-   **Estado:** OK

### Caso 2: Visualización de las políticas

-   **Datos de entrada:** Detalle de producto con políticas disponibles.
-   **Pasos:**
    1.  Acceder al detalle.
    2.  Ubicar la sección "Políticas".
    3.  Revisar la información.
-   **Resultado esperado:** Se muestran las políticas correspondientes
    de manera clara y ordenada.
-   **Estado:** OK

### Caso 3: Visualización responsive

-   **Datos de entrada:** Resoluciones desktop, tablet y mobile.
-   **Pasos:**
    1.  Acceder al detalle del producto en desktop.
    2.  Repetir en tablet.
    3.  Repetir en mobile.
-   **Resultado esperado:** La sección mantiene una correcta
    visualización y legibilidad en las diferentes resoluciones.
-   **Estado:** OK

------------------------------------------------------------------------

# HU 27 -- Compartir productos

## Criterios de aceptación

-   Debe existir una opción para compartir un producto.
-   La opción debe ser visible desde el detalle del producto.
-   Debe mostrarse la información del producto dentro de la ventana de
    compartir.
-   Se debe poder compartir mediante las opciones disponibles.
-   La URL compartida debe corresponder al producto seleccionado.

## Casos de prueba

### Caso 1: Visualización del botón "Compartir producto"

-   **Datos de entrada:** Producto existente.
-   **Pasos:**
    1.  Ingresar al detalle de un producto.
    2.  Ubicar la información principal del producto.
-   **Resultado esperado:** Se visualiza el botón "Compartir producto".
-   **Estado:** OK

### Caso 2: Apertura de la ventana de compartir

-   **Datos de entrada:** Producto existente.
-   **Pasos:**
    1.  Ingresar al detalle.
    2.  Presionar "Compartir producto".
-   **Resultado esperado:** Se abre correctamente la ventana de
    compartir.
-   **Estado:** OK

### Caso 3: Visualización de información del producto

-   **Datos de entrada:** Producto con imagen, nombre y descripción.
-   **Pasos:**
    1.  Abrir la ventana de compartir.
    2.  Observar la información mostrada.
-   **Resultado esperado:** Se muestra correctamente la imagen, nombre,
    descripción y URL del producto.
-   **Estado:** OK

### Caso 4: Compartir mediante Facebook

-   **Datos de entrada:** Producto existente.
-   **Pasos:**
    1.  Abrir la ventana de compartir.
    2.  Seleccionar la opción de Facebook.
-   **Resultado esperado:** Se abre la URL de compartición
    correspondiente al producto seleccionado.
-   **Estado:** OK

### Caso 5: Compartir mediante X/Twitter

-   **Datos de entrada:** Producto existente.
-   **Pasos:**
    1.  Abrir la ventana de compartir.
    2.  Seleccionar la opción de X/Twitter.
-   **Resultado esperado:** Se abre la URL de compartición
    correspondiente.
-   **Estado:** OK

### Caso 6: Compartir mediante Instagram

-   **Datos de entrada:** Producto existente.
-   **Pasos:**
    1.  Abrir la ventana de compartir.
    2.  Seleccionar la opción correspondiente a Instagram.
-   **Resultado esperado:** Se utiliza el mecanismo de compartición
    disponible en el navegador o se permite copiar/compartir el enlace
    del producto.
-   **Estado:** OK

------------------------------------------------------------------------

# HU 28 -- Valorar productos

## Criterios de aceptación

-   Solo los usuarios que hayan finalizado una reserva pueden puntuar el
    producto.
-   La sección de valoraciones debe ser visible y fácil de localizar.
-   Los usuarios autenticados deben poder puntuar mediante estrellas de
    1 a 5.
-   Cada valoración debe mostrar puntuación, usuario, fecha y
    comentario.
-   Los usuarios autenticados deben poder escribir una reseña.
-   El promedio debe actualizarse al recibir una nueva valoración.
-   En el detalle del producto y en los resultados debe mostrarse la
    puntuación media y la cantidad total de valoraciones.

## Casos de prueba

### Caso 1: Visualización de la sección de valoraciones

-   **Datos de entrada:** Producto existente.
-   **Pasos:**
    1.  Ingresar al detalle del producto.
    2.  Ubicar la sección de valoraciones.
-   **Resultado esperado:** Se visualiza correctamente la sección de
    valoraciones.
-   **Estado:** OK

### Caso 2: Usuario con reserva finalizada puede valorar

-   **Datos de entrada:** Usuario autenticado con una reserva finalizada
    del producto.
-   **Pasos:**
    1.  Iniciar sesión.
    2.  Acceder al producto reservado.
    3.  Ubicar el formulario de valoración.
    4.  Seleccionar una puntuación de 1 a 5 estrellas.
    5.  Escribir un comentario.
    6.  Enviar la valoración.
-   **Resultado esperado:** La valoración se registra correctamente.
-   **Estado:** OK

### Caso 3: Usuario sin reserva finalizada no puede valorar

-   **Datos de entrada:** Usuario autenticado sin una reserva finalizada
    del producto.
-   **Pasos:**
    1.  Iniciar sesión.
    2.  Acceder al detalle del producto.
    3.  Intentar realizar una valoración.
-   **Resultado esperado:** El backend rechaza la operación y el usuario
    no puede registrar la valoración.
-   **Estado:** OK

### Caso 4: Selección de puntuación de 1 a 5

-   **Datos de entrada:** Usuario autorizado para valorar.
-   **Pasos:**
    1.  Abrir el formulario de valoración.
    2.  Seleccionar diferentes cantidades de estrellas.
    3.  Verificar la puntuación seleccionada.
-   **Resultado esperado:** El sistema permite seleccionar una
    puntuación dentro del rango de 1 a 5.
-   **Estado:** OK

### Caso 5: Registro de comentario

-   **Datos de entrada:** Usuario autorizado y comentario válido.
-   **Pasos:**
    1.  Seleccionar una puntuación.
    2.  Escribir una reseña.
    3.  Enviar el formulario.
-   **Resultado esperado:** La reseña queda asociada al producto y al
    usuario.
-   **Estado:** OK

### Caso 6: Visualización de una valoración registrada

-   **Datos de entrada:** Producto con una valoración existente.
-   **Pasos:**
    1.  Acceder al detalle del producto.
    2.  Ubicar las valoraciones.
    3.  Observar una reseña registrada.
-   **Resultado esperado:** La valoración muestra puntuación, nombre del
    usuario, fecha y comentario.
-   **Estado:** OK

### Caso 7: Evitar valoración duplicada

-   **Datos de entrada:** Usuario que ya valoró el producto.
-   **Pasos:**
    1.  Iniciar sesión con el usuario.
    2.  Acceder nuevamente al mismo producto.
    3.  Intentar registrar otra valoración.
-   **Resultado esperado:** El sistema rechaza la segunda valoración del
    mismo usuario para el mismo producto.
-   **Estado:** OK

### Caso 8: Actualización del promedio

-   **Datos de entrada:** Producto con valoraciones existentes.
-   **Pasos:**
    1.  Registrar una nueva valoración válida.
    2.  Observar el promedio del producto.
    3.  Observar la cantidad total de valoraciones.
-   **Resultado esperado:** El promedio y la cantidad total de
    valoraciones se actualizan correctamente.
-   **Estado:** OK

### Caso 9: Visualización de promedio en el listado

-   **Datos de entrada:** Producto con valoraciones.
-   **Pasos:**
    1.  Ingresar al listado de productos.
    2.  Ubicar el producto valorado.
-   **Resultado esperado:** Se muestra la puntuación media y la cantidad
    de valoraciones.
-   **Estado:** OK

### Caso 10: Validación del rango de puntuación en backend

-   **Datos de entrada:** Valoración con puntuación menor a 1 o mayor a
    5.
-   **Pasos:**
    1.  Intentar enviar una valoración con una puntuación fuera del
        rango permitido.
    2.  Procesar la solicitud.
-   **Resultado esperado:** El backend rechaza la valoración inválida.
-   **Estado:** OK

------------------------------------------------------------------------

# HU 29 -- Eliminar categoría

## Criterios de aceptación

-   Un administrador debe poder eliminar una categoría desde el panel de
    administración.
-   Antes de eliminarla debe mostrarse una confirmación explícita.
-   La confirmación debe identificar la categoría seleccionada.
-   Debe informarse qué ocurrirá con los productos asociados.
-   Debe existir una opción para cancelar.
-   Al confirmar, la categoría debe eliminarse.
-   Los productos asociados deben permanecer intactos.
-   Los productos asociados deben quedar sin categoría.

## Casos de prueba

### Caso 1: Visualización de categorías existentes

-   **Datos de entrada:** Usuario administrador y categorías
    registradas.
-   **Pasos:**
    1.  Iniciar sesión como administrador.
    2.  Acceder a la administración de categorías.
    3.  Observar el listado.
-   **Resultado esperado:** Se muestran correctamente las categorías
    existentes y la opción "Eliminar".
-   **Estado:** OK

### Caso 2: Apertura de la confirmación

-   **Datos de entrada:** Categoría existente.
-   **Pasos:**
    1.  Seleccionar "Eliminar" en una categoría.
    2.  Observar la ventana de confirmación.
-   **Resultado esperado:** Se muestra una ventana de confirmación
    indicando la categoría que será eliminada.
-   **Estado:** OK

### Caso 3: Información sobre los productos asociados

-   **Datos de entrada:** Categoría con productos asociados.
-   **Pasos:**
    1.  Seleccionar "Eliminar".
    2.  Leer el mensaje de confirmación.
-   **Resultado esperado:** Se informa que los productos asociados no
    serán eliminados y quedarán sin categoría.
-   **Estado:** OK

### Caso 4: Cancelar eliminación

-   **Datos de entrada:** Categoría existente.
-   **Pasos:**
    1.  Abrir la confirmación de eliminación.
    2.  Seleccionar "Cancelar".
-   **Resultado esperado:** La ventana se cierra y la categoría continúa
    disponible.
-   **Estado:** OK

### Caso 5: Eliminar categoría sin productos

-   **Datos de entrada:** Categoría sin productos asociados.
-   **Pasos:**
    1.  Seleccionar la categoría.
    2.  Presionar "Eliminar".
    3.  Confirmar la operación.
-   **Resultado esperado:** La categoría se elimina correctamente.
-   **Estado:** OK

### Caso 6: Eliminar categoría con productos asociados

-   **Datos de entrada:** Categoría asociada a uno o más productos.
-   **Pasos:**
    1.  Seleccionar la categoría.
    2.  Presionar "Eliminar".
    3.  Confirmar la operación.
-   **Resultado esperado:** La categoría se elimina correctamente y los
    productos asociados permanecen registrados.
-   **Estado:** OK

### Caso 7: Verificar que los productos no fueron eliminados

-   **Datos de entrada:** Categoría previamente eliminada con productos
    asociados.
-   **Pasos:**
    1.  Eliminar la categoría.
    2.  Acceder al listado de productos.
    3.  Buscar los productos que pertenecían a la categoría eliminada.
-   **Resultado esperado:** Los productos continúan disponibles y
    conservan sus demás datos.
-   **Estado:** OK

### Caso 8: Verificar productos sin categoría

-   **Datos de entrada:** Productos que estaban asociados a una
    categoría eliminada.
-   **Pasos:**
    1.  Eliminar la categoría.
    2.  Acceder al listado o detalle de los productos.
    3.  Observar la categoría asociada.
-   **Resultado esperado:** Los productos permanecen sin categoría y
    pueden mostrarse como "Sin categoría".
-   **Estado:** OK

### Caso 9: Estado durante la eliminación

-   **Datos de entrada:** Categoría existente.
-   **Pasos:**
    1.  Abrir la confirmación.
    2.  Confirmar la eliminación.
    3.  Observar el botón durante el procesamiento.
-   **Resultado esperado:** El botón muestra "Eliminando..." y queda
    deshabilitado mientras se procesa la solicitud.
-   **Estado:** OK

------------------------------------------------------------------------

# Resumen de ejecución

Al finalizar la ejecución de los casos de prueba se actualizará el
estado de cada caso:

-   `OK`: el comportamiento observado coincide con el resultado
    esperado.
-   `ERROR`: el comportamiento observado no coincide con el resultado
    esperado y requiere revisión.
-   `PENDIENTE`: caso todavía no ejecutado.

## Cobertura del Sprint 3

  HU     Historia                     Estado
  ------ ---------------------------- --------
  HU22   Realizar búsqueda            ✅ OK
  HU23   Visualizar disponibilidad    ✅ OK
  HU24   Marcar como favorito         ✅ OK
  HU25   Listar productos favoritos   ✅ OK
  HU26   Políticas de producto        ✅ OK
  HU27   Compartir productos          ✅ OK
  HU28   Valorar productos            ✅ OK
  HU29   Eliminar categoría           ✅ OK

## Verificaciones generales del Sprint 3

Durante el cierre del Sprint 3 también se verificó:

-   Comunicación entre frontend y backend.
-   Nuevos endpoints REST.
-   Persistencia de favoritos.
-   Consulta de reservas y disponibilidad.
-   Validación de reserva finalizada para valorar.
-   Restricción de valoraciones duplicadas.
-   Cálculo de promedio y cantidad de valoraciones.
-   Conservación de productos al eliminar categorías.
-   Desasociación de categorías.
-   Estados de carga y mensajes de error.
-   Adaptación responsive de las nuevas funcionalidades.

## Relación con la documentación técnica

La documentación técnica y la documentación de pruebas mantienen
responsabilidades separadas:

``` text
DOCUMENTACION_FRONTEND.md
        │
        └── Cómo funciona el frontend

DOCUMENTACION_BACKEND.md
        │
        └── Cómo funciona el backend

testsS1.md
        │
        └── Cómo se verificó el Sprint 1

testsS2.md
        │
        └── Cómo se verificó el Sprint 2

testsS3.md
        │
        └── Cómo se verificó el Sprint 3
```

El presente documento corresponde exclusivamente a las pruebas manuales
del Sprint 3.
