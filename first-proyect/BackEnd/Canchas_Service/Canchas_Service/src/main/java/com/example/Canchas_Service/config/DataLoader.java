package com.example.Canchas_Service.config;

import com.example.Canchas_Service.model.Cancha;
import com.example.Canchas_Service.repository.CanchaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {
    
    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);
    
    @Bean
    CommandLineRunner initDatabase(CanchaRepository canchaRepository) {
        return args -> {
            // Solo cargar datos si no hay canchas
            if (canchaRepository.count() == 0) {
                logger.info("Cargando canchas iniciales...");
                
                // Cancha 1: Cancha Central
                Cancha cancha1 = new Cancha();
                cancha1.setNombre("Cancha Central");
                cancha1.setTipo(Cancha.Tipo.FUTBOL);
                cancha1.setPrecioHora(25000.0);
                cancha1.setCapacidad(22);
                cancha1.setImagenUrl("https://cncs.cl/wp-content/uploads/2024/05/FUTB.jpg");
                cancha1.setDescripcion("Cancha principal de césped sintético para 11 jugadores.");
                cancha1.setUbicacion("Las Condes, Santiago");
                cancha1.setEnOferta(false);
                canchaRepository.save(cancha1);
                
                // Cancha 2: Cancha Lateral A
                Cancha cancha2 = new Cancha();
                cancha2.setNombre("Cancha Lateral A");
                cancha2.setTipo(Cancha.Tipo.FUTBOL);
                cancha2.setPrecioHora(18000.0);
                cancha2.setCapacidad(14);
                cancha2.setImagenUrl("https://pastojansen.cl/wp-content/uploads/2018/08/PORTAFOLIO1.png");
                cancha2.setDescripcion("Cancha de arcilla con iluminación para 7 jugadores.");
                cancha2.setUbicacion("Providencia, Santiago");
                cancha2.setEnOferta(false);
                canchaRepository.save(cancha2);
                
                // Cancha 3: Cancha 5 (Futsal)
                Cancha cancha3 = new Cancha();
                cancha3.setNombre("Cancha 5 (Futsal)");
                cancha3.setTipo(Cancha.Tipo.FUTSAL);
                cancha3.setPrecioHora(20000.0);
                cancha3.setCapacidad(5);
                cancha3.setImagenUrl("https://www.futbolitolavara.cl/img/fotos/1.jpg");
                cancha3.setDescripcion("Cancha de futsal techada.");
                cancha3.setUbicacion("Maipú, Santiago");
                cancha3.setEnOferta(false);
                canchaRepository.save(cancha3);
                
                // Cancha 4: Cancha Río Verde
                Cancha cancha4 = new Cancha();
                cancha4.setNombre("Cancha Río Verde");
                cancha4.setTipo(Cancha.Tipo.FUTBOL);
                cancha4.setPrecioHora(15000.0);
                cancha4.setCapacidad(22);
                cancha4.setImagenUrl("https://static.wixstatic.com/media/d9e4d2_cd6206236a4e4d4c87606243c40de99c~mv2_d_3936_2624_s_4_2.jpg/v1/fill/w_250,h_166,al_c,q_90,enc_auto/d9e4d2_cd6206236a4e4d4c87606243c40de99c~mv2_d_3936_2624_s_4_2.jpg");
                cancha4.setDescripcion("Cancha al aire libre con buen drenaje para 11 jugadores.");
                cancha4.setUbicacion("Viña del Mar, Valparaíso");
                cancha4.setEnOferta(false);
                canchaRepository.save(cancha4);
                
                // Cancha 5: Cancha Parque Norte
                Cancha cancha5 = new Cancha();
                cancha5.setNombre("Cancha Parque Norte");
                cancha5.setTipo(Cancha.Tipo.FUTBOL);
                cancha5.setPrecioHora(22000.0);
                cancha5.setCapacidad(14);
                cancha5.setImagenUrl("http://www.costanerasport.cl/images/reservas/05.jpg");
                cancha5.setDescripcion("Ideal para partidos nocturnos de 7 jugadores.");
                cancha5.setUbicacion("La Florida, Santiago");
                cancha5.setEnOferta(false);
                canchaRepository.save(cancha5);
                
                // Cancha 6: Cancha Techada Sur
                Cancha cancha6 = new Cancha();
                cancha6.setNombre("Cancha Techada Sur");
                cancha6.setTipo(Cancha.Tipo.FUTSAL);
                cancha6.setPrecioHora(27000.0);
                cancha6.setCapacidad(10);
                cancha6.setImagenUrl("https://techone.cl/loshalcones/images/cancha-futbolito.jpg");
                cancha6.setDescripcion("Techada y con calefacción.");
                cancha6.setUbicacion("Concepción, Biobío");
                cancha6.setEnOferta(false);
                canchaRepository.save(cancha6);
                
                logger.info("Carga inicial de canchas completada: {} canchas creadas", canchaRepository.count());
            } else {
                logger.info("Base de datos ya contiene {} canchas. Omitiendo carga inicial.", canchaRepository.count());
            }
        };
    }
}
