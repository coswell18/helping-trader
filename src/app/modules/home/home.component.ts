import { AfterViewChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewChecked{
  constructor(private router: Router){
    
  }

  ngAfterViewChecked(): void {
  }

  navigateTo(path:string){
    this.router.navigate([path])
  }
}
