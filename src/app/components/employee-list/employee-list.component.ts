import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  errorMessage: string = '';
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  async loadEmployees() {
    try {
      this.employees = await this.employeeService.getEmployees();
    } catch (error) {
      this.errorMessage = 'Failed to load employees.';
      console.error(error);
    }
  }

  async onSearch() {
    try {
      if (this.searchQuery.trim() === '') {
        this.loadEmployees();
      } else {
        this.employees = await this.employeeService.searchEmployees(this.searchQuery);
      }
    } catch (error) {
      this.errorMessage = 'Search failed.';
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