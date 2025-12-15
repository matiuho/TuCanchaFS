package com.example.Pago_Service.service;

import com.example.Pago_Service.dto.PagoRequest;
import com.example.Pago_Service.dto.PagoResponse;
import com.example.Pago_Service.model.Pago;
import com.example.Pago_Service.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PagoService {
    
    @Autowired
    private PagoRepository pagoRepository;
    
    private static final String VALID_CARD = "1234123412341234";
    
    public PagoResponse procesarPago(PagoRequest request) {
        String cardNumberClean = request.getCardNumber().replace(" ", "");
        
        Pago pago = new Pago();
        pago.setNombre(request.getNombre());
        pago.setEmail(request.getEmail());
        pago.setCardNumber(cardNumberClean);
        pago.setMonto(request.getMonto());
        pago.setReservaId(request.getReservaId());
        
        if (cardNumberClean.equals(VALID_CARD)) {
            pago.setEstado(Pago.Estado.APROBADO);
            pago.setFechaPago(LocalDateTime.now());
            Pago savedPago = pagoRepository.save(pago);
            
            return new PagoResponse(
                savedPago.getId(),
                "APROBADO",
                "Pago procesado exitosamente",
                true
            );
        } else {
            pago.setEstado(Pago.Estado.RECHAZADO);
            Pago savedPago = pagoRepository.save(pago);
            
            return new PagoResponse(
                savedPago.getId(),
                "RECHAZADO",
                "Número de tarjeta inválido",
                false
            );
        }
    }
    
    public List<Pago> getAllPagos() {
        return pagoRepository.findAll();
    }
    
    public Optional<Pago> getPagoById(Long id) {
        return pagoRepository.findById(id);
    }
    
    public List<Pago> getPagosByEmail(String email) {
        return pagoRepository.findByEmail(email);
    }
    
    public List<Pago> getPagosByEstado(String estado) {
        try {
            Pago.Estado estadoEnum = Pago.Estado.valueOf(estado.toUpperCase());
            return pagoRepository.findByEstado(estadoEnum);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
    
    public List<Pago> getPagosByReservaId(Long reservaId) {
        return pagoRepository.findByReservaId(reservaId);
    }
    
    public Optional<Pago> reembolsarPago(Long id) {
        return pagoRepository.findById(id).map(pago -> {
            if (pago.getEstado() == Pago.Estado.APROBADO) {
                pago.setEstado(Pago.Estado.REEMBOLSADO);
                return pagoRepository.save(pago);
            }
            return pago;
        });
    }
}
