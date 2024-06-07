export class Rule {
  id:string="";
  regla:string="";
  estado:boolean=false;

  constructor(id:string, regla:string, estado:boolean){
    this.id = id
    this.regla = regla
    this.estado = estado
  } 
}

export class Strategy {
  id:string="";
  name:string="";
  description:string="";
  image:string="";
  reglas:Rule[]=[]
  
  constructor(id:string,name:string,description:string,image:string,reglas:Rule[]){
    this.id = id
    this.name = name
    this.description = description
    this.image = image
    this.reglas = reglas
  }
}


export class Operation {
  id:string="";
  idStrategy="";
  nameStrategy="";
  date="";
  feeling="";
  risk="";
  rb="";
  symbol:string="";
  type:string="";
  result:string="";
  rules:Rule[]=[]
  image:string="";
  
  constructor(id:string,idStrategy:string,nameStrategy:string,date:string,feeling:string,risk:string,rb:string,symbol:string,type:string,result:string,rules:Rule[],image:string){
    this.id = id
    this.idStrategy = idStrategy
    this.nameStrategy = nameStrategy
    this.date = date
    this.feeling = feeling
    this.risk = risk
    this.rb = rb
    this.symbol = symbol
    this.type = type
    this.result = result
    this.rules = rules
    this.image = image
  }
}


export class StudyList {
  id:string="";
  type:string="";
  name:string="";
  description:string="";
  flashCards:FlashCard[]=[]

  constructor(id:string,type:string,name:string,description:string,flashCards:FlashCard[] ){
    this.id = id
    this.type = type
    this.name = name
    this.description = description
    this.flashCards = flashCards
  } 
}

export class FlashCard {
  id:string="";
  note:string="";
  question:string="";
  answer:string="";
  interval:number=1;
  nextReview:any=new Date();
  image:string="";

  // constructor(id:string, note:string, question:string, answer:string, refresh:number, image:string){
  //   this.id = id
  //   this.note = note
  //   this.question = question
  //   this.answer = answer
  //   this.refresh = refresh
  //   this.image = image
  // } 
}