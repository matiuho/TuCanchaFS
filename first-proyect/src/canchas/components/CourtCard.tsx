// ===================================
// src/canchas/components/CourtCard.tsx
// ===================================
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CanchaProps } from '../../interfaces/cancha.interface';
import { useCart } from '../../contexts/CartContexts'; 

interface Props {
    cancha: CanchaProps; // Demuestra el uso de PROPIEDADES
}

export const CourtCard = memo(({ cancha }: Props) => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); 

    const handleViewDetails = () => {
        navigate('/detalle-cancha', { state: { cancha: cancha }});
    }

    return (
        // CLAVE: Aplica la clase CSS .gif-card para el diseño responsivo
        <div 
            className="gif-card" 
            onClick={handleViewDetails} 
            style={{ cursor: 'pointer' }}
        >
                                    <img src={cancha.imagenUrl || 'placeholder.jpg'} alt={cancha.nombre} />
                                    <h3 style={{ marginTop: 12 }}>{cancha.nombre}</h3>
                                    <p style={{ color: 'var(--muted)' }}>{cancha.tipo} • {cancha.capacidad} pers</p>
                                    <div style={{ marginTop: 8, fontWeight: 700, color: 'var(--green-700)' }}>${cancha.precioHora.toLocaleString('es-CL')} / hr</div>
            
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Evita el click del div
                    addToCart(cancha); // Llama a la función de GESTIÓN DE ESTADO
                }}
                className="btn"
                style={{ marginTop: '10px' }}
            >
                Agregar al Carrito
            </button>
        </div>
    );
});