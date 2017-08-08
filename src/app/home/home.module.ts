import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';

import {HomeMaterialModule} from './home-material.module';
import {HomeComponent} from './home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UserComponent} from '../user/user.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    UserComponent
  ],
  imports: [
    HomeRoutingModule,
    HomeMaterialModule,
    CommonModule
  ],
  exports: [],
  providers: [],
})
export class HomeModule {
}
