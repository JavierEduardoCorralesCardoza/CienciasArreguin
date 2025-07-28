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

import com.ciencias_arreguin.arreguin.dtos.AlumnosDTO;
import com.ciencias_arreguin.arreguin.services.AlumnosServices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/alumnos")
public class AlumnosController {

    @Autowired
    private AlumnosServices alumnos_services;

    @GetMapping
    public List<AlumnosDTO> getAlumnos() {
        return alumnos_services.getAlumnos();
    }

    @GetMapping("/busqueda")
    public AlumnosDTO getAlumnoById(@RequestParam int id) {
        return alumnos_services.getAlumnoById(id);
    }

    @PostMapping
    public AlumnosDTO postAlumno(
            @RequestParam String correoAlumno,
            @RequestParam String contrasenaAlumno,
            @RequestParam String nombreAlumno,
            @RequestParam(required = false) MultipartFile image) throws IOException {
        
        AlumnosDTO alumnoDTO = new AlumnosDTO();
        alumnoDTO.setCorreoAlumno(correoAlumno);
        alumnoDTO.setContrasenaAlumno(contrasenaAlumno);
        alumnoDTO.setNombreAlumno(nombreAlumno);
        
        return alumnos_services.postAlumno(alumnoDTO, image);
    }

    @PutMapping("/{id}")
    public AlumnosDTO putAlumno(@PathVariable int id, 
            @RequestParam(required = false) String correoAlumno,
            @RequestParam(required = false) String contrasenaAlumno,
            @RequestParam(required = false) String nombreAlumno,
            @RequestParam(required = false) MultipartFile image) throws IOException  {
            
        AlumnosDTO alumnoDTO = new AlumnosDTO();
        alumnoDTO.setCorreoAlumno(correoAlumno);
        alumnoDTO.setContrasenaAlumno(contrasenaAlumno);
        alumnoDTO.setNombreAlumno(nombreAlumno);

        return alumnos_services.putAlumno(id, alumnoDTO, image);
    }

    @DeleteMapping("/{id}")
    public AlumnosDTO deleteAlumno(@PathVariable int id) {
        return alumnos_services.deleteAlumno(id);
    }
}