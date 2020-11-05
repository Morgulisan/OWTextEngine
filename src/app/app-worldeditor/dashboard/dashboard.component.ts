import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../app-runner/game-runner/game-runner.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() gameFiles: any;

  newRoomName: string;
  newRoomId: string;

  selection2: any;

  constructor() { }

  ngOnInit(): void {
  }

  createRoom(): void {
    // TODO if Room Name empty?
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
    if ( this.newRoomId === undefined || this.newRoomId === null) { this.newRoomId = ''; }
    while (!this.newRoomId || this.newRoomId.length < 5){
      this.newRoomId += randomChars.charAt(Math.floor(Math.random() * 46));
      // TODO Assert RoomId is Unused
    }
    this.gameFiles['R' + this.newRoomId] = new Room('R' + this.newRoomId, this.newRoomName, 'Change Text', null);

    this.newRoomId = '';
    this.newRoomName = '';
  }

}
