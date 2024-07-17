import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    if(credentials.email ==="unirtfm" && credentials.password==="unirtfm"){
      localStorage.setItem('token', "unirtfm");
      localStorage.setItem('tokendate', new Date().toString());
      return true
    }
    return false
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    let date:any = localStorage.getItem('tokendate');
    date = new Date(date)
    let dateTmp = new Date();
    let token = !!localStorage.getItem('token')
    let dayTmp = dateTmp.getDate()
    let day = date.getDate()
    if(dayTmp == day && token){
      return true;
    }else{
      localStorage.removeItem('token');
      localStorage.removeItem('tokendate');
      return false;
    }
  }
}