import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {

      if (route.data['roles'] == this.authService.User.role) {

        return true;

      }else{

        this.router.navigateByUrl('/protected/'+this.authService.User.role);
        return false;
      }

  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean | UrlTree> {

    if (segments[0].path == this.authService.User.role) {
      return true;

    }else{

      this.router.navigateByUrl('/protected/'+this.authService.User.role);
      return false;
    }
  }
}
