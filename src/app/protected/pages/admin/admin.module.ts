import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { UserComponent } from './pages/users/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListRequestComponent } from './pages/requests/list-request/list-request.component';
import { RequestComponent } from './pages/requests/request/request.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    ListUsersComponent,
    UserComponent,
    ListRequestComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
  ]
})
export class AdminModule { }
