import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-table-generic',
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})
export class TableGenericComponent implements OnInit{
  pageSize = 5;
  page = 1
  @Input() data:any[]=[]
  @Input() columns:any=[]
  @Input() actions:any={}
  @Input() title:string="Título"
  @Output() playElement  = new EventEmitter<any>();
  @Output() selectedElement  = new EventEmitter<any>();
  @Output() deleteElement  = new EventEmitter<any>();
  element:any;
  sizeScreen:boolean=false;

  ngOnInit(): void {
    window.addEventListener('resize', () =>{
      this.sizeScreen = (window.innerWidth <= 576 || this.isMobile()) ? true : false 
    });
  }

  ngAfterViewInit(): void {
    this.sizeScreen = (window.innerWidth <= 576 || this.isMobile()) ? true : false 
  }

  isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
  }
  sendData(data:any){
    this.selectedElement.emit(data)
  }

  playData(data:any){
    this.playElement.emit(data)
  }

  confirmDelete(data:any){
    document.getElementById("btn-confirm-delete")?.click()
    this.element = data;
  }

  deleteData(){
    this.deleteElement.emit(this.element)
  }

  containDescription(item:any,column:any){
    if(column.name.toLowerCase().includes("descrip".toLowerCase())){
      if(item[column.id].length > 15){
        return item[column.id].substring(0,15)+"..."
      }
    }
    return item[column.id];
  }
}
