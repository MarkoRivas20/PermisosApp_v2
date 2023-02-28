import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirestoreService } from 'src/app/protected/services/firestore.service';
import { PdfService } from 'src/app/protected/services/pdf.service';
import { InitializeService } from 'src/app/services/initialize.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{

  id: string = "";
  dateNow: string = "";
  enabled: boolean = true;
  status: string = "";
  loading: boolean = true;
  Request: any = {};

  get loadingButton(){

    return this.fireService.loading;
  }

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
      besterp: [false],
      radar: [false]
    }),
    accessSystemJustification: [null],
  });

  InternetForm = this._formBuilder.group({
    accessInternet: ["0", Validators.required],
    internetJustification: [null, Validators.required],
  });

  StatustForm = this._formBuilder.group({
    status: ["Pendiente", Validators.required],
  });

  statuses = [
    {value: 'Pendiente', viewValue: 'Pendiente'},
    {value: 'Aprobado', viewValue: 'Aprobado'},
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

  typeContracts = [
    {value: 'planilla', viewValue: 'Planilla'},
    {value: 'servicios', viewValue: 'Servicios'}
  ];

  typesComputer = [
    {value: 'Escritorio', viewValue: 'Computadora de Escritorio'},
    {value: 'Laptop', viewValue: 'Laptop'}
  ];

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fireService: FirestoreService,
    private pdfService: PdfService) {}

    ngOnInit(): void {

      moment.locale('es-MX');
      this.dateNow = moment().format('L') + " " + moment().format('LT');

      if(this.router.url.includes('edit')){

        this.activateRoute.params.pipe(switchMap(({id}) => this.fireService.getRequest(id))
        ).subscribe((request: any) => {

          this.Request = request;

          this.profileForm.disable();
          this.officeInfoForm.disable();
          this.observationForm.controls['applicantObservation'].disable();
          this.computerInfoForm.disable();
          this.AccessSystemForm.disable();
          this.InternetForm.disable();

          this.profileForm.reset(request);
          this.officeInfoForm.reset(request);
          this.observationForm.reset(request);
          this.computerInfoForm.reset(request);
          this.AccessSystemForm.reset(request);
          this.InternetForm.reset(request);
          this.StatustForm.reset(request);


          this.dateNow = request.date;

          this.status = request.status;

          this.id = request.id;

          this.loading = false;

          //this.myForm.controls['username'].disable();

        })
      }else{

        this.loading = false;
      }


    }

    update(){

      this.fireService.updateDocument("requests",this.id,{
        tiObservation: this.observationForm.controls['tiObservation'].value,
        status: this.StatustForm.controls['status'].value
      });
    }

    generatePDF(){

      this.pdfService.generatePdf(this.Request);
    }
}
