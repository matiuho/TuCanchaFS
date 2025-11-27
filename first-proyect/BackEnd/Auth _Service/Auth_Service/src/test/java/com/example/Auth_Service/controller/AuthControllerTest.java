package com.example.Auth_Service.controller;

import com.example.Auth_Service.dto.AuthResponse;
import com.example.Auth_Service.dto.LoginRequest;
import com.example.Auth_Service.dto.RegisterRequest;
import com.example.Auth_Service.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthController Tests")
class AuthControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("POST /auth/register - exitoso")
    void testRegisterExitoso() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("newuser@tucancha.com");
        request.setPassword("password123");

        AuthResponse response = new AuthResponse("newuser@tucancha.com", "user", "jwt_token", "Exitoso", true);
        when(userService.register(any(RegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        verify(userService, times(1)).register(any(RegisterRequest.class));
    }

    @Test
    @DisplayName("POST /auth/login - exitoso")
    void testLoginExitoso() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("usuario@tucancha.com");
        request.setPassword("password123");

        AuthResponse response = new AuthResponse("usuario@tucancha.com", "user", "jwt_token", "Exitoso", true);
        when(userService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(userService, times(1)).login(any(LoginRequest.class));
    }

    @Test
    @DisplayName("POST /auth/login - fallido")
    void testLoginFallido() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("noexiste@tucancha.com");
        request.setPassword("password123");

        AuthResponse response = new AuthResponse(null, null, null, "Error", false);
        when(userService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /auth/user/{email}")
    void testGetUserByEmail() throws Exception {
        mockMvc.perform(get("/auth/user/usuario@tucancha.com")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("DELETE /auth/user/{email}")
    void testDeleteUser() throws Exception {
        when(userService.deleteUser("usuario@tucancha.com")).thenReturn(true);

        mockMvc.perform(delete("/auth/user/usuario@tucancha.com")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
