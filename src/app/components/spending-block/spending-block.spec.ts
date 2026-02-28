import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingBlock } from './spending-block';

describe('SpendingBlock', () => {
  let component: SpendingBlock;
  let fixture: ComponentFixture<SpendingBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendingBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
