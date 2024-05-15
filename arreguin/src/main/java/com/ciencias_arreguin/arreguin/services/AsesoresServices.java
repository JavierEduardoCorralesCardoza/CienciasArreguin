package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.repositories.AsesoresRepository;

@Service
public class AsesoresServices {

    @Autowired
    private AsesoresRepository asesores_repository;

    public List<Asesores> getAsesores() {
        return asesores_repository.findAll();
    }
}
