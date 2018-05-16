import {Component, OnInit, EventEmitter} from '@angular/core';
// import {Admin} from "../admin";
// import {Room} from '../room';
import {RoomService} from '../room.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  public errorMessage: any;
  public rooms = [];
  /*
    public rooms = ['Kitchen', 'LivingRoom'];
  */
  // Create instance of EventEmitter class
  public SelectRoom = new EventEmitter();

  /*
     By using the below constructor have a local variable that
     gives instance of service
  */
  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute) {
  }

  /*
  * Make use of the service instance inside the ngOnInIt lifecycle hook
  * which gets called when the component is initialised
  * and fetch the required data in this case the list of rooms
  * */
  ngOnInit() {
    // LH of subscribe method is the argument to the function
    // While the RH is the body to the function
    this.roomService.getRoom()
      .subscribe(data => this.rooms = data,
        error => this.errorMessage = error);

  }

  // Define handler onSelect from room-list.component.html
  onSelect(room) {
    this.router.navigate([room.roomName], {relativeTo: this.route});
    /*
        ABSOLUTE PATH, NOT AS FLEXIBLE AS RELATIVE PATH above
        this.router.navigate(['/dashboard', room.roomName]);
    */

    /*onRoomRequest() {
      this.rooms = this.roomService.getRoom();
    }*/
  }
}
