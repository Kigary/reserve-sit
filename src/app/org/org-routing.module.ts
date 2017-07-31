import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterAcounteComponent} from './register-acounte/register-acounte.component';
import {LoginPageComponent} from './login-page/login-page.component';

const routes: Routes = [
  {
    path: 'org',
    children: [
      {
        path: 'login',
        children: [
          {path: '', component: LoginPageComponent},
          {path: 'register', component: RegisterAcounteComponent}
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgRoutingModule {
}

