// src/pages/PaymentPage.tsx
import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VALID_CARD = '1234123412341234';
const RESERVAS_KEY = 'reservas';

// Función para guardar la reserva en localStorage
const saveReservation = (nombre: string, email: string) => {
  try {
    console.log('Attempting to save reservation...');
    const raw = localStorage.getItem(RESERVAS_KEY);
    const existingReservations = raw ? JSON.parse(raw) : [];

    // TODO: Reemplazar con datos reales de la reserva desde el carrito/estado
    const newReservation = {
      id: Date.now(),
      nombre: nombre, // Usamos el nombre del formulario
      fecha: new Date().toISOString().split('T')[0], // Fecha actual como ejemplo
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Hora actual
      cancha: 'Cancha Ejemplo', // Nombre de la cancha como ejemplo
    };

    console.log('New reservation to save:', newReservation);
    const nextReservations = [newReservation, ...existingReservations];
    localStorage.setItem(RESERVAS_KEY, JSON.stringify(nextReservations));
    console.log('Reservation saved successfully to localStorage.');
  } catch (error) {
    console.error('Error al guardar la reserva:', error);
  }
};

export const PaymentPage: FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [cardNumber, setCardNumber] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePayment = () => {
    setPaymentError(null);

    // Validar que nombre y email no estén vacíos
    if (!name.trim() || !email.trim()) {
      setPaymentError('Por favor, ingresa tu nombre y correo electrónico.');
      return;
    }

    // Comparamos el número de tarjeta sin espacios
    if (cardNumber.replace(/\s/g, '') === VALID_CARD) {
      console.log('Payment successful. Calling saveReservation...');
      saveReservation(name, email);
      navigate('/confirmation');
    } else {
      console.log('Payment failed: Invalid card number.');
      setPaymentError((prev) =>
        prev ? `${prev} Y el número de tarjeta es inválido.` : 'Número de tarjeta inválido.'
      );
    }
  };

  return (
    <div className="container" style={{ paddingTop: 48, textAlign: 'center' }}>
      <h2>Detalles de Pago</h2>
      <p style={{ color: 'var(--muted)', maxWidth: 400, margin: '8px auto 0' }}>
        Ingresa los datos de tu tarjeta de crédito para completar la reserva.
      </p>

      <div style={{ marginTop: 24, maxWidth: 400, margin: '24px auto 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Nombre completo"
          className="search-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="search-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!!user} // El campo es de solo lectura si el usuario está logueado
          style={user ? { backgroundColor: '#f0f0f0', cursor: 'not-allowed' } : {}}
        />
        <input
          type="tel"
          placeholder="Número de tarjeta (ej: 4525 2324 8381 1234)"
          className="search-input"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        {paymentError && <p style={{ color: 'red', marginTop: '8px' }}>{paymentError}</p>}
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