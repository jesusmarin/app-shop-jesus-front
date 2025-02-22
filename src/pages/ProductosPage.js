import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import Layout from '../components/shared/Layout';

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const { user, loading  } = useAuth();
  const [ productosCargando, setProductosCargando] = useState(true);
  const [carritoEstado, setCarritoEstado] = useState('INACTIVO');
  const username = localStorage.getItem('username');
  if (carritoEstado === "INACTIVO") { // agrega condicional
    setCarritoEstado('ACTIVO');
  }

  useEffect(() => {
    axios.get('http://localhost:8080/productos')
      .then(response => {
        setProductos(response.data);
        setProductosCargando(false); // Actualiza el estado de carga local
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
        setProductosCargando(false); // Actualiza el estado de carga local en caso de error
      });
  }, []);

  const agregarAlCarrito =async (producto) => {
    if (loading || productosCargando ) { 
      console.log('Cargando.............');
      return;
    }
    console.error('agregarAlCarrito Usuario no autenticado', user);

    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    if (!username) {
      console.error('Nombre de usuario no encontrado en localStorage');
      return;
    }

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carritoGuardado.find(item => item.producto.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoGuardado.push({ producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoGuardado));

    const itemCarritoDto = {
      productoId: producto.id,
      cantidad: 1,
    };

    let url =`http://localhost:8080/carritos/${username}/productos`;
    console.log('url', url);
    console.log('carrito', carritoGuardado);
    try {
      await axios.post(`http://localhost:8080/carritos/${username}/productos`, itemCarritoDto); // Llama al microservicio
      console.log('Carrito guardado en el microservicio');
      setCarritoEstado('ACTIVO');
      localStorage.setItem('carrito-estado', 'COMPRADO');
    } catch (error) {
      console.error('Error al guardar el carrito en el microservicio:', error);
    }
    console.log('Producto agregado al carrito:', producto);
  };

  return (
    <Layout>
      <h2>Lista de productos</h2>
      <p>Estado del carrito: {carritoEstado}</p>
      <div className="productos-grid">
        {productos.map(producto => (          
          <div key={producto.id} className="producto-item">
            <img src={producto.urlImagen} alt={producto.nombre} className="producto-imagen" />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ProductosPage;