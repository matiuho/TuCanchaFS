import { createContext, useContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

type User = { 
  email: string; 
  role: 'admin' | 'user';
};

type AuthContextShape = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string) => boolean;
  isAdmin: () => boolean;
};

const KEY_USERS = 'tuCancha_users';
const KEY_CURRENT = 'tuCancha_currentUser';

const predefinedUsers = [
  { email: 'admin@tucancha.com', password: 'admin123', role: 'admin' as const },
  { email: 'demo@tucancha.test', password: 'demo1234', role: 'user' as const }
];

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

function readUsers(): Array<{ email: string; password: string; role: 'admin' | 'user' }> {
  try {
    const raw = localStorage.getItem(KEY_USERS);
    if (!raw) {
      // seed with predefined users
      localStorage.setItem(KEY_USERS, JSON.stringify(predefinedUsers));
      return predefinedUsers;
    }
    return JSON.parse(raw) as Array<{ email: string; password: string; role: 'admin' | 'user' }>;
  } catch (e) {
    return predefinedUsers;
  }
}

function writeUsers(users: Array<{ email: string; password: string; role: 'admin' | 'user' }>) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Asegurarse de que los usuarios predefinidos estén en localStorage
  useEffect(() => {
    const users = readUsers();
    if (!users.some(u => u.email === 'admin@tucancha.com')) {
      localStorage.clear(); // Limpiar localStorage para forzar la reinicialización
      writeUsers(predefinedUsers);
    }
  }, []);

  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(KEY_CURRENT);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(KEY_CURRENT, JSON.stringify(user));
    else localStorage.removeItem(KEY_CURRENT);
  }, [user]);

  const login = (email: string, password: string) => {
    const users = readUsers();
    console.log('Usuarios disponibles:', users); // Para debug
    const match = users.find((u) => u.email === email && u.password === password);
    if (match) {
      setUser({ email: match.email, role: match.role });
      return true;
    }
    console.log('Usuario no encontrado para:', email); // Para debug
    return false;
  };

  const logout = () => setUser(null);

  const register = (email: string, password: string) => {
    const users = readUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) return false;
    // New users are always registered as regular users
    const next = [...users, { email, password, role: 'user' as const }];
    writeUsers(next);
    setUser({ email, role: 'user' });
    return true;
  };

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin }}>
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
