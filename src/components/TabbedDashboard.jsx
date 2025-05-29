import React, { useState } from "react";
import BookForm from "./BookForm";
import BookList from "./BookList";
import AuthorForm from "./AuthorForm";
import AuthorList from "./AuthorList";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import UserForm from "./UserForm";
import UserList from "./UserList";
import LoanForm from "./LoanForm";
import LoanList from "./LoanList";

const TabbedDashboard = ({ selectedDB }) => {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs" id="dashboardTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#libros"
            type="button"
          >
            Libros
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#autores"
            type="button"
          >
            Autores
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#categorias"
            type="button"
          >
            Categorías
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#usuarios"
            type="button"
          >
            Usuarios
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#prestamos"
            type="button"
          >
            Préstamos
          </button>
        </li>
      </ul>

      <div
        className="tab-content p-3 border border-top-0"
        id="dashboardTabsContent"
      >
        <div className="tab-pane fade show active" id="libros" role="tabpanel">
          <BookForm selectedDB={selectedDB} onCreated={handleRefresh} />
          <BookList selectedDB={selectedDB} refresh={refresh} />
        </div>
        <div className="tab-pane fade" id="autores" role="tabpanel">
          <AuthorForm selectedDB={selectedDB} onCreated={handleRefresh} />
          <AuthorList selectedDB={selectedDB} refresh={refresh} />
        </div>
        <div className="tab-pane fade" id="categorias" role="tabpanel">
          <CategoryForm selectedDB={selectedDB} onCreated={handleRefresh} />
          <CategoryList selectedDB={selectedDB} refresh={refresh} />
        </div>
        <div className="tab-pane fade" id="usuarios" role="tabpanel">
          <UserForm selectedDB={selectedDB} onCreated={handleRefresh} />
          <UserList selectedDB={selectedDB} refresh={refresh} />
        </div>
        <div className="tab-pane fade" id="prestamos" role="tabpanel">
          <LoanForm selectedDB={selectedDB} onCreated={handleRefresh} />
          <LoanList selectedDB={selectedDB} refresh={refresh} />
        </div>
      </div>
    </div>
  );
};

export default TabbedDashboard;
