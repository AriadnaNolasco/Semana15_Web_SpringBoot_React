// src/services/EmployeeService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const EMPLOYEE_API_BASE_PATH = "/empleados";
class EmployeeService {

  getEmployees() {
    return axios.get(BASE_URL + EMPLOYEE_API_BASE_PATH);
  }

  createEmployee(employee) {
    return axios.post(BASE_URL + EMPLOYEE_API_BASE_PATH, employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(BASE_URL + EMPLOYEE_API_BASE_PATH + '/' + employeeId);
  }

  updateEmployee(employee, employeeId) {
    return axios.put(BASE_URL + EMPLOYEE_API_BASE_PATH + '/' + employeeId, employee);
  }

  deleteEmployee(employeeId) {
    return axios.delete(BASE_URL + EMPLOYEE_API_BASE_PATH + '/' + employeeId);
  }
}

export default new EmployeeService(); // Exporta una instancia de la clase