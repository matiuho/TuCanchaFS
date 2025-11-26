package com.example.Pago_Service.dto;

public class PagoResponse {
    private Long id;
    private String estado;
    private String mensaje;
    private boolean success;
    
    // Constructors
    public PagoResponse() {}
    
    public PagoResponse(Long id, String estado, String mensaje, boolean success) {
        this.id = id;
        this.estado = estado;
        this.mensaje = mensaje;
        this.success = success;
    }
    
    // Getters and Setters
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
