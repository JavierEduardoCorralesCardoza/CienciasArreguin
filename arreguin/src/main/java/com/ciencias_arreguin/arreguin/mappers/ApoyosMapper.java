package com.ciencias_arreguin.arreguin.mappers;

import com.ciencias_arreguin.arreguin.dtos.ApoyosDTO;
import com.ciencias_arreguin.arreguin.models.Apoyos;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ApoyosMapper {

    ApoyosDTO toDTO(Apoyos apoyo);

    @Mapping(target = "listaApoyoAlumnoParticipacion", ignore = true)
    @Mapping(target = "listaApoyoAsesorParticipacion", ignore = true)
    Apoyos toEntity(ApoyosDTO apoyoDTO);

    List<ApoyosDTO> toDTOList(List<Apoyos> apoyos);
    
    List<Apoyos> toEntityList(List<ApoyosDTO> apoyosDTO);

    @Mapping(target = "idApoyo", ignore = true)
    @Mapping(target = "listaApoyoAlumnoParticipacion", ignore = true)
    @Mapping(target = "listaApoyoAsesorParticipacion", ignore = true)
    void updateEntityFromDTO(ApoyosDTO apoyoDTO, @MappingTarget Apoyos apoyo);
}