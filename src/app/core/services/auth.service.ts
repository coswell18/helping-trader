import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.example.com/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    if(credentials.email ==="tfmunir" && credentials.password==="tfmunir"){
      localStorage.setItem('token', "response.token");
      return true
    }
    return false
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}