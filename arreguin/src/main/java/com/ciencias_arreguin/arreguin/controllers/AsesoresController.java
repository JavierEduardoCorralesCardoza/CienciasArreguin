package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.services.AsesoresServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/asesores")
public class AsesoresController {
    @Autowired
    private AsesoresServices asesores_services;

    @GetMapping
    public List<Asesores> getAsesores() {
        return asesores_services.getAsesores();
    }

    @PostMapping()
    public Asesores postAsesor(@RequestBody Asesores asesor) {
        return asesores_services.postAsesor(asesor);
    }
    
}
