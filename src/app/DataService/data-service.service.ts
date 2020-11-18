import {Injectable} from '@angular/core';
import {
  Action,
  ACTION_TYPE,
  COMP_TYPE,
  Evaluable,
  Option,
  OrPrerequisite,
  Prerequisite,
  Room
} from '../app-runner/game-runner/game-runner.component';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  gameFiles: any;



  constructor() {
    this.gameFiles = {
      null: new Room('null', 'Loading...', 'Loading...', []),
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
        ]),
      R84FZ6: new Room(
        'R84FZ6'
        , 'The Tavern'
        , new Evaluable('You are ${GameSave.gname}. You are at the Tavern, it smells like beer and home')
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
    };
  }

  getFiles(): any{
    return this.gameFiles;
  }

}
