// Componente que muestra el listado de características.
import ListadoCaracteristicas from "../components/ListadoCaracteristicas";
// Presenta la navegación jerárquica de la sección administrativa.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/**
 * Página que presenta el listado de características dentro de la sección administrativa.
 * No recibe props y delega la presentación del listado a `ListadoCaracteristicas`.
 */
const ListaCaracteristicas = () => {
    return (
        // Contenedor principal de la página.
        <main className="main-container">

            {/* Jerarquía: Administración (/administracion) → Administración de características (/caracteristicas-admin) → página actual, Listado de características (sin path). */}
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
                        label: "Listado de características"
                    }
                ]}
            />

            {/* Contenido principal, renderizado después del breadcrumb. */}
            <ListadoCaracteristicas />
        </main>
    );
};

export default ListaCaracteristicas;