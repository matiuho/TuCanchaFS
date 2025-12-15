package com.example.Reservas_Service.controller;

import com.example.Reservas_Service.model.Reserva;
import com.example.Reservas_Service.service.ReservaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reservas")
@CrossOrigin(origins = "*")
@Tag(name = "Reservas", description = "Endpoints para gestión de reservas de canchas")
public class ReservaController {
    
    @Autowired
    private ReservaService reservaService;
    
    @GetMapping
    @Operation(summary = "Listar reservas", description = "Obtiene todas las reservas registradas.")
    @ApiResponse(responseCode = "200", description = "Lista de reservas obtenida correctamente")
    public ResponseEntity<List<Reserva>> getAllReservas() {
        return ResponseEntity.ok(reservaService.getAllReservas());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener reserva por ID", description = "Obtiene los datos de una reserva específica por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reserva encontrada"),
            @ApiResponse(responseCode = "404", description = "Reserva no encontrada")
    })
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        return reservaService.getReservaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    @Operation(summary = "Listar reservas por email", description = "Obtiene todas las reservas asociadas a un correo electrónico.")
    @ApiResponse(responseCode = "200", description = "Reservas obtenidas correctamente")
    public ResponseEntity<List<Reserva>> getReservasByEmail(@PathVariable String email) {
        return ResponseEntity.ok(reservaService.getReservasByEmail(email));
    }
    
    @GetMapping("/cancha/{canchaId}")
    @Operation(summary = "Listar reservas por cancha", description = "Obtiene las reservas asociadas a una cancha específica.")
    @ApiResponse(responseCode = "200", description = "Reservas obtenidas correctamente")
    public ResponseEntity<List<Reserva>> getReservasByCanchaId(@PathVariable Long canchaId) {
        return ResponseEntity.ok(reservaService.getReservasByCanchaId(canchaId));
    }
    
    @GetMapping("/fecha/{fecha}")
    @Operation(summary = "Listar reservas por fecha", description = "Devuelve las reservas para una fecha determinada.")
    public ResponseEntity<List<Reserva>> getReservasByFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(reservaService.getReservasByFecha(fecha));
    }
    
    @GetMapping("/estado/{estado}")
    @Operation(summary = "Listar reservas por estado", description = "Filtra reservas por estado (PENDIENTE, CONFIRMADA, CANCELADA, etc.).")
    public ResponseEntity<List<Reserva>> getReservasByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(reservaService.getReservasByEstado(estado));
    }
    
    @GetMapping("/cancha/{canchaId}/fecha/{fecha}")
    @Operation(summary = "Listar reservas por cancha y fecha", description = "Obtiene reservas para una cancha y fecha concretas.")
    public ResponseEntity<List<Reserva>> getReservasByCanchaAndFecha(
            @PathVariable Long canchaId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(reservaService.getReservasByCanchaAndFecha(canchaId, fecha));
    }
    
    @PostMapping
    @Operation(summary = "Crear reserva", description = "Crea una nueva reserva de cancha.")
    @ApiResponse(responseCode = "201", description = "Reserva creada correctamente", content = @Content(schema = @Schema(implementation = Reserva.class)))
    public ResponseEntity<Reserva> createReserva(@RequestBody Reserva reserva) {
        Reserva newReserva = reservaService.createReserva(reserva);
        return ResponseEntity.status(HttpStatus.CREATED).body(newReserva);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar reserva", description = "Actualiza los datos de una reserva existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reserva actualizada correctamente"),
            @ApiResponse(responseCode = "404", description = "Reserva no encontrada")
    })
    public ResponseEntity<Reserva> updateReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        return reservaService.updateReserva(id, reserva)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{id}/estado")
    @Operation(summary = "Actualizar estado de reserva", description = "Actualiza solo el estado de una reserva (por ejemplo, de PENDIENTE a CONFIRMADA).")
    public ResponseEntity<Reserva> updateEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevoEstado = body.get("estado");
        return reservaService.updateEstado(id, nuevoEstado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar reserva", description = "Elimina una reserva por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Reserva eliminada correctamente"),
            @ApiResponse(responseCode = "404", description = "Reserva no encontrada")
    })
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        if (reservaService.deleteReserva(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
