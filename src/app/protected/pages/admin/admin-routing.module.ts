import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
