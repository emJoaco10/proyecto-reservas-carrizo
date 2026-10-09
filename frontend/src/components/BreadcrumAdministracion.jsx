import { Link } from "react-router-dom";
import "../styles/components/BreadcrumAdministracion.css";

/**
 * Construye una navegación jerárquica para las páginas de administración.
 * @param {Object} props - Propiedades del componente.
 * @param {Array<{label: string, path: string}>} props.items - Elementos de navegación, cada uno con etiqueta y ruta.
 */
const BreadcrumAdministracion = ({ items }) => {
    return (
        <nav
            className="breadcrumb-administracion"
            aria-label="Navegación administrativa"
        >
            {/* La clase CSS permite aplicar los estilos y aria-label identifica la navegación para tecnologías de asistencia. */}
            {/* Recorre los elementos para generar cada nivel de la navegación. */}
            {items.map((item, index) => {
                // Compara el índice actual con la longitud de la colección para determinar si es el último nivel.
                const esUltimo = index === items.length - 1;

                return (
                    <span
                        key={`${item.label}-${index}`}
                        className="breadcrumb-administracion__item"
                    >
                        {/* Cada nivel se agrupa en un span con una clave formada por la etiqueta y el índice. */}
                        {/* Los niveles anteriores enlazan a item.path; el último muestra item.label sin enlace. */}
                        {esUltimo ? (
                            <span className="breadcrumb-administracion__actual">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.path}
                                className="breadcrumb-administracion__enlace"
                            >
                                {item.label}
                            </Link>
                        )}

                        {/* El separador aparece solo antes del último nivel y se oculta a lectores de pantalla. */}
                        {!esUltimo && (
                            <span
                                className="breadcrumb-administracion__separador"
                                aria-hidden="true"
                            >
                                ›
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

// Exporta el componente como valor predeterminado del módulo.
export default BreadcrumAdministracion;