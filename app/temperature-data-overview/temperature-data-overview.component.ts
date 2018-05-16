import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {AmChartsService, AmChart} from '@amcharts/amcharts3-angular';


@Component({
  selector: 'app-temperature-data-overview',
  templateUrl: './temperature-data-overview.component.html',
  styleUrls: ['./temperature-data-overview.component.css']
})

export class TemperatureDataOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: AmChart;

  constructor(private AmCharts: AmChartsService) {
  }


  ngOnInit() {
    const gaugeChart = this.AmCharts.makeChart('chartdiv', {
      'type': 'gauge',
      'theme': 'dark',
      'axes': [{
        'axisThickness': 4,
        'axisAlpha': 0.5,
        'tickAxlpha': 0.5,
        'valueInterval': 5,
        'bands': [{
          'color': 'blue',
          'endValue': 5,
          'startValue': 0
        }, {
          'color': 'green',
          'endValue': 12,
          'startValue': 5
        }, {
          'color': 'yellow',
          'endValue': 20,
          'startValue': 12
        }, {
          'color': 'orange',
          'endValue': 28,
          'startValue': 20
        }, {
          'color': 'red',
          'endValue': 32,
          'startValue': 28
        }, {
          'color': 'red',
          'endValue': 45,
          'startValue': 32
        }],
        'bottomText': '0 C',
        'bottomTextYOffset': -20,
        'endValue': 45
      }],
      'arrows': [{}],
      'export': {
        'enabled': true
      }
    });

    setInterval(randomValue, 4000);

// set random value
    function randomValue() {
      const value = Math.round(Math.random() * 45);
      if (gaugeChart) {
        if (gaugeChart.arrows) {
          if (gaugeChart.arrows[0]) {
            if (gaugeChart.arrows[0].setValue) {
              gaugeChart.arrows[0].setValue(value);
              gaugeChart.axes[0].setBottomText(value + ' Degrees C');
            }
          }
        }
      }
    }
  }


    ngAfterViewInit(): void {
      this.chart = this.AmCharts.makeChart('chartdiv', {
      'type': 'serial',
      'theme': 'light',
      'dataProvider': []

    });

  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }

  }
}
