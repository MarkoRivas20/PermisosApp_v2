import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InitializeService } from '../services/initialize.service';
import { onAuthStateChanged } from "firebase/auth";
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private initService: InitializeService,
              private authService: AuthService,
              private router: Router){

  }

  canActivate(): Promise<boolean> | boolean  {

    return new Promise((resolve, reject) => {
      this.initService.auth.onAuthStateChanged((user) => {
        if (user) {

          this.authService.uid = user.uid;

          resolve(true);
        } else {
          this.router.navigateByUrl('/auth/login');
          resolve(false);
        }
      });
    });
  }

  canLoad(): Promise<boolean> | boolean {

    return new Promise((resolve, reject) => {
      this.initService.auth.onAuthStateChanged((user) => {
        if (user) {

          this.authService.uid = user.uid;

          resolve(true);
        } else {
          this.router.navigateByUrl('/auth/login');
          resolve(false);
        }
      });
    });
  }
}
