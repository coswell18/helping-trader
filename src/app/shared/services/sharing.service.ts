import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Modulo {
  titulo:string;
  descripcion:string;
  path:string;
}

@Injectable({
  providedIn: 'root',
})
export class SharingService {

  private sharingInfoService: BehaviorSubject<Modulo> = new BehaviorSubject<Modulo>({titulo:"",descripcion:"",path:""});
  private sharingToastNotesService: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  
  constructor() {}

  getSharingInfoObservable(): Observable<Modulo> {
    return this.sharingInfoService.asObservable();
  }

  set sharingInfoObservable(data: Modulo) {
    this.sharingInfoService.next(data);
  }

  getSharingToastNotesObservable(): Observable<boolean> {
    return this.sharingToastNotesService.asObservable();
  }

  set sharingToastNotesObservable(data: boolean) {
    this.sharingToastNotesService.next(data);
  }
}
