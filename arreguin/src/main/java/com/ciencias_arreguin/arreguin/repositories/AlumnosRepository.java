package com.ciencias_arreguin.arreguin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciencias_arreguin.arreguin.models.Alumnos;

@Repository
public interface AlumnosRepository extends JpaRepository<Alumnos, Integer> {
}
