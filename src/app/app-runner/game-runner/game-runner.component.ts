import { Component, OnInit } from '@angular/core';
import {VariableViewerComponent} from './variable-viewer/variable-viewer.component';

@Component({
  selector: 'app-game-runner',
  templateUrl: './game-runner.component.html',
  styleUrls: ['./game-runner.component.css']
})
export class GameRunnerComponent implements OnInit {
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
  ]; // TODO Dictionary?
  currentRoom: Room;

  constructor() {
    this.currentRoom = this.gameFiles[1];
  }

  ngOnInit(): void {
    VariableViewerComponent.setSaveGame(GameSave.values);
  }

  selectOption(option: Option): void{

    this.currentRoom = this.gameFiles[0];

    if (option.changes != null) { option.changes.forEach(element => element.apply()); }

    // TODO next Scene by id (Dictionary)
    switch (option.nextScene) {
      case 'dfgsjr':
        this.currentRoom = this.gameFiles[1];
        break;
      case 'soduoe':
        this.currentRoom = this.gameFiles[2];
        break;
      case '4354kd':
        GameSave.gname = GameSave.gname + ' the Fearless';
        this.currentRoom = this.gameFiles[3];
    }
  }

}

export class Room {


  readonly roomId: RoomId;
  readonly roomName: Text;
  readonly content: Text;
  readonly options: Option[];

  constructor(id: string, rn: Text, cont: Text, options: Option[]) {
    this.roomId = id;
    this.roomName = rn;
    this.content = cont;
    this.options = options;

  }

}

export class Option {

  readonly prerequisite: Prerequisite[];
  readonly optionText: Text;
  readonly changes: Action[];
  readonly nextScene: RoomId;

  constructor(text: Text, next: RoomId, change?: Action[], pre?: Prerequisite[]) {
    this.nextScene = next;
    this.optionText = text;
    this.changes = change;
    this.prerequisite = pre;
  }

  evalOptions(): boolean{
    const requirements = Object.assign([], this.prerequisite);
    let out = true;
    while (out && requirements.length > 0) {
      out =  out && requirements.pop().evaluate();
    }
    return out;
  }

}

export class Evaluable {

  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  public toString = (): string => {
    console.log('`' + this.text + '`');
    // tslint:disable-next-line:no-eval
    return eval('`' + this.text + '`');
  }
}

export class GameSave {
  static gname = 'Peter';
  static values = {
    Beers: 0
  };
}

export class Prerequisite{

  readonly type: COMP_TYPE;
  readonly value: Text;
  readonly treshhold: number;

  constructor(t: COMP_TYPE, n: number, v: Text) {
    this.type = t;
    this.value = v;
    this.treshhold = n;
  }

  public evaluate(): boolean{
    switch (this.type){
      case COMP_TYPE.ABOVE:
        return GameSave.values[this.value.toString()] >= this.treshhold;
      case COMP_TYPE.BELOW:
        return GameSave.values[this.value.toString()] < this.treshhold;
      case COMP_TYPE.EXACTLY:
        return GameSave.values[this.value.toString()] === this.treshhold;
      case COMP_TYPE.NOT_SET:
      case COMP_TYPE.SET:
      default:
        console.log('Error: ' + this.type + ' not Set');
        return false;
    }
  }
}

export class OrPrerequisite extends Prerequisite{
  prereqs: Prerequisite[];

  constructor(p: Prerequisite[]) {
    super(null, null, null);
    this.prereqs = p;
  }

  evaluate(): boolean {
    return this.prereqs.some(elem => elem.evaluate());
  }

}

export class Action {
  readonly action: ACTION_TYPE;
  readonly property: string;
  readonly value: number| string;

  constructor(a: ACTION_TYPE, p: string, v: number | string) {
    this.action = a;
    this.property = p;
    this.value = v;
  }

  public apply(): void {
    if (typeof this.value === 'number') {
      switch (this.action) {
        case ACTION_TYPE.ADD:
          if ( !GameSave.values[this.property] )
            { GameSave.values[this.property] = 0; }
          GameSave.values[this.property] += this.value;
          break;
        case ACTION_TYPE.SUBTRACT:
          GameSave.values[this.property] = GameSave.values[this.property] - this.value;
          break;
        case ACTION_TYPE.SET:
          GameSave.values[this.property] = this.value;
          break;
        default:
          console.log('Error action not completed');
      }
    }
    if (typeof this.value === 'string'){
      switch (this.action){
        case ACTION_TYPE.SET:
          GameSave.values[this.property] = this.value;
          break;
        default:
          console.log('Error action not completed');
      }
    }
    if (typeof this.value === 'boolean'){
      switch (this.action){
        case ACTION_TYPE.SET:
          GameSave.values[this.property] = this.value;
          break;
        case ACTION_TYPE.TOGGLE:
          GameSave.values[this.property] = !GameSave.values[this.property];
          break;
        default:
          console.log('Error action not completed');
      }
    }
  }
}

export enum COMP_TYPE {
  ABOVE, BELOW, EXACTLY, SET, NOT_SET
}

export enum ACTION_TYPE{
  ADD, SUBTRACT, SET, TOGGLE
}

type Text = string | Evaluable;
type RoomId = string;
