import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IRoom} from './room';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// import {Room} from "./room";

@Injectable()
export class RoomService {

/*
   Local variable called http which is used to refer to an
   instance of HttpClient
*/
// private urlTemperatue: sting = 'local json file'
// private urlTemperature = 'http://localhost:3000/api/temperature';
private urlRegisterRooms = 'http://localhost:3000/api/rooms';
  constructor(private http: HttpClient) { }

  /*
  *  Cast the observable into a Temperature Array[]
  */

  getRoom(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(this.urlRegisterRooms).catch(this.errorHandler);
    /*[
      {'ID': 'RoomA'},
      {'ID': 'RoomB'},
      {'ID': 'RoomC'},
      {'ID': 'RoomD'},
      {'ID': 'RoomE'}
    ];*/

  }

  /*
  * Throw the error from the above catch in the getRoom method to the subscribed
  * observable.
  */
  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Error on the server side.');
  }
}
