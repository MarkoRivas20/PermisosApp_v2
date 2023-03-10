import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, signInAnonymously  } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { User } from 'src/app/interface/interface';
import { SweetalertService } from 'src/app/protected/services/sweetalert.service';
import { InitializeService } from 'src/app/services/initialize.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _loading: boolean = false;

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
              private router: Router,
              private sweetService: SweetalertService) { }

  SignIn(email: string, password: string){

    this._loading = true;

    signInWithEmailAndPassword(this.initService.auth, email, password)
      .then(async (userCredential) => {

        await this.getData(userCredential.user.uid);

        if (this._User.role == 'admin') {
          this.router.navigateByUrl('/protected/admin/users');
        }else{

          this.router.navigateByUrl('/protected/user/requets');
        }

        this._loading = false;


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        this._loading = false;
        this.sweetService.showError("Usuario o contraseña incorrectos");
      });
  }

  SignInAnonimously(){

    this._loading = true;

    signInAnonymously(this.initService.auth)
    .then(() => {

      this._loading = false;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      this._loading = false;
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


      return true;


    } else {

      console.log("No such document!");

      return false;
    }

  }

  LogOut(){

    this.initService.auth.signOut();
    this.router.navigateByUrl('/auth/login');
  }



}
