import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rule, Strategy } from 'src/app/shared/models/gestion.models';
import { DbService } from 'src/app/shared/services/db.service';


@Component({
  selector: 'app-register-strategy',
  templateUrl: './register-strategy.component.html',
  styleUrls: ['./register-strategy.component.scss']
})


export class RegisterStrategyComponent implements OnInit {
  alertType:string=""
  alertMessage:string=""
  stateAlert:boolean=false;
  strategies: Strategy[]=[]
  pageSize = 5;
  page = 1
  rule=""
  selectedImage: any = null;
  strategy: Strategy = new Strategy("","","","",[])
  stateButtonEdit:boolean=false

  dbService:DbService = inject(DbService)
  

  formularioStrategies = new FormGroup({
    // name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    rule: new FormControl('', [])
  });

  
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
  onEnterPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addRule()
      // Aquí puedes agregar la lógica que quieras que se ejecute al presionar Enter
    }
  }

  addRule(){
    if(this.rule==""){
      // Debes agregar una regla para poderla adicionar a la lista
      this.callModal("advertencia","Debes agregar una regla para poderla adicionar a la lista")
    }else{
      let id = this.strategy.reglas.length>0?(Number(this.strategy.reglas[this.strategy.reglas.length-1].id)+1):0
      this.strategy.reglas.push({id:id+"",regla:this.rule,estado:false})
      this.rule = "";
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
      this.strategy.image = reader.result as string;
    };
  }

  clean(){
    this.strategy = new Strategy("","","","",[])
    this.rule = ""
    this.stateButtonEdit = false; 
  }

  addStrategy(){
    let reglas = [...this.strategy.reglas];
    let id = this.strategies.length>0?(Number(this.strategies[this.strategies.length-1].id)+1):0
    this.strategies.push( new Strategy(id+"",this.strategy.name,this.strategy.description,this.strategy.image,reglas));
    this.selectedImage = null;
    this.clean();
    this.saveBd();
    this.callModal("exito","Se ha adicionado una nueva estrategia")
  }

  editStrategy(){
    let index = this.strategies.findIndex(item =>item.id == this.strategy.id)
    this.strategies[index]= (new Strategy(this.strategy.id,this.strategy.name,this.strategy.description,this.strategy.image,this.strategy.reglas.slice()));
    this.selectedImage = null;
    this.stateButtonEdit = false; 
    this.saveBd();
    this.callModal("exito","Se ha editado la estrategia correctamente")
  }

  showStrategySelected(event:Strategy){
    let strategy = new Strategy("","","","",[])
    strategy.id = event.id
    strategy.name = event.name
    strategy.description = event.description
    strategy.image = event.image
    strategy.reglas = [...event.reglas]

    this.strategy = strategy
    this.rule =""
    // window.scrollTo(0,280)
    this.stateButtonEdit = true
    document.getElementById("button-open-modal-edit")?.click()
  }

  deleteElement(event:Strategy){
    let index = this.strategies.findIndex(item =>item.id == event.id)
    this.strategies.splice(index,1)
    this.saveBd();
    this.callModal("exito","Se ha eliminado la estrategia correctamente")
  }

  deleteRule(event:Rule){
    let index = this.strategy.reglas.findIndex(item =>item.id == event.id)
    this.strategy.reglas.splice(index,1)
  }
  saveBd(){
    this.dbService.setItemBd("strategies",this.strategies)
  }
  async loadBd(){
    let data:any = await this.dbService.getItemBd("strategies")
    data != null?this.strategies = data:null
  }
}
