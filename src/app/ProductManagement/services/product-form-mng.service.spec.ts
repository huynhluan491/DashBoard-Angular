import { TestBed } from '@angular/core/testing';

import { ProductFormMngService } from './product-form-mng.service';

describe('ProductFormMngService', () => {
  let service: ProductFormMngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFormMngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
