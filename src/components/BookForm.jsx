import React, { useState } from "react";
import axios from "axios";

const BookForm = ({ selectedDB, onCreated }) => {
  const API = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    author_id: "",
    category_id: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/${selectedDB}/books/create`, formData);
      alert("Libro registrado correctamente");
      onCreated();
      setFormData({
        title: "",
        author_id: "",
        category_id: "",
        available: true,
      });
    } catch (err) {
      alert("Error al registrar libro: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Registrar Libro</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="author_id"
            className="form-control"
            placeholder="ID Autor"
            value={formData.author_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="category_id"
            className="form-control"
            placeholder="ID Categoría"
            value={formData.category_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              id="disponibleCheck"
            />
            <label className="form-check-label" htmlFor="disponibleCheck">
              Disponible
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
