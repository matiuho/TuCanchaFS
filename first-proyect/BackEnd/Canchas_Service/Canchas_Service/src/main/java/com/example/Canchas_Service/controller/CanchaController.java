package com.example.Canchas_Service.controller;

import com.example.Canchas_Service.model.Cancha;
import com.example.Canchas_Service.service.CanchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Canchas Service API - Gestión de Canchas Deportivas
 * 
 * Swagger UI: http://localhost:8082/swagger-ui.html
 */
@RestController
@RequestMapping("/api/v1/canchas")
@CrossOrigin(origins = "*")
public class CanchaController {
    
    @Autowired
    private CanchaService canchaService;
    
    @GetMapping
    public ResponseEntity<List<Cancha>> getAllCanchas() {
        return ResponseEntity.ok(canchaService.getAllCanchas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Cancha> getCanchaById(@PathVariable Long id) {
        return canchaService.getCanchaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Cancha>> getCanchasByTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(canchaService.getCanchasByTipo(tipo));
    }
    
    @GetMapping("/ofertas")
    public ResponseEntity<List<Cancha>> getCanchasEnOferta() {
        return ResponseEntity.ok(canchaService.getCanchasEnOferta());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Cancha>> searchCanchas(@RequestParam String nombre) {
        return ResponseEntity.ok(canchaService.searchCanchasByNombre(nombre));
    }
    
    @PostMapping
    public ResponseEntity<Cancha> createCancha(@RequestBody Cancha cancha) {
        Cancha newCancha = canchaService.createCancha(cancha);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCancha);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Cancha> updateCancha(@PathVariable Long id, @RequestBody Cancha cancha) {
        return canchaService.updateCancha(id, cancha)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCancha(@PathVariable Long id) {
        if (canchaService.deleteCancha(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
