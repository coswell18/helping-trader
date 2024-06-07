import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOperationComponent } from './register-operation.component';

describe('RegisterOperationComponent', () => {
  let component: RegisterOperationComponent;
  let fixture: ComponentFixture<RegisterOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOperationComponent]
    });
    fixture = TestBed.createComponent(RegisterOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
