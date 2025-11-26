package com.example.Auth_Service.dto;

public class AuthResponse {
    private String email;
    private String role;
    private String token;
    private String message;
    private boolean success;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String email, String role, String token, String message, boolean success) {
        this.email = email;
        this.role = role;
        this.token = token;
        this.message = message;
        this.success = success;
    }
    
    // Getters and Setters
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
