// src/pages/CanchaDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { type FC, useState, useMemo } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { useCart } from '../contexts/CartContexts';
import { mockCanchas } from '../mock-data/canchas.mock';

export const CanchaDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Solución al problema: Buscamos la cancha por el ID de la URL
  const cancha = mockCanchas.find(c => c.id === Number(id));
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  
  if (!cancha) {
    return (
      <div className="container" style={{ paddingTop: 24, textAlign: 'center' }}>
        <h2>Cancha no encontrada</h2>
        <p style={{ color: 'var(--muted)' }}>La cancha que buscas no existe o fue removida.</p>
        <button className="btn" onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    );
  }

  // --- Lógica del componente ---

  // Lógica para calcular el precio final basado en las horas seleccionadas
  const precioFinal = useMemo(() => {
    const precioBase = cancha.enOferta && typeof cancha.precioOferta === 'number' ? cancha.precioOferta : cancha.precioHora;
    return precioBase * selectedTimes.length;
  }, [cancha, selectedTimes]);

  // Lógica para seleccionar/deseleccionar horarios
  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t: string) => t !== time) : [...prev, t]
    );
  };

  // Lógica para agregar al carrito
  const handleAddToCart = () => {
    if (selectedTimes.length === 0) {
      alert('Por favor, selecciona al menos un horario.');
      return;
    }
    
    const itemParaCarrito = { ...cancha, quantity: selectedTimes.length };
    addToCart(itemParaCarrito);
    alert(`Cancha "${cancha.nombre}" (${itemParaCarrito.quantity} hr/s) agregada al carrito.`);
    navigate('/cart');
  };

  // --- Renderizado del componente ---

  return (
    <div className="detail-page">
      <img className="detail-image" src={cancha.imagenUrl} alt={cancha.nombre} />
      <div className="detail-info">
        <header>
          <h2>{cancha.nombre}</h2>
          <p className="price">
            {cancha.enOferta && typeof cancha.precioOferta === 'number' ? (
              <>
                <span style={{ textDecoration: 'line-through', color: 'var(--muted)', fontSize: '1rem', marginRight: '8px' }}>
                  ${cancha.precioHora.toLocaleString('es-CL')}
                </span>
                <span>${cancha.precioOferta.toLocaleString('es-CL')} / hr</span>
              </>
            ) : (
              <span>${cancha.precioHora.toLocaleString('es-CL')} / hr</span>
            )}
          </p>
          <p><strong>Tipo:</strong> {cancha.tipo} | <strong>Capacidad:</strong> {cancha.capacidad} personas</p>
          <p style={{ color: 'var(--muted)', marginTop: '8px' }}>{cancha.descripcion}</p>
        </header>

        <section style={{ marginTop: 18 }}>
          <h4>Servicios</h4>
          <ul style={{ display: 'flex', gap: 12, flexWrap: 'wrap', padding: 0, listStyle: 'none' }}>
            <li className="service-tag">⚽ Fútbol</li>
            <li className="service-tag">💡 Luces LED</li>
            <li className="service-tag">👕 Vestidores</li>
          </ul>
          
          <div style={{ marginTop: 14 }}>
            <h4>1. Selecciona una fecha</h4>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="search-input" />
          </div>
          
          <div style={{ marginTop: 14 }}>
            <h4>2. Selecciona los horarios</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '18:00', '19:00'].map(t => (
                <button key={t} className={`btn small ${selectedTimes.includes(t) ? '' : 'secondary'}`} onClick={() => toggleTime(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
  
          <div className="card-footer" style={{ marginTop: 24 }}>
            <div style={{ textAlign: 'right', flexGrow: 1 }}>
              <div>Total: <strong style={{ fontSize: '1.2rem' }}>${precioFinal.toLocaleString('es-CL')}</strong></div>
              <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{selectedTimes.length} hora(s) seleccionada(s)</div>
            </div>
            <button className="btn" onClick={handleAddToCart} disabled={selectedTimes.length === 0}>Agregar al carrito</button>
          </div>
        </section>
      </div>
      <aside style={{ width: 320 }}>
        <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: 'linear-gradient(180deg,#fff,#fbfff9)', border: '1px solid rgba(0,0,0,0.04)' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Ubicación</h4>
          <div style={{ height: 140, background: '#e9f7f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>Mapa (placeholder)</div>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '8px' }}>Av. Siempre Viva 742, Springfield.</p>
        </div>
      </aside>
    </div>
  );
};

export default CanchaDetail;
