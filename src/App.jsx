// src/App.js
import React from 'react';
// Importa los componentes necesarios de react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Importa tus componentes de Empleados
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
// Puedes añadir un archivo CSS global si lo necesitas, pero Bootstrap ya cubre mucho
// import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Barra de Navegación de Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Sistema de Empleados</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/employees">Lista de Empleados</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-employee">Registrar Empleado</Link>
                </li>
                {/* Aquí añadirías enlaces para Producto y Categoría más adelante */}
              </ul>
            </div>
          </div>
        </nav>

        {/* Contenedor principal para las rutas */}
        <div className="container">
          <Routes>
            {/* Ruta por defecto, redirige a la lista de empleados */}
            <Route path="/" element={<EmployeeList />} />
            {/* Ruta para la lista de empleados */}
            <Route path="/employees" element={<EmployeeList />} />
            {/* Ruta para el formulario de añadir nuevo empleado */}
            <Route path="/add-employee" element={<EmployeeForm />} />
            {/* Ruta para el formulario de actualizar empleado, con un ID como parámetro */}
            <Route path="/update-employee/:id" element={<EmployeeForm />} />
            {/* Aquí irían las rutas para Producto y Categoría */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
