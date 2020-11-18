import {Component} from '@angular/core';
import {DataServiceService} from './DataService/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OWTextEnigne';

  gameFiles = null;

  constructor(private data: DataServiceService ) {
    this.gameFiles = data.getFiles();
  }

}
