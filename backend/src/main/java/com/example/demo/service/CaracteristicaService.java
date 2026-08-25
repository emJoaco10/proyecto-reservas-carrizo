package com.example.demo.service;

import com.example.demo.dto.CaracteristicaDTO;
import com.example.demo.model.Caracteristica;
import com.example.demo.repository.CaracteristicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio encargado de gestionar la lógica de negocio
 * relacionada con las características de los productos.
 *
 * Centraliza las operaciones de consulta, creación,
 * actualización y eliminación de características.
 */
@Service
public class CaracteristicaService {

    private final CaracteristicaRepository caracteristicaRepository;

    /**
     * Constructor utilizado por Spring para inyectar el repository
     * encargado de gestionar las características.
     *
     * @param caracteristicaRepository repository de características
     */
    public CaracteristicaService(
            CaracteristicaRepository caracteristicaRepository) {

        this.caracteristicaRepository = caracteristicaRepository;
    }

    /**
     * Convierte una entidad Caracteristica en un CaracteristicaDTO.
     *
     * Este método centraliza el mapeo de los datos para evitar
     * repetir la conversión en las diferentes operaciones del servicio.
     *
     * @param caracteristica entidad que se desea convertir
     * @return DTO correspondiente a la característica
     */
    private CaracteristicaDTO mapearCaracteristicaADTO(
            Caracteristica caracteristica) {

        return new CaracteristicaDTO(
                caracteristica.getId(),
                caracteristica.getNombre(),
                caracteristica.getIcono()
        );
    }

    /**
     * Obtiene todas las características registradas.
     *
     * Las entidades obtenidas desde el repository se convierten
     * a CaracteristicaDTO antes de ser devueltas.
     *
     * @return lista de características como CaracteristicaDTO
     */
    public List<CaracteristicaDTO> obtenerTodas() {

        List<Caracteristica> caracteristicas =
                caracteristicaRepository.findAll();

        return caracteristicas.stream()
                .map(this::mapearCaracteristicaADTO)
                .toList();
    }

    /**
     * Registra una nueva característica.
     *
     * Antes de guardarla verifica que no exista otra característica
     * con el mismo nombre.
     *
     * @param dto datos de la característica a crear
     * @return característica creada como CaracteristicaDTO
     * @throws IllegalArgumentException si el nombre ya está registrado
     */
    public CaracteristicaDTO guardar(CaracteristicaDTO dto) {

        // Verificar que no exista otra característica con el mismo nombre.
        Optional<Caracteristica> existente =
                caracteristicaRepository.findByNombre(dto.getNombre());

        if (existente.isPresent()) {
            throw new IllegalArgumentException(
                    "El nombre ya está en uso");
        }

        // Crear la entidad a partir de los datos recibidos.
        Caracteristica caracteristica = new Caracteristica();

        caracteristica.setNombre(dto.getNombre());
        caracteristica.setIcono(dto.getIcono());

        Caracteristica guardada =
                caracteristicaRepository.save(caracteristica);

        return mapearCaracteristicaADTO(guardada);
    }

    /**
     * Actualiza una característica existente.
     *
     * Busca la característica mediante su ID y modifica su nombre
     * e icono con los datos recibidos.
     *
     * @param id identificador de la característica
     * @param dto datos actualizados de la característica
     * @return característica actualizada como CaracteristicaDTO
     * @throws IllegalArgumentException si la característica no existe
     */
    public CaracteristicaDTO actualizar(
            Long id,
            CaracteristicaDTO dto) {

        Caracteristica caracteristica =
                caracteristicaRepository.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Característica no encontrada"));

        caracteristica.setNombre(dto.getNombre());
        caracteristica.setIcono(dto.getIcono());

        Caracteristica actualizada =
                caracteristicaRepository.save(caracteristica);

        return mapearCaracteristicaADTO(actualizada);
    }

    /**
     * Elimina una característica mediante su ID.
     *
     * Antes de eliminarla verifica que exista en la base de datos.
     *
     * @param id identificador de la característica a eliminar
     * @return mensaje de confirmación
     * @throws IllegalArgumentException si la característica no existe
     */
    public String eliminar(Long id) {

        if (!caracteristicaRepository.existsById(id)) {
            throw new IllegalArgumentException(
                    "La característica no existe");
        }

        caracteristicaRepository.deleteById(id);

        return "Característica eliminada correctamente";
    }

    /**
     * Obtiene una característica específica mediante su ID.
     *
     * @param id identificador de la característica
     * @return característica encontrada como CaracteristicaDTO
     * @throws IllegalArgumentException si la característica no existe
     */
    public CaracteristicaDTO obtenerPorId(Long id) {

        Caracteristica caracteristica =
                caracteristicaRepository.findById(id)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Característica no encontrada"));

        return mapearCaracteristicaADTO(caracteristica);
    }
}
