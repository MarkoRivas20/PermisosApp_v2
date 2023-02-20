import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRequestComponent } from './pages/requests/list-request/list-request.component';
import { RequestComponent } from './pages/requests/request/request.component';

const routes: Routes = [
  {
    path: 'requests',
    children: [
      {
        path: 'list',
        component: ListRequestComponent
      },
      {
        path: 'add',
        component: RequestComponent
      },
      {
        path: 'edit/:id',
        component: RequestComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'requests'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
