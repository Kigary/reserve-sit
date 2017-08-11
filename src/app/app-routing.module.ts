import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserRegisterAccountComponent} from './components/create-account/create-account.component';
import {UserLoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'org',
    loadChildren: 'app/org/org.module#OrgModule',
  },
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
    component: UserRegisterAccountComponent,
    outlet: 'account'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
