package com.tucancha.reservas.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ReservaService Tests")
class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    private ReservaService reservaService;

    @BeforeEach
    void setUp() {
        reservaService = new ReservaService(reservaRepository);
    }

    @Test
    @DisplayName("Crear reserva")
    void testCreateReserva() {
        Reserva reserva = new Reserva(1L, 10L, 5L, "CONFIRMADA");
        when(reservaRepository.save(any(Reserva.class))).thenReturn(reserva);

        Reserva resultado = reservaService.create(reserva);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getId());
        verify(reservaRepository, times(1)).save(any(Reserva.class));
    }

    @Test
    @DisplayName("Obtener reserva por ID")
    void testGetById() {
        Reserva reserva = new Reserva(1L, 10L, 5L, "CONFIRMADA");
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(reserva));

        Optional<Reserva> resultado = reservaService.getById(1L);

        assertTrue(resultado.isPresent());
        verify(reservaRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Eliminar reserva")
    void testDelete() {
        doNothing().when(reservaRepository).deleteById(1L);
        reservaService.delete(1L);
        verify(reservaRepository, times(1)).deleteById(1L);
    }

    static class Reserva {
        private Long id, usuarioId, canchaId;
        private String estado;

        public Reserva(Long id, Long usuarioId, Long canchaId, String estado) {
            this.id = id;
            this.usuarioId = usuarioId;
            this.canchaId = canchaId;
            this.estado = estado;
        }

        public Long getId() { return id; }
        public String getEstado() { return estado; }
    }

    interface ReservaRepository {
        Reserva save(Reserva reserva);
        Optional<Reserva> findById(Long id);
        void deleteById(Long id);
    }

    static class ReservaService {
        private ReservaRepository repository;

        public ReservaService(ReservaRepository repository) {
            this.repository = repository;
        }

        public Reserva create(Reserva reserva) {
            return repository.save(reserva);
        }

        public Optional<Reserva> getById(Long id) {
            return repository.findById(id);
        }

        public void delete(Long id) {
            repository.deleteById(id);
        }
    }
}
