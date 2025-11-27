package com.example.Auth_Service.service;

import com.example.Auth_Service.dto.AuthResponse;
import com.example.Auth_Service.dto.LoginRequest;
import com.example.Auth_Service.dto.RegisterRequest;
import com.example.Auth_Service.model.User;
import com.example.Auth_Service.repository.UserRepository;
import com.example.Auth_Service.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService Tests")
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private UserService userService;

    private User testUser;
    private LoginRequest loginRequest;
    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("usuario@tucancha.com");
        testUser.setPassword("hashedPassword123");
        testUser.setRole(User.Role.USER);

        loginRequest = new LoginRequest();
        loginRequest.setEmail("usuario@tucancha.com");
        loginRequest.setPassword("password123");

        registerRequest = new RegisterRequest();
        registerRequest.setEmail("newuser@tucancha.com");
        registerRequest.setPassword("password456");
        registerRequest.setRole("user");
    }

    @Test
    @DisplayName("Login exitoso")
    void testLoginExitoso() {
        when(userRepository.findByEmail("usuario@tucancha.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "hashedPassword123")).thenReturn(true);
        when(jwtUtil.generateToken("usuario@tucancha.com", "USER")).thenReturn("jwt_token_123");

        AuthResponse response = userService.login(loginRequest);

        assertTrue(response.isSuccess());
        assertNotNull(response.getToken());
        verify(userRepository, times(1)).findByEmail("usuario@tucancha.com");
    }

    @Test
    @DisplayName("Login usuario no encontrado")
    void testLoginUsuarioNoEncontrado() {
        when(userRepository.findByEmail("noexiste@tucancha.com")).thenReturn(Optional.empty());
        loginRequest.setEmail("noexiste@tucancha.com");

        AuthResponse response = userService.login(loginRequest);

        assertFalse(response.isSuccess());
        verify(userRepository, times(1)).findByEmail("noexiste@tucancha.com");
    }

    @Test
    @DisplayName("Registro exitoso")
    void testRegistroExitoso() {
        when(userRepository.existsByEmail("newuser@tucancha.com")).thenReturn(false);
        when(passwordEncoder.encode("password456")).thenReturn("hashedPassword456");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(2L);
            return user;
        });

        AuthResponse response = userService.register(registerRequest);

        assertTrue(response.isSuccess());
        verify(userRepository, times(1)).existsByEmail("newuser@tucancha.com");
    }

    @Test
    @DisplayName("Obtener usuario por email")
    void testGetUserByEmail() {
        when(userRepository.findByEmail("usuario@tucancha.com")).thenReturn(Optional.of(testUser));

        Optional<User> result = userService.getUserByEmail("usuario@tucancha.com");

        assertTrue(result.isPresent());
        verify(userRepository, times(1)).findByEmail("usuario@tucancha.com");
    }

    @Test
    @DisplayName("Eliminar usuario")
    void testDeleteUser() {
        when(userRepository.findByEmail("usuario@tucancha.com")).thenReturn(Optional.of(testUser));
        doNothing().when(userRepository).delete(testUser);

        boolean result = userService.deleteUser("usuario@tucancha.com");

        assertTrue(result);
        verify(userRepository, times(1)).delete(testUser);
    }
}
