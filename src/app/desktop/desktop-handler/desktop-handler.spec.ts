import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopHandler } from './desktop-handler';

describe('DesktopHandler', () => {
  let component: DesktopHandler;
  let fixture: ComponentFixture<DesktopHandler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopHandler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
