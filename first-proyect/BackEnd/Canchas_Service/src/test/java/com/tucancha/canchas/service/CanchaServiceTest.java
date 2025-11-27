package com.tucancha.canchas.service;

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
@DisplayName("CanchaService Tests")
class CanchaServiceTest {

    @Mock
    private CanchaRepository canchaRepository;

    private CanchaService canchaService;

    @BeforeEach
    void setUp() {
        canchaService = new CanchaService(canchaRepository);
    }

    @Test
    @DisplayName("Crear cancha")
    void testCreateCancha() {
        Cancha cancha = new Cancha(1L, "Cancha 1", "Calle Principal", 50.0, true);
        when(canchaRepository.save(any(Cancha.class))).thenReturn(cancha);

        Cancha resultado = canchaService.create(cancha);

        assertNotNull(resultado);
        assertEquals("Cancha 1", resultado.getNombre());
        verify(canchaRepository, times(1)).save(any(Cancha.class));
    }

    @Test
    @DisplayName("Obtener cancha por ID")
    void testGetById() {
        Cancha cancha = new Cancha(1L, "Cancha 1", "Calle Principal", 50.0, true);
        when(canchaRepository.findById(1L)).thenReturn(Optional.of(cancha));

        Optional<Cancha> resultado = canchaService.getById(1L);

        assertTrue(resultado.isPresent());
        verify(canchaRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Eliminar cancha")
    void testDelete() {
        doNothing().when(canchaRepository).deleteById(1L);
        canchaService.delete(1L);
        verify(canchaRepository, times(1)).deleteById(1L);
    }

    static class Cancha {
        private Long id;
        private String nombre, ubicacion;
        private Double precioHora;
        private boolean disponible;

        public Cancha(Long id, String nombre, String ubicacion, Double precioHora, boolean disponible) {
            this.id = id;
            this.nombre = nombre;
            this.ubicacion = ubicacion;
            this.precioHora = precioHora;
            this.disponible = disponible;
        }

        public String getNombre() { return nombre; }
    }

    interface CanchaRepository {
        Cancha save(Cancha cancha);
        Optional<Cancha> findById(Long id);
        void deleteById(Long id);
    }

    static class CanchaService {
        private CanchaRepository repository;

        public CanchaService(CanchaRepository repository) {
            this.repository = repository;
        }

        public Cancha create(Cancha cancha) {
            return repository.save(cancha);
        }

        public Optional<Cancha> getById(Long id) {
            return repository.findById(id);
        }

        public void delete(Long id) {
            repository.deleteById(id);
        }
    }
}
