import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthorList = ({ selectedDB, refresh }) => {
  const [authors, setAuthors] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/${selectedDB}/authors/read`)
      .then((res) => setAuthors(res.data))
      .catch((err) => console.error("Error al obtener autores:", err));
  }, [selectedDB, refresh]);

  return (
    <div className="container mt-4">
      <h4>Listado de Autores</h4>
      <ul className="list-group">
        {authors.map((author, index) => (
          <li key={author.id || index} className="list-group-item">
            {author.name}
          </li>
        ))}
        {authors.length === 0 && (
          <li className="list-group-item text-muted">
            No hay autores registrados.
          </li>
        )}
      </ul>
    </div>
  );
};

export default AuthorList;
