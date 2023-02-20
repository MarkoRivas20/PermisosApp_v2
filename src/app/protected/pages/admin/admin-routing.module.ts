import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRequestComponent } from './pages/requests/list-request/list-request.component';
import { RequestComponent } from './pages/requests/request/request.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { UserComponent } from './pages/users/user/user.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: 'list',
        component: ListUsersComponent
      },
      {
        path: 'add',
        component: UserComponent
      },
      {
        path: 'edit/:uid',
        component: UserComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  },
  {
    path: 'requests',
    children: [
      {
        path: 'list',
        component: ListRequestComponent
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
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
