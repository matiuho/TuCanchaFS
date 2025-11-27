package com.example.Canchas_Service.service;

import com.example.Canchas_Service.model.Cancha;
import com.example.Canchas_Service.repository.CanchaRepository;
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
        testCancha.setImagenUrl("http://example.com/image.jpg");
        testCancha.setDescripcion("Cancha de fútbol profesional");
        testCancha.setUbicacion("Santiago, Chile");
        testCancha.setEnOferta(false);
    }

    @Test
    void getAllCanchas_ReturnsAllCanchas() {
        Cancha cancha2 = new Cancha();
        cancha2.setId(2L);
        cancha2.setNombre("Cancha Secundaria");
        
        when(canchaRepository.findAll()).thenReturn(Arrays.asList(testCancha, cancha2));

        List<Cancha> result = canchaService.getAllCanchas();

        assertEquals(2, result.size());
        verify(canchaRepository).findAll();
    }

    @Test
    void getCanchaById_WhenExists_ReturnsCancha() {
        when(canchaRepository.findById(1L)).thenReturn(Optional.of(testCancha));

        Optional<Cancha> result = canchaService.getCanchaById(1L);

        assertTrue(result.isPresent());
        assertEquals("Cancha Principal", result.get().getNombre());
    }

    @Test
    void getCanchaById_WhenNotExists_ReturnsEmpty() {
        when(canchaRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Cancha> result = canchaService.getCanchaById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    void getCanchasByTipo_WithValidType_ReturnsCanchas() {
        when(canchaRepository.findByTipo(Cancha.Tipo.FUTBOL)).thenReturn(Arrays.asList(testCancha));

        List<Cancha> result = canchaService.getCanchasByTipo("FUTBOL");

        assertEquals(1, result.size());
        assertEquals(Cancha.Tipo.FUTBOL, result.get(0).getTipo());
    }

    @Test
    void getCanchasByTipo_WithLowercase_ReturnsCanchas() {
        when(canchaRepository.findByTipo(Cancha.Tipo.FUTSAL)).thenReturn(Collections.emptyList());

        List<Cancha> result = canchaService.getCanchasByTipo("futsal");

        assertTrue(result.isEmpty());
    }

    @Test
    void getCanchasByTipo_WithInvalidType_ReturnsEmptyList() {
        List<Cancha> result = canchaService.getCanchasByTipo("INVALID");

        assertTrue(result.isEmpty());
        verify(canchaRepository, never()).findByTipo(any());
    }

    @Test
    void getCanchasEnOferta_ReturnsOfferedCanchas() {
        testCancha.setEnOferta(true);
        testCancha.setPrecioOferta(40000.0);
        
        when(canchaRepository.findByEnOferta(true)).thenReturn(Arrays.asList(testCancha));

        List<Cancha> result = canchaService.getCanchasEnOferta();

        assertEquals(1, result.size());
        assertTrue(result.get(0).getEnOferta());
    }

    @Test
    void searchCanchasByNombre_ReturnsMatchingCanchas() {
        when(canchaRepository.findByNombreContainingIgnoreCase("Principal"))
            .thenReturn(Arrays.asList(testCancha));

        List<Cancha> result = canchaService.searchCanchasByNombre("Principal");

        assertEquals(1, result.size());
        assertTrue(result.get(0).getNombre().contains("Principal"));
    }

    @Test
    void createCancha_SavesAndReturnsCancha() {
        when(canchaRepository.save(any(Cancha.class))).thenReturn(testCancha);

        Cancha result = canchaService.createCancha(testCancha);

        assertNotNull(result);
        assertEquals("Cancha Principal", result.getNombre());
        verify(canchaRepository).save(testCancha);
    }

    @Test
    void updateCancha_WhenExists_ReturnsUpdatedCancha() {
        Cancha updatedDetails = new Cancha();
        updatedDetails.setNombre("Cancha Actualizada");
        updatedDetails.setTipo(Cancha.Tipo.FUTSAL);
        updatedDetails.setPrecioHora(60000.0);
        updatedDetails.setCapacidad(14);
        updatedDetails.setImagenUrl("http://example.com/new-image.jpg");
        updatedDetails.setDescripcion("Nueva descripción");
        updatedDetails.setUbicacion("Valparaíso, Chile");
        updatedDetails.setEnOferta(true);
        updatedDetails.setPrecioOferta(50000.0);

        when(canchaRepository.findById(1L)).thenReturn(Optional.of(testCancha));
        when(canchaRepository.save(any(Cancha.class))).thenReturn(testCancha);

        Optional<Cancha> result = canchaService.updateCancha(1L, updatedDetails);

        assertTrue(result.isPresent());
        verify(canchaRepository).save(testCancha);
    }

    @Test
    void updateCancha_WhenNotExists_ReturnsEmpty() {
        Cancha updatedDetails = new Cancha();
        updatedDetails.setNombre("Cancha Actualizada");
        
        when(canchaRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Cancha> result = canchaService.updateCancha(999L, updatedDetails);

        assertFalse(result.isPresent());
        verify(canchaRepository, never()).save(any());
    }

    @Test
    void deleteCancha_WhenExists_ReturnsTrue() {
        when(canchaRepository.existsById(1L)).thenReturn(true);

        boolean result = canchaService.deleteCancha(1L);

        assertTrue(result);
        verify(canchaRepository).deleteById(1L);
    }

    @Test
    void deleteCancha_WhenNotExists_ReturnsFalse() {
        when(canchaRepository.existsById(999L)).thenReturn(false);

        boolean result = canchaService.deleteCancha(999L);

        assertFalse(result);
        verify(canchaRepository, never()).deleteById(any());
    }
}
