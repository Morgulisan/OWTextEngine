import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {CommonModule} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { ChipComponent } from './chip/chip.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  providers: [],
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  exports: [
    DashboardComponent,
  ],
  declarations: [
    DashboardComponent,
    ChipComponent,
  ]
})
export class DashboardComponentModule{
}
