import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvDetails } from './tv-details';

describe('TvDetails', () => {
  let component: TvDetails;
  let fixture: ComponentFixture<TvDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
