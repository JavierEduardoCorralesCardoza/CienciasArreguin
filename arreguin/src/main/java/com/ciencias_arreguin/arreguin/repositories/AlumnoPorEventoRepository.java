package com.ciencias_arreguin.arreguin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciencias_arreguin.arreguin.models.AlumnoPorEvento;
import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.models.Eventos;

@Repository
public interface AlumnoPorEventoRepository extends JpaRepository<AlumnoPorEvento, Integer> {
    AlumnoPorEvento findByIdAlumnoEventoAndIdEventoAlumno(Alumnos idAlumno, Eventos idEvento);
}
