import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getCurrentUser();
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setUser({ ...decodedToken, token });
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        setUser(null); // Establece el usuario como null en caso de error
      }
    }
    setLoading(false); // Establece loading como false después de la verificación inicial
  }, []);

  const login = async (username, password) => {
    setLoading(true); // Establece loading como true al inicio del inicio de sesión
    try {
      const token = await authService.login(username, password);
      if (token) {
        const decodedToken = jwt_decode(token);
        setUser({ ...decodedToken, token });
      }
      setLoading(false); // Establece loading como false después del inicio de sesión
      return token;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoading(false); // Establece loading como false en caso de error
      return null;
    }
  };


  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};