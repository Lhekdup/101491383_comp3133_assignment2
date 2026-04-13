import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  async loadEmployees() {
    try {
      this.employees = await this.employeeService.getEmployees();
    } catch (error) {
      this.errorMessage = 'Failed to load employees. Please check if your backend is running.';
      console.error(error);
    }
  }
async deleteEmployee(id: string) {
    if(confirm("Are you sure you want to delete this employee?")) {
      try {
        await this.employeeService.deleteEmployee(id);
        this.loadEmployees(); 
      } catch (error) {
        this.errorMessage = 'Failed to delete employee.';
        console.error(error);
      }
    }
  }
}