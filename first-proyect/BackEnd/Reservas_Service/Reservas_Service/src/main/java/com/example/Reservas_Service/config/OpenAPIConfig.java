package com.example.Reservas_Service.config;

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
    public OpenAPI reservasServiceAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8083");
        server.setDescription("Reservas Service - Development");
        
        Contact contact = new Contact();
        contact.setName("TuCancha Team");
        contact.setEmail("support@tucancha.com");
        
        Info info = new Info()
                .title("Reservas Service API")
                .version("1.0.0")
                .contact(contact)
                .description("API para gestión de reservas. Permite crear, modificar y cancelar reservas, verificar disponibilidad de canchas y consultar el estado de las reservas.");
        
        return new OpenAPI()
                .info(info)
                .servers(List.of(server));
    }
}
