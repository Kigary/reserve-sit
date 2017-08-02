import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterAcounteComponent} from './register-accounte/register-accounte.component';
import {LoginComponent} from './login/login.component';
import {SitsComponent} from './sits/sits.component';

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
      {
        path: 'sits',
        component: SitsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgRoutingModule {
}

