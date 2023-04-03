import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramProductsComponent } from './program-products.component';

describe('ProgramProductsComponent', () => {
  let component: ProgramProductsComponent;
  let fixture: ComponentFixture<ProgramProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
