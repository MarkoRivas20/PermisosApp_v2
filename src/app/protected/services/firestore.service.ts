import { Injectable } from '@angular/core';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc, addDoc} from "firebase/firestore";
import { Request, User } from 'src/app/interface/interface';
import { InitializeService } from 'src/app/services/initialize.service';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SweetalertService } from './sweetalert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  loading: boolean = false;

  constructor(private initService: InitializeService,
              private sweetAlertService: SweetalertService,
              private router: Router) { }

  async getAllUsers(){

    console.log(this.initService.auth.currentUser);

    const users: User[] = [];

    const querySnapshot = await getDocs(collection(this.initService.db, "users"));
    querySnapshot.forEach((doc) => {

      console.log(doc.id);

      let user:User = {
        uid: doc.id,
        firstName: doc.data()['firstName'],
        lastName: doc.data()['lastName'],
        job: doc.data()['job'],
        role: doc.data()['role'],
        username: doc.data()['username'],
        document: doc.data()['document'],
      }

      users.push(user);
    });

    return users;
  }

  async getAllRequests(){

    const requests: any[] = [];

    const querySnapshot = await getDocs(collection(this.initService.db, "requests"));
    querySnapshot.forEach((doc) => {

      console.log(doc.id);

      let request = Object.assign(doc.data(),{
        id: doc.id
      })

      requests.push(request);
    });

    return requests;
  }

  async EditUser(uid:string, user: User){

    this.loading = true;

    const userRef = doc(this.initService.db, "users", uid);

    await updateDoc(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      job: user.job,
      document: user.document,
    }).then(() => {
      console.log('Actualizado correctamente');

      this.sweetAlertService.Toast.fire({
        icon: 'success',
        title: 'Actualizado correctamente'
      })

      this.loading = false;

    }).catch(() => {
      console.log('Error al actualizar');

      this.sweetAlertService.Toast.fire({
        icon: 'error',
        title: 'Actualización fallida'
      })

      this.loading = false;
    });

  }

  saveUser(user: User, email:string, password: string){

    this.loading = true;

    createUserWithEmailAndPassword(this.initService.auth, email, password).then(async (userCredential) => {

      await setDoc(doc(this.initService.db, "users", userCredential.user.uid), user).then((resp) => {

        this.sweetAlertService.Toast.fire({
          icon: 'success',
          title: 'Creado correctamente'
        })

        this.loading = false;

        this.router.navigateByUrl('/protected/admin/users/list');

      }).catch((error) => {

        this.sweetAlertService.Toast.fire({
          icon: 'error',
          title: 'Creación Fallida'
        })

        this.loading = false;

      });

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      this.sweetAlertService.Toast.fire({
        icon: 'error',
        title: 'Creación Fallida'
      })

      this.loading = false;
    });
  }

  async getUser(uid:string){

    const docRef = doc(this.initService.db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      const user: User = {
        uid: docSnap.id,
        username: docSnap.data()['username'],
        job: docSnap.data()['job'],
        role: docSnap.data()['role'],
        firstName: docSnap.data()['firstName'],
        lastName: docSnap.data()['lastName'],
        document: docSnap.data()['document']
      }

      return user;

    } else {

      console.log("No such document!");
      this.sweetAlertService.Toast.fire({
        icon: 'error',
        title: 'Error al obtener el usuario'
      })
      return {};

    }

  }

  async getRequest(id:string){

    const docRef = doc(this.initService.db, "requests", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      const request: Request = {
        id:  docSnap.id,
        code: docSnap.data()['code'],
        tiObservation: docSnap.data()['tiObservation'],
        ip: docSnap.data()['ip'],
        computerName: docSnap.data()['computerName'],
        internetJustification: docSnap.data()['internetJustification'],
        email: docSnap.data()['email'],
        typeComputer: docSnap.data()['typeComputer'],
        office: docSnap.data()['office'],
        accessSystem: docSnap.data()['accessSystem'],
        uidUser: docSnap.data()['uidUser'],
        typeContract: docSnap.data()['typeContract'],
        accessInternet: docSnap.data()['accessInternet'],
        applicantObservation: docSnap.data()['applicantObservation'],
        job: docSnap.data()['job'],
        document: docSnap.data()['document'],
        accessSystemJustification: docSnap.data()['accessSystemJustification'],
        location: docSnap.data()['location'],
        cellphone: docSnap.data()['cellphone'],
        systems: docSnap.data()['systems'],
        name: docSnap.data()['name'],
        date: docSnap.data()['date'],
        status: docSnap.data()['status']
      }

      return request;

    } else {

      console.log("No such document!");
      this.sweetAlertService.Toast.fire({
        icon: 'error',
        title: 'Error al obtener el usuario'
      })
      return {};

    }

  }

  async updateDocument(document:string, id: string, newObject:any){

    this.loading = true;

      const Ref = doc(this.initService.db, document, id);

      await updateDoc(Ref, newObject).then(() => {

        this.sweetAlertService.Toast.fire({
          icon: 'success',
          title: 'Actualizado correctamente'
        })

        this.loading = false;
      }).catch(() => {

        this.sweetAlertService.Toast.fire({
          icon: 'error',
          title: 'Actualización fallida'
        })

        this.loading = false;
      });
  }

  async saveDocument(document:string, newObject:any){

    this.loading = true;

    await addDoc(collection(this.initService.db, document), newObject).then((docRef) => {

      this.sweetAlertService.Toast.fire({
        icon: 'success',
        title: 'Guardado correctamente'
      })

      this.loading = false;

      //this.router.navigateByUrl('/protected/user/requests/list');

    }).catch((error) => {

      this.sweetAlertService.Toast.fire({
        icon: 'error',
        title: 'Error al guardar la información'
      })

      this.loading = false;

    });


  }
}
