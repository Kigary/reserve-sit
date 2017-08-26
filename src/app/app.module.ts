import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppCommonModule } from './common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from './app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SitComponent } from './components/sit/sit.component';
import { SitsComponent } from './components/sits/sits.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserLoginComponent } from './components/login/login.component';
import { SitDialogComponent } from './components/sit-dialog/sit-dialog.component';
import { UserLoginPageComponent } from './components/login-page/login-page.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { UserRegisterAccountComponent } from './components/create-account/create-account.component';

import { OrgService } from './services/org.service';
import { SitService } from './services/sit.service';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { AccountUserService } from './services/auth.service';
import { CapitalizePipe } from './components/pipes/capitalize.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SitComponent,
    HomeComponent,
    UserComponent,
    SitsComponent,
    CapitalizePipe,
    OrderComponent,
    OrdersComponent,
    NavbarComponent,
    FilterComponent,
    FooterComponent,
    UserLoginComponent,
    SitDialogComponent,
    OrderDialogComponent,
    UserLoginPageComponent,
    DateTimePickerComponent,
    UserRegisterAccountComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppCommonModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    OrgService,
    SitService,
    UserService,
    OrderService,
    AccountUserService,
  ],
  entryComponents: [
    SitDialogComponent,
    OrderDialogComponent,
    UserLoginPageComponent,
    DateTimePickerComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
