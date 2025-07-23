package com.ciencias_arreguin.arreguin.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.models.Eventos;
import com.ciencias_arreguin.arreguin.models.Participaciones;

@Repository
public interface ParticipacionesRepository extends JpaRepository<Participaciones, Integer> {
    
    List<Participaciones> findByIdAlumnoParticipacion(Alumnos alumno);

    List<Participaciones> findByIdAsesorParticipacion(Asesores asesor);

    boolean existsByIdEventoParticipacionAndIdAlumnoParticipacionAndIdAsesorParticipacion(Eventos idEvento, Alumnos idAlumno, Asesores idAsesor);
}
