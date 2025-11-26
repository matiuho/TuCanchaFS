package com.example.Canchas_Service.service;

import com.example.Canchas_Service.model.Cancha;
import com.example.Canchas_Service.repository.CanchaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CanchaService {
    
    @Autowired
    private CanchaRepository canchaRepository;
    
    public List<Cancha> getAllCanchas() {
        return canchaRepository.findAll();
    }
    
    public Optional<Cancha> getCanchaById(Long id) {
        return canchaRepository.findById(id);
    }
    
    public List<Cancha> getCanchasByTipo(String tipo) {
        try {
            Cancha.Tipo tipoEnum = Cancha.Tipo.valueOf(tipo.toUpperCase());
            return canchaRepository.findByTipo(tipoEnum);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }
    
    public List<Cancha> getCanchasEnOferta() {
        return canchaRepository.findByEnOferta(true);
    }
    
    public List<Cancha> searchCanchasByNombre(String nombre) {
        return canchaRepository.findByNombreContainingIgnoreCase(nombre);
    }
    
    public Cancha createCancha(Cancha cancha) {
        return canchaRepository.save(cancha);
    }
    
    public Optional<Cancha> updateCancha(Long id, Cancha canchaDetails) {
        return canchaRepository.findById(id).map(cancha -> {
            cancha.setNombre(canchaDetails.getNombre());
            cancha.setTipo(canchaDetails.getTipo());
            cancha.setPrecioHora(canchaDetails.getPrecioHora());
            cancha.setEnOferta(canchaDetails.getEnOferta());
            cancha.setPrecioOferta(canchaDetails.getPrecioOferta());
            cancha.setCapacidad(canchaDetails.getCapacidad());
            cancha.setImagenUrl(canchaDetails.getImagenUrl());
            cancha.setDescripcion(canchaDetails.getDescripcion());
            cancha.setUbicacion(canchaDetails.getUbicacion());
            return canchaRepository.save(cancha);
        });
    }
    
    public boolean deleteCancha(Long id) {
        if (canchaRepository.existsById(id)) {
            canchaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
