import {NgModule} from '@angular/core';
import {OrgRoutingModule} from './org-routing.module';
import {LoginModule} from './login/login.module';
import {LoginPageModule} from './login-page/login-page.module';

import {RegisterAcounteComponent} from './register-acounte/register-acounte.component';
import {SitsComponent} from './sits/sits.component';


@NgModule({
  imports: [
    OrgRoutingModule,
    LoginModule,
    LoginPageModule,
  ],
  exports: [],
  declarations: [
    RegisterAcounteComponent,
    SitsComponent
  ],
  providers: [],
})
export class OrgModule {
}
