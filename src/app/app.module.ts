import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { HomeModule } from './home/home.module';
import { AppCommonModule } from './common/common.module';

import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { AccountUserService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    HomeModule,
    AppCommonModule
  ],
  providers: [
    UserService,
    AccountUserService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
