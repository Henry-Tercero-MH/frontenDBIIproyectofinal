import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryList = ({ selectedDB, refresh }) => {
  const [categories, setCategories] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/${selectedDB}/categories/read`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error al obtener categorías:", err));
      console.log("API URL:", `${API}/${selectedDB}/categories/read`);

  }, [selectedDB, refresh]);

  return (
    <div className="container mt-4">
      <h4>Listado de Categorías</h4>
      <ul className="list-group">
        {categories.map((cat, index) => (
          <li key={cat.id || index} className="list-group-item">
            {cat.name}
          </li>
        ))}
        {categories.length === 0 && (
          <li className="list-group-item text-muted">
            No hay categorías registradas.
          </li>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
