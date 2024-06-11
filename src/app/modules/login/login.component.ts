import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message:string="";

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if(this.authService.login({ email: this.email, password: this.password })){
      this.router.navigate(['/inicio']);
    }else{
      this.message = "Usuario o contraseña incorrecto, intente nuevamente"
      document.getElementById("btn-modal-message")?.click()
      // alert("")
    } 
  }
}