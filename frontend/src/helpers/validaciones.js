// src/helpers/validaciones.js

/**
 * ============================================================
 * VALIDACIONES DEL FRONTEND
 * ============================================================
 *
 * Este módulo centraliza funciones reutilizables para validar productos,
 * usuarios, credenciales de inicio de sesión, categorías, características
 * e imágenes.
 *
 * Las validaciones devuelven una cadena vacía cuando los datos son válidos
 * o un mensaje de error cuando detectan un problema. Implementan las reglas
 * definidas en este código y no reemplazan las validaciones que correspondan
 * al backend.
 *
 * Algunas validaciones agrupadas ejecutan validaciones individuales en orden
 * y devuelven el primer mensaje de error encontrado.
 */


/**
 * ============================================================
 * PRODUCTOS
 * ============================================================
 */

/**
 * Valida secuencialmente el nombre y la descripción de un producto. Devuelve
 * el primer mensaje de error encontrado o una cadena vacía si ambos campos
 * son válidos.
 *
 * @param {Object} [params={}] Datos del producto.
 * @param {string} [params.nombre=""] Nombre que se valida con {@link validarNombre}.
 * @param {string} [params.descripcion=""] Descripción que se valida con {@link validarDescripcion}.
 * @returns {string} Primer mensaje de error o `""` si las validaciones son correctas.
 */
export const validarProducto = ({
  nombre = "",
  descripcion = ""
} = {}) => {

  const errNombre = validarNombre(nombre);

  if (errNombre) {
    return errNombre;
  }

  const errDescripcion = validarDescripcion(descripcion);

  if (errDescripcion) {
    return errDescripcion;
  }

  return "";
};


/**
 * Valida el nombre de un producto después de convertirlo a texto y quitar
 * los espacios de los extremos.
 *
 * Reglas: es obligatorio y debe tener al menos 3 caracteres.
 *
 * @param {*} [nombre=""] Nombre que se valida.
 * @returns {string} Mensaje de error o `""` si es válido.
 */
export const validarNombre = (nombre = "") => {

  const valor = String(nombre || "").trim();

  if (!valor) {
    return "El nombre es obligatorio";
  }

  if (valor.length < 3) {
    return "El nombre debe tener al menos 3 caracteres";
  }

  return "";
};


/**
 * Valida la descripción de un producto después de convertirla a texto y quitar
 * los espacios de los extremos.
 *
 * Reglas: es obligatoria y debe tener al menos 5 caracteres.
 *
 * @param {*} [descripcion=""] Descripción que se valida.
 * @returns {string} Mensaje de error o `""` si es válida.
 */
export const validarDescripcion = (descripcion = "") => {

  const valor = String(descripcion || "").trim();

  if (!valor) {
    return "La descripción es obligatoria";
  }

  if (valor.length < 5) {
    return "La descripción debe tener al menos 5 caracteres";
  }

  return "";
};


/**
 * ============================================================
 * EMAIL
 * ============================================================
 */

/**
 * Valida que el email no esté vacío y que coincida con la expresión regular
 * de formato definida en esta función. No comprueba la existencia de la cuenta.
 *
 * @param {*} [email=""] Dirección de email que se valida.
 * @returns {string} Mensaje de error o `""` si cumple las reglas.
 */
export const validarEmail = (email = "") => {

  const valor = String(email || "").trim();

  if (!valor) {
    return "El email es obligatorio";
  }

  const emailValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  if (!emailValido) {
    return "El email no tiene un formato válido";
  }

  return "";
};


/**
 * ============================================================
 * CONTRASEÑA
 * ============================================================
 */

/**
 * Valida que la contraseña no esté vacía y tenga la longitud mínima requerida.
 *
 * Regla: debe tener al menos 8 caracteres. No se aplican requisitos de
 * mayúsculas, números ni caracteres especiales.
 *
 * @param {*} [password=""] Contraseña que se valida.
 * @returns {string} Mensaje de error o `""` si es válida.
 */
export const validarPassword = (password = "") => {

  const valor = String(password || "");

  if (!valor) {
    return "La contraseña es obligatoria";
  }

  if (valor.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }

  return "";
};


/**
 * ============================================================
 * USUARIOS
 * ============================================================
 */

/**
 * Valida secuencialmente el nombre, el apellido, el email y la contraseña,
 * delegando en sus validaciones individuales. Devuelve el primer mensaje de
 * error encontrado o una cadena vacía si todos los campos son válidos.
 *
 * @param {Object} [params={}] Datos del usuario.
 * @param {string} [params.nombre=""] Nombre validado por {@link validarNombreUsuario}.
 * @param {string} [params.apellido=""] Apellido validado por {@link validarApellido}.
 * @param {string} [params.email=""] Email validado por {@link validarEmail}.
 * @param {string} [params.password=""] Contraseña validada por {@link validarPassword}.
 * @returns {string} Primer mensaje de error o `""` si las validaciones son correctas.
 */
export const validarUsuario = ({
  nombre = "",
  apellido = "",
  email = "",
  password = ""
} = {}) => {

  const errNombre = validarNombreUsuario(nombre);

  if (errNombre) {
    return errNombre;
  }

  const errApellido = validarApellido(apellido);

  if (errApellido) {
    return errApellido;
  }

  const errEmail = validarEmail(email);

  if (errEmail) {
    return errEmail;
  }

  const errPassword = validarPassword(password);

  if (errPassword) {
    return errPassword;
  }

  return "";
};


/**
 * Valida que el nombre del usuario no esté vacío después de quitar los
 * espacios de los extremos.
 *
 * @param {*} [nombre=""] Nombre que se valida.
 * @returns {string} Mensaje de error o `""` si es válido.
 */
export const validarNombreUsuario = (nombre = "") => {

  const valor = String(nombre || "").trim();

  if (!valor) {
    return "El nombre es obligatorio";
  }

  return "";
};


/**
 * Valida que el apellido del usuario no esté vacío después de quitar los
 * espacios de los extremos.
 *
 * @param {*} [apellido=""] Apellido que se valida.
 * @returns {string} Mensaje de error o `""` si es válido.
 */
export const validarApellido = (apellido = "") => {

  const valor = String(apellido || "").trim();

  if (!valor) {
    return "El apellido es obligatorio";
  }

  return "";
};


/**
 * ============================================================
 * LOGIN
 * ============================================================
 */

/**
 * Valida secuencialmente el email y la contraseña mediante {@link validarEmail}
 * y {@link validarPassword}. Devuelve el primer mensaje de error encontrado
 * o una cadena vacía si ambas validaciones son correctas.
 *
 * Esta función comprueba el formato y los requisitos locales; no determina si
 * las credenciales son correctas, lo cual corresponde al backend.
 *
 * @param {Object} [params={}] Credenciales ingresadas.
 * @param {string} [params.email=""] Email que se valida.
 * @param {string} [params.password=""] Contraseña que se valida.
 * @returns {string} Primer mensaje de error o `""` si las validaciones son correctas.
 */
export const validarLogin = ({
  email = "",
  password = ""
} = {}) => {

  const errEmail = validarEmail(email);

  if (errEmail) {
    return errEmail;
  }

  const errPassword = validarPassword(password);

  if (errPassword) {
    return errPassword;
  }

  return "";
};


/**
 * ============================================================
 * CATEGORÍAS
 * ============================================================
 */

/**
 * Valida el nombre de una categoría después de convertirlo a texto y quitar
 * los espacios de los extremos.
 *
 * Reglas: es obligatorio y debe tener entre 3 y 100 caracteres, inclusive.
 *
 * @param {*} [nombre=""] Nombre de categoría que se valida.
 * @returns {string} Mensaje de error o `""` si es válido.
 */
export const validarNombreCategoria = (nombre = "") => {

  const valor = String(nombre || "").trim();

  if (!valor) {
    return "El nombre de la categoría es obligatorio";
  }

  if (valor.length < 3) {
    return "El nombre de la categoría debe tener al menos 3 caracteres";
  }

  if (valor.length > 100) {
    return "El nombre de la categoría no puede superar los 100 caracteres";
  }

  return "";
};


/**
 * Valida la descripción de una categoría después de convertirla a texto y
 * quitar los espacios de los extremos.
 *
 * Reglas: es obligatoria y debe tener entre 5 y 500 caracteres, inclusive.
 *
 * @param {*} [descripcion=""] Descripción de categoría que se valida.
 * @returns {string} Mensaje de error o `""` si es válida.
 */
export const validarDescripcionCategoria = (
  descripcion = ""
) => {

  const valor = String(descripcion || "").trim();

  if (!valor) {
    return "La descripción de la categoría es obligatoria";
  }

  if (valor.length < 5) {
    return "La descripción de la categoría debe tener al menos 5 caracteres";
  }

  if (valor.length > 500) {
    return "La descripción de la categoría no puede superar los 500 caracteres";
  }

  return "";
};


/**
 * Comprueba que se haya proporcionado un valor de imagen no vacío. No valida
 * el tipo ni el tamaño del archivo; para eso se utiliza
 * {@link validarArchivoImagen}.
 *
 * @param {*} [imagen=""] Valor de imagen de la categoría.
 * @returns {string} Mensaje de error o `""` si hay un valor de imagen.
 */
export const validarImagenCategoria = (imagen = "") => {

  if (!String(imagen || "").trim()) {
    return "Debés seleccionar una imagen para la categoría";
  }

  return "";
};


/**
 * ============================================================
 * CARACTERÍSTICAS
 * ============================================================
 */

/**
 * Valida el nombre de una característica después de convertirlo a texto y
 * quitar los espacios de los extremos.
 *
 * Reglas: es obligatorio y debe tener entre 2 y 100 caracteres, inclusive.
 *
 * @param {*} [nombre=""] Nombre de característica que se valida.
 * @returns {string} Mensaje de error o `""` si es válido.
 */
export const validarNombreCaracteristica = (
  nombre = ""
) => {

  const valor = String(nombre || "").trim();

  if (!valor) {
    return "El nombre de la característica es obligatorio";
  }

  if (valor.length < 2) {
    return "El nombre de la característica debe tener al menos 2 caracteres";
  }

  if (valor.length > 100) {
    return "El nombre de la característica no puede superar los 100 caracteres";
  }

  return "";
};


/**
 * Comprueba que el valor del ícono de una característica no esté vacío
 * después de convertirlo a texto y quitar los espacios de los extremos.
 *
 * @param {*} [icono=""] Ícono que se valida.
 * @returns {string} Mensaje de error o `""` si hay un valor de ícono.
 */
export const validarIconoCaracteristica = (
  icono = ""
) => {

  if (!String(icono || "").trim()) {
    return "Debés seleccionar un ícono";
  }

  return "";
};


/**
 * ============================================================
 * IMÁGENES
 * ============================================================
 */

/**
 * Tipos MIME permitidos para los archivos de imagen.
 *
 * @type {string[]}
 */
export const FORMATOS_IMAGEN_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp"
];


/**
 * Tamaño máximo permitido para un archivo de imagen, expresado en bytes.
 *
 * El valor equivale a 5 MiB (5 × 1024 × 1024 bytes).
 *
 * @type {number}
 */
export const MAX_SIZE_IMAGEN = 5 * 1024 * 1024;


/**
 * Comprueba que se haya seleccionado un archivo, que su tipo MIME esté
 * incluido en {@link FORMATOS_IMAGEN_PERMITIDOS} y que su tamaño no supere
 * {@link MAX_SIZE_IMAGEN}. Devuelve el primer mensaje de error encontrado
 * o una cadena vacía si se cumplen todas las comprobaciones.
 *
 * @param {File|null|undefined} archivo Archivo de imagen seleccionado.
 * @returns {string} Primer mensaje de error o `""` si el archivo es válido.
 */
export const validarArchivoImagen = (archivo) => {

  if (!archivo) {
    return "Debés seleccionar una imagen";
  }

  if (!FORMATOS_IMAGEN_PERMITIDOS.includes(archivo.type)) {
    return "Formato no válido. Utilizá JPG, PNG o WEBP";
  }

  if (archivo.size > MAX_SIZE_IMAGEN) {
    return "La imagen no puede superar los 5 MB";
  }

  return "";
};