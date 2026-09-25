import PanelAdministracionProductos from "../components/PanelAdministracionProductos";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

const AdministracionProductos = () => {
    return (
        <main className="main-container">

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

            <PanelAdministracionProductos />

        </main>
    );
};

export default AdministracionProductos;