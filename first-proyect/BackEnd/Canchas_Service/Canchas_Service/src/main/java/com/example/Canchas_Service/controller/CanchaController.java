package com.example.Canchas_Service.controller;

import com.example.Canchas_Service.model.Cancha;
import com.example.Canchas_Service.service.CanchaService;
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
@RequestMapping("/api/v1/canchas")
@CrossOrigin(origins = "*")
@Tag(name = "Canchas", description = "Endpoints para gestión de canchas deportivas")
public class CanchaController {
    
    @Autowired
    private CanchaService canchaService;
    
    @GetMapping
    @Operation(summary = "Listar canchas", description = "Obtiene todas las canchas registradas.")
    @ApiResponse(responseCode = "200", description = "Lista de canchas obtenida correctamente")
    public ResponseEntity<List<Cancha>> getAllCanchas() {
        return ResponseEntity.ok(canchaService.getAllCanchas());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener cancha por ID", description = "Obtiene los datos de una cancha específica por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cancha encontrada"),
            @ApiResponse(responseCode = "404", description = "Cancha no encontrada")
    })
    public ResponseEntity<Cancha> getCanchaById(@PathVariable Long id) {
        return canchaService.getCanchaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/tipo/{tipo}")
    @Operation(summary = "Listar canchas por tipo", description = "Filtra canchas por tipo (FUTBOL, FUTSAL, etc.).")
    @ApiResponse(responseCode = "200", description = "Lista de canchas filtrada por tipo")
    public ResponseEntity<List<Cancha>> getCanchasByTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(canchaService.getCanchasByTipo(tipo));
    }
    
    @GetMapping("/ofertas")
    @Operation(summary = "Listar canchas en oferta", description = "Obtiene todas las canchas marcadas con oferta activa.")
    @ApiResponse(responseCode = "200", description = "Lista de canchas en oferta obtenida correctamente")
    public ResponseEntity<List<Cancha>> getCanchasEnOferta() {
        return ResponseEntity.ok(canchaService.getCanchasEnOferta());
    }
    
    @GetMapping("/search")
    @Operation(summary = "Buscar canchas por nombre", description = "Busca canchas cuyo nombre contenga el texto indicado.")
    @ApiResponse(responseCode = "200", description = "Resultados de búsqueda devueltos correctamente")
    public ResponseEntity<List<Cancha>> searchCanchas(@RequestParam String nombre) {
        return ResponseEntity.ok(canchaService.searchCanchasByNombre(nombre));
    }
    
    @PostMapping
    @Operation(summary = "Crear cancha", description = "Crea una nueva cancha con los datos proporcionados.")
    @ApiResponse(responseCode = "201", description = "Cancha creada correctamente", content = @Content(schema = @Schema(implementation = Cancha.class)))
    public ResponseEntity<Cancha> createCancha(@RequestBody Cancha cancha) {
        Cancha newCancha = canchaService.createCancha(cancha);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCancha);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar cancha", description = "Actualiza los datos de una cancha existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cancha actualizada correctamente"),
            @ApiResponse(responseCode = "404", description = "Cancha no encontrada")
    })
    public ResponseEntity<Cancha> updateCancha(@PathVariable Long id, @RequestBody Cancha cancha) {
        return canchaService.updateCancha(id, cancha)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar cancha", description = "Elimina una cancha por su ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Cancha eliminada correctamente"),
            @ApiResponse(responseCode = "404", description = "Cancha no encontrada")
    })
    public ResponseEntity<Void> deleteCancha(@PathVariable Long id) {
        if (canchaService.deleteCancha(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
