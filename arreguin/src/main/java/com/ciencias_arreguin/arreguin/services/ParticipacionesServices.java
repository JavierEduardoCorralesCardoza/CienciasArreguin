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
}
