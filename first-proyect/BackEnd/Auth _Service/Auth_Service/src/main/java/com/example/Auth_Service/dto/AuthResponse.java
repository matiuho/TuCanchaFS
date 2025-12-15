package com.example.Auth_Service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
        name = "AuthResponse",
        description = "Respuesta estándar del servicio de autenticación. Ver en Swagger UI: http://localhost:8081/swagger-ui.html"
)
public class AuthResponse {
    private String email;
    private String role;
    private String token;
    private String message;
    private boolean success;
    
    public AuthResponse() {}
    
    public AuthResponse(String email, String role, String token, String message, boolean success) {
        this.email = email;
        this.role = role;
        this.token = token;
        this.message = message;
        this.success = success;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
}
