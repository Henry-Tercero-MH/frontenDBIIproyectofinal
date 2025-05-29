import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ selectedDB, onCreated }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/${selectedDB}/users/create`, formData);
      alert("Usuario registrado correctamente");
      setFormData({ name: "", email: "" });
      onCreated();
    } catch (err) {
      alert("Error al registrar usuario: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Registrar Usuario</h4>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
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

export default UserForm;
