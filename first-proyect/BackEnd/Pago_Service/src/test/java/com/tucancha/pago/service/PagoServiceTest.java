package com.tucancha.pago.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PagoService Tests")
class PagoServiceTest {

    @Mock
    private PagoRepository pagoRepository;

    private PagoService pagoService;

    @BeforeEach
    void setUp() {
        pagoService = new PagoService(pagoRepository);
    }

    @Test
    @DisplayName("Crear pago")
    void testCreatePago() {
        Pago pago = new Pago(1L, 10L, new BigDecimal("150.00"), "PROCESADO");
        when(pagoRepository.save(any(Pago.class))).thenReturn(pago);

        Pago resultado = pagoService.create(pago);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        verify(pagoRepository, times(1)).save(any(Pago.class));
    }

    @Test
    @DisplayName("Obtener pago por ID")
    void testGetById() {
        Pago pago = new Pago(1L, 10L, new BigDecimal("150.00"), "PROCESADO");
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(pago));

        Optional<Pago> resultado = pagoService.getById(1L);

        assertTrue(resultado.isPresent());
        verify(pagoRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Procesar pago")
    void testProcesarPago() {
        Pago pago = new Pago(1L, 10L, new BigDecimal("150.00"), "PENDIENTE");
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(pago));
        when(pagoRepository.save(any(Pago.class))).thenReturn(pago);

        Pago resultado = pagoService.procesarPago(1L);

        assertNotNull(resultado);
        verify(pagoRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Eliminar pago")
    void testDelete() {
        doNothing().when(pagoRepository).deleteById(1L);
        pagoService.delete(1L);
        verify(pagoRepository, times(1)).deleteById(1L);
    }

    static class Pago {
        private Long id, reservaId;
        private BigDecimal monto;
        private String estado;

        public Pago(Long id, Long reservaId, BigDecimal monto, String estado) {
            this.id = id;
            this.reservaId = reservaId;
            this.monto = monto;
            this.estado = estado;
        }

        public Long getId() { return id; }
    }

    interface PagoRepository {
        Pago save(Pago pago);
        Optional<Pago> findById(Long id);
        void deleteById(Long id);
    }

    static class PagoService {
        private PagoRepository repository;

        public PagoService(PagoRepository repository) {
            this.repository = repository;
        }

        public Pago create(Pago pago) {
            return repository.save(pago);
        }

        public Optional<Pago> getById(Long id) {
            return repository.findById(id);
        }

        public Pago procesarPago(Long id) {
            Optional<Pago> pago = repository.findById(id);
            if (pago.isPresent()) {
                Pago p = pago.get();
                p.setEstado("PROCESADO");
                return repository.save(p);
            }
            return null;
        }

        public void delete(Long id) {
            repository.deleteById(id);
        }
    }
}
