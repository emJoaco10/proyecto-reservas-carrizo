import axios from "axios";
import { leerLocal } from "../helpers/storageUtils";

/**
 * Configura el cliente HTTP compartido del frontend: Axios gestiona las
 * solicitudes y `leerLocal` permite recuperar el token almacenado localmente.
 */
const apiService = axios.create({
    // Los servicios pueden enviar solicitudes relativas a esta dirección base.
    baseURL: "http://localhost:8080/api",
});

/**
 * Antes de cada solicitud, recupera mediante `leerLocal` el valor asociado a
 * la clave `token`. Si es verdadero, lo agrega a Authorization con formato
 * Bearer; si no, este interceptor no agrega ese encabezado. Devuelve `config`
 * para que Axios continúe procesando la solicitud. Ante un error recibido por
 * el callback de rechazo, devuelve una promesa rechazada con `Promise.reject`.
 */
apiService.interceptors.request.use(
    (config) => {
        const token = leerLocal("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/** Exporta la instancia configurada para que otros módulos puedan reutilizarla. */
export default apiService;