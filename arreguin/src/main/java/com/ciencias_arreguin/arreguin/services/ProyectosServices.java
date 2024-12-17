package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.Proyectos;
import com.ciencias_arreguin.arreguin.repositories.ProyectosRepository;

@Service
public class ProyectosServices {

    @Autowired
    private ProyectosRepository proyectos_repository;

    public List<Proyectos> getProyectos() {
        return proyectos_repository.findAll();
    }

    public Proyectos postProyecto(Proyectos proyecto) {
        return proyectos_repository.save(proyecto);
    }
}
