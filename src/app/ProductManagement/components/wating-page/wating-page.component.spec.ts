import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatingPageComponent } from './wating-page.component';

describe('WatingPageComponent', () => {
  let component: WatingPageComponent;
  let fixture: ComponentFixture<WatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
