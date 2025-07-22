package com.ciencias_arreguin.arreguin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ciencias_arreguin.arreguin.dtos.LoginRequestDTO;
import com.ciencias_arreguin.arreguin.dtos.LoginResponseDTO;
import com.ciencias_arreguin.arreguin.services.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Para permitir CORS desde el frontend
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Endpoint para hacer login
     * POST /auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            LoginResponseDTO response = authService.login(loginRequest);
            
            if (response.getToken() != null) {
                // Login exitoso
                return ResponseEntity.ok(response);
            } else {
                // Login fallido
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            LoginResponseDTO errorResponse = new LoginResponseDTO(
                null, null, 0, null, "Error interno del servidor: " + e.getMessage(), null
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Endpoint para validar un token
     * GET /auth/validate
     */
    @GetMapping("/validate")
    public ResponseEntity<LoginResponseDTO> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                LoginResponseDTO errorResponse = new LoginResponseDTO(
                    null, null, 0, null, "Token no proporcionado o formato incorrecto", null
                );
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }

            String token = authHeader.substring(7); // Remover "Bearer "
            LoginResponseDTO response = authService.getUserInfoFromToken(token);
            
            if (response.getToken() != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            LoginResponseDTO errorResponse = new LoginResponseDTO(
                null, null, 0, null, "Error al validar el token: " + e.getMessage(), null
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Endpoint para obtener información del usuario actual
     * GET /auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<LoginResponseDTO> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                LoginResponseDTO errorResponse = new LoginResponseDTO(
                    null, null, 0, null, "Token no proporcionado", null
                );
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }

            String token = authHeader.substring(7);
            LoginResponseDTO response = authService.getUserInfoFromToken(token);
            
            if (response.getIdUsuario() > 0) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            LoginResponseDTO errorResponse = new LoginResponseDTO(
                null, null, 0, null, "Error al obtener información del usuario: " + e.getMessage(), null
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Endpoint para verificar si el usuario actual es admin
     * GET /auth/is-admin
     */
    @GetMapping("/is-admin")
    public ResponseEntity<Boolean> isAdmin(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
            }

            String token = authHeader.substring(7);
            boolean isAdmin = authService.isTokenFromAdmin(token);
            
            return ResponseEntity.ok(isAdmin);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    /**
     * Endpoint para obtener el rol del usuario actual
     * GET /auth/role
     */
    @GetMapping("/role")
    public ResponseEntity<String> getUserRole(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            String token = authHeader.substring(7);
            String role = authService.getRoleFromToken(token);
            
            return ResponseEntity.ok(role);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}