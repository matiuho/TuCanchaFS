import { useState, useEffect } from 'react';
import { isAuthenticated, getUserData, getToken } from '../services/api.config';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const authenticated = isAuthenticated();
    const userData = getUserData();
    
    setIsLoggedIn(authenticated);
    setUser(userData);
    setLoading(false);
  };

  const updateAuthStatus = () => {
    checkAuthStatus();
  };

  return {
    isLoggedIn,
    user,
    loading,
    token: getToken(),
    updateAuthStatus,
  };
};
