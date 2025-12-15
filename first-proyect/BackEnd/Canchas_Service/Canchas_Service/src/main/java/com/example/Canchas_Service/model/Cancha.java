package com.example.Canchas_Service.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "canchas")
@Schema(
        name = "Cancha",
        description = "Modelo de cancha deportiva. Ver en Swagger UI: http://localhost:8082/swagger-ui.html"
)
public class Cancha {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único de la cancha", example = "1")
    private Long id;
    
    @Column(nullable = false)
    @Schema(description = "Nombre descriptivo de la cancha", example = "Cancha Centro Fútbol 5")
    private String nombre;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "Tipo de cancha", example = "FUTBOL")
    private Tipo tipo;
    
    @Column(name = "precio_hora", nullable = false)
    @Schema(description = "Precio por hora en moneda local", example = "500.0")
    private Double precioHora;
    
    @Column(name = "en_oferta")
    @Schema(description = "Indica si la cancha tiene oferta activa", example = "false")
    private Boolean enOferta;
    
    @Column(name = "precio_oferta")
    @Schema(description = "Precio por hora con descuento si está en oferta", example = "450.0")
    private Double precioOferta;
    
    @Column(nullable = false)
    @Schema(description = "Capacidad máxima de jugadores", example = "10")
    private Integer capacidad;
    
    @Column(name = "imagen_url", nullable = false, length = 500)
    @Schema(description = "URL de imagen representativa de la cancha", example = "https://example.com/cancha1.jpg")
    private String imagenUrl;
    
    @Column(columnDefinition = "TEXT")
    @Schema(description = "Descripción detallada de la cancha", example = "Cancha con césped sintético y vestuarios")
    private String descripcion;
    
    @Column(length = 255)
    @Schema(description = "Ubicación física o dirección", example = "Calle Principal 123, Ciudad")
    private String ubicacion;
    
    @Column(name = "created_at")
    @Schema(description = "Fecha de creación (ISO-8601)", example = "2025-12-15T10:30:00")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @Schema(description = "Fecha de última actualización (ISO-8601)", example = "2025-12-15T11:00:00")
    private LocalDateTime updatedAt;
    
    public enum Tipo {
        @Schema(description = "Cancha de fútbol clásico")
        FUTBOL,
        @Schema(description = "Cancha de fútbol reducido / futsal")
        FUTSAL
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (enOferta == null) {
            enOferta = false;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public Cancha() {}
    
    public Cancha(String nombre, Tipo tipo, Double precioHora, Integer capacidad, 
                  String imagenUrl, String descripcion, String ubicacion) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.precioHora = precioHora;
        this.capacidad = capacidad;
        this.imagenUrl = imagenUrl;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.enOferta = false;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public Tipo getTipo() {
        return tipo;
    }
    
    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }
    
    public Double getPrecioHora() {
        return precioHora;
    }
    
    public void setPrecioHora(Double precioHora) {
        this.precioHora = precioHora;
    }
    
    public Boolean getEnOferta() {
        return enOferta;
    }
    
    public void setEnOferta(Boolean enOferta) {
        this.enOferta = enOferta;
    }
    
    public Double getPrecioOferta() {
        return precioOferta;
    }
    
    public void setPrecioOferta(Double precioOferta) {
        this.precioOferta = precioOferta;
    }
    
    public Integer getCapacidad() {
        return capacidad;
    }
    
    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }
    
    public String getImagenUrl() {
        return imagenUrl;
    }
    
    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public String getUbicacion() {
        return ubicacion;
    }
    
    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
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
