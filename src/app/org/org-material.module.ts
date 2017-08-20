import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MdInputModule, MdToolbarModule, MdButtonModule, MdSelectModule,
  MdListModule, MdGridListModule, MdTabsModule, MdCardModule,
  MdDialogModule, MdCheckboxModule, MdProgressSpinnerModule,
  MdTooltipModule, MdMenuModule, MdTableModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';


const mdModules = [
  FlexLayoutModule,
  MdInputModule,
  MdToolbarModule,
  MdButtonModule,
  MdSelectModule,
  MdListModule,
  MdGridListModule,
  MdTabsModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdDialogModule,
  MdCheckboxModule,
  MdTooltipModule,
  MdMenuModule,
  MdTableModule,
  CdkTableModule
];

@NgModule({
  imports: mdModules,
  exports: mdModules
})

export class OrgMaterialModule { }
