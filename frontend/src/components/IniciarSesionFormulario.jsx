import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/usuarioService";
import { escribirLocal } from "../helpers/storageUtils";
import { useLocation } from "react-router-dom";
import {
    validarEmail,
    validarPassword
} from "../helpers/validaciones";
import "../styles/components/Formulario.css";

const IniciarSesionFormulario = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const desdeReserva = location.state?.desdeReserva;
    const reservaPendiente = location.state?.reserva;

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errores, setErrores] = useState({
        email: "",
        password: ""
    });

    const [errorLogin, setErrorLogin] = useState("");

    const handleChange = ({ target }) => {
        setFormData((prev) => ({
            ...prev,
            [target.name]: target.value
        }));

        // Limpiamos el error del campo que el usuario está corrigiendo
        setErrores((prev) => ({
            ...prev,
            [target.name]: ""
        }));

        setErrorLogin("");
    };

    const validarFormulario = () => {
        const nuevosErrores = {
            email: validarEmail(formData.email),
            password: validarPassword(formData.password)
        };

        setErrores(nuevosErrores);

        return !nuevosErrores.email && !nuevosErrores.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorLogin("");

        // Validamos antes de intentar iniciar sesión
        const formularioValido = validarFormulario();

        if (!formularioValido) {
            return;
        }

        try {
            const usuario = await loginUsuario(formData);

            // Persistimos la sesión
            escribirLocal("usuario", usuario.usuario);

            // Persistimos el token
            escribirLocal("token", usuario.token);

            if (desdeReserva && reservaPendiente) {
                navigate(`/reserva/${reservaPendiente.productoId}`, {
                    state: {
                        fechaInicio: reservaPendiente.fechaInicio,
                        fechaFin: reservaPendiente.fechaFin
                    }
                });

                return;
            }

            // Si no viene desde una reserva, continúa normalmente al Home
            navigate("/");

        } catch (err) {
            setErrorLogin(err.message);
        }
    };

    return (
        <>
            {desdeReserva && (
                <p className="mensaje-login-reserva">
                    Para realizar una reserva necesitás iniciar sesión.
                </p>
            )}

            <form
                className="formulario"
                onSubmit={handleSubmit}
                noValidate
            >
                <h2>Iniciar sesión</h2>

                <div className="campo-formulario">
                    <label htmlFor="email">
                        Correo electrónico
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className={errores.email ? "input-error" : ""}
                    />

                    {errores.email && (
                        <p className="mensaje-error">
                            {errores.email}
                        </p>
                    )}
                </div>

                <div className="campo-formulario">
                    <label htmlFor="password">
                        Contraseña
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className={errores.password ? "input-error" : ""}
                    />

                    {errores.password && (
                        <p className="mensaje-error">
                            {errores.password}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-filled"
                >
                    Iniciar sesión
                </button>

                {errorLogin && (
                    <p className="mensaje-error">
                        {errorLogin}
                    </p>
                )}

                <p className="login-footer">
                    ¿Aún no tienes una cuenta?{" "}
                    <Link to="/registro-usuario">
                        Crear cuenta
                    </Link>
                </p>
            </form>

        </>
    );
};

export default IniciarSesionFormulario;