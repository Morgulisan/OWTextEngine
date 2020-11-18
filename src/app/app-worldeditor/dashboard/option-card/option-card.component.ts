import {Component, Input, OnInit} from '@angular/core';
import {Option} from '../../../app-runner/game-runner/game-runner.component';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css']
})
export class OptionCardComponent implements OnInit {

  @Input() value: Option;

  constructor() { }

  ngOnInit(): void {
  }

}
