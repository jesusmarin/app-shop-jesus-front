import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import axios from 'axios'; // Importa axios


function PerfilPage() {
    const [perfilUsuario, setPerfilUsuario] = useState(null);
    const [perfilCargando, setPerfilCargando] = useState(true);
    const navigate = useNavigate(); // Importa useNavigate
  
    useEffect(() => {
      const username = localStorage.getItem('username');
  
      if (!username) { // Verifica si el usuario ha iniciado sesión
        navigate('/login'); // Redirige a la página de inicio de sesión
        return; // Detiene la ejecución del resto del useEffect
      }
  
      axios.get(`http://localhost:8080/usuarios/u/${username}`)
        .then(response => {
          setPerfilUsuario(response.data);
          setPerfilCargando(false);
        })
        .catch(error => {
          console.error('Error al obtener el perfil del usuario:', error);
          setPerfilCargando(false);
        });
    }, [navigate]); // Agrega navigate como dependencia
  
    if (perfilCargando) {
      return <div>Cargando...</div>;
    }
  
    if (!perfilUsuario) {
      return <div>Perfil no encontrado.</div>;
    }
  
    return (
      <Layout>
        <h2>Perfil de usuario</h2>
        <div className="perfil-info">
          <p><strong>ID:</strong> {perfilUsuario.id}</p>
          <p><strong>Nombre de usuario:</strong> {perfilUsuario.username}</p>
          <p><strong>Correo electrónico:</strong> {perfilUsuario.email}</p>
          <p><strong>Nombre:</strong> {perfilUsuario.nombre}</p>
          <p><strong>Apellido:</strong> {perfilUsuario.apellido}</p>
          <p><strong>Dirección:</strong> {perfilUsuario.direccion}</p>
          <p><strong>Teléfono:</strong> {perfilUsuario.telefono}</p>
          <p><strong>Habilitado:</strong> {perfilUsuario.enabled ? 'Sí' : 'No'}</p>
          <p><strong>Fecha de nacimiento:</strong> {new Date(perfilUsuario.fechaNacimiento).toLocaleDateString()}</p>
          {/* Agrega más información del usuario si es necesario */}
        </div>
      </Layout>
    );
  }
  
  export default PerfilPage;