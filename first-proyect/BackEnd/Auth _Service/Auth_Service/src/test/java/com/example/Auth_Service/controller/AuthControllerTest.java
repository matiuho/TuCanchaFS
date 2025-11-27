package com.example.Auth_Service.controller;

import com.example.Auth_Service.dto.AuthResponse;
import com.example.Auth_Service.dto.LoginRequest;
import com.example.Auth_Service.dto.RegisterRequest;
import com.example.Auth_Service.model.User;
import com.example.Auth_Service.service.UserService;
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
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for AuthController using MockMvc.
 * Tests REST API endpoints with mocked service layer.
 */
@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private User testUser;
    private LoginRequest loginRequest;
    private RegisterRequest registerRequest;
    private AuthResponse successResponse;
    private AuthResponse failureResponse;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPassword");
        testUser.setRole(User.Role.USER);

        loginRequest = new LoginRequest("test@example.com", "password123");
        registerRequest = new RegisterRequest("newuser@example.com", "password123", "user");

        successResponse = new AuthResponse("test@example.com", "user", "jwt-token", "Login exitoso", true);
        failureResponse = new AuthResponse(null, null, null, "Usuario no encontrado", false);
    }

    @Test
    @DisplayName("POST /api/v1/auth/login should return 200 with valid credentials")
    @WithMockUser
    void login_WithValidCredentials_ShouldReturn200() throws Exception {
        // Arrange
        when(userService.login(any(LoginRequest.class))).thenReturn(successResponse);

        // Act & Assert
        mockMvc.perform(post("/api/v1/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.role").value("user"))
                .andExpect(jsonPath("$.token").value("jwt-token"))
                .andExpect(jsonPath("$.message").value("Login exitoso"));

        verify(userService).login(any(LoginRequest.class));
    }

    @Test
    @DisplayName("POST /api/v1/auth/login should return 401 with invalid credentials")
    @WithMockUser
    void login_WithInvalidCredentials_ShouldReturn401() throws Exception {
        // Arrange
        when(userService.login(any(LoginRequest.class))).thenReturn(failureResponse);

        // Act & Assert
        mockMvc.perform(post("/api/v1/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Usuario no encontrado"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/register should return 201 for new user")
    @WithMockUser
    void register_WithNewUser_ShouldReturn201() throws Exception {
        // Arrange
        AuthResponse registerSuccess = new AuthResponse("newuser@example.com", "user", "jwt-token", "Usuario registrado exitosamente", true);
        when(userService.register(any(RegisterRequest.class))).thenReturn(registerSuccess);

        // Act & Assert
        mockMvc.perform(post("/api/v1/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.email").value("newuser@example.com"))
                .andExpect(jsonPath("$.message").value("Usuario registrado exitosamente"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/register should return 400 when user already exists")
    @WithMockUser
    void register_WithExistingUser_ShouldReturn400() throws Exception {
        // Arrange
        AuthResponse registerFailure = new AuthResponse(null, null, null, "El usuario ya existe", false);
        when(userService.register(any(RegisterRequest.class))).thenReturn(registerFailure);

        // Act & Assert
        mockMvc.perform(post("/api/v1/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("El usuario ya existe"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/logout should return 200")
    @WithMockUser
    void logout_ShouldReturn200() throws Exception {
        // Act & Assert
        mockMvc.perform(post("/api/v1/auth/logout")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Logout exitoso"));
    }

    @Test
    @DisplayName("GET /api/v1/auth/users should return list of users")
    @WithMockUser
    void getAllUsers_ShouldReturnListOfUsers() throws Exception {
        // Arrange
        User user2 = new User();
        user2.setId(2L);
        user2.setEmail("user2@example.com");
        user2.setRole(User.Role.USER);
        List<User> users = Arrays.asList(testUser, user2);
        when(userService.getAllUsers()).thenReturn(users);

        // Act & Assert
        mockMvc.perform(get("/api/v1/auth/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].email").value("test@example.com"))
                .andExpect(jsonPath("$[1].email").value("user2@example.com"));
    }

    @Test
    @DisplayName("GET /api/v1/auth/users/{email} should return user when found")
    @WithMockUser
    void getUserByEmail_WhenUserExists_ShouldReturnUser() throws Exception {
        // Arrange
        when(userService.getUserByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // Act & Assert
        mockMvc.perform(get("/api/v1/auth/users/test@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    @DisplayName("GET /api/v1/auth/users/{email} should return 404 when user not found")
    @WithMockUser
    void getUserByEmail_WhenUserNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(userService.getUserByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/v1/auth/users/nonexistent@example.com"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("DELETE /api/v1/auth/users/{email} should return 204 when user deleted")
    @WithMockUser
    void deleteUser_WhenUserExists_ShouldReturn204() throws Exception {
        // Arrange
        when(userService.deleteUser("test@example.com")).thenReturn(true);

        // Act & Assert
        mockMvc.perform(delete("/api/v1/auth/users/test@example.com")
                        .with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("DELETE /api/v1/auth/users/{email} should return 404 when user not found")
    @WithMockUser
    void deleteUser_WhenUserNotExists_ShouldReturn404() throws Exception {
        // Arrange
        when(userService.deleteUser("nonexistent@example.com")).thenReturn(false);

        // Act & Assert
        mockMvc.perform(delete("/api/v1/auth/users/nonexistent@example.com")
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/v1/auth/users/{email} should return updated user")
    @WithMockUser
    void updateUser_WhenUserExists_ShouldReturnUpdatedUser() throws Exception {
        // Arrange
        User updatedUser = new User();
        updatedUser.setPassword("newPassword");
        updatedUser.setRole(User.Role.ADMIN);
        
        when(userService.updateUser(anyString(), any(User.class))).thenReturn(Optional.of(testUser));

        // Act & Assert
        mockMvc.perform(put("/api/v1/auth/users/test@example.com")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

    @Test
    @DisplayName("PUT /api/v1/auth/users/{email} should return 404 when user not found")
    @WithMockUser
    void updateUser_WhenUserNotExists_ShouldReturn404() throws Exception {
        // Arrange
        User updatedUser = new User();
        updatedUser.setPassword("newPassword");
        
        when(userService.updateUser(anyString(), any(User.class))).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(put("/api/v1/auth/users/nonexistent@example.com")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isNotFound());
    }
}
