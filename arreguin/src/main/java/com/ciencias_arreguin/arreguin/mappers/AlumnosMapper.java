package com.ciencias_arreguin.arreguin.mappers;

import com.ciencias_arreguin.arreguin.dtos.AlumnosDTO;
import com.ciencias_arreguin.arreguin.models.Alumnos;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.IterableMapping;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AlumnosMapper {

    @Named("toDTOWithoutPassword")
    @Mapping(target = "contrasenaAlumno", ignore = true)
    AlumnosDTO toDTO(Alumnos alumno);

    @Mapping(target = "listaAlumnoParticipacion", ignore = true)
    Alumnos toEntity(AlumnosDTO alumnoDTO);

    @IterableMapping(qualifiedByName = "toDTOWithoutPassword")
    List<AlumnosDTO> toDTOList(List<Alumnos> alumnos);
    
    @Mapping(target = "listaAlumnoParticipacion", ignore = true)
    List<Alumnos> toEntityList(List<AlumnosDTO> alumnosDTO);

    @Mapping(target = "idAlumno", ignore = true)
    @Mapping(target = "listaAlumnoParticipacion", ignore = true)
    void updateEntityFromDTO(AlumnosDTO alumnoDTO, @MappingTarget Alumnos alumno);

    // Método específico para cuando necesites incluir la contraseña
    @Named("toDTOWithPassword")
    AlumnosDTO toDTOWithPassword(Alumnos alumno);
}