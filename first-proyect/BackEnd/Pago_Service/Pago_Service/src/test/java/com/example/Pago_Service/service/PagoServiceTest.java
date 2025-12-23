package com.example.Pago_Service.service;

import com.example.Pago_Service.dto.PagoRequest;
import com.example.Pago_Service.dto.PagoResponse;
import com.example.Pago_Service.model.Pago;
import com.example.Pago_Service.repository.PagoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PagoServiceTest {

    @Mock
    private PagoRepository pagoRepository;

    @InjectMocks
    private PagoService pagoService;

    private Pago testPago;

    @BeforeEach
    void setUp() {
        testPago = new Pago();
        testPago.setId(1L);
        testPago.setNombre("Juan Pérez");
        testPago.setEmail("juan@example.com");
        testPago.setCardNumber("1234123412341234");
        testPago.setMonto(50000.0);
        testPago.setReservaId(100L);
        testPago.setEstado(Pago.Estado.APROBADO);
    }

    @Test
    void procesarPago_WithValidCard_ReturnsApproved() {
        PagoRequest request = new PagoRequest("Juan Pérez", "juan@example.com", 
            "1234123412341234", 50000.0, 100L);
        
        when(pagoRepository.save(any(Pago.class))).thenAnswer(invocation -> {
            Pago savedPago = invocation.getArgument(0);
            savedPago.setId(1L);
            return savedPago;
        });

        PagoResponse response = pagoService.procesarPago(request);

        assertTrue(response.isSuccess());
        assertEquals("APROBADO", response.getEstado());
        assertEquals("Pago procesado exitosamente", response.getMensaje());
        assertEquals(1L, response.getId());
    }

    @Test
    void procesarPago_WithCardSpaces_ReturnsApproved() {
        PagoRequest request = new PagoRequest("Juan Pérez", "juan@example.com", 
            "1234 1234 1234 1234", 50000.0, 100L);
        
        when(pagoRepository.save(any(Pago.class))).thenAnswer(invocation -> {
            Pago savedPago = invocation.getArgument(0);
            savedPago.setId(1L);
            return savedPago;
        });

        PagoResponse response = pagoService.procesarPago(request);

        assertTrue(response.isSuccess());
        assertEquals("APROBADO", response.getEstado());
    }

    @Test
    void procesarPago_WithInvalidCard_ReturnsRejected() {
        PagoRequest request = new PagoRequest("Juan Pérez", "juan@example.com", 
            "9999999999999999", 50000.0, 100L);
        
        when(pagoRepository.save(any(Pago.class))).thenAnswer(invocation -> {
            Pago savedPago = invocation.getArgument(0);
            savedPago.setId(1L);
            return savedPago;
        });

        PagoResponse response = pagoService.procesarPago(request);

        assertFalse(response.isSuccess());
        assertEquals("RECHAZADO", response.getEstado());
        assertEquals("Número de tarjeta inválido", response.getMensaje());
    }

    @Test
    void getAllPagos_ReturnsAllPagos() {
        Pago pago2 = new Pago();
        pago2.setId(2L);
        pago2.setEmail("otro@example.com");
        
        when(pagoRepository.findAll()).thenReturn(Arrays.asList(testPago, pago2));

        List<Pago> result = pagoService.getAllPagos();

        assertEquals(2, result.size());
        verify(pagoRepository).findAll();
    }

    @Test
    void getPagoById_WhenExists_ReturnsPago() {
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(testPago));

        Optional<Pago> result = pagoService.getPagoById(1L);

        assertTrue(result.isPresent());
        assertEquals("Juan Pérez", result.get().getNombre());
    }

    @Test
    void getPagoById_WhenNotExists_ReturnsEmpty() {
        when(pagoRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Pago> result = pagoService.getPagoById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    void getPagosByEmail_ReturnsPagosForEmail() {
        when(pagoRepository.findByEmail("juan@example.com")).thenReturn(Arrays.asList(testPago));

        List<Pago> result = pagoService.getPagosByEmail("juan@example.com");

        assertEquals(1, result.size());
        assertEquals("juan@example.com", result.get(0).getEmail());
    }

    @Test
    void getPagosByEstado_WithValidEstado_ReturnsPagos() {
        when(pagoRepository.findByEstado(Pago.Estado.APROBADO)).thenReturn(Arrays.asList(testPago));

        List<Pago> result = pagoService.getPagosByEstado("APROBADO");

        assertEquals(1, result.size());
        assertEquals(Pago.Estado.APROBADO, result.get(0).getEstado());
    }

    @Test
    void getPagosByEstado_WithLowercase_ReturnsPagos() {
        when(pagoRepository.findByEstado(Pago.Estado.PENDIENTE)).thenReturn(Collections.emptyList());

        List<Pago> result = pagoService.getPagosByEstado("pendiente");

        assertTrue(result.isEmpty());
    }

    @Test
    void getPagosByEstado_WithInvalidEstado_ReturnsEmptyList() {
        List<Pago> result = pagoService.getPagosByEstado("INVALID");

        assertTrue(result.isEmpty());
        verify(pagoRepository, never()).findByEstado(any());
    }

    @Test
    void getPagosByReservaId_ReturnsPagosForReserva() {
        when(pagoRepository.findByReservaId(100L)).thenReturn(Arrays.asList(testPago));

        List<Pago> result = pagoService.getPagosByReservaId(100L);

        assertEquals(1, result.size());
        assertEquals(100L, result.get(0).getReservaId());
    }

    @Test
    void reembolsarPago_WhenApproved_ReturnsRefunded() {
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(testPago));
        when(pagoRepository.save(any(Pago.class))).thenReturn(testPago);

        Optional<Pago> result = pagoService.reembolsarPago(1L);

        assertTrue(result.isPresent());
        assertEquals(Pago.Estado.REEMBOLSADO, result.get().getEstado());
        verify(pagoRepository).save(testPago);
    }

    @Test
    void reembolsarPago_WhenNotApproved_DoesNotChange() {
        testPago.setEstado(Pago.Estado.RECHAZADO);
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(testPago));

        Optional<Pago> result = pagoService.reembolsarPago(1L);

        assertTrue(result.isPresent());
        assertEquals(Pago.Estado.RECHAZADO, result.get().getEstado());
        verify(pagoRepository, never()).save(any());
    }

    @Test
    void reembolsarPago_WhenNotExists_ReturnsEmpty() {
        when(pagoRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Pago> result = pagoService.reembolsarPago(999L);

        assertFalse(result.isPresent());
    }
}
