/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import * as authService from '../services/authService';
import { getUserData, isAuthenticated } from '../services/api.config';

type User = { 
  email: string; 
  role: 'ADMIN' | 'USER';
};

type AuthContextShape = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  isAdmin: () => boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userData = getUserData();
        if (userData) {
          setUser({
            email: userData.email,
            role: userData.role.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER',
          });
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.email && response.role) {
        setUser({
          email: response.email,
          role: response.role.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER',
        });
        
        return {
          success: true,
          message: response.message || 'Login exitoso',
        };
      }
      
      return {
        success: false,
        message: response.message || 'Credenciales inválidas',
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Error de conexión con el servidor',
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await authService.register(email, password, 'user');
      
      if (response.success) {
        // NO hacer auto-login, solo confirmar que el registro fue exitoso
        return {
          success: true,
          message: response.message || 'Cuenta creada exitosamente. Por favor inicia sesión.',
        };
      }
      
      return {
        success: false,
        message: response.message || 'Error al registrar usuario',
      };
    } catch (error: any) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.message || 'Error de conexión con el servidor',
      };
    }
  };

  const isAdmin = () => user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
