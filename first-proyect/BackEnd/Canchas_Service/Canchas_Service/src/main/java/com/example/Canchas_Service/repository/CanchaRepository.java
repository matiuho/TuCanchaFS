package com.example.Canchas_Service.repository;

import com.example.Canchas_Service.model.Cancha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CanchaRepository extends JpaRepository<Cancha, Long> {
    
    List<Cancha> findByTipo(Cancha.Tipo tipo);
    
    List<Cancha> findByEnOferta(Boolean enOferta);
    
    List<Cancha> findByNombreContainingIgnoreCase(String nombre);
}
