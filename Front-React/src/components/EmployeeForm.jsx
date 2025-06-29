// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Para obtener el ID si es una operación de edición

  // Cargar datos del empleado si es edición
  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then((response) => {
          setNombre(response.data.nombre);
          setApellido(response.data.apellido);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching employee for update:", error);
          // Podrías redirigir a una página de error o mostrar un mensaje
        });
    }
  }, [id]); // Se ejecuta cuando el ID de la URL cambia

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    const employee = { nombre, apellido, email };

    if (id) {
      // Si hay un ID, es una actualización
      EmployeeService.updateEmployee(employee, id)
        .then((response) => {
          console.log("Empleado actualizado:", response.data);
          navigate('/employees'); // Vuelve a la lista de empleados
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    } else {
      // Si no hay ID, es una creación
      EmployeeService.createEmployee(employee)
        .then((response) => {
          console.log("Empleado creado:", response.data);
          navigate('/employees'); // Vuelve a la lista de empleados
        })
        .catch((error) => {
          console.error("Error creating employee:", error);
        });
    }
  };

  const getTitle = () => {
    return id ? "Edición de Empleado" : "Registro de Empleado";
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2"> {/* Columna centrada de 8 unidades de ancho */}
          <div className="card shadow-lg"> {/* Tarjeta con sombra */}
            <div className="card-header bg-primary text-white text-center"> {/* Cabecera de tarjeta azul */}
              <h3>{getTitle()}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={saveOrUpdateEmployee}> {/* El onSubmit en el form es clave */}
                <div className="mb-3"> {/* Margen inferior para cada grupo de formulario */}
                  <label htmlFor="nombre" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    placeholder="Digite su nombre"
                    name="nombre"
                    id="nombre"
                    className="form-control" // Clase de control de formulario de Bootstrap
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    minLength="4"
                    maxLength="10"
                  />
                  {/* Aquí podrías añadir validación de Bootstrap si quisieras, por ejemplo:
                  <div className="invalid-feedback">
                      El nombre debe tener entre 4 y 10 caracteres.
                  </div>
                  */}
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido:</label>
                  <input
                    type="text"
                    placeholder="Digite su apellido"
                    name="apellido"
                    id="apellido"
                    className="form-control"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    minLength="4"
                    maxLength="10"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    placeholder="Digite su email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    // El patrón de email HTML5 ya es bastante bueno, pero puedes añadir más validación si necesitas.
                  />
                </div>
                <button type="submit" className="btn btn-success"> {/* Botón de éxito (verde) */}
                  Guardar
                </button>
                <button
                  type="button" // Importante: para que no actúe como submit
                  className="btn btn-secondary ms-2" // Botón secundario (gris) con margen
                  onClick={() => navigate('/employees')} // Botón para cancelar
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;