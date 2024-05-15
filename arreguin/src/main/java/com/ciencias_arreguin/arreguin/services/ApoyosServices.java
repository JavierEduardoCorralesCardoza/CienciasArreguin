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
}
