// src/pages/CanchaDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, type FC, useMemo } from 'react';
import { useCart } from '../contexts/CartContexts';
import { readCourts } from '../utils/courtsStorage';
import { useToast } from '../sharedComponents/components/ToastProvider';

export const CanchaDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Buscar la cancha por ID (memoizada)
  const cancha = useMemo(() => readCourts().find(c => c.id === Number(id)), [id]);

  // Galería de imágenes: primera es imagenUrl seguida de fotos[] (evitar duplicados)
  const images = useMemo(() => {
    if (!cancha) return [] as string[];
    const rest = (cancha.fotos || []).filter(f => f && f !== cancha.imagenUrl);
    return [cancha.imagenUrl, ...rest];
  }, [cancha]);

  const [current, setCurrent] = useState(0);

  // Lógica para agregar al carrito
  const handleAddToCart = () => {
    if (!cancha) return;
    addToCart(cancha, 1);
    showToast({ type: 'success', title: 'Agregada al carrito', message: `"${cancha.nombre}" por 1 hora. Puedes seguir agregando más canchas.` });
  };

  // --- Renderizado del componente ---
  return (
    <div className="container" style={{ paddingTop: 24 }}>
      {!cancha ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Cancha no encontrada</h2>
          <p style={{ color: 'var(--muted)' }}>La cancha que buscas no existe o fue removida.</p>
          <button className="btn" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
      ) : (
        <>
          {/* Media principal 16:9 */}
          <div className="detail-hero">
            <img src={images[current] || cancha.imagenUrl} alt={cancha.nombre} />
          </div>

          {/* Miniaturas uniformes */}
          {images.length > 1 && (
            <div className="thumbs-grid">
              {images.map((src, idx) => (
                <button
                  key={src + idx}
                  onClick={() => setCurrent(idx)}
                  className={`thumb-btn ${current === idx ? 'active' : ''}`}
                  aria-label={`Ver imagen ${idx + 1}`}
                >
                  <img src={src} alt={`thumb-${idx}`} />
                </button>
              ))}
            </div>
          )}

          {/* Información ordenada */}
          <div className="detail-info-card">
            <h2 style={{ margin: 0 }}>{cancha.nombre}</h2>
            <div className="detail-meta">
              <span><strong>Tipo:</strong> {cancha.tipo}</span>
              <span className="dot" />
              <span><strong>Capacidad:</strong> {cancha.capacidad} personas</span>
            </div>
            <div className="detail-price">
              <span>Precio por hora</span>
              <strong>${(cancha.enOferta && typeof cancha.precioOferta === 'number' ? cancha.precioOferta : cancha.precioHora).toLocaleString('es-CL')}</strong>
            </div>
            <p className="detail-desc">{cancha.descripcion}</p>

            <div className="detail-services">
              <h4>Servicios</h4>
              <ul>
                <li>⚽ Fútbol</li>
                <li>💡 Luces LED</li>
                <li>👕 Vestidores</li>
              </ul>
            </div>

            <div className="card-footer" style={{ marginTop: 16 }}>
              <button className="btn" onClick={handleAddToCart}>Agregar al carrito</button>
            </div>
          </div>

          {/* Ubicación debajo de la cancha */}
          <div className="location-card">
            <h4>Ubicación</h4>
            <div className="map-placeholder">Mapa (placeholder)</div>
            <p className="location-text">Av. Siempre Viva 742, Springfield.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CanchaDetail;
