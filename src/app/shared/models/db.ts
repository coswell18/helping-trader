import Dexie, { Table } from 'dexie';

export interface BDHelpingTrader {
    id?: number;
    data:string
  }

export class AppDB extends Dexie {
  hepingTrader!: Table<BDHelpingTrader, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      hepingTrader: 'id,data'
    });
    // this.on('populate', () => this.populate());
  }

//   async populate() {
//     const todoListId = await db.todoLists.add({
//         title: 'To Do Today',
//       });
//       await db.todoItems.bulkAdd([
//         {
//           todoListId,
//           title: 'Feed the birds',
//         },
//         {
//           todoListId,
//           title: 'Watch a movie',
//         },
//         {
//           todoListId,
//           title: 'Have some sleep',
//         },
//       ]);
      
//     const estrategiesId = await db.hepingTrader.add({
//         id:"strategies",
//         data: 'estrate',
//     });
    

//     // const a = db.hepingTrader.where("id").equals("strategies").toArray().then(ele=>{
//     //     let data:any = ele[0].data
//     //     let b =JSON.parse(data);
//     //     let c =""
//     // })
    
//   }
}

export const db = new AppDB();