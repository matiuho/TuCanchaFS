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

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Unit tests for UserService using JUnit 5 and Mockito.
 * Tests service layer logic with mocked dependencies.
 */
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
    private LoginRequest loginRequest;
    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPassword");
        testUser.setRole(User.Role.USER);

        loginRequest = new LoginRequest("test@example.com", "password123");
        registerRequest = new RegisterRequest("newuser@example.com", "password123", "user");
    }

    @Test
    @DisplayName("Login should return success when credentials are valid")
    void login_WithValidCredentials_ShouldReturnSuccess() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("jwt-token");

        // Act
        AuthResponse response = userService.login(loginRequest);

        // Assert
        assertTrue(response.isSuccess());
        assertEquals("test@example.com", response.getEmail());
        assertEquals("user", response.getRole());
        assertNotNull(response.getToken());
        assertEquals("Login exitoso", response.getMessage());
        verify(userRepository).findByEmail("test@example.com");
        verify(passwordEncoder).matches("password123", "encodedPassword");
    }

    @Test
    @DisplayName("Login should return failure when user is not found")
    void login_WithNonExistentUser_ShouldReturnFailure() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        // Act
        AuthResponse response = userService.login(loginRequest);

        // Assert
        assertFalse(response.isSuccess());
        assertEquals("Usuario no encontrado", response.getMessage());
        assertNull(response.getToken());
        verify(userRepository).findByEmail("test@example.com");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    @DisplayName("Login should return failure when password is incorrect")
    void login_WithIncorrectPassword_ShouldReturnFailure() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        // Act
        AuthResponse response = userService.login(loginRequest);

        // Assert
        assertFalse(response.isSuccess());
        assertEquals("Contraseña incorrecta", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    @DisplayName("Register should create new user successfully")
    void register_WithNewUser_ShouldReturnSuccess() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(1L);
            return user;
        });
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("jwt-token");

        // Act
        AuthResponse response = userService.register(registerRequest);

        // Assert
        assertTrue(response.isSuccess());
        assertEquals("newuser@example.com", response.getEmail());
        assertEquals("user", response.getRole());
        assertNotNull(response.getToken());
        assertEquals("Usuario registrado exitosamente", response.getMessage());
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("Register should fail when email already exists")
    void register_WithExistingEmail_ShouldReturnFailure() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act
        AuthResponse response = userService.register(registerRequest);

        // Assert
        assertFalse(response.isSuccess());
        assertEquals("El usuario ya existe", response.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Register with admin role should create admin user")
    void register_WithAdminRole_ShouldCreateAdminUser() {
        // Arrange
        RegisterRequest adminRequest = new RegisterRequest("admin@example.com", "password123", "admin");
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(1L);
            return user;
        });
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("jwt-token");

        // Act
        AuthResponse response = userService.register(adminRequest);

        // Assert
        assertTrue(response.isSuccess());
        assertEquals("admin", response.getRole());
    }

    @Test
    @DisplayName("GetAllUsers should return list of users")
    void getAllUsers_ShouldReturnListOfUsers() {
        // Arrange
        User user2 = new User();
        user2.setId(2L);
        user2.setEmail("user2@example.com");
        List<User> users = Arrays.asList(testUser, user2);
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertEquals(2, result.size());
        verify(userRepository).findAll();
    }

    @Test
    @DisplayName("GetUserByEmail should return user when found")
    void getUserByEmail_WhenUserExists_ShouldReturnUser() {
        // Arrange
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // Act
        Optional<User> result = userService.getUserByEmail("test@example.com");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("test@example.com", result.get().getEmail());
    }

    @Test
    @DisplayName("GetUserByEmail should return empty when user not found")
    void getUserByEmail_WhenUserNotExists_ShouldReturnEmpty() {
        // Arrange
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.getUserByEmail("nonexistent@example.com");

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    @DisplayName("DeleteUser should return true when user exists")
    void deleteUser_WhenUserExists_ShouldReturnTrue() {
        // Arrange
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // Act
        boolean result = userService.deleteUser("test@example.com");

        // Assert
        assertTrue(result);
        verify(userRepository).delete(testUser);
    }

    @Test
    @DisplayName("DeleteUser should return false when user does not exist")
    void deleteUser_WhenUserNotExists_ShouldReturnFalse() {
        // Arrange
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        // Act
        boolean result = userService.deleteUser("nonexistent@example.com");

        // Assert
        assertFalse(result);
        verify(userRepository, never()).delete(any(User.class));
    }

    @Test
    @DisplayName("UpdateUser should update user when found")
    void updateUser_WhenUserExists_ShouldUpdateAndReturnUser() {
        // Arrange
        User updatedUser = new User();
        updatedUser.setPassword("newPassword");
        updatedUser.setRole(User.Role.ADMIN);
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.encode("newPassword")).thenReturn("encodedNewPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act
        Optional<User> result = userService.updateUser("test@example.com", updatedUser);

        // Assert
        assertTrue(result.isPresent());
        verify(passwordEncoder).encode("newPassword");
        verify(userRepository).save(testUser);
    }

    @Test
    @DisplayName("UpdateUser should return empty when user not found")
    void updateUser_WhenUserNotExists_ShouldReturnEmpty() {
        // Arrange
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.updateUser("nonexistent@example.com", new User());

        // Assert
        assertFalse(result.isPresent());
        verify(userRepository, never()).save(any(User.class));
    }
}
