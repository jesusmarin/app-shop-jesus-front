import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Layout from '../components/shared/Layout';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Estado para manejar errores
    const navigate = useNavigate(); // Hook para la navegación
  
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        setError(null); // Limpia los errores al inicio
    
        try {
          const token = await authService.login(username, password);
          if (token) {
            localStorage.setItem('username', username); // Guarda el nombre de usuario si la validación es correcta
            navigate('/');
          } else {
            localStorage.setItem('username', null); // Establece el nombre de usuario en null si la validación es incorrecta
            setError('Inicio de sesión fallido. Verifica tus credenciales.');
          }
        } catch (err) {
          localStorage.setItem('username', null); // Establece el nombre de usuario en null en caso de error
          setError('Ocurrió un error durante el inicio de sesión.');
          console.error('Error al iniciar sesión:', err);
        }
      };
  
    return (
      <Layout>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </Layout>
    );
  }
  
  export default LoginPage;