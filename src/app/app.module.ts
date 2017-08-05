import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrgModule} from './org/org.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';

import {CountryService} from './org/services/country/country.service'; //  don't forget to change afterwards


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMaterialModule,
    OrgModule,
  ],
  providers: [
    CountryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
