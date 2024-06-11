import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableGenericComponent } from './components/table-generic/table-generic.component';
import { CommonModule } from '@angular/common';
import { ToastNoteComponent } from './components/toast-note/toast-note.component';
import { AlertaModalComponent } from './components/alerta-modal/alerta-modal.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { FormsModule } from '@angular/forms';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TableGenericComponent,
    ToastNoteComponent,
    AlertaModalComponent,
    TooltipComponent,
    ModalMessageComponent,
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule, 
    NgbModule,
    FormsModule, 
    RouterModule
  ],
  exports:[TableGenericComponent,ToastNoteComponent,AlertaModalComponent,TooltipComponent,ModalMessageComponent,MaintenanceComponent],
  providers: []
})
export class SharedModule { }
