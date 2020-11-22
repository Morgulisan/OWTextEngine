import {Component} from '@angular/core';
import {DataServiceService} from './DataService/data-service.service';
import {GameFile} from './DataService/definitions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OWTextEnigne';

  gameFiles: GameFile;

  constructor(private data: DataServiceService ) {
    this.gameFiles = data.getFiles();
  }

}
