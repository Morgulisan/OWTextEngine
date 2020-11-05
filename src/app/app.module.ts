import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { GameRunnerComponent } from './app-runner/game-runner/game-runner.component';
import {VariableViewerComponentModule} from './app-runner/game-runner/variable-viewer/variable-viewer.component.module';
import {DashboardComponentModule} from './app-worldeditor/dashboard/dashboard.component.module';


@NgModule({
  declarations: [
    AppComponent,
    GameRunnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    VariableViewerComponentModule,
    DashboardComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
