import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  service: AuthService = inject(AuthService)
  router: Router = inject(Router)
  logout(){
    this.service.logout()
    this.router.navigate(["/login"])
    // this.
  }
}
