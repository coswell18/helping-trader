import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRulesComponent } from './table-rules.component';

describe('TableRulesComponent', () => {
  let component: TableRulesComponent;
  let fixture: ComponentFixture<TableRulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableRulesComponent]
    });
    fixture = TestBed.createComponent(TableRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
