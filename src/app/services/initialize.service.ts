import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  app!: FirebaseApp;
  auth!: Auth;
  db!: Firestore;

  constructor(){

  }

  initializeApp(){

    this.app = initializeApp(environment.firebase);

    this.auth = getAuth(this.app);

    this.db = getFirestore(this.app);
  }

}
