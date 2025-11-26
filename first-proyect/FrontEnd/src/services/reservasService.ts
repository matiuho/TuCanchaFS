import { API_CONFIG, getToken } from './api.config';
import type { Reservation } from '../interfaces/reservation.interface';

/**
 * Get all reservations
 */
export const getAllReservas = async (): Promise<Reservation[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }

    return await response.json();
  } catch (error) {
    console.error('Get reservations error:', error);
    throw error;
  }
};

/**
 * Get reservation by ID
 */
export const getReservaById = async (id: number): Promise<Reservation> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reservation');
    }

    return await response.json();
  } catch (error) {
    console.error('Get reservation error:', error);
    throw error;
  }
};

/**
 * Get reservations by email
 */
export const getReservasByEmail = async (email: string): Promise<Reservation[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}/email/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reservations by email');
    }

    return await response.json();
  } catch (error) {
    console.error('Get reservations by email error:', error);
    throw error;
  }
};

/**
 * Get reservations by cancha ID
 */
export const getReservasByCanchaId = async (canchaId: number): Promise<Reservation[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}/cancha/${canchaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reservations by cancha');
    }

    return await response.json();
  } catch (error) {
    console.error('Get reservations by cancha error:', error);
    throw error;
  }
};

/**
 * Get reservations by date
 */
export const getReservasByFecha = async (fecha: string): Promise<Reservation[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}/fecha/${fecha}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reservations by date');
    }

    return await response.json();
  } catch (error) {
    console.error('Get reservations by date error:', error);
    throw error;
  }
};

/**
 * Get reservations by status
 */
export const getReservasByEstado = async (estado: string): Promise<Reservation[]> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}/estado/${estado}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reservations by status');
    }

    return await response.json();
  } catch (error) {
    console.error('Get reservations by status error:', error);
    throw error;
  }
};

/**
 * Create reservation
 */
export const createReserva = async (reserva: Omit<Reservation, 'id'>): Promise<Reservation> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(reserva),
    });

    if (!response.ok) {
      throw new Error('Failed to create reservation');
    }

    return await response.json();
  } catch (error) {
    console.error('Create reservation error:', error);
    throw error;
  }
};

/**
 * Update reservation
 */
export const updateReserva = async (id: number, reserva: Partial<Reservation>): Promise<Reservation> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(reserva),
    });

    if (!response.ok) {
      throw new Error('Failed to update reservation');
    }

    return await response.json();
  } catch (error) {
    console.error('Update reservation error:', error);
    throw error;
  }
};

/**
 * Delete reservation
 */
export const deleteReserva = async (id: number): Promise<void> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.RESERVAS_SERVICE}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete reservation');
    }
  } catch (error) {
    console.error('Delete reservation error:', error);
    throw error;
  }
};
