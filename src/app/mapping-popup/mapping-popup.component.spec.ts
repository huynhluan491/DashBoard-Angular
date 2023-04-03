import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingPopupComponent } from './mapping-popup.component';

describe('MappingPopupComponent', () => {
  let component: MappingPopupComponent;
  let fixture: ComponentFixture<MappingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MappingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
