import {Component, Input, OnInit} from '@angular/core';
import {GameFile, Room} from '../../DataService/definitions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() gameFiles: GameFile;

  newRoomName: string;
  newRoomId: string;

  selection: any;

  constructor() { }

  ngOnInit(): void {
  }

  createRoom(): void {
    // TODO if Room Name empty?
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
    if ( this.newRoomId === undefined || this.newRoomId === null || this.newRoomId === 'null') { this.newRoomId = ''; }
    while (!this.newRoomId || this.newRoomId.length < 5){
      this.newRoomId += randomChars.charAt(Math.floor(Math.random() * 46));
      // TODO Assert RoomId is Unused
    }
    this.gameFiles.Rooms['R' + this.newRoomId] = new Room('R' + this.newRoomId, this.newRoomName, 'Change Text', null);

    this.newRoomId = '';
    this.newRoomName = '';
  }


}
