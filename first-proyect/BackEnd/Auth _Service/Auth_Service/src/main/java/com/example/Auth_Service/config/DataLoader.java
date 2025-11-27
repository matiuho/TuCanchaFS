package com.example.Auth_Service.config;

import com.example.Auth_Service.model.User;
import com.example.Auth_Service.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {
    
    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);
    
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Solo cargar datos si no hay usuarios
            if (userRepository.count() == 0) {
                logger.info("Cargando usuarios iniciales...");
                
                // Usuario demo (USER)
                User demoUser = new User();
                demoUser.setEmail("demo@tucancha.test");
                demoUser.setPassword(passwordEncoder.encode("demo1234"));
                demoUser.setRole(User.Role.USER);
                userRepository.save(demoUser);
                logger.info("Usuario demo creado: demo@tucancha.test");
                
                // Usuario admin
                User adminUser = new User();
                adminUser.setEmail("admin@tucancha.test");
                adminUser.setPassword(passwordEncoder.encode("admin1234"));
                adminUser.setRole(User.Role.ADMIN);
                userRepository.save(adminUser);
                logger.info("Usuario admin creado: admin@tucancha.test");
                
                logger.info("Carga inicial de usuarios completada: {} usuarios creados", userRepository.count());
            } else {
                logger.info("Base de datos ya contiene {} usuarios. Omitiendo carga inicial.", userRepository.count());
            }
        };
    }
}
