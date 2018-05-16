import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureDataOverviewComponent } from './temperature-data-overview.component';

describe('TemperatureDataOverviewComponent', () => {
  let component: TemperatureDataOverviewComponent;
  let fixture: ComponentFixture<TemperatureDataOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureDataOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureDataOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
