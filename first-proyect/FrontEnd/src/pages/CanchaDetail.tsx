// src/pages/CanchaDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { type FC, useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContexts';
import { getCanchaById } from '../services/canchasService';
import { useToast } from '../sharedComponents/components/ToastProvider';
import type { CanchaProps } from '../interfaces/cancha.interface';
import '../styles/pages/CanchaDetail.css';

const randomLocations = [
  'Santiago Centro',
  'Puente Alto',
  'La Reina',
  'Ñuñoa',
  'Vitacura',
  'Peñalolén',
  'Macul'
];

export const CanchaDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [cancha, setCancha] = useState<CanchaProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCancha();
  }, [id]);

  const loadCancha = async () => {
    try {
      setIsLoading(true);
      const data = await getCanchaById(Number(id));
      setCancha(data);
    } catch (error) {
      console.error('Error al cargar cancha:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generar una ubicación - usar la del backend si existe, sino una aleatoria
  const displayLocation = cancha?.ubicacion || randomLocations[Math.floor(Math.random() * randomLocations.length)];

  // Lógica para agregar al carrito
  const handleAddToCart = () => {
    if (!cancha) return;
    addToCart(cancha, 1);
    showToast({ type: 'success', title: 'Agregada al carrito', message: `"${cancha.nombre}" por 1 hora. Puedes seguir agregando más canchas.` });
  };

  // --- Renderizado del componente ---
  return (
    <div className="container cancha-detail-page">
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Cargando...</div>
      ) : !cancha ? (
        <div className="cancha-not-found">
          <h2>Cancha no encontrada</h2>
          <p className="cancha-not-found-text">La cancha que buscas no existe o fue removida.</p>
          <button className="btn" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
      ) : (
        <>
          {/* Media principal 16:9 */}
          <div className="detail-hero">
            <img src={cancha.imagenUrl} alt={cancha.nombre} />
          </div>

          {/* Información ordenada */}
          <div className="detail-info-card">
            <h2 className="cancha-detail-title">{cancha.nombre}</h2>
            <div className="detail-meta">
              <span><strong>Tipo:</strong> {cancha.tipo}</span>
              <span className="dot" />
              <span><strong>Capacidad:</strong> {cancha.capacidad} personas</span>
              <span className="dot" />
              <span><strong>Ubicación:</strong> {displayLocation}</span>
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

            <div className="card-footer cancha-detail-footer">
              <button className="btn" onClick={handleAddToCart}>Agregar al carrito</button>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default CanchaDetail;
