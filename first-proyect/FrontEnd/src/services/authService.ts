import { API_CONFIG, setToken, removeToken, setUserData, getToken } from './api.config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  email: string | null;
  role: string | null;
  token: string | null;
  message: string;
  success: boolean;
}

/**
 * Login user
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data: AuthResponse = await response.json();

    if (data.success && data.token) {
      setToken(data.token);
      setUserData({ email: data.email, role: data.role });
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      email: null,
      role: null,
      token: null,
      message: 'Error de conexión con el servidor',
      success: false,
    };
  }
};

/**
 * Register new user
 */
export const register = async (email: string, password: string, role: string = 'USER'): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data: AuthResponse = await response.json();

    if (data.success && data.token) {
      setToken(data.token);
      setUserData({ email: data.email, role: data.role });
    }

    return data;
  } catch (error) {
    console.error('Register error:', error);
    return {
      email: null,
      role: null,
      token: null,
      message: 'Error de conexión con el servidor',
      success: false,
    };
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    const token = getToken();
    
    if (token) {
      await fetch(`${API_CONFIG.AUTH_SERVICE}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    removeToken();
  }
};

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.AUTH_SERVICE}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return await response.json();
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};
