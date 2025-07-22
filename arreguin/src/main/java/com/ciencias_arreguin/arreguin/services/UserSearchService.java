package com.ciencias_arreguin.arreguin.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.repositories.AlumnosRepository;
import com.ciencias_arreguin.arreguin.repositories.AsesoresRepository;

import java.util.Optional;

@Service
public class UserSearchService {

    @Autowired
    private AlumnosRepository alumnosRepository;
    
    @Autowired
    private AsesoresRepository asesoresRepository;

    /**
     * Clase auxiliar para el resultado de búsqueda
     */
    public static class UserSearchResult {
        private final Object user;
        private final String userType;
        private final boolean found;

        public UserSearchResult(Object user, String userType, boolean found) {
            this.user = user;
            this.userType = userType;
            this.found = found;
        }

        public Object getUser() { return user; }
        public String getUserType() { return userType; }
        public boolean isFound() { return found; }
        
        @SuppressWarnings("unchecked")
        public <T> T getUserAs(Class<T> type) {
            return (T) user;
        }
    }

    /**
     * Busca un usuario por correo electrónico en ambas tablas
     * Devuelve información sobre qué tipo de usuario es
     */
    public UserSearchResult findUserByEmail(String email) {
        // Primero buscar en alumnos
        Optional<Alumnos> alumnoOpt = alumnosRepository.findByCorreoAlumno(email);
        if (alumnoOpt.isPresent()) {
            return new UserSearchResult(alumnoOpt.get(), "alumno", true);
        }

        // Luego buscar en asesores
        Optional<Asesores> asesorOpt = asesoresRepository.findByCorreoAsesor(email);
        if (asesorOpt.isPresent()) {
            return new UserSearchResult(asesorOpt.get(), "asesor", true);
        }

        // No encontrado
        return new UserSearchResult(null, null, false);
    }

    /**
     * Verifica si un correo existe en cualquiera de las dos tablas
     */
    public boolean emailExists(String email) {
        return alumnosRepository.findByCorreoAlumno(email).isPresent() || 
               asesoresRepository.findByCorreoAsesor(email).isPresent();
    }

    /**
     * Determina el tipo de usuario basado en el email
     */
    public String getUserType(String email) {
        if (alumnosRepository.findByCorreoAlumno(email).isPresent()) {
            return "alumno";
        } else if (asesoresRepository.findByCorreoAsesor(email).isPresent()) {
            return "asesor";
        }
        return null;
    }
}