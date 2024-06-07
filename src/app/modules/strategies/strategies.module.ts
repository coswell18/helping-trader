import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterStrategyComponent } from './register-strategy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableRulesComponent } from './components/table-rules/table-rules.component';
import { SharedModule } from 'src/app/shared/shared.module';






@NgModule({
  declarations: [
    RegisterStrategyComponent,
    TableRulesComponent
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
export class StrategiesModule { }
