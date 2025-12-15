package com.example.Auth_Service.controller;

import com.example.Auth_Service.dto.AuthResponse;
import com.example.Auth_Service.dto.LoginRequest;
import com.example.Auth_Service.dto.RegisterRequest;
import com.example.Auth_Service.model.User;
import com.example.Auth_Service.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Auth", description = "Endpoints para autenticación y gestión de usuarios")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Valida las credenciales del usuario y devuelve un JWT en caso exitoso.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login exitoso", content = @Content(schema = @Schema(implementation = AuthResponse.class))),
            @ApiResponse(responseCode = "401", description = "Credenciales inválidas", content = @Content(schema = @Schema(implementation = AuthResponse.class)))
    })
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    
    @PostMapping("/register")
    @Operation(summary = "Registrar usuario", description = "Crea un nuevo usuario con rol USER o ADMIN según el cuerpo de la petición.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuario creado correctamente", content = @Content(schema = @Schema(implementation = AuthResponse.class))),
            @ApiResponse(responseCode = "400", description = "Datos inválidos o usuario ya existente", content = @Content(schema = @Schema(implementation = AuthResponse.class)))
    })
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        
        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @PostMapping("/logout")
    @Operation(summary = "Cerrar sesión", description = "Finaliza la sesión actual (en este servicio solo devuelve una respuesta de confirmación).")
    @ApiResponse(responseCode = "200", description = "Logout exitoso", content = @Content(schema = @Schema(implementation = AuthResponse.class)))
    public ResponseEntity<AuthResponse> logout() {
        AuthResponse response = new AuthResponse(null, null, null, "Logout exitoso", true);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/users")
    @Operation(summary = "Listar usuarios", description = "Obtiene todos los usuarios registrados en el sistema.")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida correctamente")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @GetMapping("/users/{email}")
    @Operation(summary = "Obtener usuario por email", description = "Busca un usuario específico por su email.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/users/{email}")
    @Operation(summary = "Eliminar usuario", description = "Elimina un usuario a partir de su email.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Usuario eliminado correctamente"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        boolean deleted = userService.deleteUser(email);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/users/{email}")
    @Operation(summary = "Actualizar usuario", description = "Actualiza los datos de un usuario existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario actualizado correctamente"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User updatedUser) {
        Optional<User> user = userService.updateUser(email, updatedUser);
        return user.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
}
