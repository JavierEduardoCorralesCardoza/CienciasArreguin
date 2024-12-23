package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Participaciones;
import com.ciencias_arreguin.arreguin.services.ParticipacionesServices;

@RestController
@RequestMapping("/participaciones")
public class ParticipacionesController {
    
    @Autowired
    private ParticipacionesServices participaciones_services;

    @GetMapping
    public List<Participaciones> getParticipaciones() {
        return participaciones_services.getParticipaciones();
    }

    @GetMapping("/busqueda")
    public Participaciones getParticipacionById(@RequestParam int id) {
        return participaciones_services.getParticipacionById(id);
    }

    @PostMapping
    public Participaciones postParticipacion(@RequestBody Participaciones participacion) {
        return participaciones_services.postParticipacion(participacion);
    }
}
