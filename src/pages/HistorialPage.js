import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/shared/Layout';
import { useNavigate } from 'react-router-dom';

function HistorialPage() {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [detallesCompra, setDetallesCompra] = useState({}); // Estado para mostrar detalles
  const [estadoCarrito, setEstadoCarrito] = useState('COMPRADO');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (!username) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8080/carritos/${username}/historial?estado=${estadoCarrito}`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setHistorial(response.data);
        setCargando(false);
      })
      .catch(error => {
        setError('Error al obtener el historial de compras');
        console.error('Error al obtener el historial de compras:', error);
        setCargando(false);
      });
  }, [navigate]);

  const toggleDetallesCompra = (id) => { // Función para mostrar/ocultar detalles
    setDetallesCompra({
      ...detallesCompra,
      [id]: !detallesCompra[id],
    });
  };
  const handleEstadoCarritoChange = (event) => {
    setEstadoCarrito(event.target.value);
  };

  if (cargando) {
    return <div>Cargando historial de compras...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <h2>Historial de compras</h2>
      <div>
        <label htmlFor="estadoCarrito">Filtrar por estado:</label>
        <select
          id="estadoCarrito"
          value={estadoCarrito}
          onChange={handleEstadoCarritoChange}
        >
          <option value="COMPRADO">Comprado</option>
          <option value="ACTIVO">Activo</option>
          <option value="CANCELADO">Cancelado</option>
        </select>
      </div>
      {historial.length === 0 ? (
        <p>No tienes compras realizadas.</p>
      ) : (
        <ul className="historial-lista">
          {historial.map((compra) => (
            <li key={compra.id} className="historial-item">
              <p>
                <strong>ID de orden:</strong> {compra.idOrden}
              </p>
              <p>
                <strong>Fecha de compra:</strong>{' '}
                {new Date(compra.fechaCompra).toLocaleDateString()}
              </p>
              <p>
                <strong>Valor total:</strong> ${compra.valor}
              </p>
              <button onClick={() => toggleDetallesCompra(compra.id)}>
                {detallesCompra[compra.id] ? 'Ocultar detalles' : 'Mostrar detalles'}
              </button>
              {detallesCompra[compra.id] && (
                <ul className="productos-lista">
                  {compra.items.map((item) => (
                    <li key={item.id} className="producto-item">
                      <p>
                        <strong>idItem:</strong> {item.id}
                      </p>
                      <p>
                        <strong>Cantidad:</strong> {item.cantidad}
                      </p>
                      <p>
                        <strong>ProductoId:</strong> {item.productoId}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

export default HistorialPage;