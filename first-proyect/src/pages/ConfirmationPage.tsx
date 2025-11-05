// src/pages/ConfirmationPage.tsx
import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const ConfirmationPage: FC = () => {
  return (
    <div className="container" style={{ paddingTop: 48, textAlign: 'center' }}>
      <div style={{ fontSize: '48px' }}>✅</div>
      <h2 style={{ marginTop: 16 }}>¡Reserva Confirmada!</h2>
      <p style={{ color: 'var(--muted)', maxWidth: 400, margin: '8px auto 0' }}>
        Tu pago ha sido procesado con éxito. Hemos enviado un correo de confirmación con los detalles de tu reserva.
      </p>
      <div style={{ marginTop: 24 }}>
        <Link to="/" className="btn">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};