import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmail } from './add-email';

describe('AddEmail', () => {
  let component: AddEmail;
  let fixture: ComponentFixture<AddEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
