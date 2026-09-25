import FormularioCaracteristicas from '../components/FormularioCaracteristicas';
import BreadcrumAdministracion from '../components/BreadcrumAdministracion';

const AgregarCaracteristicas = () => {
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
                        label: "Agregar característica"
                    }
                ]}
            />
            <FormularioCaracteristicas
                modo="crear"
            />
        </main>
    );
}

export default AgregarCaracteristicas;
