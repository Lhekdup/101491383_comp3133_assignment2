import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    try {
      this.errorMessage = '';
      
      const token = await this.authService.login(this.credentials.email, this.credentials.password);
      
      if (token) {
        this.router.navigate(['/employees']);
      } else {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    } catch (error: any) {
      this.errorMessage = error.response?.data?.errors?.[0]?.message || 'Invalid email or password.';
      console.error(error);
    }
  }
}