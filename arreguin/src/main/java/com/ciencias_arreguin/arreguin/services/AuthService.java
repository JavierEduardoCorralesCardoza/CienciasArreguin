package com.ciencias_arreguin.arreguin.services;

import com.ciencias_arreguin.arreguin.dtos.LoginRequestDTO;
import com.ciencias_arreguin.arreguin.dtos.LoginResponseDTO;
import com.ciencias_arreguin.arreguin.mappers.AuthMapper;
import com.ciencias_arreguin.arreguin.models.Alumnos;
import com.ciencias_arreguin.arreguin.models.Asesores;
import com.ciencias_arreguin.arreguin.services.UserSearchService.UserSearchResult;
import com.ciencias_arreguin.arreguin.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserSearchService userSearchService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthMapper authMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Autentica a un usuario y genera un token JWT
     */
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        try {
            // Buscar el usuario por email
            UserSearchResult searchResult = userSearchService.findUserByEmail(loginRequest.getCorreo());
            
            if (!searchResult.isFound()) {
                return authMapper.toErrorResponseDTO("Usuario no encontrado");
            }

            // Verificar contraseña según el tipo de usuario
            boolean isPasswordValid = false;
            String userEmail = "";
            
            if ("alumno".equals(searchResult.getUserType())) {
                Alumnos alumno = searchResult.getUserAs(Alumnos.class);
                userEmail = alumno.getCorreoAlumno();
                // Verificar contraseña
                isPasswordValid = verifyPassword(loginRequest.getContrasena(), alumno.getContrasenaAlumno());
                
                if (isPasswordValid) {
                    // Generar token para alumno (sin rol)
                    String token = jwtUtil.generateToken(
                        alumno.getIdAlumno(), 
                        "alumno", 
                        alumno.getCorreoAlumno()
                    );
                    return authMapper.toLoginResponseDTO(alumno, token, "Login exitoso");
                }
                
            } else if ("asesor".equals(searchResult.getUserType())) {
                Asesores asesor = searchResult.getUserAs(Asesores.class);
                userEmail = asesor.getCorreoAsesor();
                // Verificar contraseña
                isPasswordValid = verifyPassword(loginRequest.getContrasena(), asesor.getContrasenaAsesor());
                
                if (isPasswordValid) {
                    // Generar token para asesor (con rol)
                    String token = jwtUtil.generateTokenWithRole(
                        asesor.getIdAsesor(), 
                        "asesor", 
                        asesor.getCorreoAsesor(),
                        asesor.getRolAsesor()
                    );
                    return authMapper.toLoginResponseDTO(asesor, token, "Login exitoso");
                }
            }

            return authMapper.toErrorResponseDTO("Credenciales inválidas");
            
        } catch (Exception e) {
            return authMapper.toErrorResponseDTO("Error en el proceso de autenticación: " + e.getMessage());
        }
    }

    /**
     * Obtiene la información del usuario desde un token JWT
     */
    public LoginResponseDTO getUserInfoFromToken(String token) {
        try {
            if (!jwtUtil.validateToken(token)) {
                return authMapper.toErrorResponseDTO("Token inválido o expirado");
            }

            // Extraer información del token
            Integer userId = jwtUtil.getUserIdFromToken(token);
            String tipoUsuario = jwtUtil.getTipoUsuarioFromToken(token);
            String email = jwtUtil.getEmailFromToken(token);
            String rol = jwtUtil.getRolFromToken(token);

            // Buscar el usuario actualizado en la base de datos
            UserSearchResult searchResult = userSearchService.findUserByEmail(email);
            
            if (!searchResult.isFound()) {
                return authMapper.toErrorResponseDTO("Usuario no encontrado");
            }

            // Retornar información según el tipo de usuario
            if ("alumno".equals(tipoUsuario)) {
                Alumnos alumno = searchResult.getUserAs(Alumnos.class);
                return authMapper.toSuccessResponseDTO(
                    token, 
                    "alumno", 
                    alumno.getIdAlumno(), 
                    alumno.getNombreAlumno(),
                    "Token válido"
                );
            } else if ("asesor".equals(tipoUsuario)) {
                Asesores asesor = searchResult.getUserAs(Asesores.class);
                return authMapper.toSuccessResponseDTOWithRole(
                    token, 
                    "asesor", 
                    asesor.getIdAsesor(), 
                    asesor.getNombreAsesor(),
                    "Token válido",
                    asesor.getRolAsesor()
                );
            }

            return authMapper.toErrorResponseDTO("Tipo de usuario no válido");
            
        } catch (Exception e) {
            return authMapper.toErrorResponseDTO("Error al validar token: " + e.getMessage());
        }
    }

    /**
     * Verifica si un token corresponde a un usuario admin
     */
    public boolean isTokenFromAdmin(String token) {
        try {
            if (!jwtUtil.validateToken(token)) {
                return false;
            }
            
            String tipoUsuario = jwtUtil.getTipoUsuarioFromToken(token);
            
            // Solo los asesores pueden ser admin
            if (!"asesor".equals(tipoUsuario)) {
                return false;
            }
            
            return jwtUtil.isAdmin(token);
            
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Obtiene el rol del usuario desde el token
     */
    public String getRoleFromToken(String token) {
        try {
            if (!jwtUtil.validateToken(token)) {
                return null;
            }
            return jwtUtil.getRolFromToken(token);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Verifica si una contraseña coincide con su hash
     * Nota: Asume que las contraseñas están hasheadas con BCrypt
     * Si no están hasheadas, modifica este método
     */
    private boolean verifyPassword(String plainPassword, String hashedPassword) {
        try {
            // Si las contraseñas están hasheadas con BCrypt
            return passwordEncoder.matches(plainPassword, hashedPassword);
        } catch (Exception e) {
            // Si las contraseñas están en texto plano (no recomendado)
            // Descomenta la línea siguiente y comenta la de arriba
            // return plainPassword.equals(hashedPassword);
            
            // Si hay error en la verificación, retornar false por seguridad
            return false;
        }
    }

    /**
     * Método auxiliar para hashear contraseñas (útil para registro de usuarios)
     */
    public String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }
}