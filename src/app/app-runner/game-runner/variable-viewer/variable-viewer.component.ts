import {Component, Input, OnInit} from '@angular/core';
import {GameSave} from '../game-runner.component';

@Component({
  selector: 'app-evaluable',
  templateUrl: './variable-viewer.component.html',
  styleUrls: ['./variable-viewer.component.css']
})
export class VariableViewerComponent implements OnInit {

  constructor() { }

  static Savegame: GameSave;

  @Input() value: string;

  static setSaveGame(save: GameSave): void{
    VariableViewerComponent.Savegame = save;
  }

  ngOnInit(): void {
  }

  evaluate(): string{
    if ( !VariableViewerComponent.Savegame[this.value]) { return '0'; }
    return VariableViewerComponent.Savegame[this.value];
  }
}
