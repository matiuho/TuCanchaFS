package com.example.Pago_Service.service;

import com.example.Pago_Service.dto.PagoRequest;
import com.example.Pago_Service.dto.PagoResponse;
import com.example.Pago_Service.model.Pago;
import com.example.Pago_Service.repository.PagoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for PagoService using JUnit 5 and Mockito.
 * Tests service layer logic with mocked dependencies.
 */
@ExtendWith(MockitoExtension.class)
class PagoServiceTest {

    @Mock
    private PagoRepository pagoRepository;

    @InjectMocks
    private PagoService pagoService;

    private Pago testPago;
    private PagoRequest validPagoRequest;
    private PagoRequest invalidPagoRequest;

    private static final String VALID_CARD = "1234123412341234";

    @BeforeEach
    void setUp() {
        testPago = new Pago();
        testPago.setId(1L);
        testPago.setNombre("Juan Pérez");
        testPago.setEmail("juan@example.com");
        testPago.setCardNumber(VALID_CARD);
        testPago.setMonto(50000.0);
        testPago.setReservaId(1L);
        testPago.setEstado(Pago.Estado.APROBADO);
        testPago.setFechaPago(LocalDateTime.now());

        validPagoRequest = new PagoRequest("Juan Pérez", "juan@example.com", VALID_CARD, 50000.0, 1L);
        invalidPagoRequest = new PagoRequest("Juan Pérez", "juan@example.com", "9999888877776666", 50000.0, 1L);
    }

    @Test
    @DisplayName("ProcesarPago should return success with valid card")
    void procesarPago_WithValidCard_ShouldReturnSuccess() {
        // Arrange
        when(pagoRepository.save(any(Pago.class))).thenAnswer(invocation -> {
            Pago pago = invocation.getArgument(0);
            pago.setId(1L);
            return pago;
        });

        // Act
        PagoResponse response = pagoService.procesarPago(validPagoRequest);

        // Assert
        assertTrue(response.isSuccess());
        assertEquals("APROBADO", response.getEstado());
        assertEquals("Pago procesado exitosamente", response.getMensaje());
        assertNotNull(response.getId());
        verify(pagoRepository).save(any(Pago.class));
    }

    @Test
    @DisplayName("ProcesarPago should return failure with invalid card")
    void procesarPago_WithInvalidCard_ShouldReturnFailure() {
        // Arrange
        when(pagoRepository.save(any(Pago.class))).thenAnswer(invocation -> {
            Pago pago = invocation.getArgument(0);
            pago.setId(1L);
            return pago;
        });

        // Act
        PagoResponse response = pagoService.procesarPago(invalidPagoRequest);

        // Assert
        assertFalse(response.isSuccess());
        assertEquals("RECHAZADO", response.getEstado());
        assertEquals("Número de tarjeta inválido", response.getMensaje());
        verify(pagoRepository).save(any(Pago.class));
    }

    @Test
    @DisplayName("ProcesarPago should handle card number with spaces")
    void procesarPago_WithSpacesInCard_ShouldProcessCorrectly() {
        // Arrange
        PagoRequest requestWithSpaces = new PagoRequest("Juan Pérez", "juan@example.com", "1234 1234 1234 1234", 50000.0, 1L);
        when(pagoRepository.save(any(Pago.class))).thenAnswer(invocation -> {
            Pago pago = invocation.getArgument(0);
            pago.setId(1L);
            return pago;
        });

        // Act
        PagoResponse response = pagoService.procesarPago(requestWithSpaces);

        // Assert
        assertTrue(response.isSuccess());
        assertEquals("APROBADO", response.getEstado());
    }

    @Test
    @DisplayName("GetAllPagos should return list of all pagos")
    void getAllPagos_ShouldReturnListOfPagos() {
        // Arrange
        Pago pago2 = new Pago();
        pago2.setId(2L);
        pago2.setNombre("María García");
        pago2.setEmail("maria@example.com");
        List<Pago> pagos = Arrays.asList(testPago, pago2);
        when(pagoRepository.findAll()).thenReturn(pagos);

        // Act
        List<Pago> result = pagoService.getAllPagos();

        // Assert
        assertEquals(2, result.size());
        verify(pagoRepository).findAll();
    }

    @Test
    @DisplayName("GetPagoById should return pago when found")
    void getPagoById_WhenPagoExists_ShouldReturnPago() {
        // Arrange
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(testPago));

        // Act
        Optional<Pago> result = pagoService.getPagoById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Juan Pérez", result.get().getNombre());
        assertEquals(Pago.Estado.APROBADO, result.get().getEstado());
        verify(pagoRepository).findById(1L);
    }

    @Test
    @DisplayName("GetPagoById should return empty when pago not found")
    void getPagoById_WhenPagoNotExists_ShouldReturnEmpty() {
        // Arrange
        when(pagoRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Pago> result = pagoService.getPagoById(99L);

        // Assert
        assertFalse(result.isPresent());
        verify(pagoRepository).findById(99L);
    }

    @Test
    @DisplayName("GetPagosByEmail should return pagos for email")
    void getPagosByEmail_ShouldReturnPagosForEmail() {
        // Arrange
        List<Pago> pagos = Arrays.asList(testPago);
        when(pagoRepository.findByEmail("juan@example.com")).thenReturn(pagos);

        // Act
        List<Pago> result = pagoService.getPagosByEmail("juan@example.com");

        // Assert
        assertEquals(1, result.size());
        assertEquals("juan@example.com", result.get(0).getEmail());
        verify(pagoRepository).findByEmail("juan@example.com");
    }

    @Test
    @DisplayName("GetPagosByEstado should return pagos with specified estado")
    void getPagosByEstado_WithValidEstado_ShouldReturnPagos() {
        // Arrange
        List<Pago> aprobadosPagos = Arrays.asList(testPago);
        when(pagoRepository.findByEstado(Pago.Estado.APROBADO)).thenReturn(aprobadosPagos);

        // Act
        List<Pago> result = pagoService.getPagosByEstado("APROBADO");

        // Assert
        assertEquals(1, result.size());
        assertEquals(Pago.Estado.APROBADO, result.get(0).getEstado());
        verify(pagoRepository).findByEstado(Pago.Estado.APROBADO);
    }

    @Test
    @DisplayName("GetPagosByEstado should return empty list for invalid estado")
    void getPagosByEstado_WithInvalidEstado_ShouldReturnEmptyList() {
        // Act
        List<Pago> result = pagoService.getPagosByEstado("INVALID");

        // Assert
        assertTrue(result.isEmpty());
        verify(pagoRepository, never()).findByEstado(any());
    }

    @Test
    @DisplayName("GetPagosByReservaId should return pagos for reserva")
    void getPagosByReservaId_ShouldReturnPagosForReserva() {
        // Arrange
        List<Pago> pagos = Arrays.asList(testPago);
        when(pagoRepository.findByReservaId(1L)).thenReturn(pagos);

        // Act
        List<Pago> result = pagoService.getPagosByReservaId(1L);

        // Assert
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getReservaId());
        verify(pagoRepository).findByReservaId(1L);
    }

    @Test
    @DisplayName("ReembolsarPago should change estado to REEMBOLSADO when APROBADO")
    void reembolsarPago_WhenEstadoAprobado_ShouldChangeToReembolsado() {
        // Arrange
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(testPago));
        when(pagoRepository.save(any(Pago.class))).thenReturn(testPago);

        // Act
        Optional<Pago> result = pagoService.reembolsarPago(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(Pago.Estado.REEMBOLSADO, result.get().getEstado());
        verify(pagoRepository).save(testPago);
    }

    @Test
    @DisplayName("ReembolsarPago should not change estado when not APROBADO")
    void reembolsarPago_WhenEstadoNotAprobado_ShouldNotChange() {
        // Arrange
        Pago rechazadoPago = new Pago();
        rechazadoPago.setId(2L);
        rechazadoPago.setEstado(Pago.Estado.RECHAZADO);
        when(pagoRepository.findById(2L)).thenReturn(Optional.of(rechazadoPago));

        // Act
        Optional<Pago> result = pagoService.reembolsarPago(2L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(Pago.Estado.RECHAZADO, result.get().getEstado());
        verify(pagoRepository, never()).save(any(Pago.class));
    }

    @Test
    @DisplayName("ReembolsarPago should return empty when pago not found")
    void reembolsarPago_WhenPagoNotExists_ShouldReturnEmpty() {
        // Arrange
        when(pagoRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Pago> result = pagoService.reembolsarPago(99L);

        // Assert
        assertFalse(result.isPresent());
    }
}
