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

    public Proyectos getProyectoById(int id) {
        return proyectos_repository.findById(id).get();
    }

    public Proyectos putProyecto(int id, Proyectos proyecto) {
        Proyectos proyecto_actual = proyectos_repository.findById(id).get();

        proyecto_actual.setNombreProyecto(proyecto.getNombreProyecto());
        proyecto_actual.setCategoriaProyecto(proyecto.getCategoriaProyecto());
        proyecto_actual.setDescripcionProyecto(proyecto.getDescripcionProyecto());
        
        return proyectos_repository.save(proyecto_actual);
    }
}
