import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import axios from 'axios'; // Importa axios


function PerfilPage() {
    const [perfilUsuario, setPerfilUsuario] = useState(null);
    const [perfilCargando, setPerfilCargando] = useState(true);
    const [editarPerfil, setEditarPerfil] = useState(false);
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
  
    const handleEditarPerfil = () => {
      setEditarPerfil(true);
    };
   
    const handleGuardarPerfil = async () => {
      try {
        const username = localStorage.getItem('username');
        await axios.put(`http://localhost:8080/usuarios/${username}`, perfilUsuario);
        console.log('Perfil de usuario actualizado correctamente');
        setEditarPerfil(false);
      } catch (error) {
        console.error('Error al actualizar el perfil del usuario:', error);
      }
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setPerfilUsuario({ ...perfilUsuario, [name]: value });
    };

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
        {editarPerfil ? (
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={perfilUsuario.nombre} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" value={perfilUsuario.apellido} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección:</label>
              <input type="text" id="direccion" name="direccion" value={perfilUsuario.direccion} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input type="tel" id="telefono" name="telefono" value={perfilUsuario.telefono} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={new Date(perfilUsuario.fechaNacimiento).toISOString().split('T')[0]} onChange={handleInputChange} />
            </div>
            <button type="button" onClick={handleGuardarPerfil}>Guardar</button>
          </form>
        ) : (
          <div>
            <p><strong>ID:</strong> {perfilUsuario.id}</p>
            <p><strong>Nombre de usuario:</strong> {perfilUsuario.username}</p>
            <p><strong>Correo electrónico:</strong> {perfilUsuario.email}</p>
            <p><strong>Nombre:</strong> {perfilUsuario.nombre}</p>
            <p><strong>Apellido:</strong> {perfilUsuario.apellido}</p>
            <p><strong>Dirección:</strong> {perfilUsuario.direccion}</p>
            <p><strong>Teléfono:</strong> {perfilUsuario.telefono}</p>
            <p><strong>Habilitado:</strong> {perfilUsuario.enabled ? 'Sí' : 'No'}</p>
            <p><strong>Fecha de nacimiento:</strong> {new Date(perfilUsuario.fechaNacimiento).toLocaleDateString()}</p>
            <button onClick={handleEditarPerfil}>Editar perfil</button>
          </div>
        )}
      </div>
    </Layout>
    );
  }
  
  export default PerfilPage;