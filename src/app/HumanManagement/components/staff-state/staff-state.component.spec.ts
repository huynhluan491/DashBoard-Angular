import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffStateComponent } from './staff-state.component';

describe('StaffStateComponent', () => {
  let component: StaffStateComponent;
  let fixture: ComponentFixture<StaffStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
