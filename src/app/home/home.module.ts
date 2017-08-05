import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeMaterialModule} from './home-material.module';
import {HomeComponent} from './home.component';
import {NavbarComponent} from './navbar/navbar.component';
@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    HomeRoutingModule,
    HomeMaterialModule
  ],
  exports: [],
  providers: [],
})
export class HomeModule {
}
