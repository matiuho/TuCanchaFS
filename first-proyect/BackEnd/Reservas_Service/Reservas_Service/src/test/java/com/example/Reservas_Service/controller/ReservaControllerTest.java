package com.example.Reservas_Service.controller;

import com.example.Reservas_Service.model.Reserva;
import com.example.Reservas_Service.service.ReservaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for ReservaController using MockMvc.
 * Tests REST API endpoints with mocked service layer.
 */
@WebMvcTest(ReservaController.class)
class ReservaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReservaService reservaService;

    @Autowired
    private ObjectMapper objectMapper;

    private Reserva testReserva;
    private LocalDate testFecha;
    private LocalTime testHora;

    @BeforeEach
    void setUp() {
        objectMapper.registerModule(new JavaTimeModule());
        
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
    @DisplayName("GET /api/v1/reservas should return list of all reservas")
    @WithMockUser
    void getAllReservas_ShouldReturnListOfReservas() throws Exception {
        // Arrange
        Reserva reserva2 = new Reserva();
        reserva2.setId(2L);
        reserva2.setNombre("María García");
        reserva2.setEmail("maria@example.com");
        reserva2.setFecha(testFecha);
        reserva2.setHora(testHora);
        reserva2.setCancha("Cancha 2");
        reserva2.setEstado(Reserva.Estado.CONFIRMADA);
        List<Reserva> reservas = Arrays.asList(testReserva, reserva2);
        when(reservaService.getAllReservas()).thenReturn(reservas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/reservas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Juan Pérez"))
                .andExpect(jsonPath("$[1].nombre").value("María García"));

        verify(reservaService).getAllReservas();
    }

    @Test
    @DisplayName("GET /api/v1/reservas/{id} should return reserva when found")
    @WithMockUser
    void getReservaById_WhenReservaExists_ShouldReturnReserva() throws Exception {
        // Arrange
        when(reservaService.getReservaById(1L)).thenReturn(Optional.of(testReserva));

        // Act & Assert
        mockMvc.perform(get("/api/v1/reservas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Juan Pérez"))
                .andExpect(jsonPath("$.email").value("juan@example.com"))
                .andExpect(jsonPath("$.estado").value("PENDIENTE"));
    }

    @Test
    @DisplayName("GET /api/v1/reservas/{id} should return 404 when reserva not found")
    @WithMockUser
    void getReservaById_WhenReservaNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(reservaService.getReservaById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/v1/reservas/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /api/v1/reservas/email/{email} should return reservas for email")
    @WithMockUser
    void getReservasByEmail_ShouldReturnReservasForEmail() throws Exception {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaService.getReservasByEmail("juan@example.com")).thenReturn(reservas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/reservas/email/juan@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].email").value("juan@example.com"));
    }

    @Test
    @DisplayName("GET /api/v1/reservas/cancha/{canchaId} should return reservas for cancha")
    @WithMockUser
    void getReservasByCanchaId_ShouldReturnReservasForCancha() throws Exception {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaService.getReservasByCanchaId(1L)).thenReturn(reservas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/reservas/cancha/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].canchaId").value(1));
    }

    @Test
    @DisplayName("GET /api/v1/reservas/fecha/{fecha} should return reservas for date")
    @WithMockUser
    void getReservasByFecha_ShouldReturnReservasForDate() throws Exception {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaService.getReservasByFecha(testFecha)).thenReturn(reservas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/reservas/fecha/2024-12-15"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].fecha").value("2024-12-15"));
    }

    @Test
    @DisplayName("GET /api/v1/reservas/estado/{estado} should return reservas with specified estado")
    @WithMockUser
    void getReservasByEstado_ShouldReturnReservasWithEstado() throws Exception {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaService.getReservasByEstado("PENDIENTE")).thenReturn(reservas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/reservas/estado/PENDIENTE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].estado").value("PENDIENTE"));
    }

    @Test
    @DisplayName("GET /api/v1/reservas/cancha/{canchaId}/fecha/{fecha} should return reservas for cancha and date")
    @WithMockUser
    void getReservasByCanchaAndFecha_ShouldReturnMatchingReservas() throws Exception {
        // Arrange
        List<Reserva> reservas = Arrays.asList(testReserva);
        when(reservaService.getReservasByCanchaAndFecha(1L, testFecha)).thenReturn(reservas);

        // Act & Assert
        mockMvc.perform(get("/api/v1/reservas/cancha/1/fecha/2024-12-15"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].canchaId").value(1))
                .andExpect(jsonPath("$[0].fecha").value("2024-12-15"));
    }

    @Test
    @DisplayName("POST /api/v1/reservas should create and return new reserva")
    @WithMockUser
    void createReserva_ShouldReturn201WithCreatedReserva() throws Exception {
        // Arrange
        when(reservaService.createReserva(any(Reserva.class))).thenReturn(testReserva);

        // Act & Assert
        mockMvc.perform(post("/api/v1/reservas")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testReserva)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Juan Pérez"));

        verify(reservaService).createReserva(any(Reserva.class));
    }

    @Test
    @DisplayName("PUT /api/v1/reservas/{id} should update and return reserva when found")
    @WithMockUser
    void updateReserva_WhenReservaExists_ShouldReturnUpdatedReserva() throws Exception {
        // Arrange
        when(reservaService.updateReserva(anyLong(), any(Reserva.class))).thenReturn(Optional.of(testReserva));

        // Act & Assert
        mockMvc.perform(put("/api/v1/reservas/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testReserva)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Juan Pérez"));
    }

    @Test
    @DisplayName("PUT /api/v1/reservas/{id} should return 404 when reserva not found")
    @WithMockUser
    void updateReserva_WhenReservaNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(reservaService.updateReserva(anyLong(), any(Reserva.class))).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(put("/api/v1/reservas/99")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testReserva)))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PATCH /api/v1/reservas/{id}/estado should update estado when reserva found")
    @WithMockUser
    void updateEstado_WhenReservaExists_ShouldReturnUpdatedReserva() throws Exception {
        // Arrange
        Reserva updatedReserva = new Reserva();
        updatedReserva.setId(1L);
        updatedReserva.setEstado(Reserva.Estado.CONFIRMADA);
        when(reservaService.updateEstado(anyLong(), anyString())).thenReturn(Optional.of(updatedReserva));

        Map<String, String> body = new HashMap<>();
        body.put("estado", "CONFIRMADA");

        // Act & Assert
        mockMvc.perform(patch("/api/v1/reservas/1/estado")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("CONFIRMADA"));
    }

    @Test
    @DisplayName("PATCH /api/v1/reservas/{id}/estado should return 404 when reserva not found")
    @WithMockUser
    void updateEstado_WhenReservaNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(reservaService.updateEstado(anyLong(), anyString())).thenReturn(Optional.empty());

        Map<String, String> body = new HashMap<>();
        body.put("estado", "CONFIRMADA");

        // Act & Assert
        mockMvc.perform(patch("/api/v1/reservas/99/estado")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("DELETE /api/v1/reservas/{id} should return 204 when reserva deleted")
    @WithMockUser
    void deleteReserva_WhenReservaExists_ShouldReturn204() throws Exception {
        // Arrange
        when(reservaService.deleteReserva(1L)).thenReturn(true);

        // Act & Assert
        mockMvc.perform(delete("/api/v1/reservas/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(reservaService).deleteReserva(1L);
    }

    @Test
    @DisplayName("DELETE /api/v1/reservas/{id} should return 404 when reserva not found")
    @WithMockUser
    void deleteReserva_WhenReservaNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(reservaService.deleteReserva(99L)).thenReturn(false);

        // Act & Assert
        mockMvc.perform(delete("/api/v1/reservas/99")
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }
}
