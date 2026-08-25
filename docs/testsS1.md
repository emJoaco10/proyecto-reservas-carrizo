# Introducción

Este documento reúne los **casos de prueba manuales** correspondientes a las Historias de Usuario (HU 1–11) del proyecto.  
Su objetivo es garantizar que cada funcionalidad desarrollada cumpla con los **criterios de aceptación definidos** y que la aplicación se comporte de manera consistente, usable y confiable en distintos escenarios.

La documentación está organizada de la siguiente manera:
- Cada HU se presenta como un bloque independiente.  
- Se listan sus criterios de aceptación para mantener trazabilidad con la bitácora y el backlog.  
- Se detallan los casos de prueba manuales, incluyendo datos de entrada, pasos, resultados esperados y estado de validación.  

# HU 1 – Colocar encabezado

## Criterios de aceptación
- El header debe ocupar el 100% de la pantalla en todas las páginas de la aplicación.
- El header debe estar fijo en la parte superior de la página, incluso al hacer scroll.
- El header debe ser consistente en todas las páginas y fácil de usar.
- El header debe estar optimizado para diferentes dispositivos y resoluciones.
- Debe haber un bloque alineado a la izquierda con logotipo y lema.
- Al hacer clic en el logotipo o lema, se debe redirigir a la página principal.
- Debe haber un bloque alineado a la derecha con los botones “Crear cuenta” e “Iniciar sesión” (sin funcionalidad).

## Casos de prueba

### Caso 1: Visibilidad y fijación del header
- **Datos de entrada:** Navegación por distintas páginas + scroll vertical  
- **Pasos:**  
  1. Ingresar a cualquier página de la app  
  2. Hacer scroll hacia abajo  
- **Resultado esperado:** El header permanece visible y fijo en la parte superior  
- **Estado:** OK  

### Caso 2: Visualización en distintos dispositivos
- **Datos de entrada:** Resoluciones: desktop, tablet, mobile  
- **Pasos:**  
  1. Abrir la app en cada dispositivo  
  2. Verificar que el header se adapta correctamente  
- **Resultado esperado:** El header se muestra completo y funcional en todas las resoluciones  
- **Estado:** OK  

# HU 2 – Definición del cuerpo del sitio

## Criterios de aceptación
- El Main debe tener un color de background que corresponda a la identidad de marca.
- El Main debe ocupar el 100 % del alto de la pantalla.
- El Main debe ser optimizado para diferentes dispositivos y resoluciones de pantalla.
- Se deben visualizar las tres secciones o bloques: buscador, categorías y recomendaciones de los productos.

## Casos de prueba

### Caso 1: Visualización completa del Main
- **Datos de entrada:** Acceso a cualquier página con sección principal  
- **Pasos:**  
  1. Ingresar a la aplicación  
  2. Observar el área principal (Main)  
- **Resultado esperado:** El Main ocupa el 100 % del alto de la pantalla y muestra buscador, categorías y recomendaciones  
- **Estado:** OK  

### Caso 2: Verificación de color de fondo
- **Datos de entrada:** Identidad de marca definida (color esperado)  
- **Pasos:**  
  1. Ingresar a la aplicación  
  2. Comparar el color de fondo del Main con el color de marca  
- **Resultado esperado:** El color de fondo del Main coincide con el definido en la identidad visual  
- **Estado:** OK  

# HU 3 – Registrar producto

## Criterios de aceptación
- El producto debe visualizarse en el listado de productos.
- El panel de administración debe contener un botón "Agregar producto".
- La página de "Agregar producto" debe incluir campos para ingresar nombre, descripción e imagen.
- Se debe poder subir una o más imágenes del producto.
- Se debe poder guardar el producto y este debe agregarse correctamente a la base de datos.
- Si se intenta agregar un producto con un nombre que ya existe, debe mostrarse un mensaje de error indicando que el nombre ya está en uso.

## Casos de prueba

### Caso 1: Registro exitoso de producto
- **Datos de entrada:** Nombre = “Casa de los pibes”, descripción = “Cuenta con 2 baños y 3 habitaciones”, imagen = archivo JPG  
- **Pasos:**  
  1. Ingresar al panel de administración  
  2. Hacer clic en “Agregar producto”  
  3. Completar los campos y subir imagen  
  4. Guardar  
- **Resultado esperado:** El producto se guarda en el almacenamiento local y aparece en el listado  
- **Estado:** OK  

### Caso 2: Validación de nombre duplicado
- **Datos de entrada:** Nombre = “Casa de los pibes” (ya existente)  
- **Pasos:**  
  1. Ingresar al panel de administración  
  2. Hacer clic en “Agregar producto”  
  3. Ingresar nombre duplicado  
  4. Guardar  
- **Resultado esperado:** Se muestra mensaje de error indicando que el nombre ya está en uso  
- **Estado:** OK  


# HU 4 – Visualizar productos en el home

## Criterios de aceptación
- Se deben mostrar como máximo 10 productos aleatorios.
- Los productos no deben repetirse.
- Se deben distribuir en 2 columnas y 5 filas como máximo.
- La lista de productos debe ser verdaderamente aleatoria, sin repetir productos ni seguir un patrón previsible.

## Casos de prueba

### Caso 1: Visualización de productos aleatorios
- **Datos de entrada:** Acceso al home sin filtros aplicados  
- **Pasos:**  
  1. Ingresar a la página principal  
  2. Observar el bloque de productos  
- **Resultado esperado:** Se muestran hasta 10 productos distintos, distribuidos en 2 columnas y 5 filas  
- **Estado:** OK  

# HU 5 – Visualizar detalle de producto

## Criterios de aceptación
- Visualizar un bloque de header que cubra el 100 % del ancho de la pantalla.
- El título del producto debe estar alineado a la izquierda.
- La flecha para volver atrás debe estar alineada a la derecha.
- En el body debe estar el texto descriptivo del producto y sus imágenes.

## Casos de prueba

### Caso 1: Estructura visual del header en la vista de detalle
- **Datos de entrada:** Acceso a la página de detalle de cualquier producto  
- **Pasos:**  
  1. Ingresar al detalle de un producto desde el listado  
  2. Observar el header  
- **Resultado esperado:** El header ocupa el 100 % del ancho, con título alineado a la izquierda y flecha a la derecha  
- **Estado:** OK  

### Caso 2: Visualización del contenido del producto
- **Datos de entrada:** Producto con descripción e imágenes cargadas  
- **Pasos:**  
  1. Ingresar al detalle del producto  
  2. Verificar que se muestra el texto descriptivo y las imágenes  
- **Resultado esperado:** El body contiene correctamente la descripción y las imágenes del producto  
- **Estado:** OK  

# HU 6 – Visualizar galería de imágenes

## Criterios de aceptación
- Debe presentar un bloque al 100 % del ancho del contenedor que incluye 5 imágenes.
- La imagen principal debe estar posicionada en la mitad izquierda del bloque.
- En la versión desktop, una grilla de 2 filas y 2 columnas debe estar en la mitad derecha del bloque con las 4 imágenes restantes.
- El bloque debe incluir en su región inferior derecha el texto “Ver más”, que permite acceder a un componente para ver todas las imágenes disponibles del producto.
- La galería debe ser responsiva a dispositivos como mobile y tablet.

## Casos de prueba

### Caso 1: Responsividad de la galería
- **Datos de entrada:** Resoluciones: mobile, tablet  
- **Pasos:**  
  1. Abrir la app en dispositivos móviles y tablet  
  2. Verificar que la galería se adapta correctamente  
- **Resultado esperado:** Las imágenes se muestran correctamente en cada dispositivo, sin romper el layout  
- **Estado:** OK  

# HU 7 – Colocar pie de página

## Criterios de aceptación
- Se debe crear un footer que ocupe el 100 % del ancho de la pantalla y esté ubicado en el pie de página en todas las páginas de la aplicación.
- Dentro del footer debe existir un bloque alineado a la izquierda con el isologotipo de la empresa, el año y el copyright correspondiente.
- El footer debe ser optimizado para diferentes dispositivos y resoluciones de pantalla.
- El isologotipo, el año y el copyright deben ser legibles y diseñados según la identidad visual de la empresa.

## Casos de prueba

### Caso 1: Visualización del footer en todas las páginas
- **Datos de entrada:** Navegación por distintas páginas de la app  
- **Pasos:**  
  1. Ingresar a varias páginas (home, detalle, registro, etc.)  
  2. Verificar la presencia del footer  
- **Resultado esperado:** El footer aparece en todas las páginas, ocupa el 100 % del ancho y está en el pie de página  
- **Estado:** OK  

### Caso 2: Contenido y alineación del bloque izquierdo
- **Datos de entrada:** Footer visible  
- **Pasos:**  
  1. Observar el bloque izquierdo del footer  
  2. Verificar que contiene isologotipo, año y copyright  
- **Resultado esperado:** Los elementos están presentes, alineados a la izquierda y son legibles  
- **Estado:** OK  

# HU 8 – Paginar productos

## Criterios de aceptación
- Dividir el listado de productos en páginas de no más de 10 productos.
- Mostrar un contador de páginas funcional que permita la navegación entre las mismas.
- Mostrar un botón o enlace para que el usuario pueda ir hacia atrás, hacia delante o al inicio del listado de productos.

## Casos de prueba

### Caso 1: División del listado en páginas
- **Datos de entrada:** Listado con más de 10 productos  
- **Pasos:**  
  1. Ingresar al listado de productos  
  2. Contar la cantidad de productos por página  
- **Resultado esperado:** Se muestran como máximo 10 productos por página  
- **Estado:** OK  

### Caso 2: Navegación entre páginas
- **Datos de entrada:** Clic en botones de paginación  
- **Pasos:**  
  1. Ingresar al listado de productos  
  2. Usar los botones “siguiente”, “anterior” y “inicio”  
- **Resultado esperado:** El usuario puede navegar correctamente entre las páginas del listado  
- **Estado:** OK  

# HU 9 – Panel de administración

## Criterios de aceptación
- Debe existir una URL `/administración` para acceder al panel.
- Se visualiza un menú con todas las funciones desarrolladas para la administración.
- No debe ser responsive. Si se accede desde un dispositivo móvil, debe mostrarse un mensaje indicando que no está disponible.

## Casos de prueba

### Caso 1: Acceso al panel desde URL
- **Datos de entrada:** Navegador en desktop, URL `/administración`  
- **Pasos:**  
  1. Ingresar manualmente la URL `/administración`  
  2. Verificar que se carga el panel  
- **Resultado esperado:** El panel se muestra correctamente con el menú de funciones administrativas  
- **Estado:** OK  

### Caso 2: Visualización del menú de administración
- **Datos de entrada:** Panel cargado correctamente  
- **Pasos:**  
  1. Acceder al panel desde desktop  
  2. Observar el menú disponible  
- **Resultado esperado:** Se visualizan todas las funciones desarrolladas para administración  
- **Estado:** OK  

### Caso 3: Acceso desde dispositivo móvil
- **Datos de entrada:** Navegador móvil, URL `/administración`  
- **Pasos:**  
  1. Ingresar a la URL desde un celular o tablet  
- **Resultado esperado:** Se muestra un mensaje indicando que el panel no está disponible en dispositivos móviles  
- **Estado:** OK  

# HU 10 – Listar productos

## Criterios de aceptación
- En el panel de administración debe existir un botón “Lista de productos”.
- En la página “Lista de productos” se deben listar todos los productos disponibles en el sitio.
- Deben existir las columnas: “Id”, “Nombre” y “Acciones”.

## Casos de prueba

### Caso 1: Acceso a la lista de productos desde el panel
- **Datos de entrada:** Clic en botón “Lista de productos”  
- **Pasos:**  
  1. Ingresar al panel de administración  
  2. Hacer clic en “Lista de productos”  
- **Resultado esperado:** Se redirige a la página con el listado completo de productos  
- **Estado:** OK  

### Caso 2: Verificación de columnas visibles
- **Datos de entrada:** Página “Lista de productos” cargada  
- **Pasos:**  
  1. Ingresar a la lista de productos  
  2. Observar la estructura de la tabla  
- **Resultado esperado:** Se visualizan las columnas “Id”, “Nombre” y “Acciones” correctamente  
- **Estado:** OK  

# HU 11 – Eliminar producto

## Criterios de aceptación
- En el listado de productos (panel de administración), por cada producto debe existir la acción “Eliminar producto”.
- Al presionar “Eliminar producto” debe aparecer un mensaje de confirmación.
- Si se acepta la eliminación, el producto debe eliminarse de la base de datos.
- El producto eliminado no debe mostrarse en el listado.
- Si no se acepta la acción, no se deben realizar cambios.

## Casos de prueba

### Caso 1: Confirmación de eliminación
- **Datos de entrada:** Clic en “Eliminar producto”  
- **Pasos:**  
  1. Ingresar al panel de administración  
  2. Ir a la lista de productos  
  3. Presionar “Eliminar producto” en un ítem  
- **Resultado esperado:** Se muestra un mensaje de confirmación antes de ejecutar la acción  
- **Estado:** OK  

### Caso 2: Eliminación efectiva del producto
- **Datos de entrada:** Confirmar eliminación  
- **Pasos:**  
  1. Confirmar el mensaje de eliminación  
  2. Verificar que el producto ya no aparece en el listado  
  3. Verificar que fue eliminado de la base de datos  
- **Resultado esperado:** El producto desaparece del listado y se elimina correctamente  
- **Estado:** OK  