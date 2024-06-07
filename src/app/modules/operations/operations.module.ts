import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterOperationComponent } from './register-operation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrmOperationComponent } from './components/frm-operation/frm-operation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableRuleComponent } from './components/table-rule/table-rule.component';




@NgModule({
  declarations: [
    RegisterOperationComponent,
    FrmOperationComponent,
    TableRuleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    SharedModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class OperationsModule { }
