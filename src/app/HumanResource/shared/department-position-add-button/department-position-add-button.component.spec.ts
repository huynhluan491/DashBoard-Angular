import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentPositionAddButtonComponent } from './department-position-add-button.component';

describe('DepartmentPositionAddButtonComponent', () => {
  let component: DepartmentPositionAddButtonComponent;
  let fixture: ComponentFixture<DepartmentPositionAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentPositionAddButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentPositionAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
