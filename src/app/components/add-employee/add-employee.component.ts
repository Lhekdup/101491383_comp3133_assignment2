import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: 0,
    date_of_joining: '',
    department: '',
    employee_photo_base64: ''
  };

  errorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.employee.employee_photo_base64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    try {
      this.employee.salary = Number(this.employee.salary);
      
      await this.employeeService.addEmployee(this.employee);
      
      this.router.navigate(['/employees']);
    } catch (error: any) {
      this.errorMessage = error.response?.data?.errors?.[0]?.message || 'Failed to add employee.';
      console.error(error);
    }
  }
}