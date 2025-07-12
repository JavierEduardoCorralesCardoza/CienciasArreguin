package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.dtos.AsesoresDTO;
import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.repositories.AsesoresRepository;
import com.ciencias_arreguin.arreguin.mappers.AsesoresMapper;

@Service
public class AsesoresServices {

    @Autowired
    private AsesoresRepository asesores_repository;
    
    @Autowired
    private AsesoresMapper asesores_mapper;

    public List<AsesoresDTO> getAsesores() {
        List<Asesores> asesores = asesores_repository.findAll();
        return asesores_mapper.toDTOList(asesores);
    }

    public AsesoresDTO postAsesor(AsesoresDTO asesorDTO) {
        Asesores asesor = asesores_mapper.toEntity(asesorDTO);
        Asesores savedAsesor = asesores_repository.save(asesor);
        return asesores_mapper.toDTO(savedAsesor);
    }

    public AsesoresDTO getAsesorById(int id) {
        Asesores asesor = asesores_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + id));
        return asesores_mapper.toDTOWithPassword(asesor);
    }

    public AsesoresDTO putAsesor(int id, AsesoresDTO asesorDTO) {
        Asesores asesor_actual = asesores_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + id));

        asesores_mapper.updateEntityFromDTO(asesorDTO, asesor_actual);
        Asesores savedAsesor = asesores_repository.save(asesor_actual);
        return asesores_mapper.toDTO(savedAsesor);
    }
}