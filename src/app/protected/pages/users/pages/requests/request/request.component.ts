import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {collection, addDoc  } from "firebase/firestore";
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirestoreService } from 'src/app/protected/services/firestore.service';
import { InitializeService } from 'src/app/services/initialize.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{

  dateNow: string = "";
  enabled: boolean = true;
  created: boolean = false;
  status: string = "";

  profileForm = this._formBuilder.group({
    name: [null, Validators.required],
    document: [null, Validators.required],
    typeContract: [null, Validators.required],
    job: [null, Validators.required],
    cellphone: [null, Validators.required],
    email: [null, Validators.required],
  });

  officeInfoForm = this._formBuilder.group({
    office: [null, Validators.required],
    location: [null, Validators.required],
  });

  observationForm = this._formBuilder.group({
    applicantObservation: [null, Validators.required],
    tiObservation: [null, Validators.required],
  });

  computerInfoForm = this._formBuilder.group({
    computerName: [null, Validators.required],
    ip: [null, Validators.required],
    typeComputer: [null, Validators.required],
  });

  AccessSystemForm = this._formBuilder.group({
    accessSystem: ["false", Validators.required],
    systems: this._formBuilder.group({
      besterp: [false]
    }),
    accessSystemJustification: [null, Validators.required],
  });

  InternetForm = this._formBuilder.group({
    accessInternet: ["0", Validators.required],
    internetJustification: [null, Validators.required],
  });

  locations = [
    {value: 'Arequipa', viewValue: 'Agencia de Arequipa'},
    {value: 'Cuajone', viewValue: 'Agencia de Cuajone'},
    {value: 'Ilo', viewValue: 'Agencia de Ilo'},
    {value: 'Moquegua', viewValue: 'Agencia de Moquegua'},
    {value: 'Tacna', viewValue: 'Agencia de Tacna'},
  ];

  typeContracts = [
    {value: 'planilla', viewValue: 'Planilla'},
    {value: 'servicios', viewValue: 'Servicios'}
  ];

  offices = [
    {value: 'Riesgos', viewValue: 'Subgerencia de Riesgos'},
    {value: 'Recuperaciones', viewValue: 'Subgerencia de Recuperaciones'},
    {value: 'Contabilidad', viewValue: 'Contabilidad'},
    {value: 'Operaciones', viewValue: 'Subgerencia de Operaciones'},
    {value: 'Negocios', viewValue: 'Subgerencia de Negocios'},
    {value: 'Logística', viewValue: 'Logística'},
    {value: 'Créditos', viewValue: 'Créditos'},
    {value: 'Caja', viewValue: 'Caja'},
    {value: 'Agencia', viewValue: 'Jefe de Agencia'},
    {value: 'Legal', viewValue: 'Asesoría Legal'},
    {value: 'Mesa', viewValue: 'Mesa de Partes'},
    {value: 'Auditoría', viewValue: 'Auditoría'},
    {value: 'Seguros', viewValue: 'Seguros'},
    {value: 'RRHH', viewValue: 'Recursos Humanos'},
    {value: 'Informática', viewValue: 'Subgerencia de Informática'},
    {value: 'Consejo', viewValue: 'Consejo de Administración'},
    {value: 'Comite', viewValue: 'Comité de Educación'},
    {value: 'Cumplimiento', viewValue: 'Oficial de Cumplimiento'},
    {value: 'Administración', viewValue: 'Administración'},
    {value: 'Gerencia', viewValue: 'Gerencia General'}
  ];

  typesComputer = [
    {value: 'Escritorio', viewValue: 'Computadora de Escritorio'},
    {value: 'Laptop', viewValue: 'Laptop'}
  ];

  constructor(private _formBuilder: FormBuilder,
              private http: HttpClient,
              private initService: InitializeService,
              private authService: AuthService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private fireService: FirestoreService) {}

  ngOnInit(): void {

    moment.locale('es-MX');
    this.dateNow = moment().format('L') + " " + moment().format('LT');

    if(this.router.url.includes('edit')){

      this.activateRoute.params.pipe(switchMap(({id}) => this.fireService.getRequest(id))
      ).subscribe((request: any) => {

        console.log(request);

        this.profileForm.disable();
        this.officeInfoForm.disable();
        this.observationForm.disable();
        this.computerInfoForm.disable();
        this.AccessSystemForm.disable();
        this.InternetForm.disable();

        this.profileForm.reset(request);
        this.officeInfoForm.reset(request);
        this.observationForm.reset(request);
        this.computerInfoForm.reset(request);
        this.AccessSystemForm.reset(request);
        this.InternetForm.reset(request);

        this.dateNow = request.date;

        this.created = true;

        this.status = request.status;

        //this.myForm.controls['username'].disable();

      })
    }


  }

  async sendInfo(){

    const newRequest = Object.assign(this.profileForm.value,
      this.officeInfoForm.value,
      this.observationForm.value,
      this.computerInfoForm.value,
      this.AccessSystemForm.value,
      this.InternetForm.value,{
        uidUser: this.authService.User.uid,
        date: this.dateNow
      });

    console.log(newRequest);

    const docRef = await addDoc(collection(this.initService.db, "requests"), newRequest);
    console.log("Document written with ID: ", docRef.id);

  }
}
