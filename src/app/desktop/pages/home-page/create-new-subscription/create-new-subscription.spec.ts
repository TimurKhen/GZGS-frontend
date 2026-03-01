import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSubscription } from './create-new-subscription';

describe('CreateNewSubscription', () => {
  let component: CreateNewSubscription;
  let fixture: ComponentFixture<CreateNewSubscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewSubscription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewSubscription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
