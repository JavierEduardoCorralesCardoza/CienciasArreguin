package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.ProyectoPorEvento;
import com.ciencias_arreguin.arreguin.services.ProyectoPorEventoServices;

@RestController
@RequestMapping("/proyecto_por_evento")
public class ProyectoPorEventoController {
    @Autowired
    private ProyectoPorEventoServices proyecto_por_evento_services;

    @GetMapping
    public List<ProyectoPorEvento> getProyectoPorEventos() {
        return proyecto_por_evento_services.getProyectoPorEvento();
    }
}
