import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { UserComponent } from './pages/users/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListUsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
