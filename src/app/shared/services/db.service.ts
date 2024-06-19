import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { db } from '../models/db';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  
  constructor() {}

  async setItemBd(id:string,data:object) {
    let item:any = await this.getItemBd(id)
    if(item==null){
      await db.hepingTrader.add({
        id:id,
        data: data
      });
    }else{
      await db.hepingTrader.bulkPut([{id:id, data:data}])
    }
  }  

  async getItemBd(id:string) {
    return await db.hepingTrader
      .where({
        id: id,
      })
      .toArray().then(ele=>{
        if(ele.length>0){
          return ele[0].data
        }
        return null
      });
  }
}
