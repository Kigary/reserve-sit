import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdInputModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {LoginPageComponent} from './login-page.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MdInputModule,
    MdToolbarModule,
    MdButtonModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    MdInputModule,
    MdToolbarModule
  ],
  declarations: [LoginPageComponent],
  providers: [],
})
export class LoginPageModule {
}
