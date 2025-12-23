package com.example.Canchas_Service.service;

import com.example.Canchas_Service.model.Cancha;
import com.example.Canchas_Service.repository.CanchaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * Unit tests for CanchaService using JUnit 5 and Mockito.
 * Tests service layer logic with mocked dependencies.
 */
@ExtendWith(MockitoExtension.class)
class CanchaServiceTest {

    @Mock
    private CanchaRepository canchaRepository;

    @InjectMocks
    private CanchaService canchaService;

    private Cancha testCancha;

    @BeforeEach
    void setUp() {
        testCancha = new Cancha();
        testCancha.setId(1L);
        testCancha.setNombre("Cancha Principal");
        testCancha.setTipo(Cancha.Tipo.FUTBOL);
        testCancha.setPrecioHora(50000.0);
        testCancha.setCapacidad(22);
        testCancha.setImagenUrl("https://example.com/cancha.jpg");
        testCancha.setDescripcion("Cancha de fútbol profesional");
        testCancha.setUbicacion("Centro Deportivo");
        testCancha.setEnOferta(false);
    }

    @Test
    @DisplayName("GetAllCanchas should return list of all canchas")
    void getAllCanchas_ShouldReturnListOfCanchas() {
        // Arrange
        Cancha cancha2 = new Cancha();
        cancha2.setId(2L);
        cancha2.setNombre("Cancha Secundaria");
        cancha2.setTipo(Cancha.Tipo.FUTSAL);
        List<Cancha> canchas = Arrays.asList(testCancha, cancha2);
        when(canchaRepository.findAll()).thenReturn(canchas);

        // Act
        List<Cancha> result = canchaService.getAllCanchas();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Cancha Principal", result.get(0).getNombre());
        assertEquals("Cancha Secundaria", result.get(1).getNombre());
        verify(canchaRepository).findAll();
    }

    @Test
    @DisplayName("GetCanchaById should return cancha when found")
    void getCanchaById_WhenCanchaExists_ShouldReturnCancha() {
        // Arrange
        when(canchaRepository.findById(1L)).thenReturn(Optional.of(testCancha));

        // Act
        Optional<Cancha> result = canchaService.getCanchaById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Cancha Principal", result.get().getNombre());
        assertEquals(Cancha.Tipo.FUTBOL, result.get().getTipo());
        verify(canchaRepository).findById(1L);
    }

    @Test
    @DisplayName("GetCanchaById should return empty when cancha not found")
    void getCanchaById_WhenCanchaNotExists_ShouldReturnEmpty() {
        // Arrange
        when(canchaRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Cancha> result = canchaService.getCanchaById(99L);

        // Assert
        assertFalse(result.isPresent());
        verify(canchaRepository).findById(99L);
    }

    @Test
    @DisplayName("GetCanchasByTipo should return canchas of specified type")
    void getCanchasByTipo_WithValidTipo_ShouldReturnCanchas() {
        // Arrange
        List<Cancha> futbolCanchas = Arrays.asList(testCancha);
        when(canchaRepository.findByTipo(Cancha.Tipo.FUTBOL)).thenReturn(futbolCanchas);

        // Act
        List<Cancha> result = canchaService.getCanchasByTipo("FUTBOL");

        // Assert
        assertEquals(1, result.size());
        assertEquals(Cancha.Tipo.FUTBOL, result.get(0).getTipo());
        verify(canchaRepository).findByTipo(Cancha.Tipo.FUTBOL);
    }

    @Test
    @DisplayName("GetCanchasByTipo should return empty list for invalid type")
    void getCanchasByTipo_WithInvalidTipo_ShouldReturnEmptyList() {
        // Act
        List<Cancha> result = canchaService.getCanchasByTipo("INVALID");

        // Assert
        assertTrue(result.isEmpty());
        verify(canchaRepository, never()).findByTipo(any());
    }

    @Test
    @DisplayName("GetCanchasByTipo should be case insensitive")
    void getCanchasByTipo_WithLowerCaseTipo_ShouldReturnCanchas() {
        // Arrange
        List<Cancha> futbolCanchas = Arrays.asList(testCancha);
        when(canchaRepository.findByTipo(Cancha.Tipo.FUTBOL)).thenReturn(futbolCanchas);

        // Act
        List<Cancha> result = canchaService.getCanchasByTipo("futbol");

        // Assert
        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("GetCanchasEnOferta should return canchas with offers")
    void getCanchasEnOferta_ShouldReturnOfferCanchas() {
        // Arrange
        Cancha offerCancha = new Cancha();
        offerCancha.setId(2L);
        offerCancha.setNombre("Cancha en Oferta");
        offerCancha.setEnOferta(true);
        offerCancha.setPrecioOferta(40000.0);
        List<Cancha> offerCanchas = Arrays.asList(offerCancha);
        when(canchaRepository.findByEnOferta(true)).thenReturn(offerCanchas);

        // Act
        List<Cancha> result = canchaService.getCanchasEnOferta();

        // Assert
        assertEquals(1, result.size());
        assertTrue(result.get(0).getEnOferta());
        verify(canchaRepository).findByEnOferta(true);
    }

    @Test
    @DisplayName("SearchCanchasByNombre should return matching canchas")
    void searchCanchasByNombre_ShouldReturnMatchingCanchas() {
        // Arrange
        List<Cancha> matchingCanchas = Arrays.asList(testCancha);
        when(canchaRepository.findByNombreContainingIgnoreCase("Principal")).thenReturn(matchingCanchas);

        // Act
        List<Cancha> result = canchaService.searchCanchasByNombre("Principal");

        // Assert
        assertEquals(1, result.size());
        assertTrue(result.get(0).getNombre().contains("Principal"));
        verify(canchaRepository).findByNombreContainingIgnoreCase("Principal");
    }

    @Test
    @DisplayName("SearchCanchasByNombre should return empty list when no matches")
    void searchCanchasByNombre_WhenNoMatches_ShouldReturnEmptyList() {
        // Arrange
        when(canchaRepository.findByNombreContainingIgnoreCase("NonExistent")).thenReturn(Collections.emptyList());

        // Act
        List<Cancha> result = canchaService.searchCanchasByNombre("NonExistent");

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("CreateCancha should save and return new cancha")
    void createCancha_ShouldSaveAndReturnCancha() {
        // Arrange
        when(canchaRepository.save(any(Cancha.class))).thenReturn(testCancha);

        // Act
        Cancha result = canchaService.createCancha(testCancha);

        // Assert
        assertNotNull(result);
        assertEquals("Cancha Principal", result.getNombre());
        verify(canchaRepository).save(testCancha);
    }

    @Test
    @DisplayName("UpdateCancha should update and return cancha when found")
    void updateCancha_WhenCanchaExists_ShouldUpdateAndReturn() {
        // Arrange
        Cancha updatedDetails = new Cancha();
        updatedDetails.setNombre("Cancha Actualizada");
        updatedDetails.setTipo(Cancha.Tipo.FUTSAL);
        updatedDetails.setPrecioHora(60000.0);
        updatedDetails.setEnOferta(true);
        updatedDetails.setPrecioOferta(50000.0);
        updatedDetails.setCapacidad(10);
        updatedDetails.setImagenUrl("https://example.com/updated.jpg");
        updatedDetails.setDescripcion("Descripción actualizada");
        updatedDetails.setUbicacion("Nueva ubicación");

        when(canchaRepository.findById(1L)).thenReturn(Optional.of(testCancha));
        when(canchaRepository.save(any(Cancha.class))).thenReturn(testCancha);

        // Act
        Optional<Cancha> result = canchaService.updateCancha(1L, updatedDetails);

        // Assert
        assertTrue(result.isPresent());
        verify(canchaRepository).findById(1L);
        verify(canchaRepository).save(testCancha);
    }

    @Test
    @DisplayName("UpdateCancha should return empty when cancha not found")
    void updateCancha_WhenCanchaNotExists_ShouldReturnEmpty() {
        // Arrange
        when(canchaRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Cancha> result = canchaService.updateCancha(99L, new Cancha());

        // Assert
        assertFalse(result.isPresent());
        verify(canchaRepository, never()).save(any(Cancha.class));
    }

    @Test
    @DisplayName("DeleteCancha should return true when cancha exists")
    void deleteCancha_WhenCanchaExists_ShouldReturnTrue() {
        // Arrange
        when(canchaRepository.existsById(1L)).thenReturn(true);

        // Act
        boolean result = canchaService.deleteCancha(1L);

        // Assert
        assertTrue(result);
        verify(canchaRepository).deleteById(1L);
    }

    @Test
    @DisplayName("DeleteCancha should return false when cancha does not exist")
    void deleteCancha_WhenCanchaNotExists_ShouldReturnFalse() {
        // Arrange
        when(canchaRepository.existsById(99L)).thenReturn(false);

        // Act
        boolean result = canchaService.deleteCancha(99L);

        // Assert
        assertFalse(result);
        verify(canchaRepository, never()).deleteById(anyLong());
    }
}
