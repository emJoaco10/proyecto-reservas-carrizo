import { leerLocal } from "../helpers/storageUtils";
import "../styles/components/MiPerfilInfo.css";

const MiPerfilInfo = () => {

    const usuario = leerLocal("usuario");

    return (

        <section className="perfil-container">

            <h1>Mi Perfil</h1>

            <div className="perfil-card">

                <div className="perfil-avatar">

                    {`${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase()}

                </div>

                <div className="perfil-info">

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