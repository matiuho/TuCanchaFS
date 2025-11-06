// src/pages/CategoryPage.tsx
import type { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readCourts } from '../utils/courtsStorage';
import { CourtCard } from '../canchas/components/CourtCard';

export const CategoryPage: FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const filteredCanchas = readCourts().filter(
    (cancha) => cancha.tipo.toLowerCase() === categoryName?.toLowerCase()
  );

  const capitalizedCategory = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : 'Desconocida';

  return (
    <div className="container" style={{ paddingTop: 24 }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ textAlign: 'center', margin: 0 }}>Canchas de {capitalizedCategory}</h1>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: 8 }}>
          Explora todas las canchas disponibles para jugar {capitalizedCategory}.
        </p>
      </header>

      <div className="gifs-container">
        {filteredCanchas.length > 0 ? (
          filteredCanchas.map((cancha) => (
            <CourtCard key={cancha.id} cancha={cancha} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <p>No se encontraron canchas en esta categoría.</p>
            <Link to="/" className="btn small">Volver al Inicio</Link>
          </div>
        )}
      </div>
    </div>
  );
};