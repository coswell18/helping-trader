import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlashCard, StudyList } from 'src/app/shared/models/gestion.models';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  @ViewChild('targetDiv') targetDiv!: ElementRef;
  alertType:string=""
  alertMessage:string=""
  stateAlert:boolean=false;
  type : string = ""
  list:StudyList[] = []
  studyLists: StudyList = new StudyList("","Pregunta/Respuesta","","",[])
  selectedImage: any = null;
  flashCard: FlashCard = new FlashCard()
  stateButtonEdit:boolean=false
  
  resultado!: string;

  dbService:DbService = inject(DbService)

  formularioListaEstudio = new FormGroup({
    // name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    type: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    note: new FormControl('', []),
    question: new FormControl('', []),
    answer: new FormControl('', []),
  });

  scrollToDiv(): void {
    this.targetDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  submit() {
    if (this.formularioListaEstudio.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
  }
  ngOnInit(): void {
    this.loadBd()
  }

  callModal(alertType:string,alertMessage:string){
    this.alertType = alertType
    this.alertMessage = alertMessage
    this.stateAlert = true;
  }

  endAlert(){
    setTimeout(() => {
      this.stateAlert = false;
    }, 500);
    
  }

  addFlashCard(){
    if((this.studyLists.type == "Nota" && this.flashCard.note=="") || (this.studyLists.type == "Pregunta/Respuesta" && (this.flashCard.question==="" || this.flashCard.answer===""))){
      this.callModal("advertencia","Debes llenar los campos para poder agregar el item a la lista")
    }else{
      let now = new Date().toString()
      let id = this.studyLists.flashCards.length>0?(Number(this.studyLists.flashCards[this.studyLists.flashCards.length-1].id)+1):0
      this.studyLists.flashCards.push({id:id+"",note:this.flashCard.note,question:this.flashCard.question,answer:this.flashCard.answer,interval:1,nextReview:now,image:this.flashCard.image})
      this.flashCard.note = ""
      this.flashCard.question = ""
      this.flashCard.answer = ""
      this.scrollToDiv()
    }
  }

  loadFile(){
    let file = document.getElementById("file")
    file?.click()
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = () => {
      this.flashCard.image = reader.result as string;
    };
  }

  clean(){
    this.studyLists = new StudyList("","Pregunta/Respuesta","","",[])
    this.flashCard = new FlashCard()
    this.stateButtonEdit = false; 
  }

  changeType(){
    this.flashCard.note = ""
    this.flashCard.question = ""
    this.flashCard.answer = ""
  }

  addStudyList(){
    let flashcards = [...this.studyLists.flashCards];
    let id = this.list.length>0?(Number(this.list[this.list.length-1].id)+1):0
    this.list.push( new StudyList(id+"",this.studyLists.type,this.studyLists.name, this.studyLists.description,flashcards));
    this.selectedImage = null;
    this.clean();
    this.saveBd();
    this.callModal("exito","Se ha adicionado una nueva lista de estudio")
  }

  editStudyList(){
    let index = this.list.findIndex(item =>item.id == this.studyLists.id)
    this.list[index]= (new StudyList(this.studyLists.id,this.studyLists.type,this.studyLists.name,this.studyLists.description,this.studyLists.flashCards));
    this.selectedImage = null;
    this.stateButtonEdit = false; 
    this.saveBd();
    this.callModal("exito","Se ha editado la lista de estudio correctamente")
  }

  showStudyListSelected(event:StudyList){
    this.studyLists = event
    // window.scrollTo(0,280)
    this.stateButtonEdit = true
    document.getElementById("button-open-modal-edit")?.click()
  }

  deleteElement(event:StudyList){
    let index = this.list.findIndex(item =>item.id == event.id)
    this.list.splice(index,1)
    this.saveBd();
    this.callModal("exito","Se ha eliminado la lista de estudio correctamente")
  }

  deleteFlashCard(event:FlashCard){
    let index = this.studyLists.flashCards.findIndex(item =>item.id == event.id)
    this.studyLists.flashCards.splice(index,1)
  }

  playElement(event:StudyList){
    this.studyLists = JSON.parse(JSON.stringify(event))
    document.getElementById("button-open-modal-study-list")?.click()
  }

  saveBdFlashCardReview(event:StudyList){
    let index = this.list.findIndex(item =>item.id == event.id)
    this.list[index].flashCards.map((card,i)=>{
      let ele = event.flashCards.find(c=>card.id === c.id)
      if(ele!=null){
        this.list[index].flashCards[i]=ele; 
      }

    })
    this.dbService.setItemBd("studieslist",this.list)
  }

  saveBd(){
    this.dbService.setItemBd("studieslist",this.list)
  }

  async loadBd(){
    let data:any = await this.dbService.getItemBd("studieslist")
    data != null?this.list = data:null
  }
}
