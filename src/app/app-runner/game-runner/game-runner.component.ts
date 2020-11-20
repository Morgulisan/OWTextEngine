import {Component, Input, OnInit} from '@angular/core';
import {VariableViewerComponent} from './variable-viewer/variable-viewer.component';
import {FileType, GameFile} from '../../app.component';

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

export class Room {

  readonly roomId: RoomId;
  readonly roomName: Text;
  readonly content: Text;
  readonly options?: Option[];

  constructor(id: string, rn: Text, cont: Text, options: Option[]) {
    this.roomId = id;
    this.roomName = rn;
    this.content = cont;
    this.options = options;

  }

}

export class Option {

  readonly prerequisite?: Prerequisite[];
  readonly optionText: Text;
  readonly changes?: Action[];
  readonly nextScene?: RoomId;

  constructor(text: Text, next: RoomId, change?: Action[], pre?: Prerequisite[]) {
    this.nextScene = next;
    this.optionText = text;
    this.changes = change;
    this.prerequisite = pre;
  }

}

export class Evaluable {

  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  public toString = (): string => {
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
