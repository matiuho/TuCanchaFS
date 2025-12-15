package com.example.Auth_Service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
        name = "LoginRequest",
        description = "Credenciales para iniciar sesión. Ver en Swagger UI: http://localhost:8081/swagger-ui.html"
)
public class LoginRequest {
    private String email;
    private String password;
    
    public LoginRequest() {}
    
    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
