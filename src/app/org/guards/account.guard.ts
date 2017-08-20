import {Injectable} from '@angular/core';
import {CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AccountService} from '../services/auth/account.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccountGuard implements CanActivateChild {
  constructor(private accountService: AccountService,
              private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isAccountPage = state.url.includes('account');
    const isLogged = this.accountService.isLoggedIn().map(logged => {
      if (logged) {
        return isAccountPage ? this.router.navigate(['org', 'home']) && true : true;
      }
       return isAccountPage ? true : this.router.navigate(['org']) && false;
    });
    return isLogged;
  }
}
