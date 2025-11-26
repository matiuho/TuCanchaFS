package com.example.Pago_Service.controller;

import com.example.Pago_Service.dto.PagoRequest;
import com.example.Pago_Service.dto.PagoResponse;
import com.example.Pago_Service.model.Pago;
import com.example.Pago_Service.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Pagos Service API - Procesamiento de Pagos
 * 
 * Swagger UI: http://localhost:8084/swagger-ui.html
 */
@RestController
@RequestMapping("/api/v1/pagos")
@CrossOrigin(origins = "*")
public class PagoController {
    
    @Autowired
    private PagoService pagoService;
    
    @PostMapping("/procesar")
    public ResponseEntity<PagoResponse> procesarPago(@RequestBody PagoRequest request) {
        PagoResponse response = pagoService.procesarPago(request);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @GetMapping
    public ResponseEntity<List<Pago>> getAllPagos() {
        return ResponseEntity.ok(pagoService.getAllPagos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Pago> getPagoById(@PathVariable Long id) {
        return pagoService.getPagoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Pago>> getPagosByEmail(@PathVariable String email) {
        return ResponseEntity.ok(pagoService.getPagosByEmail(email));
    }
    
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Pago>> getPagosByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(pagoService.getPagosByEstado(estado));
    }
    
    @GetMapping("/reserva/{reservaId}")
    public ResponseEntity<List<Pago>> getPagosByReservaId(@PathVariable Long reservaId) {
        return ResponseEntity.ok(pagoService.getPagosByReservaId(reservaId));
    }
    
    @PostMapping("/{id}/reembolsar")
    public ResponseEntity<Pago> reembolsarPago(@PathVariable Long id) {
        return pagoService.reembolsarPago(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
