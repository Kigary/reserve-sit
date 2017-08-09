import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {OrgModule} from './org/org.module';
import {AppMaterialModule} from './app-material.module';
import {HomeModule} from './home/home.module';

import {AppComponent} from './app.component';

import {CountryService} from './org/services/country/country.service';
import {UserService} from './services/user.service';
import {AccountUserService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    OrgModule,
    HomeModule,
  ],
  providers: [
    CountryService,
    UserService,
    AccountUserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
