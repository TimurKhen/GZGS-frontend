import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subscribtion } from './subscribtion';

describe('Subscribtion', () => {
  let component: Subscribtion;
  let fixture: ComponentFixture<Subscribtion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subscribtion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subscribtion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
