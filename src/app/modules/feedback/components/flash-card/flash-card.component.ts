import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FlashCard, StudyList } from 'src/app/shared/models/gestion.models';
import { DbService } from 'src/app/shared/services/db.service';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent implements OnChanges{
  @Input() list: StudyList= new StudyList("","","","",[])
  @Output() sendStudyList:EventEmitter<StudyList> = new EventEmitter<StudyList>()
  studyList: StudyList= new StudyList("","","","",[])
  range:number=5;

  posNote:number = 0;
  stateAnswer:boolean = false;

  dbService:DbService = inject(DbService)


  ngOnChanges(changes: any): void {
    if(!changes.list.firstChange){
      if(changes.list.currentValue != ""){
        this.loadFlashCards()
        this.stateAnswer = false
      }
    } 
  }

  async sendData(){
    this.sendStudyList.emit(this.studyList);
  }

  async loadFlashCards(){
    let today = new Date();
   

    let data:any = await this.dbService.getItemBd("studieslist")
    data != null?data = data:data = []

    let index = data.findIndex((item: { id: string; }) =>item.id == this.list.id)
    if(index!=-1){
      let list:StudyList = data[index];
      this.studyList = JSON.parse(JSON.stringify(list))
      this.studyList.flashCards = this.studyList.flashCards.filter(card => new Date(card.nextReview) <= today)
      // this.selecteRage()
      this.posNote=0
    }
  }

  selecteRage(){
    if(this.range < this.studyList.flashCards.length){
      let ini = Math.floor(Math.random() * this.studyList.flashCards.length)
      let total = this.studyList.flashCards.length - ini;
      if(total <= this.range){
        this.studyList.flashCards = this.studyList.flashCards.slice(ini,this.studyList.flashCards.length)
      }else{
        this.studyList.flashCards = this.studyList.flashCards.slice(ini,ini+this.range)
      }
    } 
  }
  showAnswer(){
    this.stateAnswer = true;
  }

  updateFlashcard( score: string): void {
    const now = new Date();
    let intervalMultiplier: number = 0;

    switch (score) {
      case 'hard':
        this.studyList.flashCards[this.posNote].interval = 0; // 1 minuto en días
        intervalMultiplier = 1;
        break;
      case 'good':
        intervalMultiplier = 1;
        break;
      case 'easy':
        intervalMultiplier = 2;
        break;
    }

    if (score !== 'hard') {
      this.studyList.flashCards[this.posNote].interval < 1 ? this.studyList.flashCards[this.posNote].interval = 1 : null
      this.studyList.flashCards[this.posNote].interval *= intervalMultiplier;
    }
    const intervalInMs = this.studyList.flashCards[this.posNote].interval * 24 * 60 * 60 * 1000;
    this.studyList.flashCards[this.posNote].nextReview = new Date(now.getTime() + intervalInMs).toString();
    this.studyList.flashCards[this.posNote] = JSON.parse(JSON.stringify(this.studyList.flashCards[this.posNote]));
  }

  

  async putScore(score:string){
    this.updateFlashcard(score)
    await this.sendData()
    this.stateAnswer = false;
    if(this.posNote < this.studyList.flashCards.length-1){
      this.posNote++;
    }else{
      setTimeout(() => {
        this.loadFlashCards()
      
      }, 200);
    }
  }
}
