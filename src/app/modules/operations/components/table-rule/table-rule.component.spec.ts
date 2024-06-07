import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRuleComponent } from './table-rule.component';

describe('TableRuleComponent', () => {
  let component: TableRuleComponent;
  let fixture: ComponentFixture<TableRuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableRuleComponent]
    });
    fixture = TestBed.createComponent(TableRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
