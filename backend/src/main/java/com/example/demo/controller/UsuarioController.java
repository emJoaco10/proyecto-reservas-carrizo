package com.example.demo.controller;

import com.example.demo.dto.RolDTO;
import com.example.demo.dto.UsuarioDTO;
import com.example.demo.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            UsuarioDTO creado = usuarioService.registrarUsuario(usuarioDTO);
            return ResponseEntity.ok(creado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> iniciarSesion(@RequestBody UsuarioDTO dto) {

        UsuarioDTO usuario = usuarioService.iniciarSesion(dto);

        return ResponseEntity.ok(usuario);

    }

    @PutMapping("/{id}/rol")
    public ResponseEntity<UsuarioDTO> cambiarRol(
            @PathVariable Long id,
            @RequestBody RolDTO rolDTO) {

        UsuarioDTO usuarioActualizado = usuarioService.cambiarRol(id, rolDTO);

        return ResponseEntity.ok(usuarioActualizado);

    }

    //Endpoint de desarrollo: eliminar todos
    @DeleteMapping
    public ResponseEntity<String> eliminarTodosLosUsuarios() {

        usuarioService.eliminarTodosLosUsuarios();

        return ResponseEntity.ok("Todos los usuarios fueron eliminados.");

    }
}
