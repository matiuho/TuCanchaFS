package com.example.Reservas_Service.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "reservas")
@Schema(
        name = "Reserva",
        description = "Reserva de cancha con fecha, hora y estado. Ver en Swagger UI: http://localhost:8083/swagger-ui.html"
)
public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único de la reserva", example = "1")
    private Long id;
    
    @Column(nullable = false)
    @Schema(description = "Nombre de la persona que realiza la reserva", example = "Juan Perez")
    private String nombre;
    
    @Column(nullable = false)
    @Schema(description = "Email del usuario asociado a la reserva", example = "usuario@example.com")
    private String email;
    
    @Column(nullable = false)
    @Schema(description = "Fecha de la reserva (YYYY-MM-DD)", example = "2025-12-20")
    private LocalDate fecha;
    
    @Column(nullable = false)
    @Schema(description = "Hora de inicio de la reserva (HH:MM)", example = "18:00")
    private LocalTime hora;
    
    @Column(nullable = false)
    @Schema(description = "Nombre de la cancha reservada", example = "Cancha Centro Fútbol 5")
    private String cancha;
    
    @Column(name = "cancha_id")
    @Schema(description = "ID de la cancha relacionada", example = "5")
    private Long canchaId;
    
    @Column(name = "cantidad_horas")
    @Schema(description = "Cantidad de horas reservadas", example = "1")
    private Integer cantidadHoras;
    
    @Column(name = "precio_total")
    @Schema(description = "Precio total de la reserva", example = "450.0")
    private Double precioTotal;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "Estado de la reserva", example = "PENDIENTE")
    private Estado estado;
    
    @Column(name = "created_at")
    @Schema(description = "Fecha de creación (ISO-8601)", example = "2025-12-15T10:30:00")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @Schema(description = "Fecha de última actualización (ISO-8601)", example = "2025-12-15T11:00:00")
    private LocalDateTime updatedAt;
    
    public enum Estado {
        @Schema(description = "Reserva creada y pendiente de pago")
        PENDIENTE,
        @Schema(description = "Reserva confirmada y activa")
        CONFIRMADA,
        @Schema(description = "Reserva cancelada")
        CANCELADA,
        @Schema(description = "Reserva completada")
        COMPLETADA
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
