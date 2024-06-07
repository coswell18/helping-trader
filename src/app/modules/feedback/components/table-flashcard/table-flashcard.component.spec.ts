import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFlashCardComponent } from './table-flashcard.component';

describe('TableFlashCardComponent', () => {
  let component: TableFlashCardComponent;
  let fixture: ComponentFixture<TableFlashCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableFlashCardComponent]
    });
    fixture = TestBed.createComponent(TableFlashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
