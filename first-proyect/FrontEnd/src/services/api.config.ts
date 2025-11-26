// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost',
  AUTH_SERVICE: 'http://localhost:8081/api/v1/auth',
  CANCHAS_SERVICE: 'http://localhost:8082/api/v1/canchas',
  RESERVAS_SERVICE: 'http://localhost:8083/api/v1/reservas',
  PAGOS_SERVICE: 'http://localhost:8084/api/v1/pagos',
};

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
};

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Get user data from localStorage
export const getUserData = () => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

// Set user data in localStorage
export const setUserData = (user: any): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
