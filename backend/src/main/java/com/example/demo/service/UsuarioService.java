package com.example.demo.service;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

/**
 * Servicio de lógica de negocio para la entidad Usuario.
 *
 * Encapsula todas las operaciones relacionadas con usuarios:
 * - Creación/registro (con hashing de contraseña)
 * - Búsqueda por email
 * - Validación de login (comparación de contraseñas hasheadas)
 *
 * Comunica con UsuarioRepository para acceso a datos.
 * Usa PasswordEncoder para seguridad de contraseñas (BCrypt).
 *
 * IMPORTANTE: Las contraseñas NUNCA se almacenan en texto plano.
 *
 * @author Backend Team
 * @version 1.0
 */
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Inyección de dependencias.
     * Spring proporciona automáticamente el UsuarioRepository y PasswordEncoder (BCryptPasswordEncoder).
     */
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Crea un nuevo usuario y lo guarda en la base de datos.
     *
     * IMPORTANTE: La contraseña se codifica/hashea con BCrypt antes de guardar.
     *
     * Flujo:
     * 1. Recibe usuario con contraseña en texto plano
     * 2. Aplica PasswordEncoder.encode() para generar hash
     * 3. Actualiza la contraseña hasheada en el objeto Usuario
     * 4. Guarda el usuario en la BD
     *
     * @param usuario Objeto Usuario con contraseña en texto plano
     * @return Usuario guardado (con ID asignado por la BD, contraseña hasheada)
     */
    public Usuario crearUsuario(Usuario usuario) {
        // Codificar contraseña con BCrypt (irreversible)
        usuario.setContraseña(passwordEncoder.encode(usuario.getContraseña()));
        return usuarioRepository.save(usuario);
    }

    /**
     * Busca un usuario por su email.
     *
     * Útil para:
     * - Verificar si un email ya está registrado
     * - Cargar datos de usuario antes de login
     *
     * @param email Email del usuario a buscar
     * @return Optional<Usuario> con el usuario si existe, vacío si no
     */
    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    /**
     * Valida las credenciales de login de un usuario.
     *
     * Flujo:
     * 1. Busca usuario por email en la BD
     * 2. Si existe, compara la contraseña ingresada con el hash almacenado
     * 3. PasswordEncoder.matches() verifica si son iguales (sin desencriptar)
     * 4. Retorna true si las credenciales son válidas, false en caso contrario
     *
     * SEGURIDAD: Usar siempre matches(), nunca comparar strings directamente.
     *
     * @param email Email del usuario
     * @param contraseña Contraseña en texto plano (ingresada por usuario)
     * @return true si el email existe y la contraseña es correcta, false en caso contrario
     */
    public boolean validarLogin(String email, String contraseña) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Comparar contraseña ingresada con hash almacenado (seguro)
            return passwordEncoder.matches(contraseña, usuario.getContraseña());
        }

        return false;
    }
}


