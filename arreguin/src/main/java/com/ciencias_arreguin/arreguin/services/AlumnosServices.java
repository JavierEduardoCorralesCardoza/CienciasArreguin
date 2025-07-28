package com.ciencias_arreguin.arreguin.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

    private final String uploadDir = "uploads/";

    public List<AlumnosDTO> getAlumnos() {
        List<Alumnos> alumnos = alumnos_repository.findAll();
        return alumnos_mapper.toDTOList(alumnos);
    }

    public AlumnosDTO postAlumno(AlumnosDTO alumnoDTO, MultipartFile image) throws IOException {
        Alumnos alumno = alumnos_mapper.toEntity(alumnoDTO);

        if (alumnos_repository.existsByCorreoAlumno(alumno.getCorreoAlumno())) {
            throw new EmailAlreadyExistsException(alumno.getCorreoAlumno());
        }

        if (alumno.getContrasenaAlumno() != null && !alumno.getContrasenaAlumno().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(alumno.getContrasenaAlumno());
            alumno.setContrasenaAlumno(hashedPassword);
        }

        if (image != null && !image.isEmpty()) {
            String imageName = saveImage(image);
            alumno.setImagenAlumno(imageName);
        }

        Alumnos savedAlumno = alumnos_repository.save(alumno);
        return alumnos_mapper.toDTO(savedAlumno);
    }

    public AlumnosDTO getAlumnoById(int id) {
        Alumnos alumno = alumnos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));
        return alumnos_mapper.toDTOWithPassword(alumno);
    }

    public AlumnosDTO putAlumno(int id, AlumnosDTO alumnoDTO, MultipartFile image) throws IOException {
        Alumnos alumno_actualizado = alumnos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));

        // Solo actualizar campos no nulos y no vacíos
        if (alumnoDTO.getCorreoAlumno() != null && !alumnoDTO.getCorreoAlumno().trim().isEmpty()) {
            if (!alumno_actualizado.getCorreoAlumno().equals(alumnoDTO.getCorreoAlumno()) && 
                alumnos_repository.existsByCorreoAlumno(alumnoDTO.getCorreoAlumno())) {
                throw new EmailAlreadyExistsException(alumnoDTO.getCorreoAlumno());
            }
            alumno_actualizado.setCorreoAlumno(alumnoDTO.getCorreoAlumno());
        }

        if (alumnoDTO.getNombreAlumno() != null && !alumnoDTO.getNombreAlumno().trim().isEmpty()) {
            alumno_actualizado.setNombreAlumno(alumnoDTO.getNombreAlumno());
        }

        // Solo actualizar contraseña si no es null Y no está vacía
        if (alumnoDTO.getContrasenaAlumno() != null && !alumnoDTO.getContrasenaAlumno().trim().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(alumnoDTO.getContrasenaAlumno());
            alumno_actualizado.setContrasenaAlumno(hashedPassword);
        }

        if (image != null && !image.isEmpty()) {
            deleteOldImage(alumno_actualizado.getImagenAlumno());
            String newImageName = saveImage(image);
            alumno_actualizado.setImagenAlumno(newImageName);
        }
        
        Alumnos savedAlumno = alumnos_repository.save(alumno_actualizado);
        return alumnos_mapper.toDTO(savedAlumno);
    }

    public AlumnosDTO deleteAlumno(int id) {
        Alumnos alumno = alumnos_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + id));

        deleteOldImage(alumno.getImagenAlumno());
        
        alumnos_repository.delete(alumno);
        return alumnos_mapper.toDTO(alumno);
    }

    private String saveImage(MultipartFile image) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = image.getOriginalFilename();
        @SuppressWarnings("null")
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String imageName = UUID.randomUUID().toString() + fileExtension;

        Path filePath = uploadPath.resolve(imageName);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return imageName;
    }

    private void deleteOldImage(String imageName) {
        if (imageName != null && !imageName.isEmpty()) {
            try {
                Path oldImagePath = Paths.get(uploadDir).resolve(imageName);
                if (Files.exists(oldImagePath)) {
                    Files.delete(oldImagePath);
                }
            } catch (IOException e) {
                System.err.println("Error al eliminar imagen anterior: " + imageName + " - " + e.getMessage());
            }
        }
    }
}