import { Link } from "react-router-dom";
import "../styles/components/BreadcrumAdministracion.css";

const BreadcrumAdministracion = ({ items }) => {
    return (
        <nav
            className="breadcrumb-administracion"
            aria-label="Navegación administrativa"
        >
            {items.map((item, index) => {
                const esUltimo = index === items.length - 1;

                return (
                    <span
                        key={`${item.label}-${index}`}
                        className="breadcrumb-administracion__item"
                    >
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

export default BreadcrumAdministracion;