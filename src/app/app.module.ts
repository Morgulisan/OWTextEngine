import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './app-worldeditor/dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { GameRunnerComponent } from './app-runner/game-runner/game-runner.component';
import {VariableViewerComponent} from './app-runner/game-runner/variable-viewer/variable-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GameRunnerComponent,
    VariableViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
