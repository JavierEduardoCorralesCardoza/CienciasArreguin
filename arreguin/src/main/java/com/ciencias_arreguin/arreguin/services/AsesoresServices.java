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

    public Asesores postAsesor(Asesores asesor) {
        return asesores_repository.save(asesor);
    }

    public Asesores getAsesorById(int id) {
        return asesores_repository.findById(id).get();
    }

    public Asesores putAsesor(int id, Asesores asesor) {
        Asesores asesor_actual = asesores_repository.findById(id).get();

        asesor_actual.setCorreoAsesor(asesor.getCorreoAsesor());
        asesor_actual.setContrasenaAsesor(asesor.getContrasenaAsesor());
        asesor_actual.setNombreAsesor(asesor.getNombreAsesor());
        asesor_actual.setImagenAsesor(asesor.getImagenAsesor());

        return asesores_repository.save(asesor_actual);
    }
}
