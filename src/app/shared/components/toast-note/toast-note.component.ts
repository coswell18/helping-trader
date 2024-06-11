import { AfterViewInit, Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FlashCard, Operation, Rule, StudyList } from '../../models/gestion.models';
import { SharingService } from '../../services/sharing.service';


@Component({
  selector: 'app-toast-note',
  templateUrl: './toast-note.component.html',
  styleUrls: ['./toast-note.component.scss']
})
export class ToastNoteComponent implements AfterViewInit{
  timer:number = (0.2*60)*1000;
  timerShowMessage:number = 20*1000;
  message:string="";
  dataOperations:Operation[] = []
  dataStudiesList:StudyList[] = []
  rules:Rule[]=[];
  notes:any=[];
  sharedService:SharingService = inject(SharingService)
  @ViewChild('toast') toast: ElementRef  | null = null;
  interval:any;
  typeNotes:string[]=["note","rule"];
  type:string = "note"

  constructor(){
    
  }
  ngAfterViewInit(): void {
    // this.getData()
    this.toastNotes()
  }


  toastNotes(){
    this.sharedService.getSharingToastNotesObservable().subscribe(state=>{
      if(state==false){
        try {
          clearInterval(this.interval);
        } catch (error) {
          console.error("Error al cerrar el interval"+error)
        }
      }else{
        this.playTask()
      }
    })
  }

  closeToast(){
    this.toast?.nativeElement.classList.remove("active");
  }

  getData(){
    let dataOperations:any = localStorage.getItem("operations")?localStorage.getItem("operations"):"[]"
    let dataStudiesList:any = localStorage.getItem("studieslist")?localStorage.getItem("studieslist"):"[]"
    this.dataOperations = JSON.parse(dataOperations)
    this.dataStudiesList = JSON.parse(dataStudiesList)
    this.getRules()
    this.getNotes()
  }

  playTask(){
    this.interval = setInterval(()=>{
      this.type  = this.typeNotes[Math.floor(Math.random() * this.typeNotes.length)];
      this.type==="rule"?this.playTaskRules():this.playTaskNotes();
    },this.timer)
  }
  playTaskRules(){
  
    let op = this.getRandomRule()
    if(op != null){
      this.message = "Has olvidado ejecutar la regla <b><i>'"+ op.rule +"'</i></b> para la estrategia <b><i>'"+op.nameStrategy+"'</i></b>. Recuerda que el éxito de una disciplina sólida es cumplir las reglas en su totalidad.";
      this.toast?.nativeElement.classList.add("active");
      setTimeout(() => {
        this.toast?.nativeElement.classList.remove("active");
        
      }, this.timerShowMessage);
    }
  }

  playTaskNotes(){
    let note = this.getRandomNote()
    if(note != null && note != ""){
      this.message = "<b>Nota: </b>"+note;
      this.toast?.nativeElement.classList.add("active");
      setTimeout(() => {
        this.toast?.nativeElement.classList.remove("active");
        
      }, this.timerShowMessage);
    }
  }

  getNotes(){
    let slist:StudyList[] = this.dataStudiesList.filter((list)=>list.type=="Nota")
    this.notes = []
    if(slist.length > 0){
      slist.map((list)=>{
        this.notes.push(list.flashCards)
      })
    }
  }

  getRules(){
    this.rules = []
    this.dataOperations.map((operation)=>{
      let rules:any = operation["rules"].filter(rule=> !rule.estado)
      rules = {nameStrategy:operation["nameStrategy"],rules:rules}
      if(rules.rules.length>0){
        this.rules.push(rules)
      }
    })
  }

  getRandomNote():any {
    this.getData()
    if(this.notes.length>0){
      let randomIndex = Math.floor(Math.random() * this.notes.length);
      const lists:any = this.notes[randomIndex]
      randomIndex = Math.floor(Math.random() * lists.length);
      let note = lists[randomIndex].note;
      
      return note;

    }else{
      return null;
    }
  }

  getRandomRule():any {
    this.getData()
    if(this.rules.length>0){
      let randomIndex = Math.floor(Math.random() * this.rules.length);
      const operation:any = this.rules[randomIndex]
      randomIndex = Math.floor(Math.random() * operation.rules.length);
      let rule = operation.rules[randomIndex].regla;
      operation.rule = rule
      return operation;

    }else{
      return null;
    }
  }
}
