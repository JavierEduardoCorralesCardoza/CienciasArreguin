package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.AsesorPorEvento;
import com.ciencias_arreguin.arreguin.repositories.AsesorPorEventoRepository;

@Service
public class AsesorPorEventoServices {
    
    @Autowired
    private AsesorPorEventoRepository asesor_por_evento_repository;

    public List<AsesorPorEvento> getAsesorPorEvento() {
        return asesor_por_evento_repository.findAll();
    }

    public AsesorPorEvento postAsesorPorEvento(AsesorPorEvento asesorPorEvento) {
        return asesor_por_evento_repository.save(asesorPorEvento);
    }

    public AsesorPorEvento getAsesorPorEventoById(int id) {
        return asesor_por_evento_repository.findById(id).get();
    }
}
