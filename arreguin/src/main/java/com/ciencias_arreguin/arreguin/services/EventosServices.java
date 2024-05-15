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
}
