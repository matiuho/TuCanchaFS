package com.example.Pago_Service.controller;

import com.example.Pago_Service.dto.PagoRequest;
import com.example.Pago_Service.dto.PagoResponse;
import com.example.Pago_Service.model.Pago;
import com.example.Pago_Service.service.PagoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pagos")
@CrossOrigin(origins = "*")
@Tag(name = "Pagos", description = "Endpoints para procesamiento y consulta de pagos")
public class PagoController {
    
    @Autowired
    private PagoService pagoService;
    
    @PostMapping("/procesar")
    @Operation(summary = "Procesar pago", description = "Procesa un pago a partir de los datos de tarjeta y monto.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pago procesado correctamente", content = @Content(schema = @Schema(implementation = PagoResponse.class))),
            @ApiResponse(responseCode = "400", description = "Datos de pago inválidos", content = @Content(schema = @Schema(implementation = PagoResponse.class)))
    })
    public ResponseEntity<PagoResponse> procesarPago(@RequestBody PagoRequest request) {
        PagoResponse response = pagoService.procesarPago(request);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @GetMapping
    @Operation(summary = "Listar pagos", description = "Obtiene todos los pagos registrados.")
    @ApiResponse(responseCode = "200", description = "Lista de pagos obtenida correctamente")
    public ResponseEntity<List<Pago>> getAllPagos() {
        return ResponseEntity.ok(pagoService.getAllPagos());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener pago por ID", description = "Obtiene la información de un pago específico por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pago encontrado"),
            @ApiResponse(responseCode = "404", description = "Pago no encontrado")
    })
    public ResponseEntity<Pago> getPagoById(@PathVariable Long id) {
        return pagoService.getPagoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    @Operation(summary = "Listar pagos por email", description = "Obtiene todos los pagos asociados a un email de cliente.")
    @ApiResponse(responseCode = "200", description = "Pagos obtenidos correctamente")
    public ResponseEntity<List<Pago>> getPagosByEmail(@PathVariable String email) {
        return ResponseEntity.ok(pagoService.getPagosByEmail(email));
    }
    
    @GetMapping("/estado/{estado}")
    @Operation(summary = "Listar pagos por estado", description = "Filtra pagos por estado (PENDIENTE, APROBADO, RECHAZADO, REEMBOLSADO).")
    @ApiResponse(responseCode = "200", description = "Pagos obtenidos correctamente")
    public ResponseEntity<List<Pago>> getPagosByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(pagoService.getPagosByEstado(estado));
    }
    
    @GetMapping("/reserva/{reservaId}")
    @Operation(summary = "Listar pagos por reserva", description = "Obtiene los pagos asociados a una reserva específica.")
    @ApiResponse(responseCode = "200", description = "Pagos obtenidos correctamente")
    public ResponseEntity<List<Pago>> getPagosByReservaId(@PathVariable Long reservaId) {
        return ResponseEntity.ok(pagoService.getPagosByReservaId(reservaId));
    }
    
    @PostMapping("/{id}/reembolsar")
    @Operation(summary = "Reembolsar pago", description = "Marca un pago aprobado como reembolsado, si corresponde.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pago reembolsado o sin cambios", content = @Content(schema = @Schema(implementation = Pago.class))),
            @ApiResponse(responseCode = "404", description = "Pago no encontrado")
    })
    public ResponseEntity<Pago> reembolsarPago(@PathVariable Long id) {
        return pagoService.reembolsarPago(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
