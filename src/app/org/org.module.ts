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
import { SitDialogComponent } from './sit-dialog/sit-dialog.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SitComponent } from './sit/sit.component';

import {SitService} from './services/sit/sit.service';
import {OrgService} from './services/org/org.service';
import {CountriesResolve} from './services/country/country.resolve';
import {AccountService} from './services/auth/account.service';
import {AccountGuard} from './guards/account.guard';



@NgModule({
  imports: [
    OrgRoutingModule,
    FormsModule,
    OrgMaterialModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    LoginPageComponent,
    LoginComponent,
    RegisterAcounteComponent,
    SitsComponent,
    SitDialogComponent,
    ImageUploadComponent,
    SitComponent,
  ],
  providers: [
    SitService,
    OrgService,
    CountriesResolve,
    AccountService,
    AccountGuard
  ],

  entryComponents: [SitDialogComponent]
})
export class OrgModule {
}
