// src/pages/PaymentPage.tsx
import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const VALID_CARD = '1234123412341234';

export const PaymentPage: FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePayment = () => {
    // Comparamos el número de tarjeta sin espacios
    if (cardNumber.replace(/\s/g, '') === VALID_CARD) {
      navigate('/confirmation');
    } else {
      setPaymentError('Número de tarjeta inválido. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container" style={{ paddingTop: 48, textAlign: 'center' }}>
      <h2>Detalles de Pago</h2>
      <p style={{ color: 'var(--muted)', maxWidth: 400, margin: '8px auto 0' }}>
        Ingresa los datos de tu tarjeta de crédito para completar la reserva.
      </p>

      <div style={{ marginTop: 24 }}>
        <input
          type="tel"
          placeholder="Número de tarjeta (ej: 4525 2324 8381 1234)"
          className="search-input"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
      </div>

      <div style={{ marginTop: 24 }}>
        <button className="btn" onClick={handlePayment}>
          Pagar y Confirmar
        </button>
        <Link to="/cart" className="btn secondary" style={{ marginLeft: 12 }}>
          Volver al Carrito
        </Link>
      </div>
    </div>
  );
};