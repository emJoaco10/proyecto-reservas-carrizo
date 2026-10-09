import UsuarioCard from "./UsuarioCard";
import { useEffect, useState } from "react";
import useUsuarioAPI from "../hooks/useUsuarioAPI";
import ConfirmacionModal from "./ConfirmacionModal";

/**
 * Lista los usuarios registrados y permite administrar sus roles mediante
 * un modal de confirmación. No recibe props.
 */
const ListadoUsuarios = () => {
    // Almacena la lista de usuarios obtenida.
    const [usuarios, setUsuarios] = useState([]);
    // Controla la visibilidad del modal de confirmación.
    const [mostrarModal, setMostrarModal] = useState(false);
    // Conserva el usuario elegido para cambiar su rol.
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    // El hook provee getUsuarios para consultar usuarios y actualizarRol para modificar su rol.
    const { getUsuarios, actualizarRol } = useUsuarioAPI();

    // Obtiene los usuarios al ejecutarse el efecto, que depende de getUsuarios.
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                // Guarda los datos recibidos en el estado; los errores se registran en la consola.
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        fetchUsuarios();
    }, [getUsuarios]);

    // Guarda el usuario seleccionado y abre el modal para solicitar confirmación.
    const cambiarRolUsuario = async (usuario) => {

        setUsuarioSeleccionado(usuario);

        setMostrarModal(true);
    };

    // Comprueba la selección, solicita el rol opuesto y sincroniza el estado local si la operación finaliza correctamente.
    const confirmarCambioRol = async () => {

        if (!usuarioSeleccionado) return;

        // Alterna entre los roles ADMIN y USER.
        const nuevoRol =
            usuarioSeleccionado.rol === "ADMIN"
                ? "USER"
                : "ADMIN";

        try {

            await actualizarRol(usuarioSeleccionado.id, nuevoRol);

            setUsuarios((usuariosAnteriores) =>
                usuariosAnteriores.map((u) =>
                    u.id === usuarioSeleccionado.id
                        ? { ...u, rol: nuevoRol }
                        : u
                )
            );

            setMostrarModal(false);

            setUsuarioSeleccionado(null);

        } catch (error) {

            // Registra el error; el cambio local solo se aplica tras una actualización exitosa.
            console.error("Error al actualizar el rol:", error);

        }

    };

    // Cierra el modal y limpia el usuario seleccionado.
    const cancelarCambioRol = () => {

        setMostrarModal(false);

        setUsuarioSeleccionado(null);

    };

    return (

        <section className="bloque">

            {/* Encabezado y descripción de la sección de administración de usuarios. */}
            <h2>Lista de usuarios</h2>

            <p>
                Aquí podrás administrar los permisos de los usuarios registrados.
            </p>

            <div className="lista-usuarios">

                {/* Crea una tarjeta por usuario y pasa el callback para iniciar el cambio de rol. */}
                {usuarios.map(usuario => (

                    <UsuarioCard
                        key={usuario.id}
                        usuario={usuario}
                        onCambiarRol={cambiarRolUsuario}
                    />

                ))}

            </div>

            {/* La visibilidad depende de mostrarModal; el título, mensaje y texto de confirmación
                reflejan el rol actual, y la clase del botón depende de la operación solicitada.
                Los callbacks permiten confirmar o cancelar el cambio. */}
            <ConfirmacionModal

                abierto={mostrarModal}
                titulo={
                    usuarioSeleccionado?.rol === "ADMIN"
                        ? "Quitar permisos de administrador"
                        : "Otorgar permisos de administrador"
                }
                mensaje={
                    usuarioSeleccionado &&
                    (
                        usuarioSeleccionado.rol === "ADMIN"
                            ? `¿Deseas quitar los permisos de administrador a ${usuarioSeleccionado.nombre} ${usuarioSeleccionado.apellido}?`
                            : `¿Deseas otorgarle permisos de administrador a ${usuarioSeleccionado.nombre} ${usuarioSeleccionado.apellido}?`
                    )
                }
                textoConfirmar={
                    usuarioSeleccionado?.rol === "ADMIN"
                        ? "Quitar permisos"
                        : "Otorgar permisos"
                }
                claseBotonConfirmar={
                    usuarioSeleccionado?.rol === "ADMIN"
                        ? "btn btn-danger"
                        : "btn btn-filled"
                }
                textoCancelar="Cancelar"
                onConfirmar={confirmarCambioRol}
                onCancelar={cancelarCambioRol}

            />

        </section>
    );
};

export default ListadoUsuarios;