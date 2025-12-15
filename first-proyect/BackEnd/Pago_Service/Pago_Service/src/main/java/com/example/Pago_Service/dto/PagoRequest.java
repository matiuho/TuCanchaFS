package com.example.Pago_Service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
        name = "PagoRequest",
        description = "Cuerpo de la petición para procesar un pago. Ver en Swagger UI: http://localhost:8084/swagger-ui.html"
)
public class PagoRequest {
    private String nombre;
    private String email;
    private String cardNumber;
    private Double monto;
    private Long reservaId;
    
    public PagoRequest() {}
    
    public PagoRequest(String nombre, String email, String cardNumber, Double monto, Long reservaId) {
        this.nombre = nombre;
        this.email = email;
        this.cardNumber = cardNumber;
        this.monto = monto;
        this.reservaId = reservaId;
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
}
