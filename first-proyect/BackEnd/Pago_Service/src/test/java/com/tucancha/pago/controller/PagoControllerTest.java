package com.tucancha.pago.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PagoController Tests")
class PagoControllerTest {

    @Mock
    private PagoService pagoService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        PagoController controller = new PagoController(pagoService);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    @DisplayName("POST /pagos")
    void testCreatePago() throws Exception {
        mockMvc.perform(post("/pagos")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("GET /pagos/1")
    void testGetPago() throws Exception {
        mockMvc.perform(get("/pagos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("POST /pagos/1/procesar")
    void testProcesarPago() throws Exception {
        mockMvc.perform(post("/pagos/1/procesar")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("DELETE /pagos/1")
    void testDeletePago() throws Exception {
        doNothing().when(pagoService).delete(1L);
        mockMvc.perform(delete("/pagos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    interface PagoService {
        void delete(Long id);
    }

    static class PagoController {
        private PagoService service;

        public PagoController(PagoService service) {
            this.service = service;
        }
    }
}
