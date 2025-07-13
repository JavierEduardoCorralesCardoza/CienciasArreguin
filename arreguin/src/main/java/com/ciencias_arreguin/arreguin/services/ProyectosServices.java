package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.dtos.ProyectosDTO;
import com.ciencias_arreguin.arreguin.models.Proyectos;
import com.ciencias_arreguin.arreguin.repositories.ProyectosRepository;
import com.ciencias_arreguin.arreguin.mappers.ProyectosMapper;

@Service
public class ProyectosServices {

    @Autowired
    private ProyectosRepository proyectos_repository;
    
    @Autowired
    private ProyectosMapper proyectos_mapper;

    public List<ProyectosDTO> getProyectos() {
        List<Proyectos> proyectos = proyectos_repository.findAll();
        return proyectos_mapper.toDTOList(proyectos);
    }

    public ProyectosDTO postProyecto(ProyectosDTO proyectoDTO) {
        Proyectos proyecto = proyectos_mapper.toEntity(proyectoDTO);
        Proyectos savedProyecto = proyectos_repository.save(proyecto);
        return proyectos_mapper.toDTO(savedProyecto);
    }

    public ProyectosDTO getProyectoById(int id) {
        Proyectos proyecto = proyectos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado con ID: " + id));
        return proyectos_mapper.toDTO(proyecto);
    }

    public ProyectosDTO putProyecto(int id, ProyectosDTO proyectoDTO) {
        Proyectos proyecto_actual = proyectos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado con ID: " + id));

        proyectos_mapper.updateEntityFromDTO(proyectoDTO, proyecto_actual);
        Proyectos savedProyecto = proyectos_repository.save(proyecto_actual);
        return proyectos_mapper.toDTO(savedProyecto);
    }

    public ProyectosDTO deleteProyecto(int id) {
        Proyectos proyecto = proyectos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado con ID: " + id));
        proyectos_repository.delete(proyecto);
        return proyectos_mapper.toDTO(proyecto);
    }
}