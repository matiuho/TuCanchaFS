package com.example.Reservas_Service.service;

import com.example.Reservas_Service.model.Reserva;
import com.example.Reservas_Service.repository.ReservaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * Unit tests for ReservaService using JUnit 5 and Mockito.
 * Tests service layer logic with mocked dependencies.
 */
@ExtendWith(MockitoExtension.class)
class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @InjectMocks
    private ReservaService reservaService;

    private Reserva testReserva;
    private LocalDate testFecha;
    private LocalTime testHora;

    @BeforeEach
    void setUp() {
        testFecha = LocalDate.of(2024, 12, 15);
        testHora = LocalTime.of(14, 0);

        testReserva = new Reserva();
        testReserva.setId(1L);
        testReserva.setNombre("Juan Pérez");
        testReserva.setEmail("juan@example.com");
        testReserva.setFecha(testFecha);
        testReserva.setHora(testHora);
        testReserva.setCancha("Cancha Principal");
        testReserva.setCanchaId(1L);
        testReserva.setCantidadHoras(2);
        testReserva.setPrecioTotal(100000.0);
        testReserva.setEstado(Reserva.Estado.PENDIENTE);
    }

    @Test
    @DisplayName("GetAllReservas should return list of all reservas")
    void getAllReservas_ShouldReturnListOfReservas() {
        // Arrange
        Reserva reserva2 = new Reserva();
        reserva2.setId(2L);
        reserva2.setNombre("María García");
        List<Reserva> reservas = Arrays.asList(testReserva, reserva2);
        when(reservaRepository.findAll()).thenReturn(reservas);

        // Act
        List<Reserva> result = reservaService.getAllReservas();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Juan Pérez", result.get(0).getNombre());
        assertEquals("María García", result.get(1).getNombre());
        verify(reservaRepository).findAll();
    }

    @Test
    @DisplayName("GetReservaById should return reserva when found")
    void getReservaById_WhenReservaExists_ShouldReturnReserva() {
        // Arrange
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));

        // Act
        Optional<Reserva> result = reservaService.getReservaById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Juan Pérez", result.get().getNombre());
        assertEquals(testFecha, result.get().getFecha());
        verify(reservaRepository).findById(1L);
    }

    @Test
    @DisplayName("GetReservaById should return empty when reserva not found")
    void getReservaById_WhenReservaNotExists_ShouldReturnEmpty() {
        // Arrange
        when(reservaRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Reserva> result = reservaService.getReservaById(99L);

        // Assert
        assertFalse(result.isPresent());
        verify(reservaRepository).findById(99L);
    }

    @Test
    @DisplayName("GetReservasByEmail should return reservas for email")
    void getReservasByEmail_ShouldReturnReservasForEmail() {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaRepository.findByEmail("juan@example.com")).thenReturn(reservas);

        // Act
        List<Reserva> result = reservaService.getReservasByEmail("juan@example.com");

        // Assert
        assertEquals(1, result.size());
        assertEquals("juan@example.com", result.get(0).getEmail());
        verify(reservaRepository).findByEmail("juan@example.com");
    }

    @Test
    @DisplayName("GetReservasByCanchaId should return reservas for cancha")
    void getReservasByCanchaId_ShouldReturnReservasForCancha() {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaRepository.findByCanchaId(1L)).thenReturn(reservas);

        // Act
        List<Reserva> result = reservaService.getReservasByCanchaId(1L);

        // Assert
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getCanchaId());
        verify(reservaRepository).findByCanchaId(1L);
    }

    @Test
    @DisplayName("GetReservasByFecha should return reservas for date")
    void getReservasByFecha_ShouldReturnReservasForDate() {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaRepository.findByFecha(testFecha)).thenReturn(reservas);

        // Act
        List<Reserva> result = reservaService.getReservasByFecha(testFecha);

        // Assert
        assertEquals(1, result.size());
        assertEquals(testFecha, result.get(0).getFecha());
        verify(reservaRepository).findByFecha(testFecha);
    }

    @Test
    @DisplayName("GetReservasByEstado should return reservas with specified estado")
    void getReservasByEstado_WithValidEstado_ShouldReturnReservas() {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaRepository.findByEstado(Reserva.Estado.PENDIENTE)).thenReturn(reservas);

        // Act
        List<Reserva> result = reservaService.getReservasByEstado("PENDIENTE");

        // Assert
        assertEquals(1, result.size());
        assertEquals(Reserva.Estado.PENDIENTE, result.get(0).getEstado());
        verify(reservaRepository).findByEstado(Reserva.Estado.PENDIENTE);
    }

    @Test
    @DisplayName("GetReservasByEstado should return empty list for invalid estado")
    void getReservasByEstado_WithInvalidEstado_ShouldReturnEmptyList() {
        // Act
        List<Reserva> result = reservaService.getReservasByEstado("INVALID");

        // Assert
        assertTrue(result.isEmpty());
        verify(reservaRepository, never()).findByEstado(any());
    }

    @Test
    @DisplayName("GetReservasByCanchaAndFecha should return reservas for cancha and date")
    void getReservasByCanchaAndFecha_ShouldReturnMatchingReservas() {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaRepository.findByCanchaIdAndFecha(1L, testFecha)).thenReturn(reservas);

        // Act
        List<Reserva> result = reservaService.getReservasByCanchaAndFecha(1L, testFecha);

        // Assert
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getCanchaId());
        assertEquals(testFecha, result.get(0).getFecha());
        verify(reservaRepository).findByCanchaIdAndFecha(1L, testFecha);
    }

    @Test
    @DisplayName("CreateReserva should save and return new reserva")
    void createReserva_ShouldSaveAndReturnReserva() {
        // Arrange
        when(reservaRepository.save(any(Reserva.class))).thenReturn(testReserva);

        // Act
        Reserva result = reservaService.createReserva(testReserva);

        // Assert
        assertNotNull(result);
        assertEquals("Juan Pérez", result.getNombre());
        verify(reservaRepository).save(testReserva);
    }

    @Test
    @DisplayName("UpdateReserva should update and return reserva when found")
    void updateReserva_WhenReservaExists_ShouldUpdateAndReturn() {
        // Arrange
        Reserva updatedDetails = new Reserva();
        updatedDetails.setNombre("Pedro Actualizado");
        updatedDetails.setEmail("pedro@example.com");
        updatedDetails.setFecha(LocalDate.of(2024, 12, 20));
        updatedDetails.setHora(LocalTime.of(16, 0));
        updatedDetails.setCancha("Cancha Nueva");
        updatedDetails.setCanchaId(2L);
        updatedDetails.setCantidadHoras(3);
        updatedDetails.setPrecioTotal(150000.0);
        updatedDetails.setEstado(Reserva.Estado.CONFIRMADA);

        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));
        when(reservaRepository.save(any(Reserva.class))).thenReturn(testReserva);

        // Act
        Optional<Reserva> result = reservaService.updateReserva(1L, updatedDetails);

        // Assert
        assertTrue(result.isPresent());
        verify(reservaRepository).findById(1L);
        verify(reservaRepository).save(testReserva);
    }

    @Test
    @DisplayName("UpdateReserva should return empty when reserva not found")
    void updateReserva_WhenReservaNotExists_ShouldReturnEmpty() {
        // Arrange
        when(reservaRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Reserva> result = reservaService.updateReserva(99L, new Reserva());

        // Assert
        assertFalse(result.isPresent());
        verify(reservaRepository, never()).save(any(Reserva.class));
    }

    @Test
    @DisplayName("UpdateEstado should update estado when reserva found")
    void updateEstado_WhenReservaExists_ShouldUpdateEstado() {
        // Arrange
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));
        when(reservaRepository.save(any(Reserva.class))).thenReturn(testReserva);

        // Act
        Optional<Reserva> result = reservaService.updateEstado(1L, "CONFIRMADA");

        // Assert
        assertTrue(result.isPresent());
        assertEquals(Reserva.Estado.CONFIRMADA, result.get().getEstado());
        verify(reservaRepository).save(testReserva);
    }

    @Test
    @DisplayName("UpdateEstado should not update for invalid estado")
    void updateEstado_WithInvalidEstado_ShouldNotChange() {
        // Arrange
        when(reservaRepository.findById(1L)).thenReturn(Optional.of(testReserva));

        // Act
        Optional<Reserva> result = reservaService.updateEstado(1L, "INVALID");

        // Assert
        assertTrue(result.isPresent());
        assertEquals(Reserva.Estado.PENDIENTE, result.get().getEstado());
        verify(reservaRepository, never()).save(any(Reserva.class));
    }

    @Test
    @DisplayName("UpdateEstado should return empty when reserva not found")
    void updateEstado_WhenReservaNotExists_ShouldReturnEmpty() {
        // Arrange
        when(reservaRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Reserva> result = reservaService.updateEstado(99L, "CONFIRMADA");

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    @DisplayName("DeleteReserva should return true when reserva exists")
    void deleteReserva_WhenReservaExists_ShouldReturnTrue() {
        // Arrange
        when(reservaRepository.existsById(1L)).thenReturn(true);

        // Act
        boolean result = reservaService.deleteReserva(1L);

        // Assert
        assertTrue(result);
        verify(reservaRepository).deleteById(1L);
    }

    @Test
    @DisplayName("DeleteReserva should return false when reserva does not exist")
    void deleteReserva_WhenReservaNotExists_ShouldReturnFalse() {
        // Arrange
        when(reservaRepository.existsById(99L)).thenReturn(false);

        // Act
        boolean result = reservaService.deleteReserva(99L);

        // Assert
        assertFalse(result);
        verify(reservaRepository, never()).deleteById(anyLong());
    }
}
