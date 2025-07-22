package com.ciencias_arreguin.arreguin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciencias_arreguin.arreguin.dtos.ParticipacionesDTO;
import com.ciencias_arreguin.arreguin.dtos.ParticipacionesDetalleDTO;
import com.ciencias_arreguin.arreguin.services.ParticipacionesServices;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/participaciones")
public class ParticipacionesController {
    
    @Autowired
    private ParticipacionesServices participaciones_services;

    @GetMapping
    public List<ParticipacionesDTO> getParticipaciones() {
        return participaciones_services.getParticipaciones();
    }

    @GetMapping("/detalle")
    public List<ParticipacionesDetalleDTO> getParticipacionesDetalle() {
        return participaciones_services.getParticipacionesDetalle();
    }

    @GetMapping("/busqueda")
    public ParticipacionesDTO getParticipacionById(@RequestParam int id) {
        return participaciones_services.getParticipacionById(id);
    }

    @GetMapping("/detalle/busqueda")
    public ParticipacionesDetalleDTO getParticipacionDetalleById(@RequestParam int id) {
        return participaciones_services.getParticipacionDetalleById(id);
    }

    @GetMapping("/detalle/usuario/busqueda")
    public List<ParticipacionesDetalleDTO> getParticipacionesDetalleByUsuarioId(@RequestParam int id) {
        return participaciones_services.getParticipacionesDetalleByUsuarioId(id);
    }
    
    @PostMapping
    public ParticipacionesDTO postParticipacion(@RequestBody ParticipacionesDTO participacion) {
        return participaciones_services.postParticipacion(participacion);
    }

    @PutMapping("/{id}")
    public ParticipacionesDTO putParticipacion(@PathVariable int id, @RequestBody ParticipacionesDTO participacion) {
        return participaciones_services.putParticipacion(id, participacion);
    }

    @DeleteMapping("/{id}")
    public ParticipacionesDTO deleteParticipacion(@PathVariable int id) {
        return participaciones_services.deleteParticipacion(id);
    }
}