package com.ciencias_arreguin.arreguin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.dtos.AlumnosDTO;
import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.repositories.AlumnosRepository;
import com.ciencias_arreguin.arreguin.mappers.AlumnosMapper;

@Service
public class AlumnosServices {
    
    @Autowired
    private AlumnosRepository alumnos_repository;
    
    @Autowired
    private AlumnosMapper alumnos_mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<AlumnosDTO> getAlumnos() {
        List<Alumnos> alumnos = alumnos_repository.findAll();
        return alumnos_mapper.toDTOList(alumnos);
    }

    public AlumnosDTO postAlumno(AlumnosDTO alumnoDTO) {
        Alumnos alumno = alumnos_mapper.toEntity(alumnoDTO);

        if (alumno.getContrasenaAlumno() != null && !alumno.getContrasenaAlumno().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(alumno.getContrasenaAlumno());
            alumno.setContrasenaAlumno(hashedPassword);
        }

        Alumnos savedAlumno = alumnos_repository.save(alumno);
        return alumnos_mapper.toDTO(savedAlumno);
    }

    public AlumnosDTO getAlumnoById(int id) {
        Alumnos alumno = alumnos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));
        return alumnos_mapper.toDTOWithPassword(alumno);
    }

    public AlumnosDTO putAlumno(int id, AlumnosDTO alumnoDTO) {
        Alumnos alumno_actualizado = alumnos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));
        
        alumnos_mapper.updateEntityFromDTO(alumnoDTO, alumno_actualizado);
        Alumnos savedAlumno = alumnos_repository.save(alumno_actualizado);
        return alumnos_mapper.toDTO(savedAlumno);
    }

    public AlumnosDTO deleteAlumno(int id) {
        Alumnos alumno = alumnos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));
        
        alumnos_repository.delete(alumno);
        return alumnos_mapper.toDTO(alumno);
    }
}