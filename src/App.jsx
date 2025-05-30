import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import TabbedDashboard from "./components/TabbedDashboard";
import DBSelector from "./components/DBSelector";

function App() {
  const [user, setUser] = useState(null);
  const [selectedDB, setSelectedDB] = useState("mysql");

  if (!user) {
    return <AuthForm onLogin={setUser} selectedDB={selectedDB} />;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Biblioteca Multi-Base de Datos</h1>
      <DBSelector selectedDB={selectedDB} setSelectedDB={setSelectedDB} />
      <TabbedDashboard selectedDB={selectedDB} />
    </div>
  );
}

export default App;
