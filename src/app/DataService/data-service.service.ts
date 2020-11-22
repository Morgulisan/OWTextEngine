import {Injectable} from '@angular/core';
import {
  Action,
  ACTION_TYPE,
  COMP_TYPE,
  Evaluable,
  FileType,
  GameFile,
  Option,
  OrPrerequisite,
  Prerequisite,
  Room,
  RoomId,
} from './definitions';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {



  constructor() {
    DataServiceService.initialize();
  }

  static gameFiles: GameFile;

  static initialize(): void{
    this.gameFiles = {
      packName: 'Dungeon Game',
      packDescription: 'A sample dungeon Game to test the Engine',
      packType: FileType.BaseGameFile,
      startRoom: 'R84FZ6',
      Rooms: {
        R20X9S: new Room(
          'R20X9S'
          , 'Old Dungeon'
          , new Evaluable('You are in an old dungeon. The monsters are ugly but not too big. You already killed ${GameSave.values.Monsters} Monsters. But there is a dark scary stairway into the dark')
          , [
            new Option('Flee to the Tavern', 'R84FZ6')
            , new Option('kill a tiny Monster', 'R20X9S', [new Action(ACTION_TYPE.ADD, 'Monsters.mini', 1)])
            , new Option('kill a Monster', 'R20X9S', [new Action(ACTION_TYPE.ADD, 'Monsters.normal', 1)],
              [new Prerequisite(COMP_TYPE.ABOVE, 2, 'Monsters.mini')])
            , new Option('Get deeper into the dark', 'R4354K', null, [
              new OrPrerequisite(
                [
                  new Prerequisite(COMP_TYPE.ABOVE, 5, 'Monsters.normal')
                  , new Prerequisite(COMP_TYPE.ABOVE, 5, 'Beers')
                ]
              )
            ])
            , new Option('Piss on the corpse', 'R20X9S', null, [
              new Prerequisite(COMP_TYPE.ABOVE, 8, 'Beers'),
              new Prerequisite(COMP_TYPE.ABOVE, 1, 'Monsters.normal')
            ])
          ]),
        R84FZ6: new Room(
          'R84FZ6'
          , 'The Tavern'
          , new Evaluable('You are ${GameSave.gameName}. You are at the Tavern, it smells like beer and home')
          , [
            new Option('Leave for the Dungeon', 'R20X9S')
            , new Option('Drink a Beer', 'R84FZ6', [new Action(ACTION_TYPE.ADD, 'Beers', 1)])
          ]),
        R4354K: new Room(
          'R4354K'
          , 'The Deep Pit'
          , 'You are in a scary Place, deep in the Dark of a foul smelling Crypt. Few people ever ventured down here.'
          , [
            new Option('Go back upstairs', 'R20X9S')
          ]),
      }
    };
    if (Math.random() > 0.5) {
      this.gameFiles = {
      packName: 'Space Game',
      packType: FileType.BaseGameFile,
      startRoom: 'RLOsd',
      Rooms : {
        RLOsd : {
          roomId : 'RLOsd',
          roomName : 'Ship Bridge',
          content: 'You are in the control room of the ICS Persephone, one of 12 colony ships headed for habitable planets among distant Stars',
          options: [
            {
              optionText: 'Check flight parameters',
              nextScene: 'RLOsd'
            },
            {
              optionText: 'Go to the Reactor',
              nextScene: 'RKS62l'
            }
          ],
        },
        RKS62l: {
          roomId : 'RKS62l',
          roomName : 'Ship Reactor',
          content: 'The nuclear fusion reactor is rowling loudly in the background, it seems normal, but its better to check. A mistake could mean the end of the mission',
          options: [
            {
              optionText: 'Check reactor parameters',
              nextScene: 'RKS62l'
            },
            {
              optionText: 'Go back to the Bridge',
              nextScene: 'RLOsd',
            }
          ],
        },

      },
    };
    }
  }

  private static createNullRoom(id?: RoomId): Room{
    console.error('Trying to lead to Room ' + id + ' but no such scene exists');
    return {roomName: 'Error Room', roomId: 'null', content: 'The requested Room does not exist. Probably an Error in the Game Files' };
  }


  getFiles(): any{
    return DataServiceService.gameFiles;
  }

  getRoomFromId(id: string): Room{
    const doesRoomExist = DataServiceService.gameFiles.Rooms[id] ?? DataServiceService.createNullRoom(id);
    return doesRoomExist as Room;
  }

  typeSymbol( type: COMP_TYPE): string{
    switch (type){
      case COMP_TYPE.ABOVE:
        return '>';
      case COMP_TYPE.BELOW:
        return '<';
      case COMP_TYPE.EXACTLY:
        return '=';
      case COMP_TYPE.NOT_SET:
        return 'not Set';
      case COMP_TYPE.SET:
        return 'set';
      case null:
      case undefined:
      default:
        return '';
    }
  }

  changeSymbol( type: ACTION_TYPE): string{
    switch (type){
      case ACTION_TYPE.SET:
        return 'Set';
      case ACTION_TYPE.ADD:
        return '++';
      case ACTION_TYPE.TOGGLE:
        return 'Toggle';
      case ACTION_TYPE.SUBTRACT:
        return '--';
    }
  }

}
