import { API_CONFIG, getToken } from './api.config';
import type { CanchaProps } from '../interfaces/cancha.interface';

/**
 * Get all canchas
 */
export const getAllCanchas = async (): Promise<CanchaProps[]> => {
  try {
    const token = getToken();
    
    const response = await fetch(`${API_CONFIG.CANCHAS_SERVICE}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch canchas');
    }

    return await response.json();
  } catch (error) {
    console.error('Get canchas error:', error);
    throw error;
  }
};

/**
 * Get cancha by ID
 */
export const getCanchaById = async (id: number): Promise<CanchaProps> => {
  try {
    const token = getToken();
    
    const response = await fetch(`${API_CONFIG.CANCHAS_SERVICE}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cancha');
    }

    return await response.json();
  } catch (error) {
    console.error('Get cancha error:', error);
    throw error;
  }
};

/**
 * Get canchas by type
 */
export const getCanchasByTipo = async (tipo: string): Promise<CanchaProps[]> => {
  try {
    const token = getToken();
    
    const response = await fetch(`${API_CONFIG.CANCHAS_SERVICE}/tipo/${tipo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch canchas by type');
    }

    return await response.json();
  } catch (error) {
    console.error('Get canchas by type error:', error);
    throw error;
  }
};

/**
 * Get canchas with offers
 */
export const getCanchasConOfertas = async (): Promise<CanchaProps[]> => {
  try {
    const token = getToken();
    
    const response = await fetch(`${API_CONFIG.CANCHAS_SERVICE}/ofertas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch canchas with offers');
    }

    return await response.json();
  } catch (error) {
    console.error('Get canchas with offers error:', error);
    throw error;
  }
};

/**
 * Search canchas by name
 */
export const searchCanchas = async (nombre: string): Promise<CanchaProps[]> => {
  try {
    const token = getToken();
    
    const response = await fetch(`${API_CONFIG.CANCHAS_SERVICE}/search?nombre=${encodeURIComponent(nombre)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to search canchas');
    }

    return await response.json();
  } catch (error) {
    console.error('Search canchas error:', error);
    throw error;
  }
};

/**
 * Create cancha (Admin only)
 */
export const createCancha = async (cancha: Omit<CanchaProps, 'id'>): Promise<CanchaProps> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.CANCHAS_SERVICE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(cancha),
    });

    if (!response.ok) {
      throw new Error('Failed to create cancha');
    }

    return await response.json();
  } catch (error) {
    console.error('Create cancha error:', error);
    throw error;
  }
};

/**
 * Update cancha (Admin only)
 */
export const updateCancha = async (id: number, cancha: Partial<CanchaProps>): Promise<CanchaProps> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.CANCHAS_SERVICE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(cancha),
    });

    if (!response.ok) {
      throw new Error('Failed to update cancha');
    }

    return await response.json();
  } catch (error) {
    console.error('Update cancha error:', error);
    throw error;
  }
};

/**
 * Delete cancha (Admin only)
 */
export const deleteCancha = async (id: number): Promise<void> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.CANCHAS_SERVICE}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete cancha');
    }
  } catch (error) {
    console.error('Delete cancha error:', error);
    throw error;
  }
};
