package com.example.Reservas_Service.repository;

import com.example.Reservas_Service.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    List<Reserva> findByEmail(String email);
    
    List<Reserva> findByCanchaId(Long canchaId);
    
    List<Reserva> findByFecha(LocalDate fecha);
    
    List<Reserva> findByEstado(Reserva.Estado estado);
    
    List<Reserva> findByCanchaIdAndFecha(Long canchaId, LocalDate fecha);
}
