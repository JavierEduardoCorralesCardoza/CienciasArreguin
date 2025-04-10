package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.Eventos;
import com.ciencias_arreguin.arreguin.repositories.EventosRepository;

@Service
public class EventosServices {

    @Autowired
    private EventosRepository eventos_repository;

    public List<Eventos> getEventos() {
        return eventos_repository.findAll();
    }

    public Eventos postEvento(Eventos evento) {
        return eventos_repository.save(evento);
    }

    public Eventos getEventoById(int id) {
        return eventos_repository.findById(id).get();
    }

    public Eventos putEvento(int id, Eventos evento) {
        Eventos evento_actual = eventos_repository.findById(id).get();

        evento_actual.setNombreEvento(evento.getNombreEvento());
        evento_actual.setFechaEvento(evento.getFechaEvento());

        return eventos_repository.save(evento_actual);
    }
}
