import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [

    NavbarComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    RouterModule
  ]
})
export class ProtectedModule { }
