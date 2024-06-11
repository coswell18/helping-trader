import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudyList } from 'src/app/shared/models/gestion.models';

@Component({
  selector: 'app-table-flashcard',
  templateUrl: './table-flashcard.component.html',
  styleUrls: ['./table-flashcard.component.scss']
})
export class TableFlashCardComponent {
  pageSize = 5;
  page = 1
  @Input() data=[{id:"",note:"",question:"",answer:"",image:""}]
  @Input() studyLists ={type:""}

  @Output() deleteElement  = new EventEmitter<any>();


  deleteData(data:any){
    this.deleteElement.emit(data)
  }

}
