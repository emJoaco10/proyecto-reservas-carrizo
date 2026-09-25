import PanelAdministracionCaracteristicas from "../components/PanelAdministracionCaracteristicas";
import BreadcrumAdministracion from "../components/BreadcrumAdministracion";

const CaracteristicasAdmin = () => {

    return (

        <main className="main-container">

            <BreadcrumAdministracion
                items={[
                    { label: 'Administración', path: '/administracion' },
                    { label: 'Acciones de características' }
                ]}
            />

            <PanelAdministracionCaracteristicas />

        </main>

    );

};

export default CaracteristicasAdmin;