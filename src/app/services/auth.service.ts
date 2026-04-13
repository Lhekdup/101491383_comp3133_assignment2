import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://comp3133-101491383-assignment1.onrender.com:4000/graphql'; 

  constructor() { }

  async login(email: string, password: string) {
    const query = `
      query Login($email: String, $password: String) {
        login(email: $email, password: $password)
      }
    `;

    try {
      const response = await axios.post(this.apiUrl, {
        query: query,
        variables: { email, password }
      });
      
      const token = response.data.data.login; 
      
      if (token) {
        localStorage.setItem('auth_token', token);
      }
      
      return token;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }

  async signup(username: string, email: string, password: string) {
    const mutation = `
      mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
          id
          username
          email
        }
      }
    `;

    try {
      const response = await axios.post(this.apiUrl, {
        query: mutation,
        variables: { username, email, password }
      });
      return response.data.data.signup;
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}