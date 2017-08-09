import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {UserRegistreAccountComponent} from '../create-account/create-account.component';
import {UserLoginComponent} from '../login/login.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: UserLoginComponent,
    outlet: 'account'
  },
  {
    path: 'create',
    component: UserRegistreAccountComponent,
    outlet: 'account'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}

export const routedComponents = [HomeRoutingModule];
