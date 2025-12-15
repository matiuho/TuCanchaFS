package com.example.Pago_Service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
        name = "PagoResponse",
        description = "Respuesta estándar del servicio de pagos. Ver en Swagger UI: http://localhost:8084/swagger-ui.html"
)
public class PagoResponse {
    private Long id;
    private String estado;
    private String mensaje;
    private boolean success;
    
    public PagoResponse() {}
    
    public PagoResponse(Long id, String estado, String mensaje, boolean success) {
        this.id = id;
        this.estado = estado;
        this.mensaje = mensaje;
        this.success = success;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public String getMensaje() {
        return mensaje;
    }
    
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
}
