package com.ciencias_arreguin.arreguin.mappers;

import com.ciencias_arreguin.arreguin.dtos.ParticipacionesDTO;
import com.ciencias_arreguin.arreguin.models.Participaciones;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ParticipacionesMapper {

    // Mapeo de Entity a DTO - extrae los IDs de las entidades relacionadas
    @Mapping(target = "idAlumnoParticipacion", source = "idAlumnoParticipacion.idAlumno")
    @Mapping(target = "idAsesorParticipacion", source = "idAsesorParticipacion.idAsesor")
    @Mapping(target = "idEventoParticipacion", source = "idEventoParticipacion.idEvento")
    @Mapping(target = "idProyectoParticipacion", source = "idProyectoParticipacion.idProyecto")
    @Mapping(target = "idApoyoAlumnoParticipacion", source = "idApoyoAlumnoParticipacion.idApoyo")
    @Mapping(target = "idApoyoAsesorParticipacion", source = "idApoyoAsesorParticipacion.idApoyo")
    ParticipacionesDTO toDTO(Participaciones participacion);

    // Mapeo de DTO a Entity - ignora las entidades relacionadas (se deben setear en el servicio)
    @Mapping(target = "idAlumnoParticipacion", ignore = true)
    @Mapping(target = "idAsesorParticipacion", ignore = true)
    @Mapping(target = "idEventoParticipacion", ignore = true)
    @Mapping(target = "idProyectoParticipacion", ignore = true)
    @Mapping(target = "idApoyoAlumnoParticipacion", ignore = true)
    @Mapping(target = "idApoyoAsesorParticipacion", ignore = true)
    Participaciones toEntity(ParticipacionesDTO participacionDTO);

    List<ParticipacionesDTO> toDTOList(List<Participaciones> participaciones);
    
    List<Participaciones> toEntityList(List<ParticipacionesDTO> participacionesDTO);

    @Mapping(target = "idParticipacion", ignore = true)
    @Mapping(target = "idAlumnoParticipacion", ignore = true)
    @Mapping(target = "idAsesorParticipacion", ignore = true)
    @Mapping(target = "idEventoParticipacion", ignore = true)
    @Mapping(target = "idProyectoParticipacion", ignore = true)
    @Mapping(target = "idApoyoAlumnoParticipacion", ignore = true)
    @Mapping(target = "idApoyoAsesorParticipacion", ignore = true)
    void updateEntityFromDTO(ParticipacionesDTO participacionDTO, @MappingTarget Participaciones participacion);
}