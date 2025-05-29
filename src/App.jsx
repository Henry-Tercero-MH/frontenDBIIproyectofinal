import React, { useState } from "react";
import axios from "axios";
import DBSelector from "./components/DBSelector";
import TabbedDashboard from "./components/TabbedDashboard";

function App() {
  const [selectedDB, setSelectedDB] = useState("mysql");
  const API = import.meta.env.VITE_API_URL;

  const handleBackup = () => {
    axios
      .post(`${API}/backup/${selectedDB}`)
      .then(() => alert("Backup exitoso"))
      .catch((err) => alert("Error al respaldar: " + err.message));
  };

  const handleRestore = () => {
    axios
      .post(`${API}/restore/${selectedDB}`)
      .then(() => alert("Restauración exitosa"))
      .catch((err) => alert("Error al restaurar: " + err.message));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">
        📚 Biblioteca Multi-Base de Datos
      </h1>
      <DBSelector selectedDB={selectedDB} setSelectedDB={setSelectedDB} />
      <div className="d-flex gap-2 justify-content-center mt-3 mb-4">
        <button className="btn btn-outline-success" onClick={handleBackup}>
          Backup
        </button>
        <button className="btn btn-outline-warning" onClick={handleRestore}>
          Restaurar
        </button>
      </div>
      <TabbedDashboard selectedDB={selectedDB} />
    </div>
  );
}

export default App;
  