import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {CommonModule} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {ChipComponent} from './chip/chip.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {RoomListItemComponent} from './room-list-item/room-list-item.component';
import {OptionCardComponent} from './option-card/option-card.component';

@NgModule({
  providers: [],
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    MatChipsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
  ],
  exports: [
    DashboardComponent,
  ],
  declarations: [
    DashboardComponent,
    ChipComponent,
    RoomListItemComponent,
    OptionCardComponent,
  ]
})
export class DashboardComponentModule{
}
