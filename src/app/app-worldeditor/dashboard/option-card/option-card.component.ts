import {Component, Input, OnInit} from '@angular/core';
import {Option} from '../../../app-runner/game-runner/game-runner.component';
import {DataServiceService} from '../../../DataService/data-service.service';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css']
})
export class OptionCardComponent implements OnInit {

  @Input() value: Option;

  public data: DataServiceService;

  constructor(data: DataServiceService) {
    this.data = data;
  }

  ngOnInit(): void {
  }

}
