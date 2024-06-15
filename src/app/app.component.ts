import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from './shared/models/db';


@Component({
  // standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestion-control-trading';
  
  todoLists$ = liveQuery(() => db.hepingTrader.toArray());
  data = new Date();

  constructor(){
    this.addNewList()
  }
  async addNewList() {
    this.data = new Date();
    await db.hepingTrader.add({
      data: this.data.toDateString()
    });
  }  
}
