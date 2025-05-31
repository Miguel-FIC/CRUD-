import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const api = axios.create({ baseURL: 'http://localhost:3001' });

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: 0,
    descripcion: '',
    precio: '',
    existencia: ''
  });

  useEffect(() => {
    fetchAll();
  }, []);

  function fetchAll() {
    api.get('/articulos').then(res => setItems(res.data));
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      existencia: parseInt(form.existencia, 10)
    };

    const request = form.id
      ? api.put(`/articulos/${form.id}`, payload)
      : api.post('/articulos', payload);

    request.then(() => {
      setForm({ id: 0, descripcion: '', precio: '', existencia: '' });
      fetchAll();
    });
  };

  const handleEdit = item => {
    setForm({
      id: item.id,
      descripcion: item.descripcion,
      precio: item.precio,
      existencia: item.existencia
    });
  };

  const handleDelete = id => {
    api.delete(`/articulos/${id}`).then(fetchAll);
  };

  return (
    <div className="app-container">
      <h1>Inventario Macias</h1>

      <form onSubmit={handleSubmit} className="form-crud">
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          name="existencia"
          type="number"
          placeholder="Existencia"
          value={form.existencia}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {form.id ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      <ul className="list-crud">
        {items.map(item => (
          <li key={item.id}>
            <div className="info">
              <span className="desc">{item.descripcion}</span>
              <span className="price">${item.precio.toFixed(2)}</span>
              <span className="stock">stock: {item.existencia}</span>
            </div>
            <div className="actions">
              <button className="edit" onClick={() => handleEdit(item)}>editar</button>
              <button className="delete" onClick={() => handleDelete(item.id)}>borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
