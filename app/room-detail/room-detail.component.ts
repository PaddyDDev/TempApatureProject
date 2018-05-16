import {Component, OnInit, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {RoomService} from '../room.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
  /* inputs: ['room'],
   outputs: ['updateRoomEvent', 'deleteRoomEvent']*/
})
export class RoomDetailComponent implements OnInit {

  public roomID;
  public errorMessage: any;
  public date = new Date();
  public greeting = '';
  //room: any;
  public rooms = [];
  // public temperatures = [];
  private _temperatureUrl = 'http://localhost:3000/api/temperature';
  /*private editRoomName = false;
  private updateRoomName = new EventEmitter();*/

  // allowNewSensor = false;
  constructor(private http: HttpClient,
              private roomService: RoomService,
              private route: ActivatedRoute,
              private router: Router
  ) {

  }

  ngOnInit() {
    const roomName = this.route.snapshot.paramMap.get('roomName');
    this.roomID = roomName;


    /*    this.roomService.getRoom()
          .subscribe(data => this.rooms = data,
            error => this.errorMessage = error);*/
    /*
        this.rooms = this.roomService.getRoom();
    */
  }

  /* onTitleClick() {
     this.editRoomName = true;
   }
   ngOnChanges() {
     this.editRoomName = false;
   }*/

  onTemperatureRequest() {

    return this.http.get<any>(this._temperatureUrl).map(result => result);
  }

  onClick(event) {
    console.log(event);
    /*console.log('Button click test');
    this.greeting = 'Welcome to TempApature';*/
  }

  showTemperatures() {
    this.router.navigate(['overview'], {relativeTo: this.route});
  }

  showHistoricalTemperatures() {
    this.router.navigate(['historical'], {relativeTo: this.route});
  }
}
