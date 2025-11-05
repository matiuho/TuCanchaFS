// src/pages/CanchaDetail.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { useCart } from '../contexts/CartContexts';
import { CartSummary } from '../sharedComponents/components/CartSummary';

export const CanchaDetail: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cancha = (location.state as { cancha?: CanchaProps } )?.cancha;
  const { addToCart } = useCart();
  if (!cancha) {
    return (
      <div style={{ padding: 20 }}>
        <p>No hay información de la cancha. Vuelve al inicio.</p>
        <button className="btn" onClick={() => navigate('/')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <img className="detail-image" src={cancha.imagenUrl} alt={cancha.nombre} />
      <div className="detail-info">
        <h2>{cancha.nombre}</h2>
        <p className="price">${cancha.precioHora.toLocaleString('es-CL')} / hr</p>
        <p><strong>Tipo:</strong> {cancha.tipo}</p>
        <p><strong>Capacidad:</strong> {cancha.capacidad} personas</p>
        <p style={{ color: 'var(--muted)' }}>{cancha.descripcion}</p>

        <section style={{ marginTop: 18 }}>
          <h4>Servicios</h4>
          <ul style={{ display: 'flex', gap: 12, flexWrap: 'wrap', padding: 0, listStyle: 'none' }}>
            <li style={{ background: 'rgba(0,139,139,0.06)', padding: '6px 8px', borderRadius: 8 }}>Luces</li>
            <li style={{ background: 'rgba(0,139,139,0.06)', padding: '6px 8px', borderRadius: 8 }}>Arriendo de equipamiento</li>
            <li style={{ background: 'rgba(0,139,139,0.06)', padding: '6px 8px', borderRadius: 8 }}>Vestidores</li>
          </ul>

          <div style={{ marginTop: 14 }}>
            <h4>Horarios disponibles</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['09:00','10:00','11:00','12:00','13:00','14:00','18:00','19:00'].map(t => (
                <button key={t} className="btn small" style={{ background: 'white', color: 'var(--muted)', border: '1px solid rgba(0,0,0,0.06)' }}>{t}</button>
              ))}
            </div>
          </div>

          <div className="card-footer" style={{ marginTop: 18 }}>
            <button className="btn" onClick={() => addToCart(cancha)}>Agregar al carrito</button>
            <button className="btn secondary" onClick={() => navigate(-1)}>Volver</button>
          </div>

          <div style={{ marginTop: 18 }}>
            <h4>Reseñas</h4>
            <div style={{ color: 'var(--muted)' }}>Aún no hay reseñas. Sé el primero en dejar una.</div>
          </div>
        </section>
      </div>
      <aside style={{ width: 320 }}>
        <CartSummary />
        <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: 'linear-gradient(180deg,#fff,#fbfff9)', border: '1px solid rgba(0,0,0,0.04)' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Ubicación</h4>
          <div style={{ height: 140, background: '#e9f7f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>Mapa (placeholder)</div>
        </div>
      </aside>
    </div>
  );
};

export default CanchaDetail;
