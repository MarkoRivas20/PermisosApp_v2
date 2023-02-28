import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { async, Observable, Subject } from 'rxjs';
import { InitializeService } from '../services/initialize.service';
import { onAuthStateChanged } from "firebase/auth";
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  public loader$ = new Subject<boolean>();
    public loader = false;

  constructor(private initService: InitializeService,
              private authService: AuthService,
              private router: Router){
  }

  canActivate(): Promise<boolean> | boolean  {


    return new Promise((resolve, reject) => {
      this.initService.auth.onAuthStateChanged(async (user) => {
        if (user) {

          this.authService.uid = user.uid;

          const access = await this.authService.getData(user.uid);
          if(access){
            this.loader$.next(false);

            resolve(true);
          }
          else{
            this.router.navigateByUrl('/auth/login');
          this.loader$.next(false);
          resolve(false);
          }

        } else {
          this.router.navigateByUrl('/auth/login');
          this.loader$.next(false);
          resolve(false);
        }
      });
    });
  }

  canLoad(): Promise<boolean> | boolean {

    this.loader$.next(true);

    return new Promise((resolve, reject) => {
      this.initService.auth.onAuthStateChanged(async (user) => {
        if (user) {

          this.authService.uid = user.uid;
          const access = await this.authService.getData(user.uid);
          if(access){
            this.loader$.next(false);

            resolve(true);
          }
          else{
            this.router.navigateByUrl('/auth/login');
            this.loader$.next(false);
            resolve(false);
          }
        } else {
          this.router.navigateByUrl('/auth/login');
          this.loader$.next(false);
          resolve(false);
        }
      });
    });
  }
}
