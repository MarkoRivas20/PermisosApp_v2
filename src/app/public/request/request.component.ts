import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirestoreService } from 'src/app/protected/services/firestore.service';
import { LocalService } from 'src/app/protected/services/local.service';
import { PdfService } from 'src/app/protected/services/pdf.service';
import { SweetalertService } from 'src/app/protected/services/sweetalert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{

  dateNow: string = "";
  loading: boolean = true;
  ip: string = "";
  showDialog: boolean = false;
  checked: boolean = false;

  get loadingButton(){

    return this.fireService.loading;
  }

  get loadingPage(){

    return this.authService._loading;
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
    applicantObservation: [null]
  });

  computerInfoForm = this._formBuilder.group({
    computerName: [null, Validators.required],
    ip: [null, Validators.required],
    typeComputer: [null, Validators.required],
  });

  AccessSystemForm = this._formBuilder.group({
    accessSystem: ["false", Validators.required],
    systems: this._formBuilder.group({
      besterp: [false],
      radar: [false]
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
        {value: 'Información', viewValue: 'Información'}
      ]
    }
  ];

  typesComputer = [
    {value: 'Escritorio', viewValue: 'Computadora de Escritorio'},
    {value: 'Laptop', viewValue: 'Laptop'}
  ];

  constructor(private _formBuilder: FormBuilder,
              private authService: AuthService,
              private fireService: FirestoreService,
              private localService: LocalService,
              private sweetalertService: SweetalertService,) {

                authService.SignInAnonimously();
              }

  ngOnInit(): void {


    this.officeInfoForm.controls['office'].disable();
    this.AccessSystemForm.controls['systems'].disable();
    this.AccessSystemForm.controls['accessSystemJustification'].disable();
    this.InternetForm.controls['internetJustification'].disable();

    moment.locale('es-MX');
    this.dateNow = moment().format('L');

    this.localService.getMyIP ((localIp:any) => {

      if(localIp != 'unavailable'){
        this.computerInfoForm.controls['ip'].disable();
        this.computerInfoForm.reset({
          ip: localIp
        });
        this.ip = localIp;
      }

    });

    this.loading = false;

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

    const dateNow = moment().format('L') + " " + moment().format('LT');
    const today = new Date();
    const dateTime = today.getFullYear()+""+(today.getMonth()+1)+""+today.getDate()+""+today.getHours()+""+today.getMinutes()+""+today.getSeconds();

    const newRequest = Object.assign(
      {...this.profileForm.value},
      {...this.officeInfoForm.value},
      {...this.observationForm.value},
      {...this.computerInfoForm.value},
      {...this.AccessSystemForm.value},
      {...this.InternetForm.value},{
        date: dateNow,
        status: 'Pendiente',
        code: dateTime,
        ip: this.ip
      });

    if(this.profileForm.valid &&
      this.officeInfoForm.valid &&
      this.computerInfoForm.valid &&
      this.AccessSystemForm.valid &&
      this.InternetForm.valid ){


        await this.fireService.saveDocument("requests", newRequest);

        this.showDialog = false;
        this.sweetalertService.ShowConfirmDialog(newRequest);

    }
    else{

      this.showDialog = false;

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

  changeOffice(count: any) {
    this.offices = this.locations.find(con => con.value == count).offices;
  }

}
