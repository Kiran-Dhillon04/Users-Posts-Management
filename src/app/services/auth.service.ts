import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string, password: string): boolean {
    if (email === 'kiran@gmail.com' && password === '123456') {
      const fakeToken = 'mock-jwt-token';
      localStorage.setItem('token', fakeToken);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
