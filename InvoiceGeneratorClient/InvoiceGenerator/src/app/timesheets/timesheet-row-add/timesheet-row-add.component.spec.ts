import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetRowAddComponent } from './timesheet-row-add.component';

describe('TimesheetRowAddComponent', () => {
  let component: TimesheetRowAddComponent;
  let fixture: ComponentFixture<TimesheetRowAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimesheetRowAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetRowAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
