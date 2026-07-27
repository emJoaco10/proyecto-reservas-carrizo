package com.example.demo.service;

import com.example.demo.dto.RolDTO;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public UsuarioDTO registrarUsuario(UsuarioDTO dto) {
        // Validar duplicado
        usuarioRepository.findByEmail(dto.getEmail())
                .ifPresent(u -> { throw new IllegalArgumentException("El email ya está registrado"); });

        // Crear entidad
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword())); // encriptar contraseña
        usuario.setRol(dto.getRol() != null ? dto.getRol() : "USER");

        Usuario guardado = usuarioRepository.save(usuario);

        return new UsuarioDTO(
                guardado.getId(),
                guardado.getNombre(),
                guardado.getApellido(),
                guardado.getEmail(),
                null,
                guardado.getRol()
        );
    }

    public UsuarioDTO iniciarSesion(UsuarioDTO dto) {

        // Buscar usuario por email
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Correo o contraseña incorrectos"));

        // Verificar contraseña
        if (!passwordEncoder.matches(dto.getPassword(), usuario.getPassword())) {
            throw new IllegalArgumentException("Correo o contraseña incorrectos");
        }

        // Devolver datos del usuario (sin contraseña)
        return new UsuarioDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail(),
                null,
                usuario.getRol()
        );
    }

    public UsuarioDTO cambiarRol (Long id, RolDTO rolDTO){
        // Buscar el usuario
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Validar el rol recibido
        if (!rolDTO.getRol().equals("USER") && !rolDTO.getRol().equals("ADMIN")) {
            throw new IllegalArgumentException("Rol inválido");
        }

        // Actualizar el rol
        usuario.setRol(rolDTO.getRol());

        // Guardar cambios
        Usuario actualizado = usuarioRepository.save(usuario);

        // Devolver DTO actualizado
        return new UsuarioDTO(
                actualizado.getId(),
                actualizado.getNombre(),
                actualizado.getApellido(),
                actualizado.getEmail(),
                null,
                actualizado.getRol()
        );
    }

    //Metodo de desarrollo: eliminar todos
    public void eliminarTodosLosUsuarios() {

        usuarioRepository.deleteAll();

    }
}



