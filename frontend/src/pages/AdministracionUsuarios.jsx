import PanelAdministracionUsuarios from "../components/PanelAdministracionUsuarios";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

const AdministracionUsuarios = () => {
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

            <PanelAdministracionUsuarios />
        </main>
    );
};

export default AdministracionUsuarios;