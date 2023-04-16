import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLisstComponent } from './test-lisst.component';

describe('TestLisstComponent', () => {
  let component: TestLisstComponent;
  let fixture: ComponentFixture<TestLisstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestLisstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLisstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
