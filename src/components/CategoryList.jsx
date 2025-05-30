import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryList = ({ selectedDB, refresh }) => {
  const [categories, setCategories] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/${selectedDB}/categories/read`)
      .then((res) => {
        console.log("📦 Categorías recibidas:", res.data);
        setCategories(res.data);
      })
      .catch((err) => console.error("Error al obtener categorías:", err));
  }, [selectedDB, refresh]);

  return (
    <div className="container mt-4">
      <h4>Listado de Categorías</h4>
      <ul className="list-group">
        {categories.map((cat, index) => {
          const isArray = Array.isArray(cat);
          const name = isArray ? cat[1] : cat.name;
          const key = isArray ? cat[0] : cat.id || cat._id || index;

          return (
            <li key={key} className="list-group-item">
              {name}
            </li>
          );
        })}

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
