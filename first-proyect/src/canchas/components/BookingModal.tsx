// src/canchas/components/BookingModal.tsx
import { type FC, useState, useMemo, useEffect } from 'react';
import type { CanchaProps } from '../../interfaces/cancha.interface';
import { useCart } from '../../contexts/CartContexts';

interface Props {
  cancha: CanchaProps;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: FC<Props> = ({ cancha, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // Reiniciar estado cuando se abre el modal para una nueva cancha
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(new Date().toISOString().split('T')[0]);
      setSelectedTimes([]);
    }
  }, [isOpen]);

  const precioFinal = useMemo(() => {
    const precioBase = cancha.enOferta && typeof cancha.precioOferta === 'number' ? cancha.precioOferta : cancha.precioHora;
    return precioBase * selectedTimes.length;
  }, [cancha, selectedTimes]);

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, t]
    );
  };

  const handleAddToCart = () => {
    if (selectedTimes.length === 0) {
      alert('Por favor, selecciona al menos un horario.');
      return;
    }
    const itemParaCarrito = { ...cancha, quantity: selectedTimes.length };
    addToCart(itemParaCarrito);
    alert(`Reserva para "${cancha.nombre}" (${itemParaCarrito.quantity} hr/s) agregada al carrito.`);
    onClose(); // Cierra el modal después de agregar
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h3>Reserva para {cancha.nombre}</h3>
        <p style={{ color: 'var(--muted)', marginTop: '-8px' }}>
          Precio: ${(cancha.enOferta && cancha.precioOferta ? cancha.precioOferta : cancha.precioHora).toLocaleString('es-CL')} / hr
        </p>

        <div style={{ marginTop: 14 }}>
          <h4>1. Selecciona una fecha</h4>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="search-input" />
        </div>

        <div style={{ marginTop: 14 }}>
          <h4>2. Selecciona los horarios</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '18:00', '19:00'].map(t => (
              <button
                key={t}
                className={`btn small ${selectedTimes.includes(t) ? '' : 'secondary'}`}
                onClick={() => toggleTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="card-footer" style={{ marginTop: 24, justifyContent: 'flex-end' }}>
          <div style={{ textAlign: 'right', flexGrow: 1, marginRight: '16px' }}>
            <div>Total: <strong style={{ fontSize: '1.2rem' }}>${precioFinal.toLocaleString('es-CL')}</strong></div>
            <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{selectedTimes.length} hora(s) seleccionada(s)</div>
          </div>
          <button className="btn" onClick={handleAddToCart} disabled={selectedTimes.length === 0}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};