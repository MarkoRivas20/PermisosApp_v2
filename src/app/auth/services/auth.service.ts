import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { User } from 'src/app/interface/interface';
import { InitializeService } from 'src/app/services/initialize.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _User: User = {
    uid: "",
    username: "",
    job: "",
    role: "",
    firstName: "",
    lastName: "",
    document: ""
  };
  uid: string = "";

  get User(){

    return {...this._User}
  }

  constructor(private initService: InitializeService,
              private router: Router) { }

  SignIn(email: string, password: string){

    signInWithEmailAndPassword(this.initService.auth, email, password)
      .then(async (userCredential) => {

        await this.getData(userCredential.user.uid);

        //this.verifyToken();

        if (this._User.role == 'admin') {
          this.router.navigateByUrl('/protected/admin/users');
        }else{

          this.router.navigateByUrl('/protected/user/requets');
        }



      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  async getData(uid:string){

    const docRef = doc(this.initService.db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      this._User = {
        uid: docSnap.id,
        username: docSnap.data()['username'],
        job: docSnap.data()['job'],
        role: docSnap.data()['role'],
        firstName: docSnap.data()['firstName'],
        lastName: docSnap.data()['lastName'],
        document: docSnap.data()['document']
      };

      console.log(this._User);


    } else {

      console.log("No such document!");
    }

  }

  LogOut(){

    this.initService.auth.signOut();
    this.router.navigateByUrl('/auth/login');
  }


}
