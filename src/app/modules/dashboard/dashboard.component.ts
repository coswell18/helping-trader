import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Operation, Strategy } from 'src/app/shared/models/gestion.models';
import { CommonModule } from '@angular/common';
import { DateFormatPipe2 } from 'src/app/pipe/date-format.pipe';
import { SharingService } from 'src/app/shared/services/sharing.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DbService } from 'src/app/shared/services/db.service';


@Component({
  standalone:true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports:[FormsModule,	CanvasJSAngularChartsModule, CommonModule,SharedModule,ReactiveFormsModule],
  providers:[DateFormatPipe2]
})
export class DashboardComponent implements OnInit, OnDestroy{
	dataOperations:Operation[]=[]
	dataOperationsTmp:Operation[]=[]
  goal:number = 0;
  frecuency:string = ""
  dateIni:string = ""
  dateFin:string = ""

  disciplineWin:number=0;
  disciplineLose:number=0;
  winrateWin:number=0;
  winRateLose:number=0;
  goalWin:number=0;
  goalLose:number=0;
  percentageWin:number=0;
  operationWin:number=0;
  operationLose:number=0;
  operationBe:number=0;
  
  chartOptionsPieDisciplina = {}
  chartOptionsPieWinRate ={}
  chartOptionsGoal2={}

  statusDicipline:boolean = true;
  statusWinRate:boolean = true;
  statusGoal:boolean = true;

  sharedService:SharingService = inject(SharingService)

  selectedStrategy : any = "";
  strategies: Strategy[]=[]

  dbService:DbService = inject(DbService)

  constructor(private dateFormatPipe: DateFormatPipe2){

  }

  formularioDashboard = new FormGroup({
    // name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    strategies:new FormControl('', [Validators.required]),
    dateIni:new FormControl('', [Validators.required]),
    dateFin:new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
	this.getStrategies()

	this.dateIni = localStorage.getItem("FilterDateIni") || ""
	this.dateFin = localStorage.getItem("FilterDateFin") || ""
	this.loadGoal()
	this.filter()
	this.sharedService.sharingToastNotesObservable = true;
	

	
  }

  async getStrategies(){
	let data:any = await this.dbService.getItemBd("strategies")
    data != null?this.strategies = data:null
  }

  ngOnDestroy(): void {
	this.sharedService.sharingToastNotesObservable = false;
  }

  async filter(){
	await this.getDataDashBoard()
	this.getDiscipline()
	this.getWinrate()
	this.getGoal()
  }

  cleanFilter(){
	this.dateIni = ""
	this.dateFin = ""
	this.selectedStrategy =""
	localStorage.setItem("FilterStrategy","")
	localStorage.setItem("FilterDateIni","")
	localStorage.setItem("FilterDateFin","")
	this.filter()
  }

  saveGoal(){
	this.filter()
	localStorage.setItem("goal",this.goal+"")
  }
  loadGoal(){
	this.goal = localStorage.getItem("goal")==null && localStorage.getItem("goal")=="" ?0:Number(localStorage.getItem("goal"))
  }

  async getDataDashBoard(){

	let dataOperations:any = await this.dbService.getItemBd("operations")
    dataOperations != null && dataOperations != ""?dataOperations=JSON.stringify(dataOperations):dataOperations=[]

	
	if(dataOperations.length>0){
		this.dataOperationsTmp = JSON.parse(dataOperations)

		if(this.selectedStrategy==""){
			let id =  localStorage.getItem("FilterStrategy") || ""
			this.selectedStrategy = {id:id}
			this.selectedStrategy =  this.strategies.find(ele=>id===ele.id) || ""
		}

		if(this.dateIni != '' && this.dateFin != '' && this.selectedStrategy.name !=''){
			this.dataOperations = JSON.parse(dataOperations)
			this.dataOperations = this.dataOperations.filter(operation=>{
				if(operation.date != undefined){
					let dateOperation:any = new Date(operation.date)
					dateOperation = new Date(this.dateFormatPipe.transform(`${dateOperation.getFullYear()}-${dateOperation.getMonth()+1}-${dateOperation.getDate()}`))	
					let sDateIni = new Date(this.dateFormatPipe.transform(this.dateIni))
					let sDateFin = new Date(this.dateFormatPipe.transform(this.dateFin))
					
					if(  (dateOperation >= sDateIni &&  dateOperation <= sDateFin) && this.selectedStrategy.name === operation.nameStrategy){
					  return true;
					}else{
					  return false;
					}
				  }else{
					return false;
				  }
			})
		}else{
			this.dataOperations = JSON.parse(dataOperations)
		}
		

		localStorage.setItem("FilterStrategy",this.selectedStrategy.id)
		localStorage.setItem("FilterDateIni",this.dateIni)
		localStorage.setItem("FilterDateFin",this.dateFin)
	}
  }

  getDiscipline(){
	this.statusDicipline = false
	let win = this.dataOperations.map((operation)=>{
		return operation["rules"].reduce((acum,rule)=>{
			if(rule.estado){
				return {acum:acum.acum+1,cont:acum.cont+1}
			}else{
				return {acum:acum.acum,cont:acum.cont+1}
			}
		},{acum:0,cont:0} )
		
	})

	let result = win.reduce((result,element)=>{
		return {
			okRules:result.okRules+element.acum,
			totalRules:result.totalRules+element.cont
		}

	},{okRules:0,totalRules:0})

	this.disciplineWin = (result.okRules/result.totalRules)*100
	this.disciplineLose = ((result.totalRules-result.okRules)/result.totalRules)*100

	this.chartOptionsPieDisciplina = {
		exportEnabled: true,
		animationEnabled: true,
		theme: "light2",
		title:{
		  text: "Porcentaje disciplina",
		  fontSize: 25,
		  fontFamily: "Montserrat",
		  fontColor: "#67697C",
		},
		data: [{
		  type: "doughnut",
		  yValueFormatString: "#,###.##'%'",
		  indexLabel: "{name}: {y}",
		  indexLabelFontSize: 16,
		  indexLabelFontFamily: "Montserrat",
		  dataPoints: [
			{ y: this.disciplineWin, name: "Cumplida",color:"#0CB5A2" },
			{ y: this.disciplineLose, name: "Incumplida",color:"#67697C" },

		  ]
		}]
	  }
	  setTimeout(() => {
		  this.statusDicipline=true;
	  }, 100);
  }


  getWinrate(){
	this.statusWinRate = false
	let win = this.dataOperations.reduce((acum,operation)=>{
		if(operation.result=="win"){
			return {win:acum.win+1,lose:acum.lose, be:acum.be}
		}else if(operation.result=="lose"){
			return {win:acum.win,lose:acum.lose+1, be:acum.be}
		}else{
			return {win:acum.win,lose:acum.lose, be:acum.be+1}
		}
	},{win:0,lose:0,be:0})

	this.operationWin = win.win;
	this.operationLose = win.lose;
	this.operationBe = win.be;
	let totalOperations = this.dataOperations.filter(op=>op.result=="win" || op.result=="lose").length;
	this.winrateWin = (win.win/totalOperations)*100
	this.winRateLose = ((totalOperations-win.win)/totalOperations)*100

	this.chartOptionsPieWinRate =  {
		exportEnabled: true,
		animationEnabled: true,
		theme: "light2",
		title:{
		  text: "Porcentaje asertividad",
		  fontSize: 25,
		  fontFamily: "Montserrat",
		  fontColor: "#67697C"
		},
		data: [{
		  type: "doughnut",
		  yValueFormatString: "#,###.##'%'",
		  indexLabel: "{name}: {y}",
		  indexLabelFontSize: 16,
		  indexLabelFontFamily: "Montserrat",
		  dataPoints: [
			{ y: this.winrateWin, name: "Acertado",color:"#0CB5A2" },
			{ y: this.winRateLose, name: "Fallado",color:"#67697C" },

		  ]
		}]
	  }
	  setTimeout(() => {
		  this.statusWinRate=true;
	  }, 100);
  }
  
  getGoal(){
	this.statusGoal = false
	let win = this.dataOperations.reduce((acum,operation)=>{
		if(operation.result=="win"){
			return {win:acum.win+(Number(operation.rb)*Number(operation.risk)),lose:acum.lose}
		}else if(operation.result=="lose"){
			return {win:acum.win,lose:acum.lose+Number(operation.risk)}
		}else{
			return {win:acum.win,lose:acum.lose}
		}
	},{win:0,lose:0})

	let winlose = win.win-win.lose
	if(winlose == 0){
		this.goalWin = 0
		this.goalLose = this.goal;
		this.percentageWin = 0
	}
	else if(winlose<0){
		this.goalWin = 0
		this.goalLose = winlose
		this.percentageWin = winlose
	}
	else if(winlose > 0 && winlose <= this.goal){
		this.goalWin = winlose
		this.goalLose = this.goal - winlose 
		this.percentageWin = winlose
	}else if(winlose > this.goal && winlose > this.goal){
		this.goalWin = this.goal
		this.goalLose = 0
		this.percentageWin = winlose
	}

	this.chartOptionsGoal2 = {
		theme: "light2",
		title:{
		  text: this.goalWin>=this.goal?"Haz alcanzo tu objetivo de "+this.goal+"%":"Sigue así, pronto alcanzarás tu objetivo de "+this.goal+"%",
		  fontSize: 25,
		  fontFamily: "Montserrat",
		  fontColor: "#67697C"
		},
		animationEnabled: true,
		exportEnabled: true,
		toolTip: {
		  shared: true
		},
		legend: {
		  horizontalAlign: "right",
		  verticalAlign: "center",
		  reversed: true
		},
		axisY: {
		   includeZero: true
		},
		data: [{
		  type: "stackedColumn",
		  name: "Completo",
		  color:"#0CB5A2",
		  indexLabel: "{y}%",
		  indexLabelFontColor: "#fff",
		  showInLegend: true,
		  dataPoints: [
			{ label: "Objetivo", y: this.goalWin ,color:"#0CB5A2"},
		  ]
		}, {
			type: "stackedColumn",
			name: "Faltante",
			indexLabel: "{y}%",
			indexLabelFontColor: "#fff",
			
			color:"#67697C",
			showInLegend: true,
			dataPoints: [
			  { label: "Objetivo", y: this.goalLose,color:"#67697C" },
			  
			]
		}]
	  }
	  setTimeout(() => {
		  this.statusGoal=true;
	  }, 100);
  }
	

	  


	
}
