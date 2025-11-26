package com.example.Pago_Service.repository;

import com.example.Pago_Service.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    
    List<Pago> findByEmail(String email);
    
    List<Pago> findByEstado(Pago.Estado estado);
    
    List<Pago> findByReservaId(Long reservaId);
}
