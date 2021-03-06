import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountUserService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrderGuard implements CanActivate {
  constructor(private accountUserService: AccountUserService,
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const loggedIn = this.accountUserService.isLoggedUser()
      .map(loggedIn => {
        return loggedIn
          ? !!loggedIn
          : this.router.navigate(['home']) && !!loggedIn;
      } );
    return loggedIn;
  }
}
