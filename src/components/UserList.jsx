import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ selectedDB, refresh }) => {
  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/${selectedDB}/users/read`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error al obtener usuarios:", err));
  }, [selectedDB, refresh]);

  return (
    <div className="container mt-4">
      <h4>Listado de Usuarios</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u.id || index}>
              <td>{index + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
