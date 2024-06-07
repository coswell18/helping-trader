import { Component, OnInit, inject } from '@angular/core';
import { SharingService } from 'src/app/shared/services/sharing.service';

@Component({
  selector: 'app-principal-banner',
  templateUrl: './principal-banner.component.html',
  styleUrls: ['./principal-banner.component.scss']
})
export class PrincipalBannerComponent implements OnInit {
  titulo:string="";
  descripcion:string="";

  sharingService = inject(SharingService)
  ngOnInit():void{
    this.sharingService.getSharingInfoObservable().subscribe(modulo=>{
      this.titulo = modulo.titulo
      this.descripcion = modulo.descripcion
    })
  }

}
