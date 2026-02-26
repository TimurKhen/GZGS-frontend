import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsPaidStatus } from './is-paid-status';

describe('IsPaidStatus', () => {
  let component: IsPaidStatus;
  let fixture: ComponentFixture<IsPaidStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsPaidStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsPaidStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
