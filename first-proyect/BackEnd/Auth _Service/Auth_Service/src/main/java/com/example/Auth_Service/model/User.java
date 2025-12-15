package com.example.Auth_Service.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Schema(
        name = "User",
        description = "Usuario del sistema (credenciales y rol). Ver en Swagger UI: http://localhost:8081/swagger-ui.html"
)
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del usuario", example = "1")
    private Long id;
    
    @Column(nullable = false, unique = true)
    @Schema(description = "Correo electrónico del usuario", example = "usuario@example.com")
    private String email;
    
    @Column(nullable = false)
    @Schema(description = "Contraseña (almacenada hasheada). No incluir en respuestas.", accessMode = Schema.AccessMode.WRITE_ONLY, example = "P4s$w0rd")
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "Rol del usuario", example = "USER")
    private Role role;
    
    @Column(name = "created_at")
    @Schema(description = "Fecha de creación del registro (ISO-8601)", example = "2025-12-15T10:30:00")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @Schema(description = "Fecha de última actualización del registro (ISO-8601)", example = "2025-12-15T11:00:00")
    private LocalDateTime updatedAt;
    //comentario
    //comentar
    public enum Role {
        @Schema(description = "Usuario estándar")
        USER,
        @Schema(description = "Administrador con permisos extendidos")
        ADMIN
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public User() {
        this.role = Role.USER;
    }
    
    public User(String email, String password, Role role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
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
    
    public Role getRole() {
        return role;
    }
    
    public void setRole(Role role) {
        this.role = role;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
