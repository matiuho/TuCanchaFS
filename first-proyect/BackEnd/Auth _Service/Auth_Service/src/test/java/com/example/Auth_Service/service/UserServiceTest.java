package com.example.Auth_Service.service;

import com.example.Auth_Service.dto.AuthResponse;
import com.example.Auth_Service.dto.LoginRequest;
import com.example.Auth_Service.dto.RegisterRequest;
import com.example.Auth_Service.model.User;
import com.example.Auth_Service.repository.UserRepository;
import com.example.Auth_Service.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
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

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPassword");
        testUser.setRole(User.Role.USER);
    }

    @Test
    void login_WithValidCredentials_ReturnsSuccess() {
        LoginRequest request = new LoginRequest("test@example.com", "password123");
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);
        when(jwtUtil.generateToken("test@example.com", "USER")).thenReturn("jwt-token");

        AuthResponse response = userService.login(request);

        assertTrue(response.isSuccess());
        assertEquals("test@example.com", response.getEmail());
        assertEquals("user", response.getRole());
        assertEquals("jwt-token", response.getToken());
        assertEquals("Login exitoso", response.getMessage());
    }

    @Test
    void login_WithUserNotFound_ReturnsError() {
        LoginRequest request = new LoginRequest("notfound@example.com", "password123");
        
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        AuthResponse response = userService.login(request);

        assertFalse(response.isSuccess());
        assertEquals("Usuario no encontrado", response.getMessage());
        assertNull(response.getEmail());
        assertNull(response.getToken());
    }

    @Test
    void login_WithWrongPassword_ReturnsError() {
        LoginRequest request = new LoginRequest("test@example.com", "wrongpassword");
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongpassword", "encodedPassword")).thenReturn(false);

        AuthResponse response = userService.login(request);

        assertFalse(response.isSuccess());
        assertEquals("Contraseña incorrecta", response.getMessage());
    }

    @Test
    void register_WithNewUser_ReturnsSuccess() {
        RegisterRequest request = new RegisterRequest("newuser@example.com", "password123", "user");
        
        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(2L);
            return savedUser;
        });
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("jwt-token");

        AuthResponse response = userService.register(request);

        assertTrue(response.isSuccess());
        assertEquals("newuser@example.com", response.getEmail());
        assertEquals("user", response.getRole());
        assertEquals("jwt-token", response.getToken());
        assertEquals("Usuario registrado exitosamente", response.getMessage());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_WithExistingEmail_ReturnsError() {
        RegisterRequest request = new RegisterRequest("test@example.com", "password123", "user");
        
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        AuthResponse response = userService.register(request);

        assertFalse(response.isSuccess());
        assertEquals("El usuario ya existe", response.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void register_WithAdminRole_CreatesAdminUser() {
        RegisterRequest request = new RegisterRequest("admin@example.com", "password123", "admin");
        
        when(userRepository.existsByEmail("admin@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(3L);
            return savedUser;
        });
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("jwt-token");

        AuthResponse response = userService.register(request);

        assertTrue(response.isSuccess());
        assertEquals("admin", response.getRole());
    }

    @Test
    void getAllUsers_ReturnsUserList() {
        User user2 = new User();
        user2.setId(2L);
        user2.setEmail("user2@example.com");
        
        when(userRepository.findAll()).thenReturn(Arrays.asList(testUser, user2));

        List<User> users = userService.getAllUsers();

        assertEquals(2, users.size());
        verify(userRepository).findAll();
    }

    @Test
    void getUserByEmail_WhenExists_ReturnsUser() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        Optional<User> result = userService.getUserByEmail("test@example.com");

        assertTrue(result.isPresent());
        assertEquals("test@example.com", result.get().getEmail());
    }

    @Test
    void getUserByEmail_WhenNotExists_ReturnsEmpty() {
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserByEmail("notfound@example.com");

        assertFalse(result.isPresent());
    }

    @Test
    void deleteUser_WhenExists_ReturnsTrue() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        boolean result = userService.deleteUser("test@example.com");

        assertTrue(result);
        verify(userRepository).delete(testUser);
    }

    @Test
    void deleteUser_WhenNotExists_ReturnsFalse() {
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        boolean result = userService.deleteUser("notfound@example.com");

        assertFalse(result);
        verify(userRepository, never()).delete(any(User.class));
    }

    @Test
    void updateUser_WhenExists_ReturnsUpdatedUser() {
        User updatedUser = new User();
        updatedUser.setPassword("newPassword");
        updatedUser.setRole(User.Role.ADMIN);
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        Optional<User> result = userService.updateUser("test@example.com", updatedUser);

        assertTrue(result.isPresent());
        verify(passwordEncoder).encode("newPassword");
        verify(userRepository).save(testUser);
    }

    @Test
    void updateUser_WhenNotExists_ReturnsEmpty() {
        User updatedUser = new User();
        updatedUser.setPassword("newPassword");
        
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        Optional<User> result = userService.updateUser("notfound@example.com", updatedUser);

        assertFalse(result.isPresent());
        verify(userRepository, never()).save(any(User.class));
    }
}
