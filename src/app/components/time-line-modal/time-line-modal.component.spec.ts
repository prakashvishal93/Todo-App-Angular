import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineModalComponent } from './time-line-modal.component';

describe('TimeLineModalComponent', () => {
  let component: TimeLineModalComponent;
  let fixture: ComponentFixture<TimeLineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeLineModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
