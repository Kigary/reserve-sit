import {NgModule} from '@angular/core';
import {OrgRoutingModule} from './org-routing.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {OrgMaterialModule} from './org-material.module';
import {HttpClientModule} from '@angular/common/http';

import {RegisterAcounteComponent} from './register-accounte/register-accounte.component';
import {SitsComponent} from './sits/sits.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  imports: [
    OrgRoutingModule,
    FormsModule,
    OrgMaterialModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [],
  declarations: [
    LoginPageComponent,
    LoginComponent,
    RegisterAcounteComponent,
    SitsComponent
  ],
  providers: [],
})
export class OrgModule {
}
