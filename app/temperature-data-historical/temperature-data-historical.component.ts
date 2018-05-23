import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Chart} from 'chart.js';
import {TemperatureService} from '../temperature.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


// import {ChartService} from "angular-highcharts/chart.service";

// import {Router} from '@angular/router';

@Component({
  selector: 'app-temperature-data-historical',
  templateUrl: './temperature-data-historical.component.html',
  styleUrls: ['./temperature-data-historical.component.css']
})
export class TemperatureDataHistoricalComponent implements OnInit {
  // @ViewChild('chart') el: ElementRef;


  /*public errorMessage: any;
  public temperatureReadings = [];*/
  chart = [];
  // tempData: number;
  /*
     public chart: [''];
  */

constructor(
  /*private chartService: ChartService, */
  private temperatureService: TemperatureService,
  private router: Router,
  private route: ActivatedRoute,
  private http: HttpClient) {
  }
  /*labels =  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

  chartData = [
    {
      label: '1st Year',
      data: ['data.temperature'],
    }
  ];
  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    }
  ];*/
  ngOnInit() {
   /* this.basicChart();*/
    this.temperatureService.getTemperatures().subscribe(res => {
      const tempy = res['list'].map(res => res.temperature);
      console.log(res);

      const xAx = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24];

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: xAx,
          datasets: [
            {
              data: tempy,
              borderColor: '#3cba9f',
              fill: false
            }

          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });

    /*this.temperatureService.getTemperatures().subscribe(data => {
      this.temperatureReadings = data;
      console.log(this.temperatureReadings);
    });*/
     /*this.temperatureService.getTemperatures().subscribe(data => {
       this.chartData = data as any [];
       console.log(data);
     });*/
    /*this.http.get('./assets/test.json', {responseType: 'json'}).subscribe(
      data => { console.log(data);*/
    /*this.chartData = data as any []*/	 // FILL THE CHART ARRAY WITH DATA.
    // });


    /*this.temperatureService.getTemperatures().subscribe(data => {
      console.log(data);
    });*/

  }
}
/*  basicChart() {
    const element = this.el.nativeElement;


  const data = [{

    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    y: []
  }];

  const style = {
    margin: { t: 0 }
  };

  Plotly.plot( element, data, style );
}*/

  //populateGraph() {
    /*const element = this.el.nativeElement;

    const data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }];

    const style = {
      margin: { t: 0 }
    };

    Plotly.plot( element, data, style );*/
/*  }
}*/



    /*this.temperatureService.getTemperatures().subscribe(data => this.temperatureReadings = data);
  // THE BELOW SENDS BACK THE OBJECT IN THE CONSOLE
  // Are refereing to the TemperatureService with with the this.temperatureService.
  // this.temperatureService.dailyForecast().subscribe(res => {
    console.log(this.temperatureReadings);*/

    /*
        this.temperatureService.dailyForecast().subscribe(res => {console.log(res); } );
    */

    /*this.temperatureService.getTemperatures().subscribe(res => {
      const temp = res[''].map(response => response.temperature);
      console.log(res);


      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: 'hour',
          datasets: [
            {
              data: temp,
              borderColor: '#3cba9f',
              fill: false
            }

          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });
      console.log(res);
    });
    /!*
        this.chart = this.temperatureService.getTemperatures(){
    *!/
  }
}*/
    /*}
  }*/


    /*  const temperature = res['hourly'].map(res => res.hourly.data.temperature);
      // const time = res['hourly'].map(res => res.data.time);

      const timeDates = [];

      timeDates.forEach((res) => {
        const jsdate = new Date(res * 1000);
        timeDates.push(jsdate.toLocaleTimeString('en', { day: 'numeric', month: 'short', year: 'numeric'}));
      });

          /!*console.log(timeDates);*!/
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: timeDates,
        datasets: [
          {
            data: temperature,
            borderColor: '#3cba9f',
            fill: false
          }

        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
    }

  }
*/

    /*  ngOnInit() {
        this.temperatureService.getTemperatures()
          .subscribe(data => this.temperatureReadings = data,
            error => this.errorMessage = error);
        /!*this.temperature.dailyForecast().subscribe(res => {
          console.log(res);
        });*!/
      }

      onSelect(temperature) {
        this.router.navigate([temperature.temperature], {relativeTo: this.route});
      }
    }*/
 /* }
}
*/
