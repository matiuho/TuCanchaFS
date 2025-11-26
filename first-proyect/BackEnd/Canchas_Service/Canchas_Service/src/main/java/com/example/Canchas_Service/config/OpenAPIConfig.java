package com.example.Canchas_Service.config;

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
    public OpenAPI canchasServiceAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8082");
        server.setDescription("Canchas Service - Development");
        
        Contact contact = new Contact();
        contact.setName("TuCancha Team");
        contact.setEmail("support@tucancha.com");
        
        Info info = new Info()
                .title("Canchas Service API")
                .version("1.0.0")
                .contact(contact)
                .description("API para gestión de canchas deportivas. Permite realizar operaciones CRUD sobre canchas de fútbol y futsal, gestionar ofertas y buscar por diferentes criterios.");
        
        return new OpenAPI()
                .info(info)
                .servers(List.of(server));
    }
}
