import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId: string = '';
  employee: any = {
    first_name: '', last_name: '', email: '', gender: '', 
    designation: '', salary: 0, department: '', employee_photo_base64: ''
  };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  async ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    if (this.employeeId) {
      try {
        const data = await this.employeeService.getEmployeeById(this.employeeId);
        
        this.employee = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          gender: data.gender,
          designation: data.designation,
          salary: data.salary,
          department: data.department
        };
      } catch (error) {
        this.errorMessage = 'Failed to load employee data.';
      }
    }
  }

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
      await this.employeeService.updateEmployee(this.employeeId, this.employee);
      this.router.navigate(['/employees']);
    } catch (error: any) {
      this.errorMessage = error.response?.data?.errors?.[0]?.message || 'Failed to update employee.';
      console.error(error);
    }
  }
}