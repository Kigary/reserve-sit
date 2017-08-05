import {NgModule} from '@angular/core';
import {OrgRoutingModule} from './org-routing.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {OrgMaterialModule} from './org-material.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {RegisterAcounteComponent} from './register-account/register-account.component';
import {SitsComponent} from './sits/sits.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {LoginComponent} from './login/login.component';

import {SitsService} from './services/sits/sits.service';
import {OrgService} from './services/org/org.service';
import {CountriesResolve} from './services/country/country.resolve';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './auth.guard';

@NgModule({
  imports: [
    OrgRoutingModule,
    FormsModule,
    OrgMaterialModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    LoginPageComponent,
    LoginComponent,
    RegisterAcounteComponent,
    SitsComponent
  ],
  providers: [
    SitsService,
    OrgService,
    CountriesResolve,
    AuthService,
    AuthGuard
  ],
})
export class OrgModule {
}
