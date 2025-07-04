import { TestBed } from '@angular/core/testing';

import { TvDetails } from './tv-details';

describe('TvDetails', () => {
  let service: TvDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
