import { Component, OnInit} from '@angular/core';
import {TemperatureService} from '../temperature.service';
import {Router} from '@angular/router';
// import {Room} from '../room';
import {HttpErrorResponse} from '@angular/common/http';
// import {Chart} from 'chart.js';
// import {Temperature} from "../temperature";

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  /* template:`<button (click)="add()">Add Point!</button>
   <div [chart]="chart"></div>` ,*/
  styleUrls: ['./temperature.component.css'],
  // providers: [Room]

})
export class TemperatureComponent implements OnInit {
  /*
 create an array
   rooms: Room[] = [{roomName: 'Kitchen', currentTemperature: 20},
   {roomName: 'Bedroom', currentTemperature: 25}, {roomName: 'Landing', currentTemperature: 12}];
   create property for selectedRoom of type Admin
*/
  /*selectedRoom: Room;
  rooms: Array<Room>;*/

  rooms: [''];
  private selectedRoom: any;

  // create an array of the users available
  // rooms: Room[]=[
//    {id: "1", room: "roomA", temperature: 20},
//    {id: "2", room: "roomB", temperature: 18},
// ];
  /* rooms: Room[]=[
      {id: "1", room: "roomA", temperature: 20},
      {id: "2", room: "roomB", temperature: 18},
  ];*/// chart =[];
  // store list of events returned by the temperature service
  // temperature = [];

  constructor(private temperatureService: TemperatureService,
              private router: Router) {}


  ngOnInit() {
    /*this.temperatureService.getTemperature()
      .add(resTemperatureData => this.rooms = resTemperatureData);*/
   /* this.temperatureService.getTemperature()
      .subscribe(
        res => this.rooms = res,
    err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']);

            }
          }
    });*/
    // this.temperatureService.getTemperature().subscribe(res => this.rooms = res, err => console.log(err))
/*
    this.temperature.getTemperature().subscribe(res => {console.log(res); });
*/
    /*
        this.temperature.getTemperature().subscribe(res => {let temperature = res ['reading'].map(res => res.reading.temperature)})
    */

  }
  onSelectRoom(room: any) {
    this.selectedRoom = room;
    console.log(this.selectedRoom);
  }
}
