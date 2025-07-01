import { TestBed } from '@angular/core/testing';

import { WatchlistService } from './watchlist-service';

describe('WishlistService', () => {
  let service: WatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
