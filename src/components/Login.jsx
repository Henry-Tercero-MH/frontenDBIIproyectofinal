import React, { useState } from "react";
import axios from "axios";
import loginImg from "../assets/tocad.avif";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
  });

  const [error, setError] = useState("");
  const API = import.meta.env.VITE_API_URL;
  const selectedDB = "mysql"; // o usa props si es dinámico

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/login`, {
        db: selectedDB,
        email: credentials.email,
        name: credentials.name,
      });

      if (res.data.success) {
        onLogin(res.data.user);
      }
    } catch (err) {
      setError("❌ Usuario o nombre incorrecto");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="row w-100 shadow-lg bg-white rounded overflow-hidden"
        style={{ maxWidth: "900px" }}
      >
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={loginImg}
            alt="login illustration"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="col-12 col-md-6 p-5 d-flex flex-column justify-content-center">
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password" // 👈 esto oculta los caracteres
                name="name"
                className="form-control"
                value={credentials.name}
                onChange={handleChange}
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger text-center py-1">{error}</div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
