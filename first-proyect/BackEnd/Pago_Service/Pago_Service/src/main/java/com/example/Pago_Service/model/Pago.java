package com.example.Pago_Service.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pagos")
@Schema(
        name = "Pago",
        description = "Pago asociado a una reserva."
)
public class Pago {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del pago", example = "1")
    private Long id;
    
    @Column(nullable = false)
    @Schema(description = "Nombre del titular de la tarjeta", example = "Juan Perez")
    private String nombre;
    
    @Column(nullable = false)
    @Schema(description = "Correo electrónico del pagador", example = "juan.perez@example.com")
    private String email;
    
    @Column(name = "card_number", nullable = false)
    @Schema(description = "Número de tarjeta (almacenado de forma segura). No retornar en respuestas.", accessMode = Schema.AccessMode.WRITE_ONLY, example = "4242424242424242")
    private String cardNumber;
    
    @Column(nullable = false)
    @Schema(description = "Monto cobrado (en la moneda local)", example = "150.0")
    private Double monto;
    
    @Column(name = "reserva_id")
    @Schema(description = "Identificador de la reserva asociada", example = "42")
    private Long reservaId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "Estado del pago", example = "PENDIENTE")
    private Estado estado;
    
    @Column(name = "fecha_pago")
    @Schema(description = "Fecha y hora en que se registró el pago (ISO-8601)", example = "2025-12-15T10:45:00")
    private LocalDateTime fechaPago;
    
    @Column(name = "created_at")
    @Schema(description = "Fecha de creación del registro (ISO-8601)", example = "2025-12-15T10:30:00")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @Schema(description = "Fecha de última actualización del registro (ISO-8601)", example = "2025-12-15T11:00:00")
    private LocalDateTime updatedAt;
    
    public enum Estado {
        @Schema(description = "Pago pendiente de procesamiento")
        PENDIENTE,
        @Schema(description = "Pago aprobado")
        APROBADO,
        @Schema(description = "Pago rechazado")
        RECHAZADO,
        @Schema(description = "Pago reembolsado")
        REEMBOLSADO
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (estado == null) {
            estado = Estado.PENDIENTE;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public Pago() {}
    
    public Pago(String nombre, String email, String cardNumber, Double monto, Long reservaId) {
        this.nombre = nombre;
        this.email = email;
        this.cardNumber = cardNumber;
        this.monto = monto;
        this.reservaId = reservaId;
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
    
    public String getCardNumber() {
        return cardNumber;
    }
    
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public Double getMonto() {
        return monto;
    }
    
    public void setMonto(Double monto) {
        this.monto = monto;
    }
    
    public Long getReservaId() {
        return reservaId;
    }
    
    public void setReservaId(Long reservaId) {
        this.reservaId = reservaId;
    }
    
    public Estado getEstado() {
        return estado;
    }
    
    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    
    public LocalDateTime getFechaPago() {
        return fechaPago;
    }
    
    public void setFechaPago(LocalDateTime fechaPago) {
        this.fechaPago = fechaPago;
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
