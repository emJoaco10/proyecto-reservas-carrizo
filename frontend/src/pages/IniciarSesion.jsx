// Componente encargado de presentar y gestionar el formulario de inicio de sesión.
import IniciarSesionFormulario from "../components/IniciarSesionFormulario";

/**
 * Presenta el formulario de inicio de sesión dentro del contenedor principal
 * del contenido de la página. El componente no recibe props y delega la
 * interacción y la lógica del inicio de sesión a IniciarSesionFormulario.
 * Dentro de main-container se renderiza dicho formulario.
 */
const IniciarSesion = () => {
    return (
        <main className="main-container">
            <IniciarSesionFormulario />
        </main>
    );
};

export default IniciarSesion;