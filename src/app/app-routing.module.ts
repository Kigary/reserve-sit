import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserRegisterAccountComponent} from './components/create-account/create-account.component';
import {UserLoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {SitsComponent} from './sits/sits.component';
import {OrdersComponent} from './components/orders/orders.component';
import {NotFoundComponent} from './common/not-found/not-found.component';

import { SitsResolveService } from './services/sits-resolve.service';
import { OrgNamesResolveService } from './services/orgnames-resolve.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/sits',
    pathMatch: 'full'
  },
  {
    path: 'org',
    loadChildren: 'app/org/org.module#OrgModule',
  },
  {
    path: 'home',
    component: HomeComponent,
    children : [
      {
        path : 'sits',
        component: SitsComponent,
        resolve: {
          sits: SitsResolveService,
          orgNames: OrgNamesResolveService
          }
      },
      {
        path: 'orders',
        component : OrdersComponent
      },
      {
        path: '',
        redirectTo : 'sits',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: UserLoginComponent,
    outlet: 'account'
  },
  {
    path: 'create',
    component: UserRegisterAccountComponent,
    outlet: 'account'
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
