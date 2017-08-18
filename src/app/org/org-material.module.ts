import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MdInputModule, MdToolbarModule, MdButtonModule, MdSelectModule,
         MdListModule, MdGridListModule,  MdTabsModule, MdCardModule,
         MdDialogModule, MdCheckboxModule, MdProgressSpinnerModule,
         MdTooltipModule, MdMenuModule } from '@angular/material';


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
  MdMenuModule
];

@NgModule({
  imports: mdModules,
  exports: mdModules
})

export class OrgMaterialModule { }
