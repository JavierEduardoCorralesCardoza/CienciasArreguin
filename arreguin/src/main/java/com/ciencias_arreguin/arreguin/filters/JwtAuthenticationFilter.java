package com.ciencias_arreguin.arreguin.filters;

import com.ciencias_arreguin.arreguin.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        final String requestTokenHeader = request.getHeader("Authorization");
        
        // Debug logging
        System.out.println("=== JWT Filter Debug ===");
        System.out.println("Request URI: " + request.getRequestURI());
        System.out.println("Request Method: " + request.getMethod());
        System.out.println("Authorization Header: " + requestTokenHeader);
        
        String userId = null;
        String tipoUsuario = null;
        String jwtToken = null;

        // El token JWT está en el formato "Bearer token"
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            System.out.println("Extracted JWT Token: " + jwtToken.substring(0, Math.min(jwtToken.length(), 20)) + "...");
            
            try {
                userId = jwtUtil.getUserIdFromToken(jwtToken).toString();
                tipoUsuario = jwtUtil.getTipoUsuarioFromToken(jwtToken);
                System.out.println("User ID from token: " + userId);
                System.out.println("User type from token: " + tipoUsuario);
            } catch (Exception e) {
                System.err.println("Error extracting user from token: " + e.getMessage());
                logger.warn("No se pudo obtener el usuario del token JWT", e);
            }
        } else {
            System.out.println("No Authorization header or doesn't start with Bearer");
        }

        // Validar el token y establecer la autenticación
        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            System.out.println("Validating token...");
            
            try {
                if (jwtUtil.validateToken(jwtToken)) {
                    System.out.println("Token is valid");
                    
                    // Crear la autoridad basada en el tipo de usuario
                    List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + tipoUsuario.toUpperCase())
                    );
                    System.out.println("Authorities: " + authorities);

                    // Crear el token de autenticación
                    UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(userId, null, authorities);
                    
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    // Establecer la autenticación en el contexto de seguridad
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("Authentication set successfully");
                } else {
                    System.out.println("Token validation failed");
                }
            } catch (Exception e) {
                System.err.println("Token validation error: " + e.getMessage());
            }
        } else if (userId == null) {
            System.out.println("No user ID extracted from token");
        } else {
            System.out.println("Authentication already exists in context");
        }
        
        System.out.println("=== End JWT Filter Debug ===");
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        boolean shouldSkip = path.startsWith("/auth/login") || 
                            path.startsWith("/auth/register") ||
                            path.startsWith("/public/") ||
                            path.startsWith("/error");
        
        System.out.println("Should not filter " + path + ": " + shouldSkip);
        return shouldSkip;
    }
}