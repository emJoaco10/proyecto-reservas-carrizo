package com.example.demo.service;

import com.example.demo.dto.CategoriaDTO;
import com.example.demo.model.Categoria;
import com.example.demo.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }


    // Obtener todas las categorías
    public List<CategoriaDTO> obtenerTodas() {

        return categoriaRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }


    // Obtener una categoría por ID
    public CategoriaDTO obtenerPorId(Long id) {

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "No se encontró la categoría con id: " + id
                        )
                );
        return convertirADTO(categoria);
    }


    // Crear una categoría
    public CategoriaDTO crear(CategoriaDTO dto) {

        if (categoriaRepository.findByNombre(dto.getNombre()).isPresent()) {

            throw new RuntimeException(
                    "Ya existe una categoría con el nombre: "
                            + dto.getNombre()
            );
        }
        Categoria categoria = new Categoria();

        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setImagen(dto.getImagen());

        Categoria guardada =
                categoriaRepository.save(categoria);
        return convertirADTO(guardada);
    }


    // Convertir entidad a DTO
    private CategoriaDTO convertirADTO(Categoria categoria) {

        return new CategoriaDTO(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion(),
                categoria.getImagen()
        );
    }
}
