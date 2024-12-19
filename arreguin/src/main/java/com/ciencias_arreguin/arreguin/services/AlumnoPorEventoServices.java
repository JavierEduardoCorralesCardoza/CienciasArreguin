package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.AlumnoPorEvento;
import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.models.Eventos;
import com.ciencias_arreguin.arreguin.repositories.AlumnoPorEventoRepository;

@Service
public class AlumnoPorEventoServices {
    
    @Autowired
    private AlumnoPorEventoRepository alumno_por_evento_repository;

    public List<AlumnoPorEvento> getAlumnoPorEvento() {
        return alumno_por_evento_repository.findAll();
    }

    public AlumnoPorEvento postAlumnoPorEvento(AlumnoPorEvento alumnoPorEvento) {
        return alumno_por_evento_repository.save(alumnoPorEvento);
    }

    public AlumnoPorEvento getAlumnoPorEventoByAttributes(Alumnos id_alumno_evento, Eventos id_evento_alumno) {
        return alumno_por_evento_repository.findByIdAlumnoEventoAndIdEventoAlumno(id_alumno_evento, id_evento_alumno);
    }
}
