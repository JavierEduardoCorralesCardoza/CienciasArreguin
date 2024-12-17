package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Proyectos;
import com.ciencias_arreguin.arreguin.services.ProyectosServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/proyectos")
public class ProyectosController {
    @Autowired
    private ProyectosServices proyectos_services;

    @GetMapping
    public List<Proyectos> getProyectos() {
        return proyectos_services.getProyectos();
    }

    @PostMapping()
    public Proyectos postMethodName(@RequestBody Proyectos proyecto) {
        return proyectos_services.postProyecto(proyecto);
    }
    
}
