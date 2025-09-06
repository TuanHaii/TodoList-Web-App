package com.example.todolist.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Cho phép Frontend URL
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",    // React dev server (Create React App)
            "http://localhost:5173",    // Vite dev server
            "http://localhost:5174",    // Vite backup port
            "http://127.0.0.1:5173",    // Alternative localhost
            "http://127.0.0.1:5174"     // Alternative localhost backup
        ));
        
        // Cho phép tất cả HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Cho phép tất cả headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        // Cho phép credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);
        
        // Áp dụng cho tất cả endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
