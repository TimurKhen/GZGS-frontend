import { TestBed } from '@angular/core/testing';

import { ErrorCatcherService } from './error-catcher-service';

describe('ErrorCatcherService', () => {
  let service: ErrorCatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorCatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
