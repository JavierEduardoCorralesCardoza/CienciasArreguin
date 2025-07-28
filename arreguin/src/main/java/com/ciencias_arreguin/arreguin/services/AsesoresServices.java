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

import com.ciencias_arreguin.arreguin.dtos.AsesoresDTO;
import com.ciencias_arreguin.arreguin.exceptions.EmailAlreadyExistsException;
import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.repositories.AsesoresRepository;
import com.ciencias_arreguin.arreguin.mappers.AsesoresMapper;

@Service
public class AsesoresServices {

    @Autowired
    private AsesoresRepository asesores_repository;
    
    @Autowired
    private AsesoresMapper asesores_mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String uploadDir = "uploads/";

    public List<AsesoresDTO> getAsesores() {
        List<Asesores> asesores = asesores_repository.findAll();
        return asesores_mapper.toDTOList(asesores);
    }

    public AsesoresDTO postAsesor(AsesoresDTO asesorDTO, MultipartFile image) throws IOException {
        Asesores asesor = asesores_mapper.toEntity(asesorDTO);

        if (asesores_repository.existsByCorreoAsesor(asesor.getCorreoAsesor())) {
            throw new EmailAlreadyExistsException(asesor.getCorreoAsesor());
        }

        if (asesor.getContrasenaAsesor() != null && !asesor.getContrasenaAsesor().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(asesor.getContrasenaAsesor());
            asesor.setContrasenaAsesor(hashedPassword);
        }

        if (image != null && !image.isEmpty()) {
            String imageName = saveImage(image);
            asesor.setImagenAsesor(imageName);
        }

        Asesores savedAsesor = asesores_repository.save(asesor);
        return asesores_mapper.toDTO(savedAsesor);
    }

    public AsesoresDTO getAsesorById(int id) {
        Asesores asesor = asesores_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + id));
        return asesores_mapper.toDTOWithPassword(asesor);
    }

    public AsesoresDTO putAsesor(int id, AsesoresDTO asesoresDTO, MultipartFile image) throws IOException {
        Asesores asesor_actualizado = asesores_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + id));

        // Solo actualizar campos no nulos y no vacíos
        if (asesoresDTO.getCorreoAsesor() != null && !asesoresDTO.getCorreoAsesor().trim().isEmpty()) {
            if (!asesor_actualizado.getCorreoAsesor().equals(asesoresDTO.getCorreoAsesor()) && 
                asesores_repository.existsByCorreoAsesor(asesoresDTO.getCorreoAsesor())) {
                throw new EmailAlreadyExistsException(asesoresDTO.getCorreoAsesor());
            }
            asesor_actualizado.setCorreoAsesor(asesoresDTO.getCorreoAsesor());
        }

        if (asesoresDTO.getNombreAsesor() != null && !asesoresDTO.getNombreAsesor().trim().isEmpty()) {
            asesor_actualizado.setNombreAsesor(asesoresDTO.getNombreAsesor());
        }

        // Solo actualizar contraseña si no es null Y no está vacía
        if (asesoresDTO.getContrasenaAsesor() != null && !asesoresDTO.getContrasenaAsesor().trim().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(asesoresDTO.getContrasenaAsesor());
            asesor_actualizado.setContrasenaAsesor(hashedPassword);
        }

        if (image != null && !image.isEmpty()) {
            deleteOldImage(asesor_actualizado.getImagenAsesor());
            String newImageName = saveImage(image);
            asesor_actualizado.setImagenAsesor(newImageName);
        }

        Asesores savedAsesor = asesores_repository.save(asesor_actualizado);
        return asesores_mapper.toDTO(savedAsesor);
    }

    public AsesoresDTO deleteAsesor(int id) {
        Asesores asesor = asesores_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + id));

        deleteOldImage(asesor.getImagenAsesor());

        asesores_repository.delete(asesor);
        return asesores_mapper.toDTO(asesor);
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