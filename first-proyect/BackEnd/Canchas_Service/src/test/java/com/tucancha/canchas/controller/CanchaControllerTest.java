package com.tucancha.canchas.controller;

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
@DisplayName("CanchaController Tests")
class CanchaControllerTest {

    @Mock
    private CanchaService canchaService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        CanchaController controller = new CanchaController(canchaService);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    @DisplayName("POST /canchas")
    void testCreateCancha() throws Exception {
        mockMvc.perform(post("/canchas")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("GET /canchas/1")
    void testGetCancha() throws Exception {
        mockMvc.perform(get("/canchas/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("PUT /canchas/1")
    void testUpdateCancha() throws Exception {
        mockMvc.perform(put("/canchas/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("DELETE /canchas/1")
    void testDeleteCancha() throws Exception {
        doNothing().when(canchaService).delete(1L);
        mockMvc.perform(delete("/canchas/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    interface CanchaService {
        void delete(Long id);
    }

    static class CanchaController {
        private CanchaService service;

        public CanchaController(CanchaService service) {
            this.service = service;
        }
    }
}
