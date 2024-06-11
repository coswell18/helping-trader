import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    CategoryCardComponent
  ],
  imports: [
    CommonModule,RouterModule,RouterLink
  ]
})
export class HomeModule { }
