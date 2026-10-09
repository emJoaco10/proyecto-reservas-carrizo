// Formulario reutilizable para presentar el flujo de creación de características.
import FormularioCaracteristicas from '../components/FormularioCaracteristicas';
// Componente que muestra la navegación jerárquica de administración.
import BreadcrumAdministracion from '../components/BreadcrumAdministracion';

/**
 * Página de administración que presenta el formulario para crear una nueva característica.
 * No recibe props; la creación, validación y persistencia se delegan a FormularioCaracteristicas.
 */
const AgregarCaracteristicas = () => {
    return (
        <main className="main-container">
            {/* Contenedor principal del contenido de la página. */}
            {/* El breadcrumb recorre Administración y Administración de características; el último elemento, sin path, representa la página actual. */}
            <BreadcrumAdministracion
                items={[
                    {
                        label: "Administración",
                        path: "/administracion"
                    },
                    {
                        label: "Administración de características",
                        path: "/caracteristicas-admin"
                    },
                    {
                        label: "Agregar característica"
                    }
                ]}
            />
            {/* modo="crear" identifica el uso del formulario en el flujo de creación. */}
            <FormularioCaracteristicas
                modo="crear"
            />
        </main>
    );
}

export default AgregarCaracteristicas;
