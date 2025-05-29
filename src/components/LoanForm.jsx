import React, { useState } from "react";
import axios from "axios";

const LoanForm = ({ selectedDB, onCreated }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    book_id: "",
    loan_date: "",
    return_date: "",
  });

  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/${selectedDB}/loans/create`, formData);
      alert("Préstamo registrado");
      setFormData({ user_id: "", book_id: "", loan_date: "", return_date: "" });
      onCreated();
    } catch (err) {
      alert("Error al registrar préstamo: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Registrar Préstamo</h4>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input
            type="number"
            name="user_id"
            className="form-control"
            placeholder="ID Usuario"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="book_id"
            className="form-control"
            placeholder="ID Libro"
            value={formData.book_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="loan_date"
            className="form-control"
            value={formData.loan_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="return_date"
            className="form-control"
            value={formData.return_date}
            onChange={handleChange}
            placeholder="Fecha devolución"
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

export default LoanForm;
