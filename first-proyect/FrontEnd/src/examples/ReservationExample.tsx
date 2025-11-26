import { useState } from 'react';
import type { FC } from 'react';
import { createReserva } from '../services/reservasService';
import { procesarPago } from '../services/pagosService';
import type { Reservation } from '../interfaces/reservation.interface';
import { useAuth } from '../contexts/AuthContext';

export const ReservationExample: FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleReservation = async () => {
    if (!user) {
      setError('Debes iniciar sesión para hacer una reserva');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // 1. Crear reserva
      const reservaData: Omit<Reservation, 'id'> = {
        nombre: user.email.split('@')[0],
        email: user.email,
        fecha: new Date().toISOString().split('T')[0],
        hora: '18:00',
        cancha: 'Cancha de Prueba',
        canchaId: 1,
        cantidadHoras: 2,
        precioTotal: 100.0,
        estado: 'PENDIENTE',
      };

      const reserva = await createReserva(reservaData);
      console.log('Reserva creada:', reserva);

      // 2. Procesar pago
      const pagoData = {
        nombre: user.email.split('@')[0],
        email: user.email,
        cardNumber: '1234123412341234', // Tarjeta de prueba
        monto: reservaData.precioTotal,
        reservaId: reserva.id || 1,
        estado: 'PENDIENTE',
      };

      const pago = await procesarPago(pagoData);
      console.log('Pago procesado:', pago);

      setSuccess(`Reserva #${reserva.id} creada y pago procesado exitosamente!`);
    } catch (err: any) {
      setError(err.message || 'Error al procesar la reserva');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ejemplo de Reserva y Pago</h2>
      
      {!user ? (
        <p>Por favor, inicia sesión para hacer una reserva.</p>
      ) : (
        <>
          <p>Usuario: {user.email}</p>
          <button onClick={handleReservation} disabled={loading}>
            {loading ? 'Procesando...' : 'Crear Reserva de Prueba'}
          </button>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};
