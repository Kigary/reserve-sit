import {Injectable} from '@angular/core';
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService,
              private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.orgLogin) {
      return true;
    }
    this.router.navigate(['/org']);
      return false;
  }
}
