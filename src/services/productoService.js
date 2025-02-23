import axios from 'axios';

const API_URL = 'http://localhost:8080/productos';

const productoService = {
    obtenerProductos: async () => {
      try {
        const response = await axios.get(API_URL);
        return response.data;
      } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
      }
    },
  
    obtenerProductoPorId: async (id) => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        throw error;
      }
    },
  
    crearProducto: async (producto) => {
      try {
        const response = await axios.post(API_URL, producto);
        return response.data;
      } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
      }
    },
  
    actualizarProducto: async (id, producto) => {
      try {
        const response = await axios.put(`${API_URL}/${id}`, producto);
        return response.data;
      } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
      }
    },
  
    eliminarProducto: async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
      }
    },
  };
  
  export default productoService;