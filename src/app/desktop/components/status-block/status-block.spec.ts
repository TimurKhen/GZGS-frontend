import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBlock } from './status-block';

describe('StatusBlock', () => {
  let component: StatusBlock;
  let fixture: ComponentFixture<StatusBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
