package com.example.Reservas_Service.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "reservas")
public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private LocalDate fecha;
    
    @Column(nullable = false)
    private LocalTime hora;
    
    @Column(nullable = false)
    private String cancha;
    
    @Column(name = "cancha_id")
    private Long canchaId;
    
    @Column(name = "cantidad_horas")
    private Integer cantidadHoras;
    
    @Column(name = "precio_total")
    private Double precioTotal;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum Estado {
        PENDIENTE, CONFIRMADA, CANCELADA, COMPLETADA
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (estado == null) {
            estado = Estado.PENDIENTE;
        }
        if (cantidadHoras == null) {
            cantidadHoras = 1;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Constructors
    public Reserva() {}
    
    public Reserva(String nombre, String email, LocalDate fecha, LocalTime hora, 
                   String cancha, Long canchaId, Integer cantidadHoras, Double precioTotal) {
        this.nombre = nombre;
        this.email = email;
        this.fecha = fecha;
        this.hora = hora;
        this.cancha = cancha;
        this.canchaId = canchaId;
        this.cantidadHoras = cantidadHoras;
        this.precioTotal = precioTotal;
        this.estado = Estado.PENDIENTE;
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
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public LocalDate getFecha() {
        return fecha;
    }
    
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
    
    public LocalTime getHora() {
        return hora;
    }
    
    public void setHora(LocalTime hora) {
        this.hora = hora;
    }
    
    public String getCancha() {
        return cancha;
    }
    
    public void setCancha(String cancha) {
        this.cancha = cancha;
    }
    
    public Long getCanchaId() {
        return canchaId;
    }
    
    public void setCanchaId(Long canchaId) {
        this.canchaId = canchaId;
    }
    
    public Integer getCantidadHoras() {
        return cantidadHoras;
    }
    
    public void setCantidadHoras(Integer cantidadHoras) {
        this.cantidadHoras = cantidadHoras;
    }
    
    public Double getPrecioTotal() {
        return precioTotal;
    }
    
    public void setPrecioTotal(Double precioTotal) {
        this.precioTotal = precioTotal;
    }
    
    public Estado getEstado() {
        return estado;
    }
    
    public void setEstado(Estado estado) {
        this.estado = estado;
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
