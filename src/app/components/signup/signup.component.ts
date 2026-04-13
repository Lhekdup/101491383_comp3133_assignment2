import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    try {
      this.errorMessage = '';
      this.successMessage = '';

      await this.authService.signup(this.user.username, this.user.email, this.user.password);
      
      this.successMessage = 'Account created successfully! Redirecting to login...';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    } catch (error: any) {
      this.errorMessage = error.response?.data?.errors?.[0]?.message || 'An error occurred during signup.';
      console.error(error);
    }
  }
}