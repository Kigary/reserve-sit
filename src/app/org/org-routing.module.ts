import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {CreateAcounteComponent} from './create-acounte/create-acounte.component';

const routes: Routes = [
  {
    path: 'org',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        children: [
          {path: '', component: LoginComponent},
          {path: 'create', component: CreateAcounteComponent}
        ]
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
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

