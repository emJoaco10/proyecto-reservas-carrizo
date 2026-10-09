/**
 * Organiza la sección de administración de usuarios mediante un breadcrumb y
 * el panel de acciones correspondiente. Este componente no recibe props.
 */
// Muestra las opciones de navegación disponibles para administrar usuarios.
import PanelAdministracionUsuarios from "../components/PanelAdministracionUsuarios";
// Presenta la ruta de navegación administrativa mediante la prop `items`.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/** Página de administración de usuarios; no recibe props. */
const AdministracionUsuarios = () => {
    return (
        <main className="main-container">
            {/* Contiene el contenido principal de la página. */}

            {/* «Administración» enlaza a /administracion; «Administración de usuarios» es el elemento actual, sin destino explícito. */}
            <BreadcrumAdministracion
                items={[
                    {
                        label: "Administración",
                        path: "/administracion"
                    },
                    {
                        label: "Administración de usuarios"
                    }
                ]}
            />

            {/* Renderiza el panel de navegación de esta sección. */}
            <PanelAdministracionUsuarios />
        </main>
    );
};

export default AdministracionUsuarios;