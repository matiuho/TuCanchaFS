// src/pages/CanchaDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { type FC, useMemo } from 'react';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { useCart } from '../contexts/CartContexts';
import { mockCanchas } from '../mock-data/canchas.mock';

export const CanchaDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Solución al problema: Buscamos la cancha por el ID de la URL
  const cancha = mockCanchas.find(c => c.id === Number(id));
  
  if (!cancha) {
    return (
      <div className="container" style={{ paddingTop: 24, textAlign: 'center' }}>
        <h2>Cancha no encontrada</h2>
        <p style={{ color: 'var(--muted)' }}>La cancha que buscas no existe o fue removida.</p>
        <button className="btn" onClick={() => navigate('/')}>Volver al Inicio</button>
      </div>
    );
  }

  // Lógica para agregar al carrito
  const handleAddToCart = () => {
    // Añade la cancha con 1 hora por defecto
    const itemParaCarrito = { ...cancha, quantity: 1 }; 
    addToCart(itemParaCarrito);
    alert(`Cancha "${cancha.nombre}" agregada al carrito por 1 hora.`);
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
  
          <div className="card-footer" style={{ marginTop: 24 }}>
            <div style={{ textAlign: 'right', flexGrow: 1 }}>
              <div>Precio por hora: <strong style={{ fontSize: '1.2rem' }}>${(cancha.enOferta && typeof cancha.precioOferta === 'number' ? cancha.precioOferta : cancha.precioHora).toLocaleString('es-CL')}</strong></div>
              <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Añadir por 1 hora</div>
            </div>
            <button className="btn" onClick={handleAddToCart}>Agregar al carrito</button>
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
