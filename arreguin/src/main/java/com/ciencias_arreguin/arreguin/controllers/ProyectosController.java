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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/proyectos")
public class ProyectosController {
    @Autowired
    private ProyectosServices proyectos_services;

    @GetMapping
    public List<Proyectos> getProyectos() {
        return proyectos_services.getProyectos();
    }

    @GetMapping("/busqueda")
    public Proyectos getProyectoById(int id) {
        return proyectos_services.getProyectoById(id);
    }

    @PostMapping
    public Proyectos postProyecto(@RequestBody Proyectos proyecto) {
        return proyectos_services.postProyecto(proyecto);
    }
    
    @PutMapping("/{id}")
    public Proyectos putProyecto(@PathVariable int id, @RequestBody Proyectos proyecto) {
        return proyectos_services.putProyecto(id, proyecto);
    }
}
