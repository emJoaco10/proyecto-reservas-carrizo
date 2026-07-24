import { Navigate } from "react-router-dom";
import { leerLocal } from "../helpers/storageUtils";
import MiPerfilInfo from "../components/MiPerfilInfo";

const MiPerfil = () => {

    const usuario = leerLocal("usuario");

    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="main-container">
            <MiPerfilInfo />
        </main>
    );
};

export default MiPerfil;