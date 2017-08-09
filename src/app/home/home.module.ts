import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeMaterialModule } from './home-material.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from '../user/user.component';
import { UserLoginPageComponent } from '../login-page/login-page.component';
import { UserRegisterAccountComponent } from '../create-account/create-account.component';
import { UserLoginComponent } from '../login/login.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    UserComponent,
    UserRegisterAccountComponent,
    UserLoginPageComponent,
    UserLoginComponent
  ],
  imports: [
    HomeRoutingModule,
    HomeMaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  entryComponents: [UserLoginPageComponent],
  exports: [],
  providers: [],
})

export class HomeModule { }
