import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLocationMenuComponent } from './selected-location-menu.component';

describe('SelectedLocationMenuComponent', () => {
  let component: SelectedLocationMenuComponent;
  let fixture: ComponentFixture<SelectedLocationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedLocationMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedLocationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
