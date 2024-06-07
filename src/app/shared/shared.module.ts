import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableGenericComponent } from './components/table-generic/table-generic.component';
import { CommonModule } from '@angular/common';
import { ToastNoteComponent } from './components/toast-note/toast-note.component';
import { AlertaModalComponent } from './components/alerta-modal/alerta-modal.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableGenericComponent,
    ToastNoteComponent,
    AlertaModalComponent,
    TooltipComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule, 
    NgbModule,
    FormsModule
  ],
  exports:[TableGenericComponent,ToastNoteComponent,AlertaModalComponent,TooltipComponent],
  providers: []
})
export class SharedModule { }
