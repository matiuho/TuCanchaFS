import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { getAllCanchas, getCanchasByTipo, getCanchasConOfertas } from '../services/canchasService';
import type { CanchaProps } from '../interfaces/cancha.interface';
import { useAuth } from '../contexts/AuthContext';

export const CanchasExample: FC = () => {
  const [canchas, setCanchas] = useState<CanchaProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadCanchas();
  }, []);

  const loadCanchas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCanchas();
      setCanchas(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar canchas');
      console.error('Error loading canchas:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadByTipo = async (tipo: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCanchasByTipo(tipo);
      setCanchas(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar canchas por tipo');
      console.error('Error loading canchas by tipo:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadOfertas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCanchasConOfertas();
      setCanchas(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar ofertas');
      console.error('Error loading ofertas:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Canchas</h1>
      
      {user && (
        <div>
          <p>Usuario: {user.email} ({user.role})</p>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button onClick={loadCanchas}>Todas</button>
        <button onClick={() => loadByTipo('FUTBOL')}>Fútbol</button>
        <button onClick={() => loadByTipo('FUTSAL')}>Futsal</button>
        <button onClick={loadOfertas}>Ofertas</button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {canchas.map((cancha) => (
          <div key={cancha.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{cancha.nombre}</h3>
            <p>Tipo: {cancha.tipo}</p>
            <p>Precio: ${cancha.precioHora}/hora</p>
            {cancha.enOferta && cancha.precioOferta && (
              <p style={{ color: 'green' }}>
                ¡Oferta! ${cancha.precioOferta}/hora
              </p>
            )}
            <p>Capacidad: {cancha.capacidad} personas</p>
            <p>{cancha.descripcion}</p>
            {cancha.imagenUrl && (
              <img src={cancha.imagenUrl} alt={cancha.nombre} style={{ maxWidth: '200px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
