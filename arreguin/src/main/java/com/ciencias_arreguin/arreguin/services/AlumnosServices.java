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
}
