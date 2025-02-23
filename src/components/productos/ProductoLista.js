import React from 'react';

function ProductoLista({ productos, onEditar, onEliminar }) {
  return (
    <div className="productos-grid">
      {productos.map(producto => (
        <div key={producto.id} className="producto-item">
          <img src={producto.urlImagen} alt={producto.nombre} className="producto-imagen" />
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <p>Precio: ${producto.precio}</p>
          <button onClick={() => onEditar(producto)}>Editar</button>
          <button onClick={() => onEliminar(producto.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ProductoLista;