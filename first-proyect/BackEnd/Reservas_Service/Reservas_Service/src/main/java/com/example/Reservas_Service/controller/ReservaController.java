package com.example.Reservas_Service.controller;

import com.example.Reservas_Service.model.Reserva;
import com.example.Reservas_Service.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Reservas Service API - Gestión de Reservas
 * 
 * Swagger UI: http://localhost:8083/swagger-ui.html
 */
@RestController
@RequestMapping("/api/v1/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {
    
    @Autowired
    private ReservaService reservaService;
    
    @GetMapping
    public ResponseEntity<List<Reserva>> getAllReservas() {
        return ResponseEntity.ok(reservaService.getAllReservas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        return reservaService.getReservaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Reserva>> getReservasByEmail(@PathVariable String email) {
        return ResponseEntity.ok(reservaService.getReservasByEmail(email));
    }
    
    @GetMapping("/cancha/{canchaId}")
    public ResponseEntity<List<Reserva>> getReservasByCanchaId(@PathVariable Long canchaId) {
        return ResponseEntity.ok(reservaService.getReservasByCanchaId(canchaId));
    }
    
    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<Reserva>> getReservasByFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(reservaService.getReservasByFecha(fecha));
    }
    
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Reserva>> getReservasByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(reservaService.getReservasByEstado(estado));
    }
    
    @GetMapping("/cancha/{canchaId}/fecha/{fecha}")
    public ResponseEntity<List<Reserva>> getReservasByCanchaAndFecha(
            @PathVariable Long canchaId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(reservaService.getReservasByCanchaAndFecha(canchaId, fecha));
    }
    
    @PostMapping
    public ResponseEntity<Reserva> createReserva(@RequestBody Reserva reserva) {
        Reserva newReserva = reservaService.createReserva(reserva);
        return ResponseEntity.status(HttpStatus.CREATED).body(newReserva);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> updateReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        return reservaService.updateReserva(id, reserva)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Reserva> updateEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevoEstado = body.get("estado");
        return reservaService.updateEstado(id, nuevoEstado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        if (reservaService.deleteReserva(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
