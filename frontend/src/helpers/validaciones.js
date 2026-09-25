// src/helpers/validaciones.js

/**
 * ============================================================
 * VALIDACIONES GENERALES
 * ============================================================
 *
 * Las funciones de este archivo son puras:
 *
 * - Reciben un valor.
 * - Devuelven un mensaje de error si existe un problema.
 * - Devuelven "" cuando la validación es correcta.
 *
 * Esto permite reutilizarlas desde distintos formularios.
 */


/**
 * ============================================================
 * PRODUCTOS
 * ============================================================
 */

/**
 * Valida los campos mínimos de un producto.
 *
 * @param {Object} params
 * @param {string} params.nombre
 * @param {string} params.descripcion
 * @returns {string}
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
 * Valida el nombre de un producto.
 *
 * Reglas actuales del proyecto:
 * - Obligatorio.
 * - Mínimo 3 caracteres.
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
 * Valida la descripción de un producto.
 *
 * Reglas actuales del proyecto:
 * - Obligatoria.
 * - Mínimo 5 caracteres.
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
 * Valida un email.
 *
 * Reglas:
 * - Obligatorio cuando se utiliza en un formulario requerido.
 * - Debe tener un formato válido.
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
 * Valida una contraseña.
 *
 * Regla actual del proyecto:
 * - Obligatoria.
 * - Mínimo 8 caracteres.
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
 * Valida los datos del registro de usuario.
 *
 * @returns {string}
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
 * Valida el nombre de un usuario.
 *
 * Reglas:
 * - Obligatorio.
 */
export const validarNombreUsuario = (nombre = "") => {

  const valor = String(nombre || "").trim();

  if (!valor) {
    return "El nombre es obligatorio";
  }

  return "";
};


/**
 * Valida el apellido de un usuario.
 *
 * Regla:
 * - Obligatorio.
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
 * Valida las credenciales mínimas para iniciar sesión.
 *
 * No valida si las credenciales son correctas.
 * Eso corresponde al backend.
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
 * Valida el nombre de una categoría.
 *
 * Reglas:
 * - Obligatorio.
 * - Mínimo 3 caracteres.
 * - Máximo 100 caracteres.
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
 * Valida la descripción de una categoría.
 *
 * Reglas:
 * - Obligatoria.
 * - Mínimo 5 caracteres.
 * - Máximo 500 caracteres.
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
 * Valida que una categoría tenga imagen.
 *
 * La validación de formato y tamaño del archivo
 * se realiza mediante validarArchivoImagen().
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
 * Valida el nombre de una característica.
 *
 * Reglas:
 * - Obligatorio.
 * - Mínimo 2 caracteres.
 * - Máximo 100 caracteres.
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
 * Valida el ícono de una característica.
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
 * Tipos de imagen permitidos actualmente por el proyecto.
 */
export const FORMATOS_IMAGEN_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp"
];


/**
 * Tamaño máximo permitido para una imagen.
 *
 * 5 MB
 */
export const MAX_SIZE_IMAGEN = 5 * 1024 * 1024;


/**
 * Valida un archivo de imagen.
 *
 * @param {File|null} archivo
 * @returns {string}
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