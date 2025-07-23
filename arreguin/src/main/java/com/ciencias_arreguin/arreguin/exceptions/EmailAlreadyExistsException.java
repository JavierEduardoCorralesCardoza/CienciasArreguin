package com.ciencias_arreguin.arreguin.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String email) {
        super("El correo electrónico ya está ocupado: " + email);
    }
    
    public EmailAlreadyExistsException() {
        super("El correo electrónico ya está ocupado");
    }
}