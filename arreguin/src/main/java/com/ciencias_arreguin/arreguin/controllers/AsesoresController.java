package com.ciencias_arreguin.arreguin.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ciencias_arreguin.arreguin.dtos.AsesoresDTO;
import com.ciencias_arreguin.arreguin.services.AsesoresServices;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping
    public AsesoresDTO postAsesor(
            @RequestParam String correoAsesor,
            @RequestParam String contrasenaAsesor,
            @RequestParam String nombreAsesor,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        AsesoresDTO asesorDTO = new AsesoresDTO();
        asesorDTO.setCorreoAsesor(correoAsesor);
        asesorDTO.setContrasenaAsesor(contrasenaAsesor);
        asesorDTO.setNombreAsesor(nombreAsesor);
        asesorDTO.setRolAsesor("asesor");

        return asesores_services.postAsesor(asesorDTO, image);
    }

    @PutMapping("/{id}")
    public AsesoresDTO putAsesor(@PathVariable int id, 
            @RequestParam(required = false) String correoAsesor,
            @RequestParam(required = false) String contrasenaAsesor,
            @RequestParam(required = false) String nombreAsesor,
            @RequestParam(required = false) MultipartFile image) throws IOException  {

        AsesoresDTO asesorDTO = new AsesoresDTO();
        asesorDTO.setCorreoAsesor(correoAsesor);
        asesorDTO.setContrasenaAsesor(contrasenaAsesor);
        asesorDTO.setNombreAsesor(nombreAsesor);

        return asesores_services.putAsesor(id, asesorDTO, image);
    }

    @DeleteMapping("/{id}")
    public AsesoresDTO deleteAsesor(@PathVariable int id) {
        return asesores_services.deleteAsesor(id);
    }
}