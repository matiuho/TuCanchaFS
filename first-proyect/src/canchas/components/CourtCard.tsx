// ===================================
// src/canchas/components/CourtCard.tsx
// ===================================
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CanchaProps } from '../../interfaces/cancha.interface';
import { useCart } from '../../contexts/CartContexts'; 

interface Props {
    cancha: CanchaProps;
}

export const CourtCard = memo(({ cancha }: Props) => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); 

    // Función de navegación siguiendo tu patrón de enviar el objeto en el state
    const handleViewDetails = () => {
        navigate('/detalle-cancha', { 
            state: { 
                cancha: cancha 
            }
        });
    }

    return (
        // CLAVE: Aplica la clase CSS .gif-card para el diseño responsivo
        <div 
            className="gif-card" 
            onClick={handleViewDetails} 
            style={{ cursor: 'pointer' }}
        >
            <img 
                src={cancha.imagenUrl || 'placeholder.jpg'} 
                alt={cancha.nombre} 
            />
            <h3>{cancha.nombre}</h3>
            <p>Tipo: {cancha.tipo}</p>
            <p>Precio/Hr: ${cancha.precioHora.toLocaleString('es-CL')}</p>
            
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Evita el click del div
                    addToCart(cancha); // Llama a la gestión de ESTADO GLOBAL
                }}
                style={{ marginTop: '10px', padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
            >
                Agregar al Carrito
            </button>
        </div>
    );
});