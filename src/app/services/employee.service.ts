import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
private apiUrl = 'https://comp3133-101491383-assignment1.onrender.com/graphql';

  constructor() { }

  async getEmployees() {
    const query = `
      query GetEmployees {
        employees {
          id
          first_name
          last_name
          email
          department
          designation
        }
      }
    `;

    try {
      const response = await axios.post(this.apiUrl, { query });
      return response.data.data.employees;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  async addEmployee(employeeData: any) {
    const mutation = `
      mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String, $designation: String!, $salary: Float!, $date_of_joining: String!, $department: String!, $employee_photo_base64: String) {
        addEmployee(
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo_base64: $employee_photo_base64
        ) {
          id
          first_name
        }
      }
    `;

    try {
      const response = await axios.post(this.apiUrl, {
        query: mutation,
        variables: employeeData
      });
      return response.data.data.addEmployee;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  }

  async getEmployeeById(id: string) {
    const query = `
      query GetEmployee($id: ID!) {
        employee(id: $id) {
          id
          first_name
          last_name
          email
          gender
          designation
          salary
          department
          employee_photo
        }
      }
    `;
    try {
      const response = await axios.post(this.apiUrl, { query, variables: { id } });
      return response.data.data.employee;
    } catch (error) {
      console.error('Error fetching employee details:', error);
      throw error;
    }
  }

  async deleteEmployee(eid: string) {
    const mutation = `
      mutation DeleteEmployee($eid: ID!) {
        deleteEmployeeByEid(eid: $eid)
      }
    `;
    try {
      const response = await axios.post(this.apiUrl, { query: mutation, variables: { eid } });
      return response.data.data.deleteEmployeeByEid;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  }

  async updateEmployee(eid: string, employeeData: any) {
    const mutation = `
      mutation UpdateEmployee($eid: ID!, $first_name: String, $last_name: String, $email: String, $gender: String, $designation: String, $salary: Float, $department: String, $employee_photo_base64: String) {
        updateEmployeeByEid(
          eid: $eid,
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          department: $department,
          employee_photo_base64: $employee_photo_base64
        ) {
          id
          first_name
        }
      }
    `;

    try {
      const response = await axios.post(this.apiUrl, {
        query: mutation,
        variables: { eid, ...employeeData }
      });
      return response.data.data.updateEmployeeByEid;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  }

  async searchEmployees(filter: string) {
    const query = `
      query SearchEmployee($filter: String!) {
        searchEmployee(filter: $filter) {
          id
          first_name
          last_name
          email
          department
          designation
        }
      }
    `;

    try {
      const response = await axios.post(this.apiUrl, {
        query: query,
        variables: { filter }
      });
      return response.data.data.searchEmployee;
    } catch (error) {
      console.error('Error searching employees:', error);
      throw error;
    }
  }
}