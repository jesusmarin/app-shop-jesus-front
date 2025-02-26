import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import LoginPage from './pages/LoginPage';
import CarritoPage from './pages/carritoPage';
import PerfilPage from './pages/PerfilPage';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import HistorialPage from './pages/HistorialPage';

function App() {
  return (
    <AuthProvider> {/* Envuelve tu aplicación con AuthProvider */}
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/perfil" element={<PerfilPage />} />  
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/historial" element={<HistorialPage />} />
          {/* ... otras rutas */}
        </Routes>
      </div>
    </Router>
  </AuthProvider>
  );
}

export default App;
