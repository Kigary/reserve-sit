import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterAcounteComponent} from './register-accounte/register-accounte.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: 'org',
    children: [
      {
        path: 'login',
        children: [
          {path: '', component: LoginComponent},
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

