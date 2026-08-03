package com.example.demo.service;

import com.example.demo.dto.CaracteristicaDTO;
import com.example.demo.model.Caracteristica;
import com.example.demo.repository.CaracteristicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService {
    private final CaracteristicaRepository caracteristicaRepository;

    public CaracteristicaService(CaracteristicaRepository caracteristicaRepository) {
        this.caracteristicaRepository = caracteristicaRepository;
    }

    private CaracteristicaDTO mapearCaracteristicaADTO(Caracteristica caracteristica) {

        return new CaracteristicaDTO(

                caracteristica.getId(),
                caracteristica.getNombre(),
                caracteristica.getIcono()
        );
    }

    public List<CaracteristicaDTO> obtenerTodas() {

        List<Caracteristica> caracteristicas = caracteristicaRepository.findAll();

        return caracteristicas.stream()
                .map(this::mapearCaracteristicaADTO)
                .toList();
    }

    public CaracteristicaDTO guardar(CaracteristicaDTO dto) {

        Optional<Caracteristica> existente =
                caracteristicaRepository.findByNombre(dto.getNombre());

        if (existente.isPresent()) {
            throw new IllegalArgumentException("El nombre ya está en uso");
        }

        Caracteristica caracteristica = new Caracteristica();

        caracteristica.setNombre(dto.getNombre());
        caracteristica.setIcono(dto.getIcono());

        Caracteristica guardada = caracteristicaRepository.save(caracteristica);

        return mapearCaracteristicaADTO(guardada);
    }

    public CaracteristicaDTO actualizar(Long id, CaracteristicaDTO dto) {

        Caracteristica caracteristica = caracteristicaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Característica no encontrada"));

        caracteristica.setNombre(dto.getNombre());
        caracteristica.setIcono(dto.getIcono());

        Caracteristica actualizada = caracteristicaRepository.save(caracteristica);

        return mapearCaracteristicaADTO(actualizada);
    }

    public String eliminar(Long id) {

        if (!caracteristicaRepository.existsById(id)) {
            throw new IllegalArgumentException("La característica no existe");
        }

        caracteristicaRepository.deleteById(id);

        return "Característica eliminada correctamente";
    }
}
