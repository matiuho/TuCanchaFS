// src/canchas/components/BookingModal.tsx
import { type FC } from 'react';
import type { CanchaProps } from '../../interfaces/cancha.interface';
import { useCart } from '../../contexts/CartContexts';
import { useToast } from '../../sharedComponents/components/ToastProvider';

interface Props {
  cancha: CanchaProps;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: FC<Props> = ({ cancha, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(cancha, 1); // Añade la cancha con 1 hora por defecto
    showToast({ type: 'success', title: 'Agregada al carrito', message: `"${cancha.nombre}" por 1 hora.` });
    onClose(); // Cierra el modal después de agregar
  };

  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h3>Añadir {cancha.nombre} al carrito</h3>
        <p style={{ color: 'var(--muted)', marginTop: '-8px' }}>
          ¿Deseas añadir esta cancha al carrito por 1 hora?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button className="btn secondary" onClick={onClose}>Cancelar</button>
          <button className="btn" onClick={handleAddToCart}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};