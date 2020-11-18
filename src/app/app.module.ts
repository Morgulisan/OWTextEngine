import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {GameRunnerComponent} from './app-runner/game-runner/game-runner.component';
import {VariableViewerComponentModule} from './app-runner/game-runner/variable-viewer/variable-viewer.component.module';
import {DashboardComponentModule} from './app-worldeditor/dashboard/dashboard.component.module';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

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
        DashboardComponentModule,
        MatCardModule,
        MatTooltipModule,
        MatButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
