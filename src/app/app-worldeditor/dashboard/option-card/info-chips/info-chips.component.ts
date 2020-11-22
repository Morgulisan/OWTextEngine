import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-chips',
  templateUrl: './info-chips.component.html',
  styleUrls: ['./info-chips.component.css']
})
export class InfoChipsComponent implements OnInit {

  @Input() chipColor: string;
  @Input() chipText: string;
  @Input() chipTooltip: string;

  constructor() { }

  ngOnInit(): void {
  }

}
