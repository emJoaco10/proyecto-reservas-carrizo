import { Navigate, Outlet } from "react-router-dom";
import { leerLocal } from "../helpers/storageUtils";

const AdminRoute = () => {
    const usuario = leerLocal("usuario");

    // No hay usuario autenticado
    if (!usuario) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    // Hay usuario, pero no es ADMIN
    if (usuario.rol !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    // Usuario autenticado y ADMIN
    return <Outlet />;
};

export default AdminRoute;