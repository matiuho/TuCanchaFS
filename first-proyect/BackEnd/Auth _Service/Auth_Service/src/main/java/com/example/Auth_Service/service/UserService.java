package com.example.Auth_Service.service;

import com.example.Auth_Service.dto.AuthResponse;
import com.example.Auth_Service.dto.LoginRequest;
import com.example.Auth_Service.dto.RegisterRequest;
import com.example.Auth_Service.model.User;
import com.example.Auth_Service.repository.UserRepository;
import com.example.Auth_Service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            return new AuthResponse(null, null, null, "Usuario no encontrado", false);
        }
        
        User user = userOpt.get();
        
        // Validate password with BCrypt
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, null, null, "Contraseña incorrecta", false);
        }
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        
        return new AuthResponse(
            user.getEmail(), 
            user.getRole().name().toLowerCase(),
            token,
            "Login exitoso", 
            true
        );
    }
    
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, null, null, "El usuario ya existe", false);
        }
        
        // Create new user
        User newUser = new User();
        newUser.setEmail(request.getEmail());
        // Hash password with BCrypt
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // Set role (default to USER if not specified or invalid)
        if ("admin".equalsIgnoreCase(request.getRole())) {
            newUser.setRole(User.Role.ADMIN);
        } else {
            newUser.setRole(User.Role.USER);
        }
        
        userRepository.save(newUser);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(newUser.getEmail(), newUser.getRole().name());
        
        return new AuthResponse(
            newUser.getEmail(), 
            newUser.getRole().name().toLowerCase(),
            token,
            "Usuario registrado exitosamente", 
            true
        );
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public boolean deleteUser(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            userRepository.delete(userOpt.get());
            return true;
        }
        return false;
    }
    
    public Optional<User> updateUser(String email, User updatedUser) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Solo actualizar password si se proporciona uno nuevo (no vacío y no hasheado)
            if (updatedUser.getPassword() != null && 
                !updatedUser.getPassword().isEmpty() && 
                !updatedUser.getPassword().startsWith("$2a$") && 
                !updatedUser.getPassword().startsWith("$2b$") &&
                !updatedUser.getPassword().startsWith("$2y$")) {
                // Es un password nuevo en texto plano, hashearlo
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            // Si no se proporciona password o está hasheado, mantener el actual (no modificar)
            
            // Actualizar rol si se proporciona
            if (updatedUser.getRole() != null) {
                user.setRole(updatedUser.getRole());
            }
            
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }
}
