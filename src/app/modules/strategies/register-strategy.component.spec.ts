import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStrategyComponent } from './register-strategy.component';

describe('RegisterStrategyComponent', () => {
  let component: RegisterStrategyComponent;
  let fixture: ComponentFixture<RegisterStrategyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterStrategyComponent]
    });
    fixture = TestBed.createComponent(RegisterStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
