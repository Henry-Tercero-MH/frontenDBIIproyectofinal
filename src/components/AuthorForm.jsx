import React, { useState } from "react";
import axios from "axios";

const AuthorForm = ({ selectedDB, onCreated }) => {
  const [name, setName] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/${selectedDB}/authors/create`, { name });
      alert("Autor creado correctamente");
      setName("");
      onCreated();
    } catch (err) {
      alert("Error al crear autor: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Registrar Autor</h4>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del autor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;
