// Permite redirigir al usuario a otra ruta dentro de la aplicación.
import { Navigate } from "react-router-dom";
// Recupera valores guardados en el almacenamiento local.
import { leerLocal } from "../helpers/storageUtils";
// Presenta la información del perfil del usuario.
import MiPerfilInfo from "../components/MiPerfilInfo";

/**
 * Controla el acceso a la página del perfil y muestra la información del usuario
 * cuando existe un usuario guardado localmente.
 */
const MiPerfil = () => {

    // Recupera del almacenamiento local los datos guardados bajo la clave "usuario".
    const usuario = leerLocal("usuario");

    if (!usuario) {
        // Si no hay un usuario guardado, redirige a la ruta inicial y reemplaza
        // la entrada actual del historial de navegación.
        return <Navigate to="/" replace />;
    }

    // El contenedor principal agrupa el contenido de esta página.
    return (
        <main className="main-container">
            {/* Este componente se encarga de presentar la información del perfil. */}
            <MiPerfilInfo />
        </main>
    );
};

export default MiPerfil;