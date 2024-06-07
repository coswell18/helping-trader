import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SharingService } from 'src/app/shared/services/sharing.service';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit,AfterViewInit {
  subscriptions: Subscription = new Subscription();
  menuObj=[{icono:'assets/icons/house.svg',path:'inicio',texto:'Inicio',titulo:'¿Qué es Helping Trader?',descripcion:"Acá está todo lo que necesitas saber"},{icono:'assets/icons/list-check.svg',path:'estrategias',texto:'Estrategias',titulo:'Gestiona tus estrategias',descripcion:""},{icono:'assets/icons/clipboard-data.svg',path:'operaciones',texto:'Operaciones',titulo:'Registra tus operaciones',descripcion:""},{icono:'assets/icons/bar-chart.svg',path:'dashboard',texto:'Dasboard',titulo:'Analiza tus resultados',descripcion:""},{icono:'assets/icons/book.svg',path:'retroalimentacion',texto:'Retroalimentación',titulo:'Aprende y refresca tu memoria',descripcion:""}]

  @Input() tipo:string = "";
  colapsado:boolean=false;
  itemSelected:string="home";
  sharingService = inject(SharingService)
  sizeScreen:boolean=false;
  @ViewChild('menu') menu:ElementRef |null = null

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // this.itemSelected = location.pathname.replaceAll("/","")
    this.sharingService.sharingInfoObservable = {titulo:"¿Qué es Helping Trader?",descripcion:"Acá está todo lo que necesitas saber"}
    let ele = this.menuObj.find(ele=>ele.path == location.pathname.replaceAll("/",""))
    this.selectItem(ele)

    window.addEventListener('resize', () =>{
      this.sizeScreen = window.innerWidth > 992 ? true : false 
      this.loadResponsive()
    });
  }

  ngAfterViewInit(): void {
    this.sizeScreen = window.innerWidth > 992 ? true : false;
    this.loadResponsive()
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadResponsive(){
    if(this.sizeScreen){
      this.menu?.nativeElement.classList.remove("responsive")
    }else{
      this.menu?.nativeElement.classList.add("responsive")
    }
  }

  moveArrow(elem:string){
    let ele = document.querySelector(`#arrow${elem}`);
    if(ele){
      if(ele.classList.contains("css-angle-cero")){
        ele.classList.remove("css-angle-cero")
      }else{
        ele.classList.add("css-angle-cero")
      }
    }
    this.colapsado = false;
  }

  selectItem(item:any){
    this.sharingService.sharingInfoObservable = {titulo:item.titulo,descripcion:item.descripcion}
    this.router.navigate([item.path])
    this.itemSelected = item.path
    this.sizeScreen?null:this.collapseMenuResponsive()
    // this.colapsado = false;
  }

  collapseMenu(){
    this.colapsado = !this.colapsado;
    let submenus = document.querySelectorAll(".show");
    let arrows = document.querySelectorAll(".css-angle-cero");
    for(let i=0;i<submenus.length;i++){
      submenus[i].classList.remove("show");
    }
    for(let i=0;i<arrows.length;i++){
      arrows[i].classList.remove("css-angle-cero");
    }
  }

  collapseMenuResponsive(){
    this.menu?.nativeElement.classList.toggle('responsive-colapse')
  }

}
