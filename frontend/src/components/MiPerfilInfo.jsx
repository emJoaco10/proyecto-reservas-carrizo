import { leerLocal } from "../helpers/storageUtils";
import "../styles/components/MiPerfilInfo.css";

/**
 * Muestra los datos del perfil del usuario y genera un avatar con sus iniciales.
 * Este componente no recibe props.
 */
const MiPerfilInfo = () => {

    // Obtiene los datos del usuario desde el almacenamiento local.
    const usuario = leerLocal("usuario");

    return (

        <section className="perfil-container">

            {/* Sección principal del perfil y su encabezado. */}
            <h1>Mi Perfil</h1>

            {/* Agrupa el avatar y la información del usuario. */}
            <div className="perfil-card">

                <div className="perfil-avatar">

                    {/* Construye las iniciales con la primera letra del nombre y apellido, en mayúsculas. */}
                    {`${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase()}

                </div>

                <div className="perfil-info">

                    {/* Cada elemento presenta una etiqueta y el valor correspondiente del usuario. */}
                    <div className="perfil-item">

                        <span>Nombre</span>
                        <p>{usuario.nombre}</p>

                    </div>

                    <div className="perfil-item">

                        <span>Apellido</span>
                        <p>{usuario.apellido}</p>

                    </div>

                    <div className="perfil-item">

                        <span>Correo electrónico</span>
                        <p>{usuario.email}</p>

                    </div>

                    <div className="perfil-item">

                        <span>Rol</span>
                        <p>{usuario.rol}</p>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MiPerfilInfo;