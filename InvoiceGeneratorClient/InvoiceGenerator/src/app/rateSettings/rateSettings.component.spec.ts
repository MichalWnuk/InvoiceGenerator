import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSettingsComponent } from './rateSettings.component';

describe('SettingsComponent', () => {
  let component: RateSettingsComponent;
  let fixture: ComponentFixture<RateSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateSettingsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
