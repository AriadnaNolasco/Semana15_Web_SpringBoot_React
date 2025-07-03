// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService.jsx'; // Importa el servicio
import { useNavigate } from 'react-router-dom'; // Para la navegación con rutas

function EmployeeList() {
  const [employees, setEmployees] = useState([]); // Estado para almacenar la lista de empleados
  const navigate = useNavigate(); // Hook para la navegación

  // useEffect se ejecuta después del renderizado inicial y cada vez que sus dependencias cambian
  useEffect(() => {
    fetchEmployees(); // Llama a la función para cargar empleados cuando el componente se monta
  }, []); // Array de dependencias vacío significa que se ejecuta solo una vez al montar

  const fetchEmployees = () => {
    EmployeeService.getEmployees()
      .then((response) => {
        setEmployees(response.data); // Actualiza el estado con los datos recibidos
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        // Aquí puedes manejar errores, como mostrar un mensaje al usuario
      });
  };

  const editEmployee = (id) => {
    // Redirige al formulario de actualización con el ID del empleado
    navigate(`/update-employee/${id}`);
  };

  const deleteEmployee = (id) => {
    // Pide confirmación antes de eliminar (opcional, pero buena práctica)
    if (window.confirm("¿Estás seguro de que quieres eliminar este empleado?")) {
      EmployeeService.deleteEmployee(id)
        .then((response) => {
          console.log("Empleado eliminado:", response.data);
          fetchEmployees(); // Refresca la lista después de eliminar
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  return (
    <div className="container mt-4"> {/* Clase container y margin-top de Bootstrap */}
      <h2 className="text-center mb-4">Lista de Empleados</h2> {/* Título centrado y margin-bottom */}
      <div className="d-flex justify-content-end mb-3"> {/* Contenedor flex para alinear botón */}
        <button
          className="btn btn-primary" // Botón azul primario de Bootstrap
          onClick={() => navigate('/add-employee')} // Redirige al formulario para añadir
        >
          Añadir Empleado
        </button>
      </div>
      <table className="table table-striped table-bordered shadow-sm"> {/* Clases de tabla de Bootstrap */}
        <thead className="table-dark"> {/* Encabezado oscuro de Bootstrap */}
          <tr>
            <th>ID</th> {/* Asumiendo que el ID viene del backend y quieres mostrarlo */}
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {console.log("Valor de employees justo antes del map:", employees, "Es un array:", Array.isArray(employees))}
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.nombre}</td>
              <td>{employee.apellido}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  onClick={() => editEmployee(employee.id)}
                  className="btn btn-info btn-sm" // Botón azul claro y pequeño
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="btn btn-danger btn-sm ms-2" // Botón rojo y pequeño, con margen a la izquierda
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;