/*
* The Temperature service is responsible for supplying Temperature Data
* */

import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {ITemperature} from './temperature';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};*/

// INJECTABLE DECORATOR USED
@Injectable()
export class TemperatureService {

  // private _temperatureUrl = "https://mlab.com/databases/temp_sense_db/collections/users";
  /* private urlGetTemperatureFromDB = 'localhost:3000/api/temperatures';
   rooms: any;*/
/*
  private urlgetTemperatre = 'https://raw.githubusercontent.com/PaddyDDev/tempdata/master/dummydatatest2';
*/
  private urlgetTemperatre = '/assets/test.json';
  // dependency injection to get instance of HttpClient to make all the requests
  constructor(private http: HttpClient) {
  }

  getHistoricalTemperature() {
    /*return this.http.get('https://api.darksky.net/forecast/542f89a21525b8943c1ab1ef9c34ed82/53.27194,-9.04889,255657600?')
      .map(result => result);*/
    /*return this.http.get('http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22')
      .map(result => result);*/
    /*return this.http.get('https://raw.githubusercontent.com/PaddyDDev/TempApatureProject/master/tempJSON')
      .map(result => result);*/

   /* return this.http.get(this.urlgetTemperatre)
      .map(result => result);*/
    /*
        return this.http.get('../../livingroom.json').map(result => result);
    */
  }

  /*  getTemperatures(): Observable<ITemperature[]> {
      return this.http.get<ITemperature[]>(this.urlGetTemperatureFromDB).catch(this.errorHandler);
    }*/

  getTemperatures() {

    return this.http.get(this.urlgetTemperatre).map(result => result);

  }
 /* getTemperatures(): Observable<ITemperature[]> {

/!*
    return this.http.get(this.urlgetTemperatre, {responseType: 'json'}).catch(this.errorHandler);
*!/
    return this.http.get(this.urlgetTemperatre).catch(this.errorHandler);

  }
  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Error on the server side.');
  }*/
}

  /*
  * Throw the error from the above catch in the getRoom method to the subscribed
  * observable.
  */
  /*private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Error on the server side.');
  }*/
/*}*/
