package com.example.Auth_Service.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {
    
    @Bean
    public OpenAPI authServiceAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8081");
        server.setDescription("Auth Service - Development");
        
        Contact contact = new Contact();
        contact.setName("TuCancha Team");
        contact.setEmail("support@tucancha.com");
        
        Info info = new Info()
                .title("Auth Service API")
                .version("1.0.0")
                .contact(contact)
                .description("API para gestión de autenticación y usuarios. Maneja el registro, inicio de sesión y administración de usuarios del sistema TuCancha.");
        
        return new OpenAPI()
                .info(info)
                .servers(List.of(server));
    }
}
