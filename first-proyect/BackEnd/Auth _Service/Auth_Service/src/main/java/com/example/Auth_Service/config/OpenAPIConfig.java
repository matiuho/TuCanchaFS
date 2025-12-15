package com.example.Auth_Service.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI authServiceAPI() {
        Server server = new Server();
        server.setUrl("/");
        server.setDescription("Auth Service Server");

        Contact contact = new Contact();
        contact.setName("TuCancha Team");
        contact.setEmail("support@tucancha.com");

        Info info = new Info()
                .title("Auth Service API")
                .version("1.0.0")
                .contact(contact)
                .description("Maneja el registro y el inicio de sesión. Genera y valida tokens de acceso (JWT).");

        return new OpenAPI()
                .info(info)
                .servers(List.of(server))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .name("bearerAuth")
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
}