package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.services.AsesoresServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/asesores")
public class AsesoresController {
    @Autowired
    private AsesoresServices asesores_services;

    @GetMapping
    public List<Asesores> getAsesores() {
        return asesores_services.getAsesores();
    }

    @GetMapping("/busqueda")
    public Asesores getAsesorById(@RequestParam int id) {
        return asesores_services.getAsesorById(id);
    }

    @PostMapping()
    public Asesores postAsesor(@RequestBody Asesores asesor) {
        return asesores_services.postAsesor(asesor);
    }
    
    @PutMapping("/{id}")
    public Asesores putAsesor(@PathVariable int id, @RequestBody Asesores asesor) {
        return asesores_services.putAsesor(id, asesor);
    }
}
