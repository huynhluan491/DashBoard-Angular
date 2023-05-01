import { TestBed } from '@angular/core/testing';

import { LocationFormService } from './location-form.service';

describe('LocationFormService', () => {
  let service: LocationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
