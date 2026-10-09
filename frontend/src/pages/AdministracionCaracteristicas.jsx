/** Muestra la ruta de navegación administrativa a partir de la prop `items`. */
import PanelAdministracionCaracteristicas from "../components/PanelAdministracionCaracteristicas";
/** Presenta las opciones disponibles para administrar las características. */
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/**
 * Organiza la interfaz de administración de características mediante un breadcrumb
 * y el panel de acciones correspondiente.
 * @returns {JSX.Element} Contenido de la página de administración.
 * @remarks Este componente no recibe props.
 */
const CaracteristicasAdmin = () => {

    return (

        <main className="main-container">
            {/* Contiene el contenido principal de la página. */}

            {/* Muestra «Administración» con su destino y la sección actual sin ruta explícita. */}
            <BreadcrumAdministracion
                items={[
                    { label: 'Administración', path: '/administracion' },
                    { label: 'Acciones de características' }
                ]}
            />

            {/* Renderiza el panel de navegación de esta sección con sus opciones disponibles. */}
            <PanelAdministracionCaracteristicas />

        </main>

    );

};

export default CaracteristicasAdmin;