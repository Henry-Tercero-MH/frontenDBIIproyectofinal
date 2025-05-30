import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = ({ selectedDB, refresh, onRefresh }) => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (selectedDB) {
      axios
        .get(`${API}/${selectedDB}/books/read`)
        .then((res) => setBooks(res.data))
        .catch((err) => console.error("Error al obtener libros:", err));
    }
  }, [selectedDB, refresh]);

  // Eliminar libro
  const handleDelete = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este libro?")) return;

    axios
      .delete(`${API}/${selectedDB}/books/delete/${id}`)
      .then(() => {
        alert("Libro eliminado");
        if (onRefresh) onRefresh(); // para que el padre refresque la lista
      })
      .catch((err) => console.error("Error al eliminar libro:", err));
  };

  // Iniciar edición
  const startEditing = (book) => {
    setEditingBookId(book.id);
    setEditedTitle(book.title);
  };

  // Cancelar edición
  const cancelEditing = () => {
    setEditingBookId(null);
    setEditedTitle("");
  };

  // Guardar edición
  const saveEdit = (id) => {
    axios
      .put(`${API}/${selectedDB}/books/update/${id}`, { title: editedTitle })
      .then(() => {
        alert("Libro actualizado");
        setEditingBookId(null);
        setEditedTitle("");
        if (onRefresh) onRefresh(); // para refrescar la lista
      })
      .catch((err) => console.error("Error al actualizar libro:", err));
  };

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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id || index}>
                <td>{index + 1}</td>

                {/* Mostrar input si está en edición */}
                <td>
                  {editingBookId === book.id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    book.title
                  )}
                </td>

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

                <td>
                  {editingBookId === book.id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => saveEdit(book.id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={cancelEditing}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => startEditing(book)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
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
