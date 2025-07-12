package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.dtos.ApoyosDTO;
import com.ciencias_arreguin.arreguin.models.Apoyos;
import com.ciencias_arreguin.arreguin.repositories.ApoyosRepository;
import com.ciencias_arreguin.arreguin.mappers.ApoyosMapper;

@Service
public class ApoyosServices {
    
    @Autowired
    private ApoyosRepository apoyos_repository;
    
    @Autowired
    private ApoyosMapper apoyos_mapper;

    public List<ApoyosDTO> getApoyos() {
        List<Apoyos> apoyos = apoyos_repository.findAll();
        return apoyos_mapper.toDTOList(apoyos);
    }

    public ApoyosDTO postApoyo(ApoyosDTO apoyoDTO) {
        Apoyos apoyo = apoyos_mapper.toEntity(apoyoDTO);
        Apoyos savedApoyo = apoyos_repository.save(apoyo);
        return apoyos_mapper.toDTO(savedApoyo);
    }

    public ApoyosDTO getApoyoById(int id) {
        Apoyos apoyo = apoyos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Apoyo no encontrado con ID: " + id));
        return apoyos_mapper.toDTO(apoyo);
    }

    public ApoyosDTO putApoyo(int id, ApoyosDTO apoyoDTO) {
        Apoyos apoyo_actual = apoyos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Apoyo no encontrado con ID: " + id));

        apoyos_mapper.updateEntityFromDTO(apoyoDTO, apoyo_actual);
        Apoyos savedApoyo = apoyos_repository.save(apoyo_actual);
        return apoyos_mapper.toDTO(savedApoyo);
    }
}