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
            mensaje,
            null // Los alumnos no tienen rol
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
            mensaje,
            asesor.getRolAsesor()
        );
    }

    /**
     * Crea un LoginResponseDTO de error
     */
    public LoginResponseDTO toErrorResponseDTO(String mensaje) {
        return new LoginResponseDTO(null, null, 0, null, mensaje, null);
    }

    /**
     * Crea un LoginResponseDTO exitoso con información del token (para alumnos)
     */
    public LoginResponseDTO toSuccessResponseDTO(String token, String tipoUsuario, 
                                               Integer userId, String nombreUsuario, String mensaje) {
        return new LoginResponseDTO(token, tipoUsuario, userId, nombreUsuario, mensaje, null);
    }

    /**
     * Crea un LoginResponseDTO exitoso con información del token (para asesores con rol)
     */
    public LoginResponseDTO toSuccessResponseDTOWithRole(String token, String tipoUsuario, 
                                                       Integer userId, String nombreUsuario, 
                                                       String mensaje, String rol) {
        return new LoginResponseDTO(token, tipoUsuario, userId, nombreUsuario, mensaje, rol);
    }
}