package com.example.demo.controller;

import com.example.demo.dto.CaracteristicaDTO;
import com.example.demo.service.CaracteristicaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST encargado de gestionar las características
 * de los productos.
 *
 * Expone los endpoints para consultar, crear, actualizar
 * y eliminar características.
 *
 * La lógica de negocio se delega al CaracteristicaService.
 */
@RestController
@RequestMapping("/api/caracteristica")
@CrossOrigin(origins = "http://localhost:5173")
public class CaracteristicaController {

    private final CaracteristicaService caracteristicaService;

    /**
     * Constructor utilizado por Spring para inyectar el servicio
     * encargado de gestionar las características.
     *
     * @param caracteristicaService servicio de características
     */
    public CaracteristicaController(
            CaracteristicaService caracteristicaService) {

        this.caracteristicaService = caracteristicaService;
    }

    /**
     * Obtiene todas las características registradas.
     *
     * @return lista de características como CaracteristicaDTO
     */
    @GetMapping
    public ResponseEntity<List<CaracteristicaDTO>> obtenerTodas() {

        return ResponseEntity.ok(
                caracteristicaService.obtenerTodas()
        );
    }

    /**
     * Registra una nueva característica.
     *
     * Recibe el nombre e icono mediante un CaracteristicaDTO
     * y delega la creación al CaracteristicaService.
     *
     * @param caracteristicaDTO datos de la característica a crear
     * @return característica creada como CaracteristicaDTO
     */
    @PostMapping
    public ResponseEntity<CaracteristicaDTO> guardar(
            @RequestBody CaracteristicaDTO caracteristicaDTO) {

        CaracteristicaDTO nuevaCaracteristica =
                caracteristicaService.guardar(caracteristicaDTO);

        return ResponseEntity.ok(nuevaCaracteristica);
    }

    /**
     * Actualiza una característica existente.
     *
     * Utiliza el ID recibido en la URL para identificar la característica
     * y recibe los nuevos datos mediante el cuerpo de la solicitud.
     *
     * @param id identificador de la característica
     * @param caracteristicaDTO nuevos datos de la característica
     * @return característica actualizada como CaracteristicaDTO
     */
    @PutMapping("/{id}")
    public ResponseEntity<CaracteristicaDTO> actualizar(
            @PathVariable Long id,
            @RequestBody CaracteristicaDTO caracteristicaDTO) {

        CaracteristicaDTO actualizada =
                caracteristicaService.actualizar(
                        id,
                        caracteristicaDTO);

        return ResponseEntity.ok(actualizada);
    }

    /**
     * Elimina una característica mediante su ID.
     *
     * La validación de existencia y la eliminación son realizadas
     * por el CaracteristicaService.
     *
     * @param id identificador de la característica a eliminar
     * @return mensaje de confirmación
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                caracteristicaService.eliminar(id)
        );
    }

    /**
     * Obtiene una característica específica mediante su ID.
     *
     * @param id identificador de la característica
     * @return característica encontrada como CaracteristicaDTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<CaracteristicaDTO> obtenerPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                caracteristicaService.obtenerPorId(id)
        );
    }
}
