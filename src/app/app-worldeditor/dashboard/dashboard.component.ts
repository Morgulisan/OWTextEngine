import { Component, OnInit } from '@angular/core';
import {
  Action, ACTION_TYPE, COMP_TYPE,
  Evaluable,
  Option,
  OrPrerequisite,
  Prerequisite,
  Room
} from '../../app-runner/game-runner/game-runner.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gameFiles = [
    new Room('null', 'Loading...', 'Loading...', []),
    new Room(
      'dfgsjr'
      , 'Old Dungeon'
      , new Evaluable('You are in an old dungeon. The monsters are ugly but not too big. You already killed ${GameSave.values.Monsters} Monsters. But there is a dark scary stairway into the dark')
      , [
        new Option('Flee to the Tavern', 'soduoe')
        , new Option('kill a tiny Monster', 'dfgsjr', [new Action(ACTION_TYPE.ADD, 'Monsters.mini', 1)])
        , new Option('kill a Monster', 'dfgsjr', [new Action(ACTION_TYPE.ADD, 'Monsters.normal', 1)], [new Prerequisite(COMP_TYPE.ABOVE, 2, 'Monsters.mini')])
        , new Option('Get deeper into the dark', '4354kd', null, [
          new OrPrerequisite(
            [
              new Prerequisite(COMP_TYPE.ABOVE, 5, 'Monsters.normal')
              , new Prerequisite(COMP_TYPE.ABOVE, 5, 'Beers')
            ]
          )
        ])
      ]),
    new Room(
      'soduoe'
      , 'The Tavern'
      , new Evaluable('You are ${GameSave.gname}. You are at the Tavern, it smells like beer and home')
      , [
        new Option('Leave for the Dungeon', 'dfgsjr')
        , new Option('Drink a Beer', 'soduoe', [new Action(ACTION_TYPE.ADD, 'Beers', 1)])
      ]),
    new Room(
      '4354kd'
      , 'The Deep Pit'
      , 'You are in a scary Place, deep in the Dark of a foul smelling Crypt. Few people ever ventured down here.'
      , [
        new Option('Go back upstairs', 'dfgsjr')
      ]),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
