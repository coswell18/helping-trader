import { Component, HostListener } from '@angular/core';
import {dataMock} from './shared/data-mock/datamock'
import { Operation } from './shared/models/gestion.models';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  // standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestion-control-trading';
  routerSubscription: Subscription;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Lógica para manejar la navegación
        console.log('Navegando a:', event.url);
      }
    });
  }

  @HostListener('window:load', ['$event'])
  onLoad(event: Event): void {
    console.log('Página cargada de nuevo:', event);
    this.router.navigate([location.pathname])
    // Aquí puedes agregar la lógica que necesites al cargar la página
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    const confirmationMessage = '¿Estás seguro de que deseas salir?';
    // $event.returnValue = confirmationMessage;
    this.router.navigate([location.href])
    // return confirmationMessage;
  }

  ngOnDestroy() {
    // Desuscribirse del router events para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
