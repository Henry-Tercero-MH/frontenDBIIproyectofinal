import React from "react";

const DBSelector = ({ selectedDB, setSelectedDB }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="dbSelect" className="form-label">
            Selecciona la base de datos
          </label>
          <select
            id="dbSelect"
            className="form-select"
            value={selectedDB}
            onChange={(e) => setSelectedDB(e.target.value)}
          >
            <option value="mysql">MySQL</option>
            <option value="mssql">SQL Server</option>
            <option value="oracle">Oracle</option>
            <option value="mongo">MongoDB</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DBSelector;
