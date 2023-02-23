import { Component, OnInit } from '@angular/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirestoreService } from 'src/app/protected/services/firestore.service';
import { InitializeService } from 'src/app/services/initialize.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit{

  requests: any[] = [];
  loading: boolean = true;

  constructor(private initService: InitializeService,
              private authService: AuthService,
              private fireService: FirestoreService){}

  ngOnInit(): void {


    this.fireService.getAllRequests().then((resp) => {


      this.requests = resp;

      this.loading = false;

    }).catch((error) => {

      console.log(error);
    });

  }
}
