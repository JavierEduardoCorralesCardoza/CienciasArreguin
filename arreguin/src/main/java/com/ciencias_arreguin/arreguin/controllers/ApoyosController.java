package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.models.Apoyos;
import com.ciencias_arreguin.arreguin.services.ApoyosServices;

@RestController
@RequestMapping("/apoyos")
public class ApoyosController {
    @Autowired
    private ApoyosServices apoyos_services;

    @GetMapping
    public List<Apoyos> getApoyos() {
        return apoyos_services.getApoyos();
    }
}
