import {Component, Input, OnInit} from '@angular/core';
import {GameSave} from '../../../DataService/definitions';

@Component({
  selector: 'app-evaluable',
  templateUrl: './variable-viewer.component.html',
  styleUrls: ['./variable-viewer.component.css']
})
export class VariableViewerComponent implements OnInit {

  constructor() { }

  static SaveGame: GameSave;

  @Input() value: string;

  static setSaveGame(save: GameSave): void{
    VariableViewerComponent.SaveGame = save;
  }

  ngOnInit(): void {
  }

  evaluate(): string{
    if ( !VariableViewerComponent.SaveGame[this.value]) { return '0'; }
    return VariableViewerComponent.SaveGame[this.value];
  }
}
