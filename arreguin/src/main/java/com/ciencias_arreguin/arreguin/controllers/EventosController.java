package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Eventos;
import com.ciencias_arreguin.arreguin.services.EventosServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/eventos")
public class EventosController {
    @Autowired
    private EventosServices eventos_services;

    @GetMapping
    public List<Eventos> getEventos() {
        return eventos_services.getEventos();
    }

    @GetMapping("/busqueda")
    public Eventos getEventoById(int id) {
        return eventos_services.getEventoById(id);
    }

    @PostMapping()
    public Eventos postEvento(@RequestBody Eventos evento) {
        return eventos_services.postEvento(evento);
    }
    
}
