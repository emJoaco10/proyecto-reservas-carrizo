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

/**
 * Administra el formulario de inicio de sesión, la validación de sus campos,
 * la presentación de errores y la navegación posterior al acceso. No recibe props.
 */
const IniciarSesionFormulario = () => {

    // useNavigate permite redirigir al usuario según el resultado del acceso.
    const navigate = useNavigate();

    // useLocation permite consultar el estado enviado a la ruta actual.
    const location = useLocation();

    // Recuperan del estado de navegación el origen y, si existe, el contexto de una reserva pendiente.
    const desdeReserva = location.state?.desdeReserva;
    const reservaPendiente = location.state?.reserva;

    // Datos ingresados por el usuario en los campos del formulario.
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Mensajes de validación asociados a cada campo.
    const [errores, setErrores] = useState({
        email: "",
        password: ""
    });

    // Mensaje general que se muestra si falla el inicio de sesión.
    const [errorLogin, setErrorLogin] = useState("");

    /** Actualiza el campo modificado y limpia sus errores y el mensaje general de acceso. */
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

    /** Valida correo y contraseña, actualiza los errores y señala si el formulario es válido. */
    const validarFormulario = () => {
        const nuevosErrores = {
            email: validarEmail(formData.email),
            password: validarPassword(formData.password)
        };

        setErrores(nuevosErrores);

        return !nuevosErrores.email && !nuevosErrores.password;
    };

    /**
     * Previene el envío tradicional, valida los datos y realiza el acceso de forma asíncrona.
     * Persiste usuario y token, recupera el flujo de reserva si corresponde o redirige al inicio;
     * ante un fallo, muestra el mensaje recibido en errorLogin.
     */
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
            {/* Informa que el acceso es necesario para continuar con una reserva. */}
            {desdeReserva && (
                <p className="mensaje-login-reserva">
                    Para realizar una reserva necesitás iniciar sesión.
                </p>
            )}

            <form
                className="formulario"
                onSubmit={handleSubmit}
                // Se desactiva la validación nativa porque se utilizan funciones de validación propias.
                noValidate
            >
                <h2>Iniciar sesión</h2>

                {/* Campo de correo electrónico y mensaje condicional de validación. */}
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

                {/* Campo de contraseña y mensaje condicional de validación. */}
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

                {/* Envía el formulario mediante handleSubmit. */}
                <button
                    type="submit"
                    className="btn btn-filled"
                >
                    Iniciar sesión
                </button>

                {/* Presenta el error general devuelto si el acceso no se completa. */}
                {errorLogin && (
                    <p className="mensaje-error">
                        {errorLogin}
                    </p>
                )}

                {/* Enlace para acceder al flujo de creación de cuenta. */}
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