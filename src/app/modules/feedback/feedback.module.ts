import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FlashCardComponent } from './components/flash-card/flash-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableFlashCardComponent } from './components/table-flashcard/table-flashcard.component';





@NgModule({
  declarations: [
    FeedbackComponent,
    FlashCardComponent,
    TableFlashCardComponent
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
export class FeedbackModule { }
