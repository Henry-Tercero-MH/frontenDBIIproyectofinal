import React, { useState } from "react";
import axios from "axios";
import loginImg from "../assets/tocad.avif";

const AuthForm = ({ onLogin, selectedDB = "mysql" }) => {
  const API = import.meta.env.VITE_API_URL;
  const [mode, setMode] = useState("login"); // 'login' o 'register'
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(`${API}/login`, {
        db: selectedDB,
        ...credentials,
      });
      if (res.data.success) {
        onLogin(res.data.user);
      }
    } catch (err) {
      setMessage("❌ Usuario o contraseña incorrectos");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(`${API}/${selectedDB}/users/create`, credentials);
      setMessage(
        "✅ Usuario registrado correctamente. Ahora puedes iniciar sesión."
      );
      setCredentials({ email: "", name: "" });
      setMode("login");
    } catch (err) {
      setMessage("❌ Error al registrar: " + err.message);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="row w-100 shadow-lg bg-white rounded overflow-hidden"
        style={{ maxWidth: "900px" }}
      >
        {/* Imagen solo en pantallas medianas o más grandes */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={loginImg}
            alt="auth visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Formulario */}
        <div className="col-12 col-md-6 p-5 d-flex flex-column justify-content-center">
          <h3 className="text-center mb-4">
            {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
          </h3>
          <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
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
              <label className="form-label">
                {mode === "login" ? "Contraseña" : "Nombre (como contraseña)"}
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="name"
                  className="form-control"
                  value={credentials.name}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? "👁️‍🗨️" : "🔍"}
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`alert text-center py-1 ${
                  message.startsWith("✅") ? "alert-success" : "alert-danger"
                }`}
              >
                {message}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100 mb-2">
              {mode === "login" ? "Entrar" : "Registrarse"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setMessage("");
              }}
            >
              {mode === "login"
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
