import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCategory } from './subscription-category';

describe('SubscriptionCategory', () => {
  let component: SubscriptionCategory;
  let fixture: ComponentFixture<SubscriptionCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
