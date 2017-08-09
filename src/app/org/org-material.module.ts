import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MdInputModule, MdToolbarModule, MdButtonModule, MdSelectModule,
         MdListModule, MdGridListModule,  MdTabsModule, MdCardModule,
         MdDialogModule, MdCheckboxModule, MdProgressSpinnerModule,
         MdTooltipModule } from '@angular/material';



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
    MdProgressSpinnerModule,
    MdDialogModule,
    MdCheckboxModule,
    MdTooltipModule
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
    MdProgressSpinnerModule,
    MdDialogModule,
    MdCheckboxModule,
    MdTooltipModule
  ],
})
export class OrgMaterialModule {
}
