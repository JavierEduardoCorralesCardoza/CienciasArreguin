package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.dtos.EventosDTO;
import com.ciencias_arreguin.arreguin.models.Eventos;
import com.ciencias_arreguin.arreguin.repositories.EventosRepository;
import com.ciencias_arreguin.arreguin.mappers.EventosMapper;

@Service
public class EventosServices {

    @Autowired
    private EventosRepository eventos_repository;
    
    @Autowired
    private EventosMapper eventos_mapper;

    public List<EventosDTO> getEventos() {
        List<Eventos> eventos = eventos_repository.findAll();
        return eventos_mapper.toDTOList(eventos);
    }

    public EventosDTO postEvento(EventosDTO eventoDTO) {
        Eventos evento = eventos_mapper.toEntity(eventoDTO);
        Eventos savedEvento = eventos_repository.save(evento);
        return eventos_mapper.toDTO(savedEvento);
    }

    public EventosDTO getEventoById(int id) {
        Eventos evento = eventos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + id));
        return eventos_mapper.toDTO(evento);
    }

    public EventosDTO putEvento(int id, EventosDTO eventoDTO) {
        Eventos evento_actual = eventos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID: " + id));

        eventos_mapper.updateEntityFromDTO(eventoDTO, evento_actual);
        Eventos savedEvento = eventos_repository.save(evento_actual);
        return eventos_mapper.toDTO(savedEvento);
    }
}