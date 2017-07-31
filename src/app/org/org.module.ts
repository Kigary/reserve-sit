import {NgModule} from '@angular/core';
import { OrgRoutingModule} from './org-routing.module';



import {LoginComponent} from './login/login.component';
import {CreateAcounteComponent} from './create-acounte/create-acounte.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {SitsComponent} from './sits/sits.component';


@NgModule({
  imports: [OrgRoutingModule],
  exports: [],
  declarations: [
    LoginComponent,
    CreateAcounteComponent,
    LoginPageComponent,
    SitsComponent
  ],
  providers: [],
})
export class OrgModule {
}
