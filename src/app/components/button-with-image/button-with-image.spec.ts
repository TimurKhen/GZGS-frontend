import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithImage } from './button-with-image';

describe('ButtonWithImage', () => {
  let component: ButtonWithImage;
  let fixture: ComponentFixture<ButtonWithImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWithImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonWithImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
