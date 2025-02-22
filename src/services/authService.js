import axios from 'axios';

const API_URL = 'http://localhost:8080/usuarios/login'; // Reemplaza con la URL de tu backend

const login = async (username, password) => {
    console.log('username: '+username +'password: ' +password);

  try {
    const response = await axios.post(
      API_URL,
      null, // No se envía cuerpo en la solicitud POST
      {
        params: { username, password }, // Envía los parámetros en la URL
      }
    );

    console.log('Respuesta login del servidor :', response.data);

    if (response.data) {
      localStorage.setItem('token', response.data); // Almacena el token en localStorage
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return null;
  }
};

const logout = () => {
  localStorage.removeItem('token'); // Elimina el token de localStorage
};

const getCurrentUser = () => {
  return localStorage.getItem('token'); // Obtiene el token de localStorage
};

export default {
  login,
  logout,
  getCurrentUser,
};