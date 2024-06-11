import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/shared/services/sharing.service';


@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() path = ""
  @Input() image = ""
  @Input() title = ""
  @Input() description = ""
  sharingService = inject(SharingService)

  constructor(private router: Router){
    
  }

  navigate(){
    this.sharingService.sharingInfoObservable = {titulo:"",descripcion:"",path:this.path.replace("/","")}
    this.router.navigate([this.path.replace("/","")])
  }
}
