/*
* The Temperature service is responsible for supplying Temperature Data
* */

import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TemperatureService {

  // private _temperatureUrl = "https://mlab.com/databases/temp_sense_db/collections/users";
  private getTemperatureFromDB = 'localhost:3000/api/temperatures';
  private getUsersForAdmin = 'localhost:3000/api/users';
rooms: any;

  // dependency injection to get instance of HttpClient to make all the requests
  constructor(private http: HttpClient) { }

  dailyForecast() {
    return this.http.get('https://api.darksky.net/forecast/542f89a21525b8943c1ab1ef9c34ed82/53.27194,-9.04889')
      .map(result => result);
  }
  // create get method to get temperatures from backend
  /*getTemperature() {
    return [
      {'temperature': 19},
      {'temperature': 20},
      {'temperature': 25},
      {'temperature': 30}

    ];*/

/*
    return this.http.get<any>(this.getTemperatureFromDB);
*/


    /*
        return this.http.get<any>(this.getTemperatureFromDB).map(data => {this.rooms = data; });
    */

    // return this.http.get<any>(this.getTemperatureFromDB).map((response: HttpResponse) => response.json());
    /*const result = this.http.get<any>(this._temperatureUrl).map(result => result);
        console.log(result);
        return result;*/

}
