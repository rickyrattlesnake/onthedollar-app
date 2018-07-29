import { TestBed, inject } from '@angular/core/testing';

import { LoadingEventsService } from './loading-events.service';

describe('LoadingEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingEventsService]
    });
  });

  it('should be created', inject([LoadingEventsService], (service: LoadingEventsService) => {
    expect(service).toBeTruthy();
  }));
});
