import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { InitializeService } from './services/initialize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'siscacc';

  get loader(){
    return this.authGuard.loader$;
  }

  constructor( private initService: InitializeService,
               private authGuard: AuthGuard){
    this.initService.initializeApp();
  }
}
