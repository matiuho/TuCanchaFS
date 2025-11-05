import { createContext, useContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

type User = { email: string };

type AuthContextShape = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string) => boolean;
};

const KEY_USERS = 'tuCancha_users';
const KEY_CURRENT = 'tuCancha_currentUser';

const predefined = { email: 'demo@tucancha.test', password: 'demo1234' };

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

function readUsers(): Array<{ email: string; password: string }> {
  try {
    const raw = localStorage.getItem(KEY_USERS);
    if (!raw) {
      // seed with predefined user
      const seed = [predefined];
      localStorage.setItem(KEY_USERS, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Array<{ email: string; password: string }>;
  } catch (e) {
    return [predefined];
  }
}

function writeUsers(users: Array<{ email: string; password: string }>) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
    const match = users.find((u) => u.email === email && u.password === password);
    if (match) {
      setUser({ email: match.email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const register = (email: string, password: string) => {
    const users = readUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) return false;
    const next = [...users, { email, password }];
    writeUsers(next);
    setUser({ email });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
