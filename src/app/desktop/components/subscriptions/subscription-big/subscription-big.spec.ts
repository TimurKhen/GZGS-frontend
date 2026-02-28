import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBig } from './subscription-big';

describe('SubscriptionBig', () => {
  let component: SubscriptionBig;
  let fixture: ComponentFixture<SubscriptionBig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionBig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionBig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
