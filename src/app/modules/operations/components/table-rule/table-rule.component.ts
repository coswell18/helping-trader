import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-rule',
  templateUrl: './table-rule.component.html',
  styleUrls: ['./table-rule.component.scss']
})
export class TableRuleComponent {
  pageSize = 5;
  page = 1
  @Input() data=[{id:"",regla:"",estado:false}]
  @Output() deleteElement  = new EventEmitter<any>();


  deleteData(data:any){
    this.deleteElement.emit(data)
  }
}
