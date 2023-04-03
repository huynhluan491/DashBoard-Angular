import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedCalenderComponent } from './customized-calender.component';

describe('CustomizedCalenderComponent', () => {
  let component: CustomizedCalenderComponent;
  let fixture: ComponentFixture<CustomizedCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizedCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
