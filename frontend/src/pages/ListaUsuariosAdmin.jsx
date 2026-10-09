// Muestra el listado de usuarios dentro del área de administración.
import ListadoUsuarios from "../components/ListadoUsuarios";
// Presenta la navegación jerárquica de las páginas de administración.
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

/**
 * Página del área de administración dedicada a mostrar el listado de usuarios.
 */
const ListaUsuariosAdmin = () => {

    return (

        <main className="main-container">
            {/* Contenedor principal del contenido de esta página. */}
            {/* Navegación de Administración a Administración de usuarios. */}
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
            {/* Muestra el listado de usuarios. */}
            <ListadoUsuarios />
        </main>

    );

}

export default ListaUsuariosAdmin;