package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.repositories.AlumnosRepository;

@Service
public class AlumnosServices {
    
    @Autowired
    private AlumnosRepository alumnos_repository;

    public List<Alumnos> getAlumnos() {
        return alumnos_repository.findAll();
    }

    public Alumnos postAlumno(Alumnos alumno) {
        return alumnos_repository.save(alumno);
    }

    public Alumnos getAlumnoById(int id) {
        return alumnos_repository.findById(id).get();
    }

    public Alumnos putAlumno(int id, Alumnos alumno) {
        Alumnos alumno_actualizado = alumnos_repository.findById(id).get();
        
        alumno_actualizado.setCorreoAlumno(alumno.getCorreoAlumno());
        alumno_actualizado.setContrasenaAlumno(alumno.getContrasenaAlumno());
        alumno_actualizado.setNombreAlumno(alumno.getNombreAlumno());
        alumno_actualizado.setImagenAlumno(alumno.getImagenAlumno());

        return alumnos_repository.save(alumno_actualizado);
    }
}
