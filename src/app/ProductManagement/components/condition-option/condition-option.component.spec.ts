import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionOptionComponent } from './condition-option.component';

describe('ConditionOptionComponent', () => {
  let component: ConditionOptionComponent;
  let fixture: ComponentFixture<ConditionOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
