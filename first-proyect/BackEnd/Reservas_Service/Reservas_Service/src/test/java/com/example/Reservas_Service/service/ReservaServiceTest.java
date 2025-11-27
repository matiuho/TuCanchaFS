package com.example.Reservas_Service.service;

import com.example.Reservas_Service.model.Reserva;
import com.example.Reservas_Service.repository.ReservaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @InjectMocks
    private ReservaService reservaService;

    private Reserva testReserva;
    private LocalDate testDate;
    private LocalTime testTime;

    @BeforeEach
    void setUp() {
        testDate = LocalDate.of(2024, 12, 15);
        testTime = LocalTime.of(18, 0);
        
        testReserva = new Reserva();
        testReserva.setId(1L);
        testReserva.setNombre("Juan Pérez");
        testReserva.setEmail("juan@example.com");
        testReserva.setFecha(testDate);
        testReserva.setHora(testTime);
        testReserva.setCancha("Cancha Principal");
        testReserva.setCanchaId(1L);
        testReserva.setCantidadHoras(2);
        testReserva.setPrecioTotal(100000.0);
        testReserva.setEstado(Reserva.Estado.PENDIENTE);
    }

    @Test
    void getAllReservas_ReturnsAllReservas() {
        Reserva reserva2 = new Reserva();
        reserva2.setId(2L);
        reserva2.setEmail("otro@example.com");
        
        when(reservaRepository.findAll()).thenReturn(Arrays.asList(testReserva, reserva2));

        List<Reserva> result = reservaService.getAllReservas();

        assertEquals(2, result.size());
        verify(reservaRepository).findAll();
    }

    @Test
    void getReservaById_WhenExists_ReturnsReserva() {
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));

        Optional<Reserva> result = reservaService.getReservaById(1L);

        assertTrue(result.isPresent());
        assertEquals("Juan Pérez", result.get().getNombre());
    }

    @Test
    void getReservaById_WhenNotExists_ReturnsEmpty() {
        when(reservaRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Reserva> result = reservaService.getReservaById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    void getReservasByEmail_ReturnsReservasForEmail() {
        when(reservaRepository.findByEmail("juan@example.com")).thenReturn(Arrays.asList(testReserva));

        List<Reserva> result = reservaService.getReservasByEmail("juan@example.com");

        assertEquals(1, result.size());
        assertEquals("juan@example.com", result.get(0).getEmail());
    }

    @Test
    void getReservasByCanchaId_ReturnsReservasForCancha() {
        when(reservaRepository.findByCanchaId(1L)).thenReturn(Arrays.asList(testReserva));

        List<Reserva> result = reservaService.getReservasByCanchaId(1L);

        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getCanchaId());
    }

    @Test
    void getReservasByFecha_ReturnsReservasForDate() {
        when(reservaRepository.findByFecha(testDate)).thenReturn(Arrays.asList(testReserva));

        List<Reserva> result = reservaService.getReservasByFecha(testDate);

        assertEquals(1, result.size());
        assertEquals(testDate, result.get(0).getFecha());
    }

    @Test
    void getReservasByEstado_WithValidEstado_ReturnsReservas() {
        when(reservaRepository.findByEstado(Reserva.Estado.PENDIENTE))
            .thenReturn(Arrays.asList(testReserva));

        List<Reserva> result = reservaService.getReservasByEstado("PENDIENTE");

        assertEquals(1, result.size());
        assertEquals(Reserva.Estado.PENDIENTE, result.get(0).getEstado());
    }

    @Test
    void getReservasByEstado_WithLowercase_ReturnsReservas() {
        when(reservaRepository.findByEstado(Reserva.Estado.CONFIRMADA))
            .thenReturn(Collections.emptyList());

        List<Reserva> result = reservaService.getReservasByEstado("confirmada");

        assertTrue(result.isEmpty());
    }

    @Test
    void getReservasByEstado_WithInvalidEstado_ReturnsEmptyList() {
        List<Reserva> result = reservaService.getReservasByEstado("INVALID");

        assertTrue(result.isEmpty());
        verify(reservaRepository, never()).findByEstado(any());
    }

    @Test
    void getReservasByCanchaAndFecha_ReturnsMatchingReservas() {
        when(reservaRepository.findByCanchaIdAndFecha(1L, testDate))
            .thenReturn(Arrays.asList(testReserva));

        List<Reserva> result = reservaService.getReservasByCanchaAndFecha(1L, testDate);

        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getCanchaId());
        assertEquals(testDate, result.get(0).getFecha());
    }

    @Test
    void createReserva_SavesAndReturnsReserva() {
        when(reservaRepository.save(any(Reserva.class))).thenReturn(testReserva);

        Reserva result = reservaService.createReserva(testReserva);

        assertNotNull(result);
        assertEquals("Juan Pérez", result.getNombre());
        verify(reservaRepository).save(testReserva);
    }

    @Test
    void updateReserva_WhenExists_ReturnsUpdatedReserva() {
        Reserva updatedDetails = new Reserva();
        updatedDetails.setNombre("Pedro García");
        updatedDetails.setEmail("pedro@example.com");
        updatedDetails.setFecha(LocalDate.of(2024, 12, 20));
        updatedDetails.setHora(LocalTime.of(19, 0));
        updatedDetails.setCancha("Cancha Secundaria");
        updatedDetails.setCanchaId(2L);
        updatedDetails.setCantidadHoras(3);
        updatedDetails.setPrecioTotal(150000.0);
        updatedDetails.setEstado(Reserva.Estado.CONFIRMADA);

        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));
        when(reservaRepository.save(any(Reserva.class))).thenReturn(testReserva);

        Optional<Reserva> result = reservaService.updateReserva(1L, updatedDetails);

        assertTrue(result.isPresent());
        verify(reservaRepository).save(testReserva);
    }

    @Test
    void updateReserva_WhenNotExists_ReturnsEmpty() {
        Reserva updatedDetails = new Reserva();
        updatedDetails.setNombre("Pedro García");
        
        when(reservaRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Reserva> result = reservaService.updateReserva(999L, updatedDetails);

        assertFalse(result.isPresent());
        verify(reservaRepository, never()).save(any());
    }

    @Test
    void updateEstado_WhenExistsAndValidEstado_ReturnsUpdatedReserva() {
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));
        when(reservaRepository.save(any(Reserva.class))).thenReturn(testReserva);

        Optional<Reserva> result = reservaService.updateEstado(1L, "CONFIRMADA");

        assertTrue(result.isPresent());
        assertEquals(Reserva.Estado.CONFIRMADA, result.get().getEstado());
        verify(reservaRepository).save(testReserva);
    }

    @Test
    void updateEstado_WhenExistsAndLowercase_ReturnsUpdatedReserva() {
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));
        when(reservaRepository.save(any(Reserva.class))).thenReturn(testReserva);

        Optional<Reserva> result = reservaService.updateEstado(1L, "cancelada");

        assertTrue(result.isPresent());
        assertEquals(Reserva.Estado.CANCELADA, result.get().getEstado());
    }

    @Test
    void updateEstado_WhenExistsAndInvalidEstado_DoesNotChange() {
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));

        Optional<Reserva> result = reservaService.updateEstado(1L, "INVALID");

        assertTrue(result.isPresent());
        assertEquals(Reserva.Estado.PENDIENTE, result.get().getEstado());
        verify(reservaRepository, never()).save(any());
    }

    @Test
    void updateEstado_WhenNotExists_ReturnsEmpty() {
        when(reservaRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Reserva> result = reservaService.updateEstado(999L, "CONFIRMADA");

        assertFalse(result.isPresent());
    }

    @Test
    void deleteReserva_WhenExists_ReturnsTrue() {
        when(reservaRepository.existsById(1L)).thenReturn(true);

        boolean result = reservaService.deleteReserva(1L);

        assertTrue(result);
        verify(reservaRepository).deleteById(1L);
    }

    @Test
    void deleteReserva_WhenNotExists_ReturnsFalse() {
        when(reservaRepository.existsById(999L)).thenReturn(false);

        boolean result = reservaService.deleteReserva(999L);

        assertFalse(result);
        verify(reservaRepository, never()).deleteById(any());
    }
}
