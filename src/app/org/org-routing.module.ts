import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterAcounteComponent} from './register-account/register-account.component';
import {LoginComponent} from './login/login.component';
import {SitsComponent} from './sits/sits.component';
import {LoginPageComponent} from './login-page/login-page.component';

import {CountriesResolve} from './services/country/country.resolve';
import {AccountGuard} from './guards/account.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AccountGuard],
    children: [
      {
        path: 'account',
        component: LoginPageComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'create',
            component: RegisterAcounteComponent,
            resolve: {
              countries: CountriesResolve
            }
          },
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'sits',
        component: SitsComponent,
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgRoutingModule {
}

