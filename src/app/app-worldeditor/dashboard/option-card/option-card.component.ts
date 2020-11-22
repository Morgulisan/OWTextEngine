import {Component, Input, OnInit} from '@angular/core';
import {DataServiceService} from '../../../DataService/data-service.service';
import {Option} from '../../../DataService/definitions';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css']
})
export class OptionCardComponent implements OnInit {

  constructor(data: DataServiceService) {
    this.data = data;
  }

  @Input() value: Option;

  public data: DataServiceService;

  ngOnInit(): void {
  }

}
