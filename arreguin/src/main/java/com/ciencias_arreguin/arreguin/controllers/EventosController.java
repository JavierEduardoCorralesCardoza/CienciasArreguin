package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.dtos.EventosDTO;
import com.ciencias_arreguin.arreguin.services.EventosServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/eventos")
public class EventosController {
    @Autowired
    private EventosServices eventos_services;

    @GetMapping
    public List<EventosDTO> getEventos() {
        return eventos_services.getEventos();
    }

    @GetMapping("/busqueda")
    public EventosDTO getEventoById(@RequestParam int id) {
        return eventos_services.getEventoById(id);
    }

    @PostMapping()
    public EventosDTO postEvento(@RequestBody EventosDTO evento) {
        return eventos_services.postEvento(evento);
    }

    @PutMapping("/{id}")
    public EventosDTO putEvento(@PathVariable int id, @RequestBody EventosDTO evento) {
        return eventos_services.putEvento(id, evento);
    }

    @DeleteMapping("/{id}")
    public EventosDTO deleteEvento(@PathVariable int id) {
        return eventos_services.deleteEvento(id);
    }
}