package com.example.demo.service;

import com.example.demo.model.Producto;
import com.example.demo.model.Usuario;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoritoService {

    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public FavoritoService(
            UsuarioRepository usuarioRepository,
            ProductoRepository productoRepository) {

        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }

    /**
     * Agrega un producto a los favoritos del usuario.
     */
    public void agregarFavorito(String email, Long productoId) {

        Usuario usuario = obtenerUsuarioPorEmail(email);

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Producto no encontrado"));

        if (usuario.getFavoritos() == null) {
            usuario.setFavoritos(new ArrayList<>());
        }

        if (!usuario.getFavoritos().contains(producto)) {
            usuario.getFavoritos().add(producto);
            usuarioRepository.save(usuario);
        }
    }

    /**
     * Elimina un producto de los favoritos del usuario.
     */
    public void eliminarFavorito(String email, Long productoId) {

        Usuario usuario = obtenerUsuarioPorEmail(email);

        if (usuario.getFavoritos() == null) {
            return;
        }

        usuario.getFavoritos()
                .removeIf(producto -> producto.getId().equals(productoId));

        usuarioRepository.save(usuario);
    }

    /**
     * Obtiene todos los productos favoritos del usuario.
     */
    public List<Producto> obtenerFavoritos(String email) {

        Usuario usuario = obtenerUsuarioPorEmail(email);

        if (usuario.getFavoritos() == null) {
            return new ArrayList<>();
        }

        return usuario.getFavoritos();
    }

    /**
     * Busca un usuario mediante el email contenido en el JWT.
     */
    private Usuario obtenerUsuarioPorEmail(String email) {

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Usuario no encontrado"));
    }
}
