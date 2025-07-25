package com.ciencias_arreguin.arreguin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/uploads/**")  // Ruta URL pública
            .addResourceLocations("file:uploads/");  // Ruta física (el "file:" es clave)
            // Para Windows usa: "file:C:/uploads/" (si es ruta absoluta)
    }
}