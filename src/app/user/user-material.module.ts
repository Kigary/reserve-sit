import {NgModule} from '@angular/core';
import {MdMenuModule} from '@angular/material';
import {MdButtonModule } from '@angular/material';
@NgModule({
  imports: [
    MdMenuModule,
    MdButtonModule
  ],
  exports: [
    MdMenuModule,
    MdButtonModule
  ],
})
export class UserMaterialModule {
}
