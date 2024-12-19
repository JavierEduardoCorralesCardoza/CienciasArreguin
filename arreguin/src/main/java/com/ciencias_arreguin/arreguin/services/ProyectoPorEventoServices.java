package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.ProyectoPorEvento;
import com.ciencias_arreguin.arreguin.repositories.ProyectoPorEventoRepository;

@Service
public class ProyectoPorEventoServices {
    
    @Autowired
    private ProyectoPorEventoRepository proyecto_por_evento_repository;

    public List<ProyectoPorEvento> getProyectoPorEvento() {
        return proyecto_por_evento_repository.findAll();
    }

    public ProyectoPorEvento postProyectoPorEvento(ProyectoPorEvento proyecto_por_evento) {
        return proyecto_por_evento_repository.save(proyecto_por_evento);
    }
}
