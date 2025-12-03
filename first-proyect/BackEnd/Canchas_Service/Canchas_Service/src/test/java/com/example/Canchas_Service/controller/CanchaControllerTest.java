package com.example.Canchas_Service.controller;

import com.example.Canchas_Service.model.Cancha;
import com.example.Canchas_Service.service.CanchaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for CanchaController using MockMvc.
 * Tests REST API endpoints with mocked service layer.
 */
@WebMvcTest(CanchaController.class)
class CanchaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CanchaService canchaService;

    @Autowired
    private ObjectMapper objectMapper;

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
    @DisplayName("GET /api/v1/canchas should return list of all canchas")
    @WithMockUser
    void getAllCanchas_ShouldReturnListOfCanchas() throws Exception {
        // Arrange
        Cancha cancha2 = new Cancha();
        cancha2.setId(2L);
        cancha2.setNombre("Cancha Secundaria");
        cancha2.setTipo(Cancha.Tipo.FUTSAL);
        List<Cancha> canchas = Arrays.asList(testCancha, cancha2);
        when(canchaService.getAllCanchas()).thenReturn(canchas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/canchas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Cancha Principal"))
                .andExpect(jsonPath("$[1].nombre").value("Cancha Secundaria"));

        verify(canchaService).getAllCanchas();
    }

    @Test
    @DisplayName("GET /api/v1/canchas/{id} should return cancha when found")
    @WithMockUser
    void getCanchaById_WhenCanchaExists_ShouldReturnCancha() throws Exception {
        // Arrange
        when(canchaService.getCanchaById(1L)).thenReturn(Optional.of(testCancha));

        // Act & Assert
        mockMvc.perform(get("/api/v1/canchas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Cancha Principal"))
                .andExpect(jsonPath("$.tipo").value("FUTBOL"))
                .andExpect(jsonPath("$.precioHora").value(50000.0));
    }

    @Test
    @DisplayName("GET /api/v1/canchas/{id} should return 404 when cancha not found")
    @WithMockUser
    void getCanchaById_WhenCanchaNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(canchaService.getCanchaById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/v1/canchas/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /api/v1/canchas/tipo/{tipo} should return canchas of specified type")
    @WithMockUser
    void getCanchasByTipo_ShouldReturnCanchasOfType() throws Exception {
        // Arrange
        List<Cancha> futbolCanchas = Arrays.asList(testCancha);
        when(canchaService.getCanchasByTipo("FUTBOL")).thenReturn(futbolCanchas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/canchas/tipo/FUTBOL"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].tipo").value("FUTBOL"));
    }

    @Test
    @DisplayName("GET /api/v1/canchas/ofertas should return canchas with offers")
    @WithMockUser
    void getCanchasEnOferta_ShouldReturnOfferCanchas() throws Exception {
        // Arrange
        Cancha offerCancha = new Cancha();
        offerCancha.setId(2L);
        offerCancha.setNombre("Cancha en Oferta");
        offerCancha.setEnOferta(true);
        offerCancha.setPrecioOferta(40000.0);
        List<Cancha> offerCanchas = Arrays.asList(offerCancha);
        when(canchaService.getCanchasEnOferta()).thenReturn(offerCanchas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/canchas/ofertas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].enOferta").value(true));
    }

    @Test
    @DisplayName("GET /api/v1/canchas/search should return matching canchas")
    @WithMockUser
    void searchCanchas_ShouldReturnMatchingCanchas() throws Exception {
        // Arrange
        List<Cancha> matchingCanchas = Arrays.asList(testCancha);
        when(canchaService.searchCanchasByNombre("Principal")).thenReturn(matchingCanchas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/canchas/search")
                        .param("nombre", "Principal"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].nombre").value("Cancha Principal"));
    }

    @Test
    @DisplayName("GET /api/v1/canchas/search should return empty list when no matches")
    @WithMockUser
    void searchCanchas_WhenNoMatches_ShouldReturnEmptyList() throws Exception {
        // Arrange
        when(canchaService.searchCanchasByNombre("NonExistent")).thenReturn(Collections.emptyList());

        // Act & Assert
        mockMvc.perform(get("/api/v1/canchas/search")
                        .param("nombre", "NonExistent"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    @DisplayName("POST /api/v1/canchas should create and return new cancha")
    @WithMockUser
    void createCancha_ShouldReturn201WithCreatedCancha() throws Exception {
        // Arrange
        when(canchaService.createCancha(any(Cancha.class))).thenReturn(testCancha);

        // Act & Assert
        mockMvc.perform(post("/api/v1/canchas")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testCancha)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Cancha Principal"));

        verify(canchaService).createCancha(any(Cancha.class));
    }

    @Test
    @DisplayName("PUT /api/v1/canchas/{id} should update and return cancha when found")
    @WithMockUser
    void updateCancha_WhenCanchaExists_ShouldReturnUpdatedCancha() throws Exception {
        // Arrange
        when(canchaService.updateCancha(anyLong(), any(Cancha.class))).thenReturn(Optional.of(testCancha));

        // Act & Assert
        mockMvc.perform(put("/api/v1/canchas/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testCancha)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Cancha Principal"));
    }

    @Test
    @DisplayName("PUT /api/v1/canchas/{id} should return 404 when cancha not found")
    @WithMockUser
    void updateCancha_WhenCanchaNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(canchaService.updateCancha(anyLong(), any(Cancha.class))).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(put("/api/v1/canchas/99")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testCancha)))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("DELETE /api/v1/canchas/{id} should return 204 when cancha deleted")
    @WithMockUser
    void deleteCancha_WhenCanchaExists_ShouldReturn204() throws Exception {
        // Arrange
        when(canchaService.deleteCancha(1L)).thenReturn(true);

        // Act & Assert
        mockMvc.perform(delete("/api/v1/canchas/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(canchaService).deleteCancha(1L);
    }

    @Test
    @DisplayName("DELETE /api/v1/canchas/{id} should return 404 when cancha not found")
    @WithMockUser
    void deleteCancha_WhenCanchaNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(canchaService.deleteCancha(99L)).thenReturn(false);

        // Act & Assert
        mockMvc.perform(delete("/api/v1/canchas/99")
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }
}
