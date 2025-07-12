package com.ciencias_arreguin.arreguin.mappers;

import com.ciencias_arreguin.arreguin.dtos.ProyectosDTO;
import com.ciencias_arreguin.arreguin.models.Proyectos;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProyectosMapper {

    ProyectosDTO toDTO(Proyectos proyecto);

    @Mapping(target = "listaProyectoParticipacion", ignore = true)
    Proyectos toEntity(ProyectosDTO proyectoDTO);

    List<ProyectosDTO> toDTOList(List<Proyectos> proyectos);
    
    List<Proyectos> toEntityList(List<ProyectosDTO> proyectosDTO);

    @Mapping(target = "idProyecto", ignore = true)
    @Mapping(target = "listaProyectoParticipacion", ignore = true)
    void updateEntityFromDTO(ProyectosDTO proyectoDTO, @MappingTarget Proyectos proyecto);
}