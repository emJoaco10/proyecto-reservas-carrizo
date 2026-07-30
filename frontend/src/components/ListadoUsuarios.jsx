import UsuarioCard from "./UsuarioCard";
import { useEffect, useState } from "react";
import useUsuarioAPI from "../hooks/useUsuarioAPI";
import ConfirmacionModal from "./ConfirmacionModal";

const ListadoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const { getUsuarios, actualizarRol } = useUsuarioAPI();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        fetchUsuarios();
    }, [getUsuarios]);

    const cambiarRolUsuario = async (usuario) => {

        setUsuarioSeleccionado(usuario);

        setMostrarModal(true);
    };

    const confirmarCambioRol = async () => {

        if (!usuarioSeleccionado) return;

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

            console.error("Error al actualizar el rol:", error);

        }

    };

    const cancelarCambioRol = () => {

        setMostrarModal(false);

        setUsuarioSeleccionado(null);

    };

    return (

        <section className="bloque">

            <h2>Lista de usuarios</h2>

            <p>
                Aquí podrás administrar los permisos de los usuarios registrados.
            </p>

            <div className="lista-usuarios">

                {usuarios.map(usuario => (

                    <UsuarioCard
                        key={usuario.id}
                        usuario={usuario}
                        onCambiarRol={cambiarRolUsuario}
                    />

                ))}

            </div>

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