package com.ciencias_arreguin.arreguin.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ciencias_arreguin.arreguin.dtos.AlumnosDTO;
import com.ciencias_arreguin.arreguin.exceptions.EmailAlreadyExistsException;
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

        if (alumnos_repository.existsByCorreoAlumno(alumno.getCorreoAlumno())) {
            throw new EmailAlreadyExistsException(alumno.getCorreoAlumno());
        }

        if (alumno.getContrasenaAlumno() != null && !alumno.getContrasenaAlumno().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(alumno.getContrasenaAlumno());
            alumno.setContrasenaAlumno(hashedPassword);
        }

        Alumnos savedAlumno = alumnos_repository.save(alumno);
        return alumnos_mapper.toDTO(savedAlumno);
    }

    public ResponseEntity<Map<String, String>> postAlumnoImage(MultipartFile image) {
        try {
            String uploadDir = "uploads/";
            
            // Create uploads directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Generate a unique filename
            String originalFilename = image.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String imageName = UUID.randomUUID().toString() + fileExtension;
            
            // Save the file
            Path filePath = uploadPath.resolve(imageName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            Map<String, String> response = new HashMap<>();
            response.put("fileName", imageName);
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to upload image: " + e.getMessage()));
        }
    }

    public AlumnosDTO getAlumnoById(int id) {
        Alumnos alumno = alumnos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));
        return alumnos_mapper.toDTOWithPassword(alumno);
    }

    public AlumnosDTO putAlumno(int id, AlumnosDTO alumnoDTO) {
        Alumnos alumno_actualizado = alumnos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));

        if (!alumno_actualizado.getCorreoAlumno().equals(alumnoDTO.getCorreoAlumno()) && 
            alumnos_repository.existsByCorreoAlumno(alumnoDTO.getCorreoAlumno())) {
            throw new EmailAlreadyExistsException(alumnoDTO.getCorreoAlumno());
        }

        String hashedPassword = passwordEncoder.encode(alumnoDTO.getContrasenaAlumno());
        alumnoDTO.setContrasenaAlumno(hashedPassword);
        
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