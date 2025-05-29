import React, { useEffect, useState } from "react";
import axios from "axios";

const LoanList = ({ selectedDB, refresh }) => {
  const [loans, setLoans] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/${selectedDB}/loans/read`)
      .then((res) => setLoans(res.data))
      .catch((err) => console.error("Error al obtener préstamos:", err));
  }, [selectedDB, refresh]);

  return (
    <div className="container mt-4">
      <h4>Listado de Préstamos</h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>ID Usuario</th>
              <th>ID Libro</th>
              <th>Préstamo</th>
              <th>Devolución</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan.id || index}>
                <td>{index + 1}</td>
                <td>{loan.user_id}</td>
                <td>{loan.book_id}</td>
                <td>{loan.loan_date?.substring(0, 10)}</td>
                <td>
                  {loan.return_date ? loan.return_date.substring(0, 10) : "—"}
                </td>
              </tr>
            ))}
            {loans.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No hay préstamos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanList;
