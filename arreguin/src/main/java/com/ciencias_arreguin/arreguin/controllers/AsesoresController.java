package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.dtos.AsesoresDTO;
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
    public List<AsesoresDTO> getAsesores() {
        return asesores_services.getAsesores();
    }

    @GetMapping("/busqueda")
    public AsesoresDTO getAsesorById(@RequestParam int id) {
        return asesores_services.getAsesorById(id);
    }

    @PostMapping()
    public AsesoresDTO postAsesor(@RequestBody AsesoresDTO asesor) {
        return asesores_services.postAsesor(asesor);
    }
    
    @PutMapping("/{id}")
    public AsesoresDTO putAsesor(@PathVariable int id, @RequestBody AsesoresDTO asesor) {
        return asesores_services.putAsesor(id, asesor);
    }

    @DeleteMapping("/{id}")
    public AsesoresDTO deleteAsesor(@PathVariable int id) {
        return asesores_services.deleteAsesor(id);
    }
}