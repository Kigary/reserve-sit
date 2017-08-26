import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SitsComponent } from './components/sits/sits.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UserLoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { UserRegisterAccountComponent } from './components/create-account/create-account.component';

import { OrderGuard } from './guards/order.guard';
import { SitsResolverService } from './services/sits-resolver.service';
import { OrgNamesResolverService } from './services/org-names-resolver.service';

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
          sits: SitsResolverService,
          orgNames: OrgNamesResolverService
        }
      },
      {
        path: 'orders',
        component : OrdersComponent,
        canActivate: [OrderGuard]
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
  exports: [RouterModule],
  providers: [
    SitsResolverService,
    OrgNamesResolverService,
    OrderGuard
  ]
})

export class AppRoutingModule { }
