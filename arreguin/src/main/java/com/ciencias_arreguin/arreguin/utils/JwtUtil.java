package com.ciencias_arreguin.arreguin.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    
    // Clave secreta para firmar el JWT (en producción, esto debería estar en variables de entorno)
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    // Tiempo de expiración del token (24 horas en milisegundos)
    private final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 1000;

    /**
     * Genera un token JWT para un usuario alumno
     */
    public String generateToken(int userId, String tipoUsuario, String email) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("tipoUsuario", tipoUsuario);
        claims.put("email", email);
        // Para alumnos, no hay rol específico
        claims.put("rol", null);
        
        return createToken(claims);
    }

    /**
     * Genera un token JWT para un usuario asesor (con rol)
     */
    public String generateTokenWithRole(int userId, String tipoUsuario, String email, String rol) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("tipoUsuario", tipoUsuario);
        claims.put("email", email);
        claims.put("rol", rol);
        
        return createToken(claims);
    }

    /**
     * Crea el token JWT con los claims proporcionados
     */
    private String createToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * Extrae el ID del usuario del token
     */
    public Integer getUserIdFromToken(String token) {
        return getClaim(token, "userId");
    }

    /**
     * Extrae el tipo de usuario del token
     */
    public String getTipoUsuarioFromToken(String token) {
        return getClaim(token, "tipoUsuario");
    }

    /**
     * Extrae el email del token
     */
    public String getEmailFromToken(String token) {
        return getClaim(token, "email");
    }

    /**
     * Extrae el rol del token (solo para asesores)
     */
    public String getRolFromToken(String token) {
        return getClaim(token, "rol");
    }

    /**
     * Verifica si el usuario es admin basado en el token
     */
    public boolean isAdmin(String token) {
        String rol = getRolFromToken(token);
        return "admin".equalsIgnoreCase(rol);
    }

    /**
     * Extrae la fecha de expiración del token
     */
    public Date getExpirationDateFromToken(String token) {
        return getAllClaimsFromToken(token).getExpiration();
    }

    /**
     * Extrae un claim específico del token
     */
    @SuppressWarnings("unchecked")
    public <T> T getClaim(String token, String claimName) {
        final Claims claims = getAllClaimsFromToken(token);
        return (T) claims.get(claimName);
    }

    /**
     * Extrae todos los claims del token
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Verifica si el token ha expirado
     */
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * Valida el token JWT
     */
    public Boolean validateToken(String token) {
        try {
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
}