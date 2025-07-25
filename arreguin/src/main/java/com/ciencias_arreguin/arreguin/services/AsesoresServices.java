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
import org.springframework.web.server.ResponseStatusException;

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

    public List<AsesoresDTO> getAsesores() {
        List<Asesores> asesores = asesores_repository.findAll();
        return asesores_mapper.toDTOList(asesores);
    }

    public AsesoresDTO postAsesor(AsesoresDTO asesorDTO) {
        Asesores asesor = asesores_mapper.toEntity(asesorDTO);

        if (asesores_repository.existsByCorreoAsesor(asesor.getCorreoAsesor())) {
            throw new EmailAlreadyExistsException(asesor.getCorreoAsesor());
        }

        if (asesor.getContrasenaAsesor() != null && !asesor.getContrasenaAsesor().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(asesor.getContrasenaAsesor());
            asesor.setContrasenaAsesor(hashedPassword);
        }
        
        Asesores savedAsesor = asesores_repository.save(asesor);
        return asesores_mapper.toDTO(savedAsesor);
    }

    public ResponseEntity<Map<String, String>> postAsesorImage(MultipartFile image) {
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

    public AsesoresDTO getAsesorById(int id) {
        Asesores asesor = asesores_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + id));
        return asesores_mapper.toDTOWithPassword(asesor);
    }

    public AsesoresDTO putAsesor(int id, AsesoresDTO asesorDTO) {
        Asesores asesor_actual = asesores_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + id));

        if (!asesor_actual.getCorreoAsesor().equals(asesorDTO.getCorreoAsesor()) && 
            asesores_repository.existsByCorreoAsesor(asesorDTO.getCorreoAsesor())) {
            throw new EmailAlreadyExistsException(asesorDTO.getCorreoAsesor());
        }

        String hashedPassword = passwordEncoder.encode(asesorDTO.getContrasenaAsesor());
        asesorDTO.setContrasenaAsesor(hashedPassword);

        asesores_mapper.updateEntityFromDTO(asesorDTO, asesor_actual);
        Asesores savedAsesor = asesores_repository.save(asesor_actual);
        return asesores_mapper.toDTO(savedAsesor);
    }

    public AsesoresDTO deleteAsesor(int id) {
        Asesores asesor = asesores_repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Asesor no encontrado con ID: " + id));
        asesores_repository.delete(asesor);
        return asesores_mapper.toDTO(asesor);
    }
}