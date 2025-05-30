import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import TabbedDashboard from "./components/TabbedDashboard";
import DBSelector from "./components/DBSelector";

function App() {
  const [user, setUser] = useState(null);
  const [selectedDB, setSelectedDB] = useState("mysql");

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthForm onLogin={setUser} selectedDB={selectedDB} />;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
        <h4 className="mb-0">📚 Bienvenido, {user.name}</h4>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Cerrar sesión
        </button>
      </div>

      <h1 className="text-center mt-3 mb-4">Biblioteca Multi-Base de Datos</h1>

      <DBSelector selectedDB={selectedDB} setSelectedDB={setSelectedDB} />
      <TabbedDashboard selectedDB={selectedDB} />
    </div>
  );
}

export default App;
