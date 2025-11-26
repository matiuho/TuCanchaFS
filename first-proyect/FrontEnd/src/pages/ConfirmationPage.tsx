// src/pages/ConfirmationPage.tsx
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/ConfirmationPage.css';

export const ConfirmationPage: FC = () => {
  return (
    <div className="container confirmation-page">
      <div className="confirmation-icon">✅</div>
      <h2 className="confirmation-title">¡Reserva Confirmada!</h2>
      <p className="confirmation-message">
        Tu pago ha sido procesado con éxito. Hemos enviado un correo de confirmación con los detalles de tu reserva.
      </p>
      <div className="confirmation-actions">
        <Link to="/" className="btn">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};