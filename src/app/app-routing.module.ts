import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserLoginPageComponent} from './login-page/login-page.component';
import {UserLoginComponent} from './login/login.component';
import {UserRegistreAccountComponent} from './create-account/create-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'org',
    pathMatch: 'full'

  },
  {
    path: 'account',
    component: UserLoginPageComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
      },
      {
        path: 'create',
        component: UserRegistreAccountComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
