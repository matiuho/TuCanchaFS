package com.example.Pago_Service.controller;

import com.example.Pago_Service.dto.PagoRequest;
import com.example.Pago_Service.dto.PagoResponse;
import com.example.Pago_Service.model.Pago;
import com.example.Pago_Service.service.PagoService;
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

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for PagoController using MockMvc.
 * Tests REST API endpoints with mocked service layer.
 */
@WebMvcTest(PagoController.class)
class PagoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PagoService pagoService;

    @Autowired
    private ObjectMapper objectMapper;

    private Pago testPago;
    private PagoRequest validPagoRequest;
    private PagoResponse successResponse;
    private PagoResponse failureResponse;

    @BeforeEach
    void setUp() {
        testPago = new Pago();
        testPago.setId(1L);
        testPago.setNombre("Juan Pérez");
        testPago.setEmail("juan@example.com");
        testPago.setCardNumber("1234123412341234");
        testPago.setMonto(50000.0);
        testPago.setReservaId(1L);
        testPago.setEstado(Pago.Estado.APROBADO);
        testPago.setFechaPago(LocalDateTime.now());

        validPagoRequest = new PagoRequest("Juan Pérez", "juan@example.com", "1234123412341234", 50000.0, 1L);
        successResponse = new PagoResponse(1L, "APROBADO", "Pago procesado exitosamente", true);
        failureResponse = new PagoResponse(1L, "RECHAZADO", "Número de tarjeta inválido", false);
    }

    @Test
    @DisplayName("POST /api/v1/pagos/procesar should return 200 with valid card")
    @WithMockUser
    void procesarPago_WithValidCard_ShouldReturn200() throws Exception {
        // Arrange
        when(pagoService.procesarPago(any(PagoRequest.class))).thenReturn(successResponse);

        // Act & Assert
        mockMvc.perform(post("/api/v1/pagos/procesar")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validPagoRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.estado").value("APROBADO"))
                .andExpect(jsonPath("$.mensaje").value("Pago procesado exitosamente"));

        verify(pagoService).procesarPago(any(PagoRequest.class));
    }

    @Test
    @DisplayName("POST /api/v1/pagos/procesar should return 400 with invalid card")
    @WithMockUser
    void procesarPago_WithInvalidCard_ShouldReturn400() throws Exception {
        // Arrange
        when(pagoService.procesarPago(any(PagoRequest.class))).thenReturn(failureResponse);

        // Act & Assert
        mockMvc.perform(post("/api/v1/pagos/procesar")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validPagoRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.estado").value("RECHAZADO"))
                .andExpect(jsonPath("$.mensaje").value("Número de tarjeta inválido"));
    }

    @Test
    @DisplayName("GET /api/v1/pagos should return list of all pagos")
    @WithMockUser
    void getAllPagos_ShouldReturnListOfPagos() throws Exception {
        // Arrange
        Pago pago2 = new Pago();
        pago2.setId(2L);
        pago2.setNombre("María García");
        pago2.setEmail("maria@example.com");
        List<Pago> pagos = Arrays.asList(testPago, pago2);
        when(pagoService.getAllPagos()).thenReturn(pagos);

        // Act & Assert
        mockMvc.perform(get("/api/v1/pagos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Juan Pérez"))
                .andExpect(jsonPath("$[1].nombre").value("María García"));
    }

    @Test
    @DisplayName("GET /api/v1/pagos/{id} should return pago when found")
    @WithMockUser
    void getPagoById_WhenPagoExists_ShouldReturnPago() throws Exception {
        // Arrange
        when(pagoService.getPagoById(1L)).thenReturn(Optional.of(testPago));

        // Act & Assert
        mockMvc.perform(get("/api/v1/pagos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nombre").value("Juan Pérez"))
                .andExpect(jsonPath("$.estado").value("APROBADO"));
    }

    @Test
    @DisplayName("GET /api/v1/pagos/{id} should return 404 when pago not found")
    @WithMockUser
    void getPagoById_WhenPagoNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(pagoService.getPagoById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/v1/pagos/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /api/v1/pagos/email/{email} should return pagos for email")
    @WithMockUser
    void getPagosByEmail_ShouldReturnPagosForEmail() throws Exception {
        // Arrange
        List<Pago> pagos = Arrays.asList(testPago);
        when(pagoService.getPagosByEmail("juan@example.com")).thenReturn(pagos);

        // Act & Assert
        mockMvc.perform(get("/api/v1/pagos/email/juan@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].email").value("juan@example.com"));
    }

    @Test
    @DisplayName("GET /api/v1/pagos/estado/{estado} should return pagos with specified estado")
    @WithMockUser
    void getPagosByEstado_ShouldReturnPagosWithEstado() throws Exception {
        // Arrange
        List<Pago> pagos = Arrays.asList(testPago);
        when(pagoService.getPagosByEstado("APROBADO")).thenReturn(pagos);

        // Act & Assert
        mockMvc.perform(get("/api/v1/pagos/estado/APROBADO"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].estado").value("APROBADO"));
    }

    @Test
    @DisplayName("GET /api/v1/pagos/reserva/{reservaId} should return pagos for reserva")
    @WithMockUser
    void getPagosByReservaId_ShouldReturnPagosForReserva() throws Exception {
        // Arrange
        List<Pago> pagos = Arrays.asList(testPago);
        when(pagoService.getPagosByReservaId(1L)).thenReturn(pagos);

        // Act & Assert
        mockMvc.perform(get("/api/v1/pagos/reserva/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].reservaId").value(1));
    }

    @Test
    @DisplayName("POST /api/v1/pagos/{id}/reembolsar should return updated pago when found")
    @WithMockUser
    void reembolsarPago_WhenPagoExists_ShouldReturnUpdatedPago() throws Exception {
        // Arrange
        Pago reembolsadoPago = new Pago();
        reembolsadoPago.setId(1L);
        reembolsadoPago.setEstado(Pago.Estado.REEMBOLSADO);
        when(pagoService.reembolsarPago(1L)).thenReturn(Optional.of(reembolsadoPago));

        // Act & Assert
        mockMvc.perform(post("/api/v1/pagos/1/reembolsar")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("REEMBOLSADO"));
    }

    @Test
    @DisplayName("POST /api/v1/pagos/{id}/reembolsar should return 404 when pago not found")
    @WithMockUser
    void reembolsarPago_WhenPagoNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(pagoService.reembolsarPago(99L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(post("/api/v1/pagos/99/reembolsar")
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }
}
