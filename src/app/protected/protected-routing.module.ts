import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { NavbarComponent } from './shared/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
        canActivate: [RoleGuard],
        canLoad: [RoleGuard],
        data: {roles: 'admin'}
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        canActivate: [RoleGuard],
        canLoad: [RoleGuard],
        data: {roles: 'user'}
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
