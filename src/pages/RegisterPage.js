import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/shared/Layout';


function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        axios.get('http://localhost:8080/usuarios/getId')
          .then(response => {
            setUserId(response.data + 1); // Asigna el siguiente ID disponible
          })
          .catch(error => {
            console.error('Error al obtener el último ID de usuario:', error);
          });
      }, []);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setError(null);

      let fechaNacimientoLong = null;
      if (fechaNacimiento) {
        fechaNacimientoLong = new Date(fechaNacimiento).getTime(); // Convierte la fecha a formato long
      }
  
      const userData = {  
        id: userId,      
        username,
        password,
        email,
        nombre,
        apellido,
        direccion,
        telefono,
        enabled: true,
        fechaNacimiento:fechaNacimientoLong,
      };
      

  
      try {
        console.log( userData)
        
        await axios.post('http://localhost:8080/usuarios', userData);
        console.log('Usuario registrado correctamente');
        navigate('/login'); // Redirige a la página de inicio de sesión después del registro
      } catch (err) {
        console.log( userData)
        setError('Error al registrar el usuario. Verifica los datos.');
        console.error('Error al registrar el usuario:', err);
      }
    };
  
    return (
      <Layout>
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Registro de usuario</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input type="text" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input type="tel" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
            <input type="date" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </Layout>
    );
  }
  
  export default RegisterPage;