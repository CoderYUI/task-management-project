import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (user || token) {
      localStorage.setItem('auth', JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem('auth');
    }
  }, [user, token]);

  const login = async ({ email, password }) => {
    // Replace this mock with real API call
    if (!email || !password) {
      throw new Error('Missing credentials');
    }
    const mockToken = 'mock-token';
    const mockUser = { name: email.split('@')[0], email };
    setToken(mockToken);
    setUser(mockUser);
    return { user: mockUser, token: mockToken };
  };

  const signup = async ({ name, email, password }) => {
    // Replace this mock with real API call
    if (!email || !password || !name) {
      throw new Error('Missing fields');
    }
    const mockToken = 'mock-token';
    const mockUser = { name, email };
    setToken(mockToken);
    setUser(mockUser);
    return { user: mockUser, token: mockToken };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthProvider;
