package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.Participaciones;
import com.ciencias_arreguin.arreguin.repositories.ParticipacionesRepository;

@Service
public class ParticipacionesServices {

    @Autowired
    private ParticipacionesRepository participaciones_repository;

    public List<Participaciones> getParticipaciones() {
        return participaciones_repository.findAll();
    }

    public Participaciones getParticipacionById(int id) {
        return participaciones_repository.findById(id).get();
    }

    public Participaciones postParticipacion(Participaciones participacion) {
        return participaciones_repository.save(participacion);
    }

    public Participaciones putParticipacion(int id, Participaciones participacion) {
        Participaciones participacion_actual = participaciones_repository.findById(id).get();

        participacion_actual.setIdAlumnoParticipacion(participacion.getIdAlumnoParticipacion());
        participacion_actual.setIdAsesorParticipacion(participacion.getIdAsesorParticipacion());
        participacion_actual.setIdEventoParticipacion(participacion.getIdEventoParticipacion());
        participacion_actual.setIdProyectoParticipacion(participacion.getIdProyectoParticipacion());
        participacion_actual.setIdApoyoAlumnoParticipacion(participacion.getIdApoyoAlumnoParticipacion());
        participacion_actual.setIdApoyoAsesorParticipacion(participacion.getIdApoyoAsesorParticipacion());

        return participaciones_repository.save(participacion_actual);
    }
}
