import { TestBed } from '@angular/core/testing';

import { DateConverter } from './date-converter';

describe('DateConverter', () => {
  let service: DateConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
