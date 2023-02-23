import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {collection, addDoc  } from "firebase/firestore";
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirestoreService } from 'src/app/protected/services/firestore.service';
import { LocalService } from 'src/app/protected/services/local.service';
import { PdfService } from 'src/app/protected/services/pdf.service';
import { SweetalertService } from 'src/app/protected/services/sweetalert.service';
import { InitializeService } from 'src/app/services/initialize.service';
import Swal from 'sweetalert2';

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
  loading: boolean = true;
  Request: any = {}
  ip: string = "";

  get loadingButton(){

    return this.fireService.loading;
  }

  profileForm = this._formBuilder.group({
    name: ["", Validators.required],
    document: ["", Validators.required],
    typeContract: ["", Validators.required],
    job: ["", Validators.required],
    cellphone: ["", Validators.required],
    email: ["", Validators.required],
  });

  officeInfoForm = this._formBuilder.group({
    office: [null, Validators.required],
    location: [null, Validators.required],
  });

  observationForm = this._formBuilder.group({
    applicantObservation: [null],
    tiObservation: [null],
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

  locations: Array<any> = [
    {
      value: 'Arequipa',
      viewValue: 'Agencia de Arequipa',
      offices: [
        {value: 'Caja', viewValue: 'Caja'},
        {value: 'Créditos', viewValue: 'Créditos'},
        {value: 'Agencia', viewValue: 'Jefe de Agencia'}
      ]
    },
    {
      value: 'Cuajone',
      viewValue: 'Agencia de Cuajone',
      offices: [
        {value: 'Caja', viewValue: 'Caja'},
        {value: 'Créditos', viewValue: 'Créditos'},
        {value: 'Agencia', viewValue: 'Jefe de Agencia'}
      ]
    },
    {
      value: 'Ilo',
      viewValue: 'Agencia de Ilo',
      offices: [
        {value: 'Caja', viewValue: 'Caja'},
        {value: 'Créditos', viewValue: 'Créditos'},
        {value: 'Agencia', viewValue: 'Jefe de Agencia'}
      ]
    },
    {
      value: 'Moquegua',
      viewValue: 'Agencia de Moquegua',
      offices: [
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
      ]
    },
    {
      value: 'Tacna',
      viewValue: 'Agencia de Tacna',
      offices: [
        {value: 'Caja', viewValue: 'Caja'},
        {value: 'Créditos', viewValue: 'Créditos'},
        {value: 'Agencia', viewValue: 'Jefe de Agencia'}
      ]
    }
  ];

  typesComputer = [
    {value: 'Escritorio', viewValue: 'Computadora de Escritorio'},
    {value: 'Laptop', viewValue: 'Laptop'}
  ];

  constructor(private _formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private fireService: FirestoreService,
              private localService: LocalService,
              private sweetalertService: SweetalertService,
              private pdfService: PdfService) {


  }

  ngOnInit(): void {

    this.profileForm.controls['name'].disable();
    this.profileForm.controls['document'].disable();
    this.profileForm.controls['job'].disable();
    this.officeInfoForm.controls['office'].disable();
    this.AccessSystemForm.controls['systems'].disable();
    this.AccessSystemForm.controls['accessSystemJustification'].disable();
    this.InternetForm.controls['internetJustification'].disable();

    moment.locale('es-MX');
    this.dateNow = moment().format('L') + " " + moment().format('LT');

    if(this.router.url.includes('edit')){

      this.activateRoute.params.pipe(switchMap(({id}) => this.fireService.getRequest(id))
      ).subscribe((request: any) => {

        this.Request = request;

        if(request.uidUser != this.authService.User.uid){

          this.router.navigateByUrl('/protected/user/requests/list');

        }

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

        this.loading = false;

        //this.myForm.controls['username'].disable();

      })
    }
    else{

      this.profileForm.reset({
        name: this.authService.User.firstName + " " + this.authService.User.lastName,
        document: this.authService.User.document,
        job: this.authService.User.job
      });



      this.localService.getMyIP ((localIp:any) => {

        this.computerInfoForm.controls['ip'].disable();
        this.computerInfoForm.reset({
          ip: localIp
        });
        this.ip = localIp;
      });

      this.loading = false;
    }

    this.officeInfoForm.controls['location'].valueChanges.subscribe((value) => {
      this.changeOffice(value);

      if(!this.loading){
        this.officeInfoForm.controls['office'].enable();
      }
    });

    this.AccessSystemForm.controls['accessSystem'].valueChanges.subscribe((value) => {

      if(!this.loading){
        if(value == "true"){
          this.AccessSystemForm.controls['systems'].enable();
          this.AccessSystemForm.controls['accessSystemJustification'].enable();

          this.AccessSystemForm.controls['systems'].addValidators([Validators.required]);
          this.AccessSystemForm.controls['accessSystemJustification'].addValidators([Validators.required]);
        }else{
          this.AccessSystemForm.controls['systems'].disable();
          this.AccessSystemForm.controls['accessSystemJustification'].disable();
          this.AccessSystemForm.controls['systems'].reset();
          this.AccessSystemForm.controls['accessSystemJustification'].reset();
          this.AccessSystemForm.controls['systems'].removeValidators([Validators.required]);
          this.AccessSystemForm.controls['accessSystemJustification'].removeValidators([Validators.required]);
        }
      }

    });

    this.InternetForm.controls['accessInternet'].valueChanges.subscribe((value) => {

      if(!this.loading){
        if(value != "0"){
          this.InternetForm.controls['internetJustification'].enable();
        }else{
          this.InternetForm.controls['internetJustification'].disable();
          this.InternetForm.controls['internetJustification'].reset();
        }
      }

    });

  }

  async sendInfo(){

    const today = new Date();
    const dateTime = today.getFullYear()+""+(today.getMonth()+1)+""+today.getDate()+""+today.getHours()+""+today.getMinutes()+""+today.getSeconds();


    const newRequest = Object.assign(
      {
        name: this.authService.User.firstName + " " + this.authService.User.lastName,
        document: this.authService.User.document,
        job: this.authService.User.job,
        ip: this.ip
      },
      {...this.profileForm.value},
      {...this.officeInfoForm.value},
      {...this.observationForm.value},
      {...this.computerInfoForm.value},
      {...this.AccessSystemForm.value},
      {...this.InternetForm.value},{
        uidUser: this.authService.User.uid,
        date: this.dateNow,
        status: 'Pendiente',
        code: dateTime
      });


    if(this.profileForm.valid &&
      this.officeInfoForm.valid &&
      this.computerInfoForm.valid &&
      this.AccessSystemForm.valid &&
      this.InternetForm.valid ){


        await this.fireService.saveDocument("requests", newRequest);

        this.sweetalertService.ShowConfirmDialog(newRequest);
    }
    else{

      this.sweetalertService.Toast.fire({
        icon: 'error',
        title: 'Debe de completar todos los campos'
      })

      this.profileForm.markAllAsTouched()
      this.officeInfoForm.markAllAsTouched()
      this.computerInfoForm.markAllAsTouched()
      this.AccessSystemForm.markAllAsTouched()
      this.InternetForm.markAllAsTouched()

    }

  }

  generatePDF(){

    this.pdfService.generatePdf(this.Request);
  }

  changeOffice(count: any) {
    this.offices = this.locations.find(con => con.value == count).offices;
  }





}
