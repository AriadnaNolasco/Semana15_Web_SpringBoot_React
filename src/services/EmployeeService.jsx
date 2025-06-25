// src/services/EmployeeService.js
import axios from 'axios';

// ¡MUY IMPORTANTE! Asegúrate de que esta URL coincida con la de tu backend Spring Boot
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/empleados";

class EmployeeService {

  getEmployees() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }

  createEmployee(employee) {
    return axios.post(EMPLOYEE_API_BASE_URL, employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
  }

  updateEmployee(employee, employeeId) {
    return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
  }
}

export default new EmployeeService(); // Exporta una instancia de la clase