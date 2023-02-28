import { Injectable } from '@angular/core';
import { collection, getDocs, doc, orderBy, getDoc, updateDoc, addDoc, query, serverTimestamp } from "firebase/firestore";
import { Request, User } from 'src/app/interface/interface';
import { InitializeService } from 'src/app/services/initialize.service';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SweetalertService } from './sweetalert.service';
import { Router } from '@angular/router';
import { PdfService } from './pdf.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  loading: boolean = false;

  constructor(private initService: InitializeService,
              private sweetAlertService: SweetalertService,
              private pdfService: PdfService) { }


  async getAllRequests(){

    const requests: any[] = [];
    const requestRef = collection(this.initService.db, "requests");
    const queryDB = query(requestRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(queryDB);
    querySnapshot.forEach((doc) => {

      let request = Object.assign(doc.data(),{
        id: doc.id
      })

      requests.push(request);
    });

    return requests;
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

    newObject["timestamp"] = serverTimestamp();

    await addDoc(collection(this.initService.db, document), newObject).then((docRef) => {

      this.sweetAlertService.Toast.fire({
        icon: 'success',
        title: 'Guardado correctamente'
      })

      this.pdfService.generatePdf(newObject);

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
