import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    DashboardComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
