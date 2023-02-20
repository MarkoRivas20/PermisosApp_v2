import { Injectable } from '@angular/core';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { Request, User } from 'src/app/interface/interface';
import { InitializeService } from 'src/app/services/initialize.service';
import { createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private initService: InitializeService) { }

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

  async EditUser(uid:string, user: User, password?: string){

    if(password){

    }

    const userRef = doc(this.initService.db, "users", uid);

    await updateDoc(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      job: user.job,
      document: user.document,
    }).then(() => {
      console.log('Actualizado correctamente');
    }).catch(() => {
      console.log('Error al actualizar');
    });

  }

  saveUser(user: User, email:string, password: string){

    createUserWithEmailAndPassword(this.initService.auth, email, password).then(async (userCredential) => {

      await setDoc(doc(this.initService.db, "users", userCredential.user.uid), user);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
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
      return {};

    }

  }

  async getRequest(id:string){

    const docRef = doc(this.initService.db, "requests", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      const request: Request = {
        id:  docSnap.id,
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
      return {};

    }

  }

  async updateDocument(document:string, id: string, newObject:any){

      const Ref = doc(this.initService.db, document, id);

      await updateDoc(Ref, newObject).then(() => {
        console.log('Actualizacion Exitosa');
      }).catch(() => {
        console.log('Actualizacion Fallida');
      });
  }
}
