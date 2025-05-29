import React, { useState } from "react";
import axios from "axios";

const CategoryForm = ({ selectedDB, onCreated }) => {
  const [name, setName] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/${selectedDB}/categories/create`, { name });
      alert("Categoría registrada correctamente");
      setName("");
      onCreated();
    } catch (err) {
      alert("Error al crear categoría: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Registrar Categoría</h4>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de categoría"
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

export default CategoryForm;
