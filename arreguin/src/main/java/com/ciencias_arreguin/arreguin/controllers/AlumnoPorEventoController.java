package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.AlumnoPorEvento;
import com.ciencias_arreguin.arreguin.services.AlumnoPorEventoServices;

@RestController
@RequestMapping("/alumno_por_evento")
public class AlumnoPorEventoController {
    @Autowired
    private AlumnoPorEventoServices alumno_por_evento_services;

    @GetMapping
    public List<AlumnoPorEvento> getAlumnoPorEvento() {
        return alumno_por_evento_services.getAlumnoPorEvento();
    }
}
