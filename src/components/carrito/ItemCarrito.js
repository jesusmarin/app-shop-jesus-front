import React from 'react';


function ItemCarrito({ item, actualizarCarrito }) {
  const aumentarCantidad = () => {
    const nuevoItem = { ...item, cantidad: item.cantidad + 1 };
    actualizarCarrito(carrito => carrito.map(i => i.producto.id === item.producto.id ? nuevoItem : i));
  };

  const disminuirCantidad = () => {
    if (item.cantidad > 1) {
      const nuevoItem = { ...item, cantidad: item.cantidad - 1 };
      actualizarCarrito(carrito => carrito.map(i => i.producto.id === item.producto.id ? nuevoItem : i));
    }
  };

  const eliminarItem = () => {
    actualizarCarrito(carrito => carrito.filter(i => i.producto.id !== item.producto.id));
  };

  return (
    <div className="item-carrito">
      <img src={item.producto.urlImagen} alt={item.producto.nombre} />
      <div>
        <h3>{item.producto.nombre}</h3>
        <p>Precio: ${item.producto.precio}</p>
        <div>
          <button onClick={disminuirCantidad}>-</button>
          <span>{item.cantidad}</span>
          <button onClick={aumentarCantidad}>+</button>
        </div>
        <button onClick={eliminarItem}>Eliminar</button>
      </div>
    </div>
  );
}

export default ItemCarrito;