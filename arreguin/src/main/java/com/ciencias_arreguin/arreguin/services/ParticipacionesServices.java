package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.dtos.ParticipacionesDTO;
import com.ciencias_arreguin.arreguin.dtos.ParticipacionesDetalleDTO;
import com.ciencias_arreguin.arreguin.models.Participaciones;
import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.models.Eventos;
import com.ciencias_arreguin.arreguin.models.Proyectos;
import com.ciencias_arreguin.arreguin.models.Apoyos;
import com.ciencias_arreguin.arreguin.repositories.ParticipacionesRepository;
import com.ciencias_arreguin.arreguin.repositories.AlumnosRepository;
import com.ciencias_arreguin.arreguin.repositories.AsesoresRepository;
import com.ciencias_arreguin.arreguin.repositories.EventosRepository;
import com.ciencias_arreguin.arreguin.repositories.ProyectosRepository;
import com.ciencias_arreguin.arreguin.repositories.ApoyosRepository;
import com.ciencias_arreguin.arreguin.mappers.ParticipacionesMapper;
import com.ciencias_arreguin.arreguin.mappers.ParticipacionesDetalleMapper;

@Service
public class ParticipacionesServices {

    @Autowired
    private ParticipacionesRepository participaciones_repository;
    
    @Autowired
    private AlumnosRepository alumnos_repository;
    
    @Autowired
    private AsesoresRepository asesores_repository;
    
    @Autowired
    private EventosRepository eventos_repository;
    
    @Autowired
    private ProyectosRepository proyectos_repository;
    
    @Autowired
    private ApoyosRepository apoyos_repository;
    
    @Autowired
    private ParticipacionesMapper participaciones_mapper;
    
    @Autowired
    private ParticipacionesDetalleMapper participaciones_detalle_mapper;

    public List<ParticipacionesDTO> getParticipaciones() {
        List<Participaciones> participaciones = participaciones_repository.findAll();
        return participaciones_mapper.toDTOList(participaciones);
    }

    public List<ParticipacionesDetalleDTO> getParticipacionesDetalle() {
        List<Participaciones> participaciones = participaciones_repository.findAll();
        return participaciones_detalle_mapper.toDetalleDTOList(participaciones);
    }

    public ParticipacionesDTO getParticipacionById(int id) {
        Participaciones participacion = participaciones_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Participación no encontrada con ID: " + id));
        return participaciones_mapper.toDTO(participacion);
    }

    public ParticipacionesDetalleDTO getParticipacionDetalleById(int id) {
        Participaciones participacion = participaciones_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Participación no encontrada con ID: " + id));
        return participaciones_detalle_mapper.toDetalleDTO(participacion);
    }

    public ParticipacionesDTO postParticipacion(ParticipacionesDTO participacionDTO) {
        Participaciones participacion = participaciones_mapper.toEntity(participacionDTO);
        
        // Setear las entidades relacionadas usando los IDs del DTO
        Alumnos alumno = alumnos_repository.findById(participacionDTO.getIdAlumnoParticipacion())
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + participacionDTO.getIdAlumnoParticipacion()));
        participacion.setIdAlumnoParticipacion(alumno);
    

        Asesores asesor = asesores_repository.findById(participacionDTO.getIdAsesorParticipacion())
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + participacionDTO.getIdAsesorParticipacion()));
        participacion.setIdAsesorParticipacion(asesor);
    

        Eventos evento = eventos_repository.findById(participacionDTO.getIdEventoParticipacion())
            .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + participacionDTO.getIdEventoParticipacion()));
        participacion.setIdEventoParticipacion(evento);
    

        Proyectos proyecto = proyectos_repository.findById(participacionDTO.getIdProyectoParticipacion())
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado con ID: " + participacionDTO.getIdProyectoParticipacion()));
        participacion.setIdProyectoParticipacion(proyecto);
        
        
        if (participacionDTO.getIdApoyoAlumnoParticipacion() != null) {
            Apoyos apoyoAlumno = apoyos_repository.findById(participacionDTO.getIdApoyoAlumnoParticipacion())
                .orElseThrow(() -> new RuntimeException("Apoyo Alumno no encontrado con ID: " + participacionDTO.getIdApoyoAlumnoParticipacion()));
            participacion.setIdApoyoAlumnoParticipacion(apoyoAlumno);
        }
        
        if (participacionDTO.getIdApoyoAsesorParticipacion() != null) {
            Apoyos apoyoAsesor = apoyos_repository.findById(participacionDTO.getIdApoyoAsesorParticipacion())
                .orElseThrow(() -> new RuntimeException("Apoyo Asesor no encontrado con ID: " + participacionDTO.getIdApoyoAsesorParticipacion()));
            participacion.setIdApoyoAsesorParticipacion(apoyoAsesor);
        }
        
        Participaciones savedParticipacion = participaciones_repository.save(participacion);
        return participaciones_mapper.toDTO(savedParticipacion);
    }

    public ParticipacionesDTO putParticipacion(int id, ParticipacionesDTO participacionDTO) {
        Participaciones participacion_actual = participaciones_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Participación no encontrada con ID: " + id));

        // Actualizar las entidades relacionadas usando los IDs del DTO

        Alumnos alumno = alumnos_repository.findById(participacionDTO.getIdAlumnoParticipacion())
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + participacionDTO.getIdAlumnoParticipacion()));
        participacion_actual.setIdAlumnoParticipacion(alumno);
    
        Asesores asesor = asesores_repository.findById(participacionDTO.getIdAsesorParticipacion())
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + participacionDTO.getIdAsesorParticipacion()));
        participacion_actual.setIdAsesorParticipacion(asesor);
    
        Eventos evento = eventos_repository.findById(participacionDTO.getIdEventoParticipacion())
            .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + participacionDTO.getIdEventoParticipacion()));
        participacion_actual.setIdEventoParticipacion(evento);
    
        Proyectos proyecto = proyectos_repository.findById(participacionDTO.getIdProyectoParticipacion())
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado con ID: " + participacionDTO.getIdProyectoParticipacion()));
        participacion_actual.setIdProyectoParticipacion(proyecto);
    
        if (participacionDTO.getIdApoyoAlumnoParticipacion() != null) {
            Apoyos apoyoAlumno = apoyos_repository.findById(participacionDTO.getIdApoyoAlumnoParticipacion())
                .orElseThrow(() -> new RuntimeException("Apoyo Alumno no encontrado con ID: " + participacionDTO.getIdApoyoAlumnoParticipacion()));
            participacion_actual.setIdApoyoAlumnoParticipacion(apoyoAlumno);
        }
        
        if (participacionDTO.getIdApoyoAsesorParticipacion() != null) {
            Apoyos apoyoAsesor = apoyos_repository.findById(participacionDTO.getIdApoyoAsesorParticipacion())
                .orElseThrow(() -> new RuntimeException("Apoyo Asesor no encontrado con ID: " + participacionDTO.getIdApoyoAsesorParticipacion()));
            participacion_actual.setIdApoyoAsesorParticipacion(apoyoAsesor);
        }

        Participaciones savedParticipacion = participaciones_repository.save(participacion_actual);
        return participaciones_mapper.toDTO(savedParticipacion);
    }
}