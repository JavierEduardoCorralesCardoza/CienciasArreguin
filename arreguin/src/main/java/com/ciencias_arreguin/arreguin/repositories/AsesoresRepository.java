package com.ciencias_arreguin.arreguin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciencias_arreguin.arreguin.models.Asesores;

@Repository
public interface AsesoresRepository extends JpaRepository<Asesores, Integer> {
}
