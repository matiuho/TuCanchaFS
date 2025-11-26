package com.example.Canchas_Service.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "canchas")
public class Cancha {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipo tipo;
    
    @Column(name = "precio_hora", nullable = false)
    private Double precioHora;
    
    @Column(name = "en_oferta")
    private Boolean enOferta;
    
    @Column(name = "precio_oferta")
    private Double precioOferta;
    
    @Column(nullable = false)
    private Integer capacidad;
    
    @Column(name = "imagen_url", nullable = false, length = 500)
    private String imagenUrl;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(length = 255)
    private String ubicacion;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum Tipo {
        FUTBOL, FUTSAL
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
    
    // Constructors
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
    
    // Getters and Setters
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
