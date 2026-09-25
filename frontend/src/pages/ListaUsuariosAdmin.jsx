import ListadoUsuarios from "../components/ListadoUsuarios";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

const ListaUsuariosAdmin = () => {

    return (

        <main className="main-container">
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
            <ListadoUsuarios />
        </main>

    );

}

export default ListaUsuariosAdmin;