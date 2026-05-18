'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/auth';

const AuthContext = createContext(null);

function safeParseUser(storedValue) {
  if (!storedValue || storedValue === 'undefined' || storedValue === 'null') {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return parsedValue && typeof parsedValue === 'object' ? parsedValue : null;
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const storedUser = safeParseUser(localStorage.getItem('user'));
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (values) => {
    const res = await authApi.login(values);
    const authUser = res.data.user;
    const token = res.data.token;

    setUser(authUser);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(authUser));

    return res;
  };

  const register = async (values) => {
    const res = await authApi.register(values);
    const authUser = res.data.user;
    const token = res.data.token;

    setUser(authUser);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(authUser));

    return res;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;