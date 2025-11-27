import { API_CONFIG, getToken } from './api.config';

// Tipo para usuario del backend
export interface User {
  id?: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

// Tipo para crear/actualizar usuario
export type UserInput = {
  email: string;
  password: string;
  role: 'admin' | 'user';
};

// Helper para headers con JWT
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Obtener todos los usuarios (ADMIN only)
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/users`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (response.status === 403) {
      throw new Error('No tienes permisos de administrador para ver usuarios');
    }

    if (!response.ok) {
      throw new Error(`Error al obtener usuarios: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getAllUsers:', error);
    throw error;
  }
};

/**
 * Obtener usuario por email (ADMIN only)
 */
export const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/users/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (response.status === 403) {
      throw new Error('No tienes permisos de administrador');
    }

    if (response.status === 404) {
      throw new Error('Usuario no encontrado');
    }

    if (!response.ok) {
      throw new Error(`Error al obtener usuario: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en getUserByEmail:', error);
    throw error;
  }
};

/**
 * Crear nuevo usuario (usando register - disponible públicamente)
 * Para uso admin, necesitarías un endpoint específico
 */
export const createUser = async (user: UserInput): Promise<User> => {
  try {
    const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error al crear usuario: ${response.status}`);
    }

    const data = await response.json();
    // Register devuelve AuthResponse, extraemos el user
    return {
      email: user.email,
      password: user.password,
      role: user.role,
    };
  } catch (error) {
    console.error('Error en createUser:', error);
    throw error;
  }
};

/**
 * Actualizar usuario existente (ADMIN only)
 */
export const updateUser = async (email: string, user: Partial<UserInput>): Promise<User> => {
  try {
    const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/users/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });

    if (response.status === 403) {
      throw new Error('No tienes permisos de administrador para actualizar usuarios');
    }

    if (response.status === 404) {
      throw new Error('Usuario no encontrado');
    }

    if (!response.ok) {
      throw new Error(`Error al actualizar usuario: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en updateUser:', error);
    throw error;
  }
};

/**
 * Eliminar usuario (ADMIN only)
 */
export const deleteUser = async (email: string): Promise<void> => {
  try {
    const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/users/${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.status === 403) {
      throw new Error('No tienes permisos de administrador para eliminar usuarios');
    }

    if (response.status === 404) {
      throw new Error('Usuario no encontrado');
    }

    if (!response.ok) {
      throw new Error(`Error al eliminar usuario: ${response.status}`);
    }
  } catch (error) {
    console.error('Error en deleteUser:', error);
    throw error;
  }
};
