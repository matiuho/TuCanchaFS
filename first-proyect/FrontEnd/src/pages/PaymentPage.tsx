// src/pages/PaymentPage.tsx
import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContexts';
import { createReserva } from '../services/reservasService';
import { procesarPago } from '../services/pagosService';
import { useToast } from '../sharedComponents/components/ToastProvider';
import '../styles/pages/PaymentPage.css';

const VALID_CARD = '1234123412341234';

export const PaymentPage: FC = () => {
  const { user } = useAuth();
  const { carrito, clearCart, subtotal } = useCart();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [cardNumber, setCardNumber] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setPaymentError(null);
    setLoading(true);

    // Validar que nombre y email no estén vacíos
    if (!name.trim() || !email.trim()) {
      setPaymentError('Por favor, ingresa tu nombre y correo electrónico.');
      setLoading(false);
      return;
    }

    // Validar número de tarjeta
    if (cardNumber.replace(/\s/g, '') !== VALID_CARD) {
      setPaymentError('Número de tarjeta inválido.');
      setLoading(false);
      return;
    }

    // Validar que haya items en el carrito
    if (carrito.length === 0) {
      setPaymentError('No hay reservas en el carrito.');
      setLoading(false);
      return;
    }

    try {
      console.log('Processing reservations and payment...');
      
      // Crear cada reserva en el backend
      const reservaIds: number[] = [];
      for (const item of carrito) {
        const reservaData = {
          nombre: name,
          email: email,
          fecha: new Date().toISOString().split('T')[0], // Fecha actual
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cancha: item.nombre,
          canchaId: item.id,
          cantidadHoras: item.quantity,
          precioTotal: item.enOferta && item.precioOferta 
            ? item.precioOferta * item.quantity 
            : item.precioHora * item.quantity,
          estado: 'PENDIENTE' as const
        };

        const reservaResult = await createReserva(reservaData);
        if (reservaResult && reservaResult.id) {
          reservaIds.push(reservaResult.id);
          console.log('Reserva creada:', reservaResult);
        }
      }

      // Procesar el pago
      const pagoData = {
        nombre: name,
        email: email,
        cardNumber: cardNumber.replace(/\s/g, ''),
        monto: subtotal,
        reservaId: reservaIds[0], // Primera reserva del carrito
        estado: 'COMPLETADO' as const
      };

      const pagoResult = await procesarPago(pagoData);
      console.log('Pago procesado:', pagoResult);

      showToast({
        type: 'success',
        title: 'Pago exitoso',
        message: 'Tu reserva ha sido confirmada.'
      });

      clearCart();
      navigate('/confirmation');
    } catch (error: any) {
      console.error('Error processing payment:', error);
      setPaymentError(error.message || 'Error al procesar el pago. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container payment-page">
      <h2>Detalles de Pago</h2>
      <p className="payment-subtitle">
        Ingresa los datos de tu tarjeta de crédito para completar la reserva.
      </p>

      <div className="payment-form">
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
          className={user ? "search-input payment-email-readonly" : "search-input"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!!user}
        />
        <input
          type="tel"
          placeholder="Número de tarjeta (ej: 4525 2324 8381 1234)"
          className="search-input"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        {paymentError && <p className="payment-error">{paymentError}</p>}
      </div>

      <div className="payment-actions">
        <button className="btn" onClick={handlePayment} disabled={loading}>
          {loading ? 'Procesando...' : 'Pagar y Confirmar'}
        </button>
        <Link to="/cart" className="btn secondary payment-back-link">
          Volver al Carrito
        </Link>
      </div>
    </div>
  );
};