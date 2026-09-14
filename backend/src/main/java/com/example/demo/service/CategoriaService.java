package com.example.demo.service;

import com.example.demo.dto.CategoriaDTO;
import com.example.demo.model.Categoria;
import com.example.demo.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio encargado de gestionar la lógica de negocio
 * relacionada con las categorías.
 *
 * Centraliza las operaciones de consulta y creación de categorías
 * y se comunica con CategoriaRepository para acceder a la base de datos.
 */
@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    /**
     * Constructor utilizado por Spring para inyectar el repository
     * encargado de gestionar las categorías.
     *
     * @param categoriaRepository repository de categorías
     */
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    /**
     * Obtiene todas las categorías registradas.
     *
     * Las entidades Categoria se convierten a CategoriaDTO antes
     * de ser devueltas al Controller.
     *
     * @return lista de categorías como CategoriaDTO
     */
    public List<CategoriaDTO> obtenerTodas() {

        return categoriaRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    /**
     * Busca una categoría mediante su identificador.
     *
     * @param id identificador de la categoría
     * @return categoría encontrada convertida a CategoriaDTO
     * @throws RuntimeException si no existe una categoría con el ID indicado
     */
    public CategoriaDTO obtenerPorId(Long id) {

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "No se encontró la categoría con id: " + id
                        )
                );

        return convertirADTO(categoria);
    }

    /**
     * Crea una nueva categoría.
     *
     * Antes de guardarla verifica que no exista otra categoría
     * con el mismo nombre para evitar duplicados.
     *
     * @param dto datos de la categoría que se desea crear
     * @return categoría creada convertida a CategoriaDTO
     * @throws RuntimeException si ya existe una categoría con el mismo nombre
     */
    public CategoriaDTO crear(CategoriaDTO dto) {

        // Verificar que no exista otra categoría con el mismo nombre.
        if (categoriaRepository.findByNombre(dto.getNombre()).isPresent()) {

            throw new RuntimeException(
                    "Ya existe una categoría con el nombre: "
                            + dto.getNombre()
            );
        }

        // Crear la entidad a partir de los datos recibidos.
        Categoria categoria = new Categoria();

        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setImagen(dto.getImagen());

        Categoria guardada =
                categoriaRepository.save(categoria);

        return convertirADTO(guardada);
    }

    public CategoriaDTO actualizar(Long id, CategoriaDTO dto) {

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "No se encontró la categoría con id: " + id
                        )
                );

        // Verificar que el nuevo nombre no pertenezca a otra categoría.
        if (categoriaRepository.findByNombre(dto.getNombre()).isPresent()
                && !categoriaRepository.findByNombre(dto.getNombre())
                .get()
                .getId()
                .equals(id)) {

            throw new RuntimeException(
                    "Ya existe una categoría con el nombre: "
                            + dto.getNombre()
            );
        }

        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setImagen(dto.getImagen());

        Categoria actualizada =
                categoriaRepository.save(categoria);

        return convertirADTO(actualizada);
    }

    public void eliminar(Long id) {

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "No se encontró la categoría con id: " + id
                        )
                );

        // No permitir eliminar categorías que tengan productos asociados.
        if (categoria.getProductos() != null
                && !categoria.getProductos().isEmpty()) {

            throw new IllegalArgumentException(
                    "No se puede eliminar la categoría porque tiene productos asociados."
            );
        }

        categoriaRepository.delete(categoria);
    }

    /**
     * Convierte una entidad Categoria en un CategoriaDTO.
     *
     * Este método centraliza la conversión para evitar repetir el mapeo
     * de los campos de la entidad en los diferentes métodos del servicio.
     *
     * @param categoria entidad que se desea convertir
     * @return DTO correspondiente a la categoría
     */
    private CategoriaDTO convertirADTO(Categoria categoria) {

        return new CategoriaDTO(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion(),
                categoria.getImagen()
        );
    }
}
