import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = ({ selectedDB, refresh }) => {
  const [books, setBooks] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (selectedDB) {
      axios
        .get(`${API}/${selectedDB}/books/read`)
        .then((res) => setBooks(res.data))
        .catch((err) => console.error("Error al obtener libros:", err));
    }
  }, [selectedDB, refresh]);

  return (
    <div className="container mt-4">
      <h4>Listado de Libros ({selectedDB})</h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>ID Autor</th>
              <th>ID Categoría</th>
              <th>Disponible</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id || index}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author_id}</td>
                <td>{book.category_id}</td>
                <td>
                  <span
                    className={`badge ${
                      book.available ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {book.available ? "Sí" : "No"}
                  </span>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No hay libros registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
