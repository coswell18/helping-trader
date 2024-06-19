import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormatPipe3 } from 'src/app/pipe/date-format.pipe';
import { Operation, Rule, Strategy } from 'src/app/shared/models/gestion.models';
import { DbService } from 'src/app/shared/services/db.service';
import { SharingService } from 'src/app/shared/services/sharing.service';

@Component({
  selector: 'app-register-operation',
  templateUrl: './register-operation.component.html',
  styleUrls: ['./register-operation.component.scss'],
  providers:[DateFormatPipe3]
})
export class RegisterOperationComponent implements OnInit, OnDestroy {
  alertType:string=""
  alertMessage:string=""
  stateAlert:boolean=false;
  selectedStrategy : any="";
  operations: Operation[]=[]
  strategies: Strategy[]=[]
  selectedImage: any = null;
  operation: Operation = new Operation("","","","","","","","","","",[],"")
  stateButtonEdit:boolean=false
  sharedService:SharingService = inject(SharingService)
  dbService:DbService = inject(DbService)
  
  resultado!: string;

  formularioOperations = new FormGroup({
    // name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    strategies:new FormControl('', [Validators.required]),
    feeling:new FormControl('', [Validators.required]),
    risk:new FormControl('', [Validators.required]),
    rb:new FormControl('', [Validators.required]),
    symbol: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    result: new FormControl('', [Validators.required]),
  });

  constructor(private dateFormatPipe: DateFormatPipe3){
    
  }
  ngOnInit(): void {
    this.loadBd()
    this.sharedService.sharingToastNotesObservable = true;
  }

  ngOnDestroy(): void {
    this.sharedService.sharingToastNotesObservable = false;
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
  
  loadRules(){
    this.operation.rules = JSON.parse(JSON.stringify(this.selectedStrategy.reglas));
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
      this.operation.image = reader.result as string;
    };
  }

  clean(){
    this.operation = new Operation("","","","","","","","","","",[],"")
    this.stateButtonEdit = false; 
    this.selectedStrategy=""
  }

  addOperation(){
    let id = this.operations.length>0?(Number(this.operations[this.operations.length-1].id)+1):0
    this.operations.push( new Operation(id+"",this.selectedStrategy.id,this.selectedStrategy.name,this.dateFormatPipe.transform(new Date()),this.operation.feeling,this.operation.risk,this.operation.rb,this.operation.symbol.toLowerCase(),this.operation.type,this.operation.result,this.operation.rules,this.operation.image));
    this.selectedImage = null;
    this.clean();
    this.saveBd();
    this.callModal("exito","Se ha adicionado una nueva operación")
  }

  editOperation(){
    let index = this.operations.findIndex(item =>item.id == this.operation.id)
    this.operations[index]= (new Operation(this.operation.id+"",this.selectedStrategy.id,this.selectedStrategy.name,this.operation.date,this.operation.feeling,this.operation.risk,this.operation.rb,this.operation.symbol.toLowerCase(),this.operation.type,this.operation.result,this.operation.rules,this.operation.image));
    this.selectedImage = null;
    this.stateButtonEdit = false; 
    this.saveBd();
    this.callModal("exito","Se ha editado la operación con éxito")
  }

  showOperationSelected(event:Operation){

    this.selectedStrategy = this.strategies.find(ele=>event.idStrategy===ele.id)
    this.operation = event
    // window.scrollTo(0,280)
    this.stateButtonEdit = true
    document.getElementById("button-open-modal-edit")?.click()
  }

  deleteElement(event:Strategy){
    let index = this.operations.findIndex(item =>item.id == event.id)
    this.operations.splice(index,1)
    this.saveBd();
    this.callModal("exito","Se ha eliminado la operación")
  }

  deleteRule(event:Rule){
    // let index = this.strategy.reglas.findIndex(item =>item.id == event.id)
    // this.strategy.reglas.splice(index,1)
  }
  saveBd(){

    this.dbService.setItemBd("operations",this.operations)
  }
  async loadBd(){


    let data:any = await this.dbService.getItemBd("operations")
    data != null && data != ""?this.operations = data:null

    data = await this.dbService.getItemBd("strategies")
    data != null  && data != ""?this.strategies = data:null
  }
}
