import { Component } from '@angular/core';
import { InitializeService } from './services/initialize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'siscacc';

  constructor( private initService: InitializeService){
    this.initService.initializeApp();
  }
}
