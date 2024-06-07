import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta-modal.component.html',
  styleUrls: ['./alerta-modal.component.scss']
})
export class AlertaModalComponent implements OnInit {
  @Input() alertType: string = "";
  @Input() alertMessage: string = "";
  @Output() emitEnd:EventEmitter<null> = new EventEmitter();
  state:boolean = false;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.state=true
    }, 200);
    setTimeout(() => {
      this.state=false;
      this.emitEnd.emit()
    }, 5000);
  }


  returnIconModal(){
    let iconoModal = '';
    switch (this.alertType) {
      case 'exito':
        iconoModal = 'alert-success';
        break;
      case 'error':
        iconoModal = 'alert-danger';
        break;
      case 'advertencia':
        iconoModal = 'alert-warning';
        break;
      default:
        break;
    }

    return iconoModal;
  }
}
