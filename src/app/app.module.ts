import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppCommonModule } from './common/common.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';


import { UserLoginComponent } from './components/login/login.component';
import { UserLoginPageComponent } from './components/login-page/login-page.component';
import { UserRegisterAccountComponent } from './components/create-account/create-account.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { UserService } from './services/user.service';
import { AccountUserService } from './services/auth.service';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UserComponent,
    UserRegisterAccountComponent,
    UserLoginPageComponent,
    UserLoginComponent,
    CapitalizePipe,
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    AppCommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AccountUserService,
  ],
  entryComponents: [UserLoginPageComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}
