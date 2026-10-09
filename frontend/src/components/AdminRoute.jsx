import { Navigate, Outlet } from "react-router-dom";
import { leerLocal } from "../helpers/storageUtils";

/**
 * Protege las rutas hijas y permite el acceso únicamente a usuarios con rol ADMIN.
 * Consulta la información del usuario almacenada localmente para decidir el acceso.
 */
const AdminRoute = () => {
    // La decisión de acceso se basa en los datos disponibles en el almacenamiento local.
    const usuario = leerLocal("usuario");

    // Si no hay un usuario almacenado, redirige al inicio de sesión y reemplaza la entrada actual.
    if (!usuario) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    // Si el rol no es exactamente ADMIN, redirige a la página principal y reemplaza la entrada actual.
    if (usuario.rol !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    // Si el usuario tiene rol ADMIN, Outlet renderiza las rutas hijas correspondientes.
    return <Outlet />;
};

// Exportación predeterminada del componente.
export default AdminRoute;