import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import axios from 'axios';
import ItemCarrito from '../components/carrito/ItemCarrito';
import { useAuth } from '../context/AuthContext';


function CarritoPage() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();
  const { user, loading  } = useAuth(); 

  useEffect(() => {
    if (loading) { // agrega condicional
        return; // espera a que el contexto se cargue
      }

    if (!user) { // Si el usuario no ha iniciado sesión
        navigate('/login'); // Redirige a la página de inicio de sesión
        return; // Detiene la ejecución del resto del useEffect
      }
    // Obtener el carrito de la sesión (localStorage)
    const carritoGuardado = localStorage.getItem('carrito'); // Obtiene la cadena directamente
    if (carritoGuardado) { // Verifica si la cadena existe
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        setCarrito(carritoParseado);
      } catch (error) {
        console.error('Error al analizar el carrito:', error);
        setCarrito([]); // Establece el carrito como un array vacío en caso de error
      }
    } else {
      setCarrito([]); // Establece el carrito como un array vacío si no hay carrito guardado
    }
  }, [user, navigate, loading]);

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  
  
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  };

  const finalizarCompra = async () => {
    try {
      await axios.post('http://localhost:8080/carritos/jesus/finalizar'); // Llama a la API para finalizar la compra
      localStorage.setItem('carrito-estado', 'COMPRADO');
      localStorage.removeItem('carrito'); // Limpia el carrito de localStorage
      console.log('Compra finalizada');
      navigate('/'); // Redirige a la página principal
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
    }
  };

  return (
    <Layout>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map(item => (
            <ItemCarrito
              key={item.producto.id}
              item={item}
              actualizarCarrito={actualizarCarrito}              
            />
          ))}
          <p>Total: ${calcularTotal()}</p>
          <button onClick={finalizarCompra}>Finalizar compra</button>
        </div>
      )}
    </Layout>
  );
}

export default CarritoPage;