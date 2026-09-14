package com.example.demo.controller;

import com.example.demo.dto.RolDTO;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginResponseDTO;

import java.util.List;
import jakarta.validation.Valid;

/**
 * Controller REST encargado de exponer las operaciones relacionadas
 * con los usuarios.
 *
 * Ruta base: /api/usuario
 *
 * Recibe las solicitudes del frontend y delega la lógica de negocio
 * al UsuarioService.
 */
@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * Constructor utilizado por Spring para inyectar el servicio
     * encargado de gestionar los usuarios.
     *
     * @param usuarioService servicio de usuarios
     */
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
     * Registra un nuevo usuario.
     *
     * Recibe los datos del usuario mediante un UsuarioDTO y delega
     * la creación al UsuarioService.
     *
     * Si el registro no puede realizarse, devuelve una respuesta
     * de tipo Bad Request con el mensaje correspondiente.
     *
     * @param usuarioDTO datos del usuario a registrar
     * @return UsuarioDTO del usuario creado o mensaje de error
     */
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(
          @Valid @RequestBody UsuarioDTO usuarioDTO) {

        try {
            UsuarioDTO creado =
                    usuarioService.registrarUsuario(usuarioDTO);

            return ResponseEntity.ok(creado);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    /**
     * Valida las credenciales de un usuario.
     *
     * Recibe email y contraseña y delega la validación al
     * UsuarioService.
     *
     * Si las credenciales son correctas, devuelve los datos
     * del usuario autenticado.
     *
     * @param dto credenciales ingresadas por el usuario
     * @return UsuarioDTO correspondiente al usuario autenticado
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> iniciarSesion(
            @RequestBody UsuarioDTO dto) {

        LoginResponseDTO respuesta =
                usuarioService.iniciarSesion(dto);

        return ResponseEntity.ok(respuesta);
    }

    /**
     * Modifica el rol de un usuario existente.
     *
     * El nuevo rol se recibe mediante un RolDTO y es validado
     * por el UsuarioService.
     *
     * Los roles actualmente permitidos son USER y ADMIN.
     *
     * @param id identificador del usuario
     * @param rolDTO DTO que contiene el nuevo rol
     * @return UsuarioDTO con el usuario actualizado
     */
    @PutMapping("/{id}/rol")
    public ResponseEntity<UsuarioDTO> cambiarRol(
            @PathVariable Long id,
            @RequestBody RolDTO rolDTO) {

        UsuarioDTO usuarioActualizado =
                usuarioService.cambiarRol(id, rolDTO);

        return ResponseEntity.ok(usuarioActualizado);
    }

    /**
     * Elimina todos los usuarios registrados.
     *
     * Es un endpoint destinado principalmente al desarrollo,
     * testing o reseteo de datos.
     *
     * @return mensaje de confirmación
     */
    @DeleteMapping
    public ResponseEntity<String> eliminarTodosLosUsuarios() {

        usuarioService.eliminarTodosLosUsuarios();

        return ResponseEntity.ok(
                "Todos los usuarios fueron eliminados.");
    }

    /**
     * Obtiene todos los usuarios registrados.
     *
     * Delega la consulta al UsuarioService y devuelve la lista
     * de usuarios mediante UsuarioDTO.
     *
     * @return lista de usuarios registrados
     */
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> obtenerTodosLosUsuarios() {

        List<UsuarioDTO> usuarios =
                usuarioService.obtenerTodosLosUsuarios();

        return ResponseEntity.ok(usuarios);
    }
}
