package com.ciencias_arreguin.arreguin.mappers;

import com.ciencias_arreguin.arreguin.dtos.LoginResponseDTO;
import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.models.Asesores;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    /**
     * Mapea un alumno a LoginResponseDTO con token
     */
    public LoginResponseDTO toLoginResponseDTO(Alumnos alumno, String token, String mensaje) {
        return new LoginResponseDTO(
            token,
            "alumno",
            alumno.getIdAlumno(),
            alumno.getNombreAlumno(),
            mensaje
        );
    }

    /**
     * Mapea un asesor a LoginResponseDTO con token
     */
    public LoginResponseDTO toLoginResponseDTO(Asesores asesor, String token, String mensaje) {
        return new LoginResponseDTO(
            token,
            "asesor",
            asesor.getIdAsesor(),
            asesor.getNombreAsesor(),
            mensaje
        );
    }

    /**
     * Crea un LoginResponseDTO de error
     */
    public LoginResponseDTO toErrorResponseDTO(String mensaje) {
        return new LoginResponseDTO(null, null, 0, null, mensaje);
    }

    /**
     * Crea un LoginResponseDTO exitoso con información del token
     */
    public LoginResponseDTO toSuccessResponseDTO(String token, String tipoUsuario, 
                                               Integer userId, String nombreUsuario, String mensaje) {
        return new LoginResponseDTO(token, tipoUsuario, userId, nombreUsuario, mensaje);
    }
}