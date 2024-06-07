import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastNoteComponent } from './toast-note.component';

describe('ToastNoteComponent', () => {
  let component: ToastNoteComponent;
  let fixture: ComponentFixture<ToastNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastNoteComponent]
    });
    fixture = TestBed.createComponent(ToastNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
