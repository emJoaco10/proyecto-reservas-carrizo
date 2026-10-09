// Muestra las opciones de navegación disponibles para administrar productos.
import PanelAdministracionProductos from "../components/PanelAdministracionProductos";
// Presenta la ruta de navegación administrativa mediante la prop `items`.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/**
 * Organiza la sección de administración de productos mediante un breadcrumb
 * y el panel de acciones correspondiente.
 * Este componente no recibe props.
 */
const AdministracionProductos = () => {
    return (

        <main className="main-container">
            {/* Contiene el contenido principal de la página. */}

            
            {/* Indica «Administración» con destino /administracion y la sección actual sin destino explícito. */}
            <BreadcrumAdministracion
                items={[
                    {
                        label: "Administración",
                        path: "/administracion"
                    },
                    {
                        label: "Administración de productos"
                    }
                ]}
            />

            {/* Renderiza las opciones de navegación disponibles para esta sección. */}
            <PanelAdministracionProductos />

        </main>
    );
};

export default AdministracionProductos;