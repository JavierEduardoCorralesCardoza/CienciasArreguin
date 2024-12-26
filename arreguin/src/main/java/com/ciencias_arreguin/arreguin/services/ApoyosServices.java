package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.Apoyos;
import com.ciencias_arreguin.arreguin.repositories.ApoyosRepository;

@Service
public class ApoyosServices {
    
    @Autowired
    private ApoyosRepository apoyos_repository;

    public List<Apoyos> getApoyos() {
        return apoyos_repository.findAll();
    }

    public Apoyos postApoyo(Apoyos apoyo) {
        return apoyos_repository.save(apoyo);
    }

    public Apoyos getApoyoById(int id) {
        return apoyos_repository.findById(id).get();
    }

    public Apoyos putApoyo(int id, Apoyos apoyo) {
        Apoyos apoyo_actual = apoyos_repository.findById(id).get();

        apoyo_actual.setPatrocinadorApoyo(apoyo.getPatrocinadorApoyo());
        apoyo_actual.setDescripcionApoyo(apoyo.getDescripcionApoyo());
        
        return apoyos_repository.save(apoyo_actual);
    }
}
