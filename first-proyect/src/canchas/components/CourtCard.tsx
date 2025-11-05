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
        <div className="gif-card" onClick={handleViewDetails} style={{ cursor: 'pointer' }}>
            <div className="card-media">
                <img src={cancha.imagenUrl || 'placeholder.jpg'} alt={cancha.nombre} />
                <div className="card-badge">{cancha.tipo}</div>
            </div>
            <div className="card-body">
                <h3 className="card-title">{cancha.nombre}</h3>
                <p className="card-meta">Capacidad: {cancha.capacidad} pers</p>
                <div className="card-footer" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="card-price">${cancha.precioHora.toLocaleString('es-CL')} / hr</div>
                    <div>
                        <button
                            onClick={(e) => { e.stopPropagation(); addToCart(cancha); }}
                            className="btn"
                        >Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    );
});