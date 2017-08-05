import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdInputModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';
import {MdTabsModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    MdInputModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdListModule,
    MdGridListModule,
    MdTabsModule,
    MdCardModule,
    MdProgressSpinnerModule
  ],
  exports: [
    FlexLayoutModule,
    MdInputModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
    MdListModule,
    MdGridListModule,
    MdTabsModule,
    MdCardModule,
    MdProgressSpinnerModule
  ],
})
export class OrgMaterialModule {
}
