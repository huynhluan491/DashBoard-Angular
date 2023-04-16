import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponPageManagementComponent } from './coupon-page-management.component';

describe('CouponPageManagementComponent', () => {
  let component: CouponPageManagementComponent;
  let fixture: ComponentFixture<CouponPageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponPageManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponPageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
