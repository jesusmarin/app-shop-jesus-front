import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function Layout({ children }) {
 
  const { user, logout, loading  } = useAuth();
  const navigate = useNavigate();
  const [carritoCantidad, setCarritoCantidad] = useState(0);

  useEffect(() => {
    
    if (user) {
      const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
      const totalCantidad = carritoGuardado.reduce((total, item) => total + item.cantidad, 0);
      setCarritoCantidad(totalCantidad);
    } else {
      setCarritoCantidad(0);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.setItem('carrito-estado', 'CANCELADO');
    localStorage.removeItem('carrito');
    localStorage.removeItem('username'); 
    logout();
    navigate('/login');
  };

  if (loading) { // agrega condicional
    return <div>Cargando...</div>;
  }

  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>Tienda en Línea</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/registro">Registro Usuario</Link>
          <Link to="/perfil">Perfil de Usuario</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/carrito"><span>Carrito: {carritoCantidad}</span></Link>
          <Link to="/historial"><span>historial</span></Link>
          {user ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <Link to="/login">Iniciar Sesión</Link>
          )}
        </nav>
      </header>
      <main className="layout-content">{children}</main>
      <footer className="layout-footer">
        <p>Información de la empresa | Contacto | Términos y condiciones</p>
      </footer>
    </div>
  );
}

export default Layout;