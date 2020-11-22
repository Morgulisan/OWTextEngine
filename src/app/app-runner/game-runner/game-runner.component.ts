import {Component, Input, OnInit} from '@angular/core';
import {VariableViewerComponent} from './variable-viewer/variable-viewer.component';
import {FileType, GameFile, GameSave, Option, Room} from '../../DataService/definitions';

@Component({
  selector: 'app-game-runner',
  templateUrl: './game-runner.component.html',
  styleUrls: ['./game-runner.component.css']
})
export class GameRunnerComponent implements OnInit {
  @Input() gameFiles: GameFile;
  currentRoom: Room;

  constructor() {
  }

  ngOnInit(): void {
    VariableViewerComponent.setSaveGame(GameSave.values);
    if (this.gameFiles.packType === FileType.BaseGameFile){
      if (this.gameFiles.startRoom){
        this.currentRoom = this.gameFiles.Rooms[this.gameFiles.startRoom];
      }
      else {
        this.currentRoom = {roomId : 'null', roomName: 'Error Room', content: 'No Start Room Given in Game Files'};
      }
    }
    else {
      this.currentRoom = {roomId : 'null', roomName: 'Error Room', content: 'Gamefiles not of Type BaseGame'};
    }
  }

  selectOption(option: Option): void{

    this.currentRoom = this.gameFiles.Rooms.null;

    if (option.changes != null) { option.changes.forEach(element => element.apply()); }

    this.currentRoom = this.gameFiles.Rooms[option.nextScene];
  }

  evalOptions(o: Option): boolean{
    const requirements = Object.assign([], o.prerequisite);
    let out = true;
    while (out && requirements.length > 0) {
      out =  out && requirements.pop().evaluate();
    }
    return out;
  }
}

