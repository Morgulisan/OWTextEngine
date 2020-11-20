import {Component} from '@angular/core';
import {DataServiceService} from './DataService/data-service.service';
import {Room} from './app-runner/game-runner/game-runner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OWTextEnigne';

  gameFiles: GameFile;

  constructor(private data: DataServiceService ) {
    this.gameFiles = data.getFiles();
  }

}

type RoomId = string;

export class GameFile{
  packType?: FileType;
  packName?: string | null;
  packDescription?: string | null;
  startRoom?: RoomId; // Required if BaseGameFile Type
  Rooms: {
    [key: string]: Room
  };
}


export enum FileType {
  BaseGameFile,
  ContentPack,
  ModPack
}
