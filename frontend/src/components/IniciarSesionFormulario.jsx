import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUsuario, obtenerUsuarios } from "../services/usuarioService";
import { escribirLocal } from "../helpers/storageUtils";
import { useNavigate } from "react-router-dom";
import '../styles/components/Formulario.css';

const IniciarSesionFormulario = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = ({ target }) => {
        setFormData((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ETAPA 3
            setError("");


        try {

            const usuario = await loginUsuario(formData);

            // Persistimos la sesión
            escribirLocal("usuario", usuario.usuario);

            //Persistimos el token
            escribirLocal("token", usuario.token);

            // Redirigimos al Home
            navigate("/");

        } catch (err) {

            setError(err.message);

        }
        /*
        formData = {
            email: "...",
            password: "..."
        }
        */
    };

    return (
        <form className="formulario" onSubmit={handleSubmit}>

    <h2>Iniciar sesión</h2>

    <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
    />

    <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
    />

    <button type="submit">
        Iniciar sesión
    </button>

    {error && (
        <p className="error">
            {error}
        </p>
    )}

    <p className="login-footer">
        ¿Aún no tienes una cuenta?{" "}
        <Link to="/registro-usuario">
            Crear cuenta
        </Link>
    </p>

</form>
    );
};

export default IniciarSesionFormulario;