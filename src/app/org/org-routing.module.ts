import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterAcounteComponent} from './register-account/register-account.component';
import {LoginComponent} from './login/login.component';
import {SitsComponent} from './sits/sits.component';
import {LoginPageComponent} from './login-page/login-page.component';

import {CountriesResolve} from './services/country/country.resolve';
import {AccountGuard} from './guards/account.guard';
import { ReservationsComponent } from './reservations/reservations.component';
import { HomeComponent } from './home/home.component';
import { ArchiveResolverService } from './services/archive/archive-resolver.service';
import { ArchiveComponent } from './archive/archive.component';
import { ReservedResolverService } from './services/reserved/reserved-resolver.service';

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
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'sits',
            component: SitsComponent,
          },
          {
            path: 'reservations',
            component: ReservationsComponent,
            resolve: {
              reservations: ReservedResolverService
            }
          },
          {
            path: 'archive',
            component: ArchiveComponent,
            resolve: {
              archive: ArchiveResolverService
            }
          },
          {
            path: '',
            redirectTo: 'sits',
            pathMatch: 'full'
          }
        ]
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
  providers: [
    CountriesResolve,
    AccountGuard,
    ArchiveResolverService,
    ReservedResolverService
  ]
})
export class OrgRoutingModule {
}

