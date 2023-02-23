import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ListRequestComponent } from './pages/requests/list-request/list-request.component';
import { RequestComponent } from './pages/requests/request/request.component';

import {NgxPrintModule} from 'ngx-print';



@NgModule({
  declarations: [
    RequestComponent,
    ListRequestComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ]
})
export class UsersModule { }
