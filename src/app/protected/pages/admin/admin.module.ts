import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListRequestComponent } from './pages/requests/list-request/list-request.component';
import { RequestComponent } from './pages/requests/request/request.component';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';


@NgModule({
  declarations: [
    ListRequestComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers:[
    AngularMaterialModule
  ]
})
export class AdminModule { }
