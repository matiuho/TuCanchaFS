import { API_CONFIG, getToken } from './api.config';

export interface Pago {
  id?: number;
  nombre: string;
  email: string;
  cardNumber: string;
  monto: number;
  reservaId: number;
  estado: string;
}

/**
 * Process payment
 */
export const procesarPago = async (pago: Omit<Pago, 'id'>): Promise<Pago> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.PAGOS_SERVICE}/procesar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(pago),
    });

    if (!response.ok) {
      throw new Error('Failed to process payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Process payment error:', error);
    throw error;
  }
};

/**
 * Get payments by email
 */
export const getPagosByEmail = async (email: string): Promise<Pago[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.PAGOS_SERVICE}/email/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payments by email');
    }

    return await response.json();
  } catch (error) {
    console.error('Get payments by email error:', error);
    throw error;
  }
};

/**
 * Get payments by status
 */
export const getPagosByEstado = async (estado: string): Promise<Pago[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.PAGOS_SERVICE}/estado/${estado}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payments by status');
    }

    return await response.json();
  } catch (error) {
    console.error('Get payments by status error:', error);
    throw error;
  }
};

/**
 * Get payments by reservation ID
 */
export const getPagosByReservaId = async (reservaId: number): Promise<Pago[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.PAGOS_SERVICE}/reserva/${reservaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payments by reservation');
    }

    return await response.json();
  } catch (error) {
    console.error('Get payments by reservation error:', error);
    throw error;
  }
};

/**
 * Get all payments
 */
export const getAllPagos = async (): Promise<Pago[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.PAGOS_SERVICE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }

    return await response.json();
  } catch (error) {
    console.error('Get payments error:', error);
    throw error;
  }
};
