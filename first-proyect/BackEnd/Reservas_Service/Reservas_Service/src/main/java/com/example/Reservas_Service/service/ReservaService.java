package com.example.Reservas_Service.service;

import com.example.Reservas_Service.model.Reserva;
import com.example.Reservas_Service.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {
    
    @Autowired
    private ReservaRepository reservaRepository;
    
    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }
    
    public Optional<Reserva> getReservaById(Long id) {
        return reservaRepository.findById(id);
    }
    
    public List<Reserva> getReservasByEmail(String email) {
        return reservaRepository.findByEmail(email);
    }
    
    public List<Reserva> getReservasByCanchaId(Long canchaId) {
        return reservaRepository.findByCanchaId(canchaId);
    }
    
    public List<Reserva> getReservasByFecha(LocalDate fecha) {
        return reservaRepository.findByFecha(fecha);
    }
    
    public List<Reserva> getReservasByEstado(String estado) {
        try {
            Reserva.Estado estadoEnum = Reserva.Estado.valueOf(estado.toUpperCase());
            return reservaRepository.findByEstado(estadoEnum);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
    
    public List<Reserva> getReservasByCanchaAndFecha(Long canchaId, LocalDate fecha) {
        return reservaRepository.findByCanchaIdAndFecha(canchaId, fecha);
    }
    
    public Reserva createReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }
    
    public Optional<Reserva> updateReserva(Long id, Reserva reservaDetails) {
        return reservaRepository.findById(id).map(reserva -> {
            reserva.setNombre(reservaDetails.getNombre());
            reserva.setEmail(reservaDetails.getEmail());
            reserva.setFecha(reservaDetails.getFecha());
            reserva.setHora(reservaDetails.getHora());
            reserva.setCancha(reservaDetails.getCancha());
            reserva.setCanchaId(reservaDetails.getCanchaId());
            reserva.setCantidadHoras(reservaDetails.getCantidadHoras());
            reserva.setPrecioTotal(reservaDetails.getPrecioTotal());
            reserva.setEstado(reservaDetails.getEstado());
            return reservaRepository.save(reserva);
        });
    }
    
    public Optional<Reserva> updateEstado(Long id, String nuevoEstado) {
        return reservaRepository.findById(id).map(reserva -> {
            try {
                Reserva.Estado estadoEnum = Reserva.Estado.valueOf(nuevoEstado.toUpperCase());
                reserva.setEstado(estadoEnum);
                return reservaRepository.save(reserva);
            } catch (IllegalArgumentException e) {
                return reserva;
            }
        });
    }
    
    public boolean deleteReserva(Long id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
