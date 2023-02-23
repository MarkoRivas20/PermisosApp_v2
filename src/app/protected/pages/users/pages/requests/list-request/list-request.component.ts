import { Component, OnInit } from '@angular/core';
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthService } from 'src/app/auth/services/auth.service';
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
              private authService: AuthService){}

  ngOnInit(): void {


    this.getRequests();

  }

  async getRequests(){


    const q = query(collection(this.initService.db, "requests"), where("uidUser", "==", this.authService.User.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc: any) => {

      let request = Object.assign(doc.data(),{
        id: doc.id
      })

      this.requests.push(request);
    });

    this.loading = false;

  }

}
