import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { RequestComponent } from './pages/request/request.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class UsersModule { }
