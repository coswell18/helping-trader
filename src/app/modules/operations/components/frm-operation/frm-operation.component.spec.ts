import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmOperationComponent } from './frm-operation.component';

describe('FrmOperationComponent', () => {
  let component: FrmOperationComponent;
  let fixture: ComponentFixture<FrmOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrmOperationComponent]
    });
    fixture = TestBed.createComponent(FrmOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
