package com.example.demo.service;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public Producto guardarProducto (Producto producto){
        if (producto.getImagenes() == null || producto.getImagenes().size() < 5) {
            throw new IllegalArgumentException("El producto debe tener al menos 5 imágenes");
        }
        Optional<Producto> existente = productoRepository.findByNombre(producto.getNombre());
        if (existente.isPresent()) {
            throw new IllegalArgumentException("El nombre ya está en uso");
        }
        return productoRepository.save(producto);
    }
    public List<Producto> obtenerProductosAleatorios(int cantidad) {
        List<Producto> todos = productoRepository.findAll();
        Collections.shuffle(todos);
        return todos.stream().limit(cantidad).toList();
    }
    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }
    public Page<Producto> obtenerPaginados(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productoRepository.findAll(pageable);
    }
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }
    public void eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new IllegalArgumentException("El producto no existe");
        }
        productoRepository.deleteById(id);
    }
}
