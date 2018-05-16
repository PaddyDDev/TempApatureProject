import {Component, OnInit} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TemperatureService} from '../temperature.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /*
     example of interpolation were-by can bind data to the template
     public siteUrl = window.location.href; and call it in the html file
     <h3>{{siteUrl}}</h3>
     ESSENTIALLY WITHIN THE DOUBLE CURLY BRACE {{}} IS A PROPERTY OR AN EXPRESSION
     and evaluate the JS expression which will be displayed in the browser
     or use JS properties and Methods as well
  */
  // public loginName: LoginComponent;

  private _temperatureUrl = 'http://localhost:3000/api/temperature';

  public name = 'Paddy';
  // public siteUrl = window.location.href;
  // public name = this.loginName;
  constructor(private http: HttpClient, private temperatureService: TemperatureService, private router: Router) {
  }

  // public rooms = ['Kitchen', 'LivingRoom'];
  public temperatureReading = [];
  public date = new Date();

  ngOnInit() {
    // this.temperatureReading = this.temperatureService.getTemperature();
  }

  greetUser() {
    return 'Welcome ' + this.name;
  }

  onTemperatureRequest() {

    return this.http.get<any>(this._temperatureUrl).map(result => result);
  }

  onClick(event) {
    console.log(event);
    /*console.log('Button click test');
    this.greeting = 'Welcome to TempApature';*/
  }

  onRoomRequest() {
/*
    this.temperatureReading = this.temperatureService.getTemperature();
*/

  }

  addSensor() {
    this.router.navigate(['/add-sensor']);

  }
}
