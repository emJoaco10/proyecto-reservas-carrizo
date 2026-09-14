package com.example.demo.service;

import com.example.demo.dto.LoginResponseDTO;
import com.example.demo.dto.RolDTO;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.service.JwtService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio encargado de gestionar la lógica de negocio relacionada
 * con los usuarios.
 *
 * Centraliza las operaciones de registro, inicio de sesión,
 * modificación de roles y consulta de usuarios.
 */
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    /**
     * Constructor utilizado por Spring para inyectar el repository
     * encargado de acceder a los usuarios.
     *
     * También inicializa BCryptPasswordEncoder para el tratamiento
     * seguro de las contraseñas.
     */
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,  JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /**
     * Registra un nuevo usuario.
     *
     * Antes de guardar el usuario verifica que el email no se encuentre
     * registrado. La contraseña se almacena utilizando BCrypt y, si no
     * se especifica un rol, se asigna automáticamente el rol USER.
     *
     * La contraseña no se incluye en el UsuarioDTO devuelto.
     *
     * @param dto datos del usuario que se desea registrar
     * @return UsuarioDTO con los datos del usuario creado
     * @throws IllegalArgumentException si el email ya está registrado
     */
    public UsuarioDTO registrarUsuario(UsuarioDTO dto) {

        // Verificar que no exista otro usuario con el mismo email.
        usuarioRepository.findByEmail(dto.getEmail())
                .ifPresent(u -> {
                    throw new IllegalArgumentException(
                            "El email ya está registrado");
                });

        // Crear la entidad a partir de los datos recibidos.
        Usuario usuario = new Usuario();

        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setEmail(dto.getEmail());

        // La contraseña se almacena como hash mediante BCrypt.
        usuario.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );

        // Si no se especifica un rol, se asigna USER por defecto.
        usuario.setRol("USER");

        Usuario guardado =
                usuarioRepository.save(usuario);

        // Se devuelve el usuario sin exponer su contraseña.
        return new UsuarioDTO(
                guardado.getId(),
                guardado.getNombre(),
                guardado.getApellido(),
                guardado.getEmail(),
                null,
                guardado.getRol()
        );
    }

    /**
     * Valida las credenciales de un usuario e inicia su sesión.
     *
     * Primero busca el usuario mediante su email y luego compara la
     * contraseña ingresada con el hash almacenado utilizando BCrypt.
     *
     * Por seguridad, se utiliza el mismo mensaje de error tanto cuando
     * el email no existe como cuando la contraseña es incorrecta.
     *
     * La respuesta no incluye la contraseña.
     *
     * @param dto credenciales ingresadas por el usuario
     * @return UsuarioDTO con los datos del usuario autenticado
     * @throws IllegalArgumentException si las credenciales son incorrectas
     */
    public LoginResponseDTO iniciarSesion(UsuarioDTO dto) {

        // Buscar el usuario mediante su email.
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Correo o contraseña incorrectos"));

        // Comparar la contraseña ingresada con el hash almacenado.
        if (!passwordEncoder.matches(
                dto.getPassword(),
                usuario.getPassword())) {

            throw new IllegalArgumentException(
                    "Correo o contraseña incorrectos");
        }

        UsuarioDTO usuarioDTO = new UsuarioDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail(),
                null,
                usuario.getRol()
        );

        String token = jwtService.generarToken(
                usuario.getEmail(),
                usuario.getRol()
        );

        return new LoginResponseDTO(usuarioDTO, token);
    }

    /**
     * Cambia el rol de un usuario existente.
     *
     * Solo se aceptan los roles definidos actualmente por la aplicación:
     * USER y ADMIN.
     *
     * @param id identificador del usuario
     * @param rolDTO DTO que contiene el nuevo rol
     * @return UsuarioDTO actualizado
     * @throws IllegalArgumentException si el usuario no existe
     * @throws IllegalArgumentException si el rol recibido no es válido
     */
    public UsuarioDTO cambiarRol(Long id, RolDTO rolDTO) {

        // Buscar el usuario que se desea modificar.
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Usuario no encontrado"));

        // Validar que el rol pertenezca a los valores permitidos.
        if (!rolDTO.getRol().equals("USER")
                && !rolDTO.getRol().equals("ADMIN")) {

            throw new IllegalArgumentException("Rol inválido");
        }

        // Actualizar y persistir el nuevo rol.
        usuario.setRol(rolDTO.getRol());

        Usuario actualizado =
                usuarioRepository.save(usuario);

        // Devolver los datos actualizados sin la contraseña.
        return new UsuarioDTO(
                actualizado.getId(),
                actualizado.getNombre(),
                actualizado.getApellido(),
                actualizado.getEmail(),
                null,
                actualizado.getRol()
        );
    }

    /**
     * Elimina todos los usuarios registrados.
     *
     * Es una operación destinada principalmente al desarrollo,
     * testing o reseteo de datos.
     */
    public void eliminarTodosLosUsuarios() {

        usuarioRepository.deleteAll();
    }

    /**
     * Obtiene todos los usuarios registrados.
     *
     * Convierte cada entidad Usuario en un UsuarioDTO para evitar
     * devolver directamente las entidades de persistencia.
     *
     * Las contraseñas no se incluyen en los DTOs devueltos.
     *
     * @return lista de usuarios convertidos a UsuarioDTO
     */
    public List<UsuarioDTO> obtenerTodosLosUsuarios() {

        List<Usuario> usuarios =
                usuarioRepository.findAll();

        return usuarios.stream()
                .map(usuario -> new UsuarioDTO(
                        usuario.getId(),
                        usuario.getNombre(),
                        usuario.getApellido(),
                        usuario.getEmail(),
                        null,
                        usuario.getRol()
                ))
                .toList();
    }
}



