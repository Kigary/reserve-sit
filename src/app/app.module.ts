import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { SitsComponent } from './components/sits/sits.component';
import { SitComponent } from './components/sit/sit.component';
import { SitDialogComponent } from './components/sit-dialog/sit-dialog.component';
import { FilterComponent } from './components/filter/filter.component';

import { UserService } from './services/user.service';
import { AccountUserService } from './services/auth.service';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { OrderService } from './services/order.service';
import { SitService } from './services/sit.service';
import { OrgService } from './services/org.service';

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
    OrderComponent,
    OrderDialogComponent,
    OrderComponent,
    SitComponent,
    SitsComponent,
    SitDialogComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    AppCommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AccountUserService,
    SitService,
    OrderService,
    OrgService,
  ],
  entryComponents: [
    UserLoginPageComponent,
    SitDialogComponent,
    OrderDialogComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
