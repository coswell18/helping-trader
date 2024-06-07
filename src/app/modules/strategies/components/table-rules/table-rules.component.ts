import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-rules',
  templateUrl: './table-rules.component.html',
  styleUrls: ['./table-rules.component.scss']
})
export class TableRulesComponent {
  pageSize = 5;
  page = 1
  @Input() data=[{id:"",regla:""}]
  @Output() deleteElement  = new EventEmitter<any>();


  deleteData(data:any){
    this.deleteElement.emit(data)
  }

}
