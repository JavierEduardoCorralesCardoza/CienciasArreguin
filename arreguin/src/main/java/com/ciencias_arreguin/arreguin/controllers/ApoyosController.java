package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Apoyos;
import com.ciencias_arreguin.arreguin.services.ApoyosServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/apoyos")
public class ApoyosController {
    @Autowired
    private ApoyosServices apoyos_services;

    @GetMapping
    public List<Apoyos> getApoyos() {
        return apoyos_services.getApoyos();
    }

    @GetMapping("/busqueda")
    public Apoyos getApoyoById(@RequestParam int id) {
        return apoyos_services.getApoyoById(id);
    }
    
    @PostMapping()
    public Apoyos postApoyo(@RequestBody Apoyos apoyo) {
        return apoyos_services.postApoyo(apoyo);
    }

    @PutMapping("/{id}")
    public Apoyos putApoyo(@PathVariable int id, @RequestBody Apoyos apoyo) {
        return apoyos_services.putApoyo(id, apoyo);
    }
}
