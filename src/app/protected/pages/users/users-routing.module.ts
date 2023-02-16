import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './pages/request/request.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'request',
        component: RequestComponent
      },
      {
        path: '**',
        redirectTo: 'request'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
