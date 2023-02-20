import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interface/interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  User: User = {
    uid: "",
    username: "",
    job: "",
    role: "",
    firstName: "",
    lastName: "",
    document: ""
  };

  constructor(private authService: AuthService){

    this.prueba();
  }

  async ngOnInit(): Promise<void> {

  }

  async prueba(){
    //await this.authService.getData(this.authService.uid);

    this.User = this.authService.User;
  }

  logout(){

    this.authService.LogOut();
  }

}
