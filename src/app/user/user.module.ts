import {NgModule} from '@angular/core';

import {UserComponent} from './user.component';
import {UserMaterialModule} from './user-material.module';
@NgModule({
  imports: [
    UserMaterialModule
  ],
  exports: [UserComponent],
  declarations: [UserComponent],
  providers: [],
})
export class UserModule {
}
