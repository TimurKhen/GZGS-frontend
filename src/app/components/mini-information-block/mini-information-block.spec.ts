import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniInformationBlock } from './mini-information-block';

describe('MiniInformationBlock', () => {
  let component: MiniInformationBlock;
  let fixture: ComponentFixture<MiniInformationBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniInformationBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniInformationBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
