package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.AsesorPorEvento;
import com.ciencias_arreguin.arreguin.services.AsesorPorEventoServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/asesor_por_evento")
public class AsesorPorEventoController {
    @Autowired
    private AsesorPorEventoServices asesor_por_evento_services;

    @GetMapping
    public List<AsesorPorEvento> getAsesorPorEvento() {
        return asesor_por_evento_services.getAsesorPorEvento();
    }

    @PostMapping()
    public AsesorPorEvento postAsesorPorEvento(@RequestBody AsesorPorEvento entity) {
        return asesor_por_evento_services.postAsesorPorEvento(entity);
    }
    
}
