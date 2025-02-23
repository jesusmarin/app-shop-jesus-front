import React, { useState, useEffect } from 'react';
import productoService from '../services/productoService';
import Layout from '../components/shared/Layout';
import ProductoForm from '../components/productos/ProductoForm';
import ProductoLista from '../components/productos/ProductoLista';
import { useAuth } from '../context/AuthContext';

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const { user, loading } = useAuth();
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await productoService.obtenerProductos();
      setProductos(data);
    } catch (error) {
      setError('Error al cargar productos');
      console.error('Error al cargar productos:', error);
    }
  };

  const handleNuevoProducto = () => {
    setProductoSeleccionado(null);
    setModoEdicion(true);
  };

  const handleEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModoEdicion(true);
  };

  const handleEliminarProducto = async (id) => {
    try {
      await productoService.eliminarProducto(id);
      cargarProductos();
    } catch (error) {
      setError('Error al eliminar producto');
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleGuardarProducto = async (producto) => {
    try {
      if (producto.id) {
        await productoService.actualizarProducto(producto.id, producto);
      } else {
        await productoService.crearProducto(producto);
      }
      setModoEdicion(false);
      cargarProductos();
    } catch (error) {
      setError('Error al guardar producto');
      console.error('Error al guardar producto:', error);
    }
  };

  const handleCancelarEdicion = () => {
    setModoEdicion(false);
  };

  return (
    <Layout>
      <h2>Lista de productos</h2>
      {error && <p className="error-message">{error}</p>}
      {token && (
        <button onClick={handleNuevoProducto}>Nuevo producto</button>
      )}
      {modoEdicion ? (
        <ProductoForm
          productoInicial={productoSeleccionado}
          onGuardar={handleGuardarProducto}
          onCancelar={handleCancelarEdicion}
        />
      ) : (
        <ProductoLista
          productos={productos}
          onEditar={handleEditarProducto}
          onEliminar={handleEliminarProducto}
        />
      )}
    </Layout>
  );
}

export default ProductosPage;