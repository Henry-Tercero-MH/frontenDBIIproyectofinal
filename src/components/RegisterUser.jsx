import React, { useState } from "react";
import axios from "axios";

const RegisterUser = ({ selectedDB = "mysql" }) => {
  const API = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API}/${selectedDB}/users/create`, formData);
      setSuccess("✅ Usuario registrado correctamente");
      setFormData({ email: "", name: "" });
    } catch (err) {
      setError("❌ Error al registrar usuario: " + err.message);
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h4 className="mb-3">Registrar Nuevo Usuario</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña (nombre)</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-success w-100">
          Registrar Usuario
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
