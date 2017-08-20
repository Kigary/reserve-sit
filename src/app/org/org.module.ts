import {NgModule} from '@angular/core';
import {OrgRoutingModule} from './org-routing.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {OrgMaterialModule} from './org-material.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {RegisterAcounteComponent} from './register-account/register-account.component';
import {SitsComponent} from './sits/sits.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {LoginComponent} from './login/login.component';
import { SitDialogComponent } from './sit-dialog/sit-dialog.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SitComponent } from './sit/sit.component';

import {SitService} from './services/sit/sit.service';
import {OrgService} from './services/org/org.service';
import {AccountService} from './services/auth/account.service';
import {CountryService} from './services/country/country.service';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { OrderService } from './services/order/order.service';
import { OrderResolverService } from './services/order/order-resolver.service';
import { ArchiveComponent } from './archive/archive.component';
import { ArchiveService } from './services/archive/archive.service';
import { ArchiveResolverService } from './services/archive/archive-resolver.service';




@NgModule({
  imports: [
    OrgRoutingModule,
    FormsModule,
    OrgMaterialModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    LoginPageComponent,
    LoginComponent,
    RegisterAcounteComponent,
    SitsComponent,
    SitDialogComponent,
    ImageUploadComponent,
    SitComponent,
    OrdersComponent,
    HomeComponent,
    ArchiveComponent,
  ],
  providers: [
    CountryService,
    SitService,
    OrgService,
    AccountService,
    OrderService,
    OrderResolverService,
    ArchiveService,
    ArchiveResolverService
  ],

  entryComponents: [SitDialogComponent]
})
export class OrgModule {
}
