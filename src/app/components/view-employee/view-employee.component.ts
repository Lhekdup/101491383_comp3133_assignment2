import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: any = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute, 
    private employeeService: EmployeeService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.employee = await this.employeeService.getEmployeeById(id);
      } catch (error) {
        this.errorMessage = 'Failed to load employee details.';
        console.error(error);
      }
    }
  }
}