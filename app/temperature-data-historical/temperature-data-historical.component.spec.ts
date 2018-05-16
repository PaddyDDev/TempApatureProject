import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureDataHistoricalComponent } from './temperature-data-historical.component';

describe('TemperatureDataHistoricalComponent', () => {
  let component: TemperatureDataHistoricalComponent;
  let fixture: ComponentFixture<TemperatureDataHistoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureDataHistoricalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureDataHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
