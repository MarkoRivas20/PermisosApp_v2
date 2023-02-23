import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/protected/services/firestore.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{

  users: User[] = [];
  loading: boolean = true;

  constructor(private fireService: FirestoreService,
              private authService: AuthService){

  }

  ngOnInit(): void {


    this.fireService.getAllUsers().then((resp) => {

      this.users = resp;
      this.loading = false;

    }).catch((error) => {

      console.log(error);
    });
  }


}
