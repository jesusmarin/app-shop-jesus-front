import React, { useState, useEffect } from 'react';

function ProductoForm({ productoInicial, onGuardar, onCancelar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    urlImagen: '',
    ...productoInicial, // Carga los datos del producto inicial si es una edición
  });

  useEffect(() => {
    setProducto({
      nombre: '',
      descripcion: '',
      precio: 0,
      urlImagen: '',
      ...productoInicial,
    });
  }, [productoInicial]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProducto((prevProducto) => ({ // Corregido para usar una función de actualización
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGuardar(producto); // Llama a la función onGuardar con los datos del producto
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={producto.nombre} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" value={producto.descripcion} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input type="number" id="precio" name="precio" value={producto.precio} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="urlImagen">URL de la imagen:</label>
        <input type="text" id="urlImagen" name="urlImagen" value={producto.urlImagen} onChange={handleInputChange} />
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
}

export default ProductoForm;