import { Component, inject } from '@angular/core';
import { DbService } from './shared/services/db.service';


@Component({
  // standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestion-control-trading';
  

  dbService:DbService = inject(DbService)
  constructor(){
    // this.addNewList()
    let strategies:any = localStorage.getItem("strategies")
    strategies!=null?this.dbService.setItemBd("strategies",JSON.parse(strategies)):null
    let operations:any = localStorage.getItem("operations")
    operations!=null?this.dbService.setItemBd("operations",JSON.parse(operations)):null
    let studieslist:any = localStorage.getItem("studieslist")
    studieslist!=null?this.dbService.setItemBd("studieslist",JSON.parse(studieslist)):null

  }

}
