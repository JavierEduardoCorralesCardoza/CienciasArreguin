package com.ciencias_arreguin.arreguin.mappers;

import com.ciencias_arreguin.arreguin.dtos.ParticipacionesDetalleDTO;
import com.ciencias_arreguin.arreguin.models.Participaciones;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ParticipacionesDetalleMapper {

    // Mapeo completo de Entity a DTO con todos los detalles
    @Mapping(target = "nombreAlumno", source = "idAlumnoParticipacion.nombreAlumno")
    @Mapping(target = "correoAlumno", source = "idAlumnoParticipacion.correoAlumno")
    @Mapping(target = "nombreAsesor", source = "idAsesorParticipacion.nombreAsesor")
    @Mapping(target = "correoAsesor", source = "idAsesorParticipacion.correoAsesor")
    @Mapping(target = "nombreEvento", source = "idEventoParticipacion.nombreEvento")
    @Mapping(target = "fechaEvento", source = "idEventoParticipacion.fechaEvento")
    @Mapping(target = "nombreProyecto", source = "idProyectoParticipacion.nombreProyecto")
    @Mapping(target = "categoriaProyecto", source = "idProyectoParticipacion.categoriaProyecto")
    @Mapping(target = "descripcionProyecto", source = "idProyectoParticipacion.descripcionProyecto")
    @Mapping(target = "patrocinadorApoyoAlumno", source = "idApoyoAlumnoParticipacion.patrocinadorApoyo")
    @Mapping(target = "descripcionApoyoAlumno", source = "idApoyoAlumnoParticipacion.descripcionApoyo")
    @Mapping(target = "patrocinadorApoyoAsesor", source = "idApoyoAsesorParticipacion.patrocinadorApoyo")
    @Mapping(target = "descripcionApoyoAsesor", source = "idApoyoAsesorParticipacion.descripcionApoyo")
    ParticipacionesDetalleDTO toDetalleDTO(Participaciones participacion);

    List<ParticipacionesDetalleDTO> toDetalleDTOList(List<Participaciones> participaciones);
}