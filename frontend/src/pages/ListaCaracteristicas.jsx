import ListadoCaracteristicas from "../components/ListadoCaracteristicas";

const ListaCaracteristicas = () => {
    return (
        <main className="main-container">

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

            <ListadoCaracteristicas />
        </main>
    );
};

export default ListaCaracteristicas;